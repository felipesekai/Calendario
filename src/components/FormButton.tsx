import { ButtonHTMLAttributes } from "react";
import * as Dialog from '@radix-ui/react-dialog';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { title: string }

export function FormButton({ title, ...rest }: ButtonProps) {
    return (
        <button type='submit'
            {...rest}
            className='ml-auto bg-slate-800 rounded h-12 w-24 text-white hover:bg-slate-900'>
            {title}
        </button>
    );
}