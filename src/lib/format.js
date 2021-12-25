export const TimeStringtoObject = (dateString, timeString) => {
    // Input:
    // dateString: a string of date in the form: yyyy-mm-dd
    // timeString: a string of time in the form: "hh:mm"
    let dateArray = dateString.split("-");
    let timeArray = timeString.split(":");
    return {year: dateArray[0], month: dateArray[1], day: dateArray[2], hours: timeArray[0], minutes: timeArray[1]};
}