import Axios from 'axios';
import {TimeStringtoObject, GenerateISO} from './format';

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
    console.log(inputs);
    const name = inputs.Contactperson;
    const email = inputs.Email;
    const project = inputs.Projectname;
    const notes = inputs.Purpose;
    const startTime = TimeStringtoObject(inputs.Day, inputs.Starttime);
    const endTime = TimeStringtoObject(inputs.Day, inputs.Endtime);
    // console.log(startTime);
    // startTime and endTime will be an object with the following fields:
        // year
        // month
        // day
        // hours
        // minutes
    const reservationInfo = {
        start: GenerateISO(startTime),
        end: GenerateISO(endTime),
        title: `${project} - ${name}`,
        description: `Contact ${email} if there are any questions about this reservation.\n\nPurpose/Notes:\n\n${notes}`,
        name: name,
        email: email
    };
    // console.log(reservationInfo);
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
    // const res = {status: 201, statusText: "Hi"};
    console.log(res.status);
    console.log(res.statusText);
    return {status: res.status, message: res.statusText};
}