import Axios from 'axios';
import {TimeStringtoObject} from './format';

export const MakeReservation = async (inputs) => {
    // This function takes in an object inputs from the form
    // Format:
        // Contactperson: string
        // Email: string
        // Day: string
        // Endtime: string
        // Projectname: string
        // Purpose: string
        // Starttime: string
    // Sends an API Request to the serverless Vercel backend
    // And returns the status of the reservation and a message to be displayed on the frontend

    const name = inputs.Contactperson;
    const email = inputs.Email;
    const project = inputs.Projectname;
    const notes = inputs.Purpose;
    const startTime = TimeStringtoObject(inputs.Day, inputs.Starttime);
    const endTime = TimeStringtoObject(inputs.Day, inputs.Endtime);

    // startTime and endTime will be an object with the following fields:
        // year
        // month
        // day
        // hours
        // minutes

    // Convert the time to ISO time for the API
    // Date constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
    // new Date(year, monthIndex, day, hours, minutes)
    let ISO_START = new Date(startTime.year, startTime.month, startTime.day, startTime.hours, startTime.minutes);
    let ISO_END = new Date(endTime.year, endTime.month, endTime.day, endTime.hours, endTime.minutes);

    ISO_START = TimeFormatAPI(ISO_START.toISOString());
    ISO_END = TimeFormatAPI(ISO_END.toISOString());

    const reservationInfo = {
        start: ISO_START,
        end: ISO_END,
        title: `${project} - ${name}`,
        description: `Contact ${email} if there are any questions about this reservation.\n\nPurpose/Notes:\n\n${notes}`,
        name: name,
        email: email
    };
    // body:
    // start, end, title, description
    // title: Project Name + contact Name
    // description will be:
    // "Contact " + email + " if there are any questions about this reservation."
    // "\n \n Purpose/Notes: "
    const res = await Axios.post('https://ucsb-aiche-lab-reservation.vercel.app/api/calendar', reservationInfo, {}).catch((error) => {
        if (error.response) {
            console.error("Request error");
            console.error("Request error status: ", error.response.status);
            console.error("Request error data: ", error.response.data);
            console.error("Request error headers: ", error.response.headers);
        } else {
            console.error(error);
        }
    });
    console.log(res.status);
    console.log(res.statusText);
    return {status: res.status, message: res.statusText};
}

const TimeFormatAPI = (ISOString) => {
    // input is an ISO string, such as 2011-10-05T14:48:00.000Z
    // Return a properly formatted time, such as "2021-12-16T05:05:53+02:00"

    let reformatted = ISOString.split(":");
    // Pop the last element, which is the seconds and the Z:
    // Expected: 2011-10-05T14:48:00.000Z -> 2011-10-05T14:48
    reformatted.pop();
    // Add in the :00 at the end
    reformatted.push("00");
    // Combine the string array now and
    // Reformat to be Pacific Time offset
    return reformatted.join(":") + "+02:00";
}