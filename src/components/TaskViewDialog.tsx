import * as Dialog from '@radix-ui/react-dialog';
import React, { FormEvent, useCallback, useState } from 'react';
import { api } from '../services/api';
import { taskViewtoModel } from '../utils/task-mapper';
import { TaskModel, TaskView } from '../utils/TypesModel';
import { DeleteTaskAlertDialog } from './DeleteTaskAlertDialog';
import { FormButton } from './FormButton';
import { FormTask } from './FormTask';
import { Modal } from './Modal';


/*
os itens a serem vizualizados pelo usuario,
terá o titulo da tarefa, descrição, data, hora e duração, alem disso, esse componente receberá um parametro filho
que sera o botao de abrir e será repassado para o modal
*/

export interface Props extends Dialog.DialogProps {
    tasks: TaskView,
    children: React.ReactNode,
}

export const TaskViewDialog = ({ tasks, children }: Props,) => {


    const [form, setForm] = useState<TaskView>(tasks)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEditable, setIsEditable] = useState<boolean>(false)


    const handleChangeInput = useCallback((event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
        const targetInput = event.currentTarget
        const { value, name } = targetInput

        setForm({
            ...form,
            [name]: value
        })
    }, [form])

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const {
            title,
            description,
            data,
            hour,
            duration,
        } = form;

        if (!title || !data || !hour) {
            window.alert("preencha os campos obrigatórios");

            return;
        }

        editTask()

    }, [form]);

    function editTask() {
        // chamada da api aqui
        api.put("task/v1", taskViewtoModel(form)).then((response) => {
            const data: TaskModel = response.data
            window.alert("editado com sucesso" + data.id);
            window.location.reload();
            setIsOpen(false)
        }

        ).catch((err) => [
            console.log(err)
        ])



    }

    function changeStates(bol: boolean) {
        setIsOpen(bol);
        setIsEditable(bol)
    }

    return (
        <Modal title="Tarefa" buttonDialog={children} isOpen={isOpen} onOpenChange={changeStates}>
            <FormTask
                isEditable={isEditable}
                handleSubmit={handleSubmit}
                handleChangeInput={handleChangeInput}
                handleChangeTextArea={handleChangeInput}
                tasks={form}
                formButton={
                    <div className='flex justify-between ' >
                        <DeleteTaskAlertDialog id={form.id} buttonDialog={
                            <button type='button'
                                onClick={() => { }}
                                className='ml-0 bg-red-600 rounded h-12 w-28 text-white hover:bg-red-900'>
                                Excluir Tarefa
                            </button>
                        } />
                        <FormButton type={isEditable ? "submit" : "button"} title={!isEditable ? 'confirmar' : 'Editar'} onClick={() => { setIsEditable(!isEditable) }} />

                    </div>
                }

            />

        </Modal >
    );

}
