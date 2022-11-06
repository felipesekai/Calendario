import { convertHoursStringToMinutes, convertMinutesToHoursString } from "./hour-converter";
import { TaskModel, TaskView } from "./TypesModel";

export function taskViewtoModel(task: TaskView): TaskModel {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        data: task.data,
        hour: convertHoursStringToMinutes(task.hour),
        duration: task.duration ? convertHoursStringToMinutes(task.duration) : undefined,
    }
}

export function taskModeltoView(task: TaskModel): TaskView {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        data: task.data,
        hour: convertMinutesToHoursString(task.hour),
        duration: task.duration ? convertMinutesToHoursString(task.duration) : undefined,
    }
}