"use client"
import type { Dispatch, ReactNode } from "react"
import { createPortal } from "react-dom"

interface BaseProps {
    className?: string;
    children?: ReactNode;
}

interface ModalProps extends BaseProps {
    isOpen: boolean;
    onClose: Dispatch<boolean>;
}

export function Modal({ className, isOpen, onClose, children }: Readonly<ModalProps>) {
    return (
        isOpen && createPortal(
            <section className="fixed grid place-content-center inset-0 z-50">
                <section className="absolute inset-0 cursor-pointer" onClick={() => onClose(false)}/>
                <section className={`relative ${className}`}>
                    {children}
                </section>
            </section>,
            document.body
        )
    )
}