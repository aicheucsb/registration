import moment from 'moment-timezone' // https://stackoverflow.com/questions/47046067/typeerror-moment-tz-is-not-a-function

export const ValidateTime = (startTime, endTime) => {
    // this function will check to see if the start and end time are valid
    // the inputs will both be strings in the form: "hh:mm" in 24 hour time format that includes leading zeros
    // the output will be a boolean representing whether the time is valid (true) or invalid (false)

    // Split the time
    const startArray = startTime.split(":");
    const endArray = endTime.split(":");

    // Convert hour to minutes
    let startMin = timeArraytoMin(startArray);
    let endMin = timeArraytoMin(endArray);

    if (endMin <= startMin) {
        // Check if the total time at the end is less than the start, which would mean that the end time is before the start time
        return false;
    } else {
        return true;
    }
}

export const ValidateDate = (timeString) => {
    // input will be a string in the format yyyy-mm-dd (2021-12-23)
    // output will be boolean whether the date is valid (true) or invalid (false)

    // use momentjs: https://momentjs.com/docs/#/query/is-before/
    const TODAY = moment().tz('America/Los_Angeles');
    // console.log(TODAY);
    // check if the input date is after TODAY
    return moment(timeString).isAfter(TODAY);
}

const timeArraytoMin = (array) => {
    if (array.length < 2) {
        console.error("Invalid time array size");
    }
    return parseInt(array[1]) + parseInt(array[0]) * 60
}