"use client"
import type { MouseEvent, ReactNode } from "react"

interface ButtonProps {
    className?: string;
    children?: ReactNode;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ className, onClick, children }: Readonly<ButtonProps>) {
    return (
        <button type="button" onClick={event => onClick(event)} className={`bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-400 transition-colors ${className}`}>
            {children}
        </button>
    )
}