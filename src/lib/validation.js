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

const timeArraytoMin = (array) => {
    if (array.length < 2) {
        console.error("Invalid time array size");
    }
    return parseInt(array[1]) + parseInt(array[0]) * 60
}