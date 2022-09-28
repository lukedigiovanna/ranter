
const cats =    ["seconds", "minutes", "hours", "days", "weeks", "months", "years"]
const seconds = [1, 60, 60 * 60, 60 * 60 * 24, 60 * 60 * 24 * 7, 60 * 60 * 24 * 7 * 30, 60 * 60 * 24 * 365]


export const timeSince = (unixTime: number) => {
    return Date.now() / 1000 - unixTime;
}

export const prettyTime = (time: number) => {
    let i = 0;
    while (i < seconds.length && time > seconds[i + 1]) i++;
    const elapsed = Math.floor(time / seconds[i]);
    return elapsed + " " + cats[i]
}

export const prettyTimeSince = (unixTime: number) => {
    const elapsed = timeSince(unixTime)
    return prettyTime(elapsed);
}