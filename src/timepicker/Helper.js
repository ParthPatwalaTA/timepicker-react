// Validate time input
export function validateTime(timeStr) {
    var time = timeStr;
    var isValid = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(time);

    return isValid;
}

export function checkTimeFrame(date, timeFrameObj) {

    let isValid = true;
    let { minHours, minMinutes, maxHours, maxMinutes} = timeFrameObj;

    let tempDate = new Date();
    // Create a new Date
    let startDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), minHours, minMinutes, 0);
    let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), maxHours, maxMinutes, 0);

    if (date >= startDate &&  date <= endDate) {
        isValid = true;
    } else {
        isValid = false;
    }
    
    return isValid;
}
