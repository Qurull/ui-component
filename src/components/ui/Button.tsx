"use client"
import { ComponentProps } from "@/lib/interfaces/componentProps"
import type { MouseEventHandler } from "react"

interface ButtonProps extends ComponentProps.WithAll {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export function Button({ className, children, onClick }: Readonly<ButtonProps>) {
    return (
        <button type="button" onClick={onClick} className={`bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-400 transition-colors ${className}`}>
            {children}
        </button>
    )
}