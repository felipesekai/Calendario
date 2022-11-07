import { FormEvent, useCallback, useEffect, useState } from "react";
import { Plus } from 'phosphor-react';
import { Modal } from "./Modal";
import { FormTask } from "./FormTask";
import { FormButton } from "./FormButton";
import { api } from "../services/api";
import { convertHoursStringToMinutes } from "../utils/hour-converter";
import { TaskModel } from "../utils/TypesModel";
import { taskViewtoModel } from "../utils/task-mapper";


// tipagem para as tarefas
export interface Task {
    id?: string;
    title: string,
    description: string,
    data: string,
    hour: string,
    duration: string,
}

export function RegisterNewTask() {
    const empyTask = {
        title: '',
        data: '',
        description: '',
        hour: '',
        duration: '',
    }
    const [newTask, setNewTask] = useState<Task>(empyTask);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleChangeInput = useCallback((event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
        const targetInput = event.currentTarget
        const { value, name } = targetInput

        setNewTask({
            ...newTask,
            [name]: value
        })
    }, [newTask]);


    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const {
            title,
            description,
            data,
            hour,
            duration,
        } = newTask;

        if (!title || !data || !hour) {
            window.alert("preencha os campos obrigatórios");

            return;
        }



        addnewTask()

    }, [newTask])





    function addnewTask() {

        // chamada da api aqui
        api.post("task/v1", taskViewtoModel(newTask)).then((response) => {
            const data: Task = response.data
            window.alert("cadastro realizado com id" + data.id);
            setIsOpen(false)
        }

        ).catch((err) => [
            console.log(err)
        ])
        //se sucesso limpa a state
        setNewTask(empyTask);

    }

    // useEffect(() => {
    //     console.log(newTask)
    // }, [newTask])
    return (
        <Modal title="Cadastrar nova Tarefa" isOpen={isOpen} onOpenChange={setIsOpen} buttonDialog={

            <button className='flex  hover:bg-slate-500 
      w-full h-full justify-center items-center  bg-slate-400 
      rounded
      '>
                <Plus size={32} />
            </button>

        }>
            <FormTask
                tasks={newTask}
                handleChangeInput={handleChangeInput}
                handleSubmit={handleSubmit}
                handleChangeTextArea={handleChangeInput}
                formButton={<FormButton title="Cadastrar" />}
            />
        </Modal>



    );
}