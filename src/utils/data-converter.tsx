import { TaskModel } from "./TypesModel";

// function dataConvertToNumber(dataString: string) {
//     const [year, month, day] = dataString.split('-').map(Number);

//     console.log(year, month, day);
// }

export function formatDate() {
    let date = new Date()
    let format = ((date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()))
    return format
}
export function compareDateForDay(dateString: TaskModel) {
    const [year, month, day] = dateString.data.split('-').map(Number);
    let _formatDate: string = formatDate()

    const [_year, _month, _day] = _formatDate.split('-').map(Number);

    return year === _year && month === _month && day === _day
}
export function compareDateForMonth(dateString: TaskModel) {
    const [year, month, day] = dateString.data.split('-').map(Number);
    let _formatDate: string = formatDate()

    const [_year, _month, _day] = _formatDate.split('-').map(Number);

    return year === _year && month === _month
}

