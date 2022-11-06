export type TaskModel = {
    id?: string;
    title: string,
    description?: string,
    data: string,
    hour: number,
    duration?: number,
}

export interface TaskView {
    id?: string;
    title: string,
    description?: string,
    data: string,
    hour: string,
    duration?: string,
}