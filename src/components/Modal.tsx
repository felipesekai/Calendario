import * as Dialog from '@radix-ui/react-dialog';


/* o componente recebe tres paramentros, um é o titulo,
o filho com o objetivo de reutiluzar o modal para qualquer tipo de vizualização ou inserção rapida de dados,
e o buttonDialog é o botão que fará o dialog abrir
*/
type Props = {
    title: string;
    children: React.ReactNode;
    buttonDialog: React.ReactNode;
    isOpen?: boolean
    onOpenChange?: (b: boolean) => void
}
// componente dialog 
export const Modal = ({ children, title, buttonDialog, isOpen, onOpenChange }: Props) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Trigger className='w-full h-full rounded bg-slate-400 hover:bg-slate-500'>
                {buttonDialog}
            </Dialog.Trigger>
            <Dialog.Portal >
                <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

                <Dialog.Content className='bg-slate-400 py-8 px-10                            
                fixed top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2
                rounded-lg
                shadow-lg
                 shadow-black/25'>
                    <Dialog.Title className='font-bold text-white'>{title.toUpperCase()}</Dialog.Title>

                    {children}


                    <Dialog.Description />


                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    );
}