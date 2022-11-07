import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useCallback } from 'react';
import { api } from '../services/api';

type Props = {
    buttonDialog: React.ReactNode;
    id?: string;
}



export const DeleteTaskAlertDialog = ({ buttonDialog, id }: Props) => {
    const handleDeleteTask = useCallback(() => {
        ///chaamar api passando id
        api.delete(`task/v1/${id}`).then(() => {
            window.alert("Tarefa deletada com successo")
            window.location.reload();
        }).catch((err) => {
            window.alert("Ops Houve um erro ao tentar deletar sua tarefa")
        })
    }, [])
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger className='ml-0 bg-red-600 rounded h-12 w-28 text-white hover:bg-red-900'>
                {buttonDialog}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay />
                <AlertDialog.Content
                    className='bg-slate-400 py-8 px-10

            fixed top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            rounded-lg
            shadow-lg
             shadow-black/25'

                >
                    <AlertDialog.Title className='text-2xl font-bold'>
                        Deseja realmente excluir essa tarefa?
                    </AlertDialog.Title>
                    <div >
                        <AlertDialog.Description className='my-4'>
                            Você está prestes a deletar uma tarefa, se for o que realmente deseja click em confirmar
                        </AlertDialog.Description>
                        <div className='flex flex-row  gap-2'>
                            <AlertDialog.Cancel className='ml-auto bg-slate-600 rounded h-12 w-28 text-white hover:bg-slate-900'>
                                Cancelar
                            </AlertDialog.Cancel>
                            <AlertDialog.Action
                                onClick={handleDeleteTask}
                                className=' bg-red-600 rounded h-12 w-28 text-white hover:bg-red-900'>
                                Excluir Tarefa
                            </AlertDialog.Action>
                        </div>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )

}
