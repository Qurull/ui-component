"use client"
import type { ReactNode, Dispatch, SetStateAction } from "react"
import { createContext, useContext, useState } from "react"
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import Link from "next/link";

interface BaseProps {
    className?: string;
    children?: ReactNode;
}

interface DropdownContainerProps extends BaseProps {
    hidden?: boolean;
    expand?: boolean;
}

interface DropdownButtonProps extends BaseProps {}

interface DropdownListProps extends BaseProps {}

interface DropdownItemProps extends BaseProps {
    rowable?: boolean;
}

interface DropdownLinkProps extends BaseProps {
    href: string;
}

interface DropdownContextProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextProps | null>(null)

export function DropdownContainer({ className, hidden, expand = false, children }: Readonly<DropdownContainerProps>) {
    const [isOpen, setIsOpen] = useState(expand)

    return (
        !hidden && <section className={`flex flex-col bg-white min-w-[200px] rounded-md shadow-lg overflow-hidden ${className}`}>
            <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
                {children}
            </DropdownContext.Provider>
        </section>
    )
}

export function DropdownButton({ className, children }: Readonly<DropdownButtonProps>) {
    const dropdownContext = useContext(DropdownContext)
    if (!dropdownContext) throw new Error("DropdownButton must be used within DropdownContainer")

    const { isOpen, setIsOpen } = dropdownContext

    return (
        <button className={`flex justify-between items-center px-4 py-2 ${isOpen ? "rounded-t-md" : "rounded-md"} outline-none border border-transparent hover:border-blue-500 transition-colors ${className}`} type="button" onClick={() => setIsOpen(value => !value)}>
            <span className="flex items-center gap-2">{children}</span>{isOpen ? <FaSortUp className="text-blue-500 mt-auto" /> : <FaSortDown className="text-blue-500 mb-auto" />}
        </button>
    )
}

export function DropdownList({ className, children }: Readonly<DropdownListProps>) {
    const dropdownContext = useContext(DropdownContext)
    if (!dropdownContext) throw new Error("DropdownList must be used within DropdownContainer")
    
    return (
        <ol className={`${dropdownContext.isOpen ? "flex" : "hidden"} flex-col ${className}`}>
            {children}
        </ol>
    )
}

export function DropdownItem({ className, rowable, children }: Readonly<DropdownItemProps>) {
    return (
        <li className={`flex ${rowable ? "flex-row" : "flex-col"} px-4 py-2 ${className}`}>
            {children}
        </li>
    )
}

export function DropdownLink({ className, href, children }: Readonly<DropdownLinkProps>) {
    return (
        <Link className={`flex-1 ${className}`} href={href}>{children}</Link>
    )
}
