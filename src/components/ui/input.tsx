import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
  }

export default function Input({className, ...props}: InputProps) {
    return (
        <input
            className={clsx(
                'w-full px-3 py-2 border-gray-300 mt-3 rounded-md shadow-sm focus:outline-none focus:ring-1',
                className,
                props.disabled && 'cursor-not-allowed bg-gray-100 text-gray-500'
            )}
            {...props}
        />
    )
}