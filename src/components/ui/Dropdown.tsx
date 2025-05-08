"use client"
import Link, { LinkProps } from "next/link"
import { createContext, useContext, useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { FaSortDown, FaSortUp } from "react-icons/fa6"

import { ComponentProps } from "@/lib/interfaces/componentProps"

interface DropdownContainerProps extends ComponentProps.WithAll {
    hidden?: boolean;
    expand?: boolean;
}

interface DropdownButtonProps extends ComponentProps.WithAll {}

interface DropdownListProps extends ComponentProps.WithAll {}

interface DropdownItemProps extends ComponentProps.WithAll {
    rowable?: boolean;
}

interface DropdownLinkProps extends ComponentProps.WithAll, Pick<LinkProps, "href"> {
}

interface DropdownContext {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContext | null>(null)

function useDropdownContext() {
    const dropdownContext = useContext(DropdownContext)
    if (!dropdownContext) throw new Error("Component must be used within DropdownContainer")
    return dropdownContext
}

export function DropdownContainer({ className, children, hidden, expand = false }: Readonly<DropdownContainerProps>) {
    const [isOpen, setIsOpen] = useState(expand)

    return !hidden && (
        <section className={`flex flex-col bg-white min-w-[200px] rounded-md shadow-lg overflow-hidden ${className}`}>
            <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
                {children}
            </DropdownContext.Provider>
        </section>
    )
}

export function DropdownButton({ className, children }: Readonly<DropdownButtonProps>) {
    const { isOpen, setIsOpen } = useDropdownContext()

    return (
        <button className={`flex justify-between items-center px-4 py-2 ${isOpen ? "rounded-t-md" : "rounded-md"} outline-none border border-transparent hover:border-blue-500 transition-colors ${className}`} type="button" onClick={() => setIsOpen(value => !value)}>
            <span className="flex items-center gap-2">{children}</span>{isOpen ? <FaSortUp className="text-blue-500 mt-auto" /> : <FaSortDown className="text-blue-500 mb-auto" />}
        </button>
    )
}

export function DropdownList({ className, children }: Readonly<DropdownListProps>) {
    const { isOpen } = useDropdownContext()
    
    return (
        <ol className={`${isOpen ? "flex" : "hidden"} flex-col ${className}`}>
            {children}
        </ol>
    )
}

export function DropdownItem({ className, children, rowable }: Readonly<DropdownItemProps>) {
    return (
        <li className={`flex ${rowable ? "flex-row" : "flex-col"} px-4 py-2 ${className}`}>
            {children}
        </li>
    )
}

export function DropdownLink({ className, children, href }: Readonly<DropdownLinkProps>) {
    return (
        <Link className={`flex-1 ${className}`} href={href}>{children}</Link>
    )
}
