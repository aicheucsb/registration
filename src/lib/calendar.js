import Axios from 'axios';

export const MakeReservation = async (startTime, endTime, name, project, email, notes) => {
    // This function takes in the startTime, endTime, name, project, email, and notes from the form
    // Sends an API Request to the serverless Vercel backend
    // And returns the status of the reservation and a message to be displayed on the frontend

    // startTime and endTime will be an object with the following fields:
    // year
    // monthIndex
    // day
    // hours
    // minutes

    // Convert the time to ISO time for the API
    // Date constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
    // new Date(year, monthIndex, day, hours, minutes)
    let ISO_START = new Date(startTime.year, startTime.monthIndex, startTime.day, startTime.hours, startTime.minutes);
    let ISO_END = new Date(endTime.year, endTime.monthIndex, endTime.day, endTime.hours, endTime.minutes);

    ISO_START = TimeFormatAPI(ISO_START.toISOString());
    ISO_END = TimeFormatAPI(ISO_END.toISOString());

    const reservationInfo = {
        start: ISO_START,
        end: ISO_END,
        title: `${project} - ${name}`,
        description: `Contact ${email} if there are any questions about this reservation.\n\nPurpose/Notes:\n\n${notes}`
    };
    // body:
    // start, end, title, description
    // title: Project Name + contact Name
    // description will be:
    // "Contact " + email + " if there are any questions about this reservation."
    // "\n \n Purpose/Notes: "
    const res = await Axios.post('https://ucsb-aiche-lab-reservation.vercel.app/api/calendar', reservationInfo);
    console.log(res.status);
    console.log(res.statusText);
    return {status: res.status, message: res.statusText};
}

const TimeFormatAPI = (ISOString) => {
    // input is an ISO string, such as 2011-10-05T14:48:00.000Z
    // Return a properly formatted time, such as "2021-12-16T05:05:53+02:00"

    let reformatted = ISOString.split(":");
    // Pop the last element, which is the seconds: 
    reformatted.pop();

    // Combine the string array now and
    // Reformat to be Pacific Time offset
    return reformatted.join() + "+02:00";
}