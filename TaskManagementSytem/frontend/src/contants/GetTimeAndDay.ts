import { DayCategoryEnum } from "./DayCategoryEnum";

const getDayCategory = (totalDays: number): DayCategoryEnum => {
    switch (true) {
        case totalDays <= -8:
            return DayCategoryEnum.Past;
        case totalDays >= -7 && totalDays <= -2:
            return DayCategoryEnum.LastWeek;
        case totalDays === -1:
            return DayCategoryEnum.Yesterday;
        case totalDays === 0:
            return DayCategoryEnum.Today;
        case totalDays === 1:
            return DayCategoryEnum.Tomorrow;
        case totalDays > 1 && totalDays <= 7:
            return DayCategoryEnum.ThisWeek;
        default:
            return DayCategoryEnum.Later;
    }
};
export const GetTimeAndDay = (time:string)=>{
    const currentTime = new Date().getTime();
    const taskDueTime = new Date(time).getTime();
    const diffInMilli = taskDueTime - currentTime;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Milliseconds in a day

    const totalDays = Math.round(diffInMilli/oneDayInMilliseconds); // give the total days differenece
    const taskDueDay = getDayCategory(totalDays);
    const taskTime = new Date(time).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // this will add AM/PM
    });
    return {taskDueDay,taskTime}
}