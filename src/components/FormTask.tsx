
import { FormEvent, ReactNode } from "react";
import { convertHoursStringToMinutes, convertMinutesToHoursString } from "../utils/hour-converter";
import { TaskView } from "../utils/TypesModel";
import { Input } from "./Input";

// funçoes do form para passar alteraçoes para a state e submit o form
interface Props {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    handleChangeInput: (event: FormEvent<HTMLInputElement>) => void;
    handleChangeTextArea: (event: FormEvent<HTMLTextAreaElement>) => void;
    formButton: ReactNode;
    tasks: TaskView;
    isEditable?: boolean;
}

export function FormTask({ handleSubmit, handleChangeInput, handleChangeTextArea, tasks, formButton, isEditable }: Props) {

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4'>
            {/* titulo */}
            <Input type="text" value={tasks.title}
                placeholder="Titulo da tarefa"
                required
                onChange={handleChangeInput}
                disabled={isEditable}
                name='title'
            />
            {/* data */}
            <div className='flex flex-col'>
                <label >Data</label>
                <Input type="date" value={tasks.data}
                    required
                    onChange={handleChangeInput}
                    disabled={isEditable}
                    name='data'
                />
            </div>
            <div className='flex justify-between gap-2'>
                {/* hora */}
                <div className='flex flex-col flex-auto'>
                    <label >Hora</label>
                    <Input type="time" value={convertMinutesToHoursString(convertHoursStringToMinutes(tasks.hour))}
                        required

                        onChange={handleChangeInput}
                        disabled={isEditable}
                        name='hour'
                    />
                </div>
                {/* duração */}
                <div className='flex flex-col flex-auto'>
                    <label >Duração</label>
                    <Input type="time" value={tasks.duration && convertMinutesToHoursString(convertHoursStringToMinutes(tasks.duration))}
                        onChange={handleChangeInput}
                        disabled={isEditable}
                        name='duration'
                    />
                </div>

            </div>
            {/* descrição */}
            <div className='flex flex-col'>
                <label >Descição</label>
                <textarea
                    className='bg-slate-400 py-3 px-4 rounded text-sm text-white
        outline-slate-900 placeholder:text-zinc-200 enabled:shadow-md
         border-slate-600 border invalid:border-red-500'
                    value={tasks.description}

                    rows={6}
                    cols={5}
                    onChange={handleChangeTextArea}
                    disabled={isEditable}
                    name='description'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <footer className='text-sm text-red-600'>
                    *Os campos com bordas vermelhas são obrigatorios
                </footer>

                {formButton}

            </div>


        </form>
    );
}