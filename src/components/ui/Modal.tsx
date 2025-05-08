"use client"
import { ComponentProps } from "@/lib/interfaces/componentProps";
import type { Dispatch, SetStateAction } from "react"
import { createPortal } from "react-dom"

interface ModalProps extends ComponentProps.WithAll {
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
}

export function Modal({ className, children, isOpen, onClose }: Readonly<ModalProps>) {
    return isOpen && (
        createPortal(
            <section className="fixed grid place-content-center inset-0 z-50">
                <div className="absolute inset-0 cursor-pointer" onClick={() => onClose(false)}/>
                <section className={`relative ${className}`}>
                    {children}
                </section>
            </section>,
            document.body
        )
    )
}