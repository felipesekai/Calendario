import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = ({ ...rest }: InputProps) => {
    return (

        <input {...rest}
            className="bg-slate-400 py-2 px-3 rounded text-sm text-white
             outline-slate-900 placeholder:text-zinc-200 enabled:shadow-md
              border-slate-600 border invalid:border-red-500" />)

}