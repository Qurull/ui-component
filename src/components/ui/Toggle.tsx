"use client"
import type { Dispatch, SetStateAction, MouseEventHandler } from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { ComponentProps } from "@/lib/interfaces/componentProps"

interface ToggleContainerProps extends ComponentProps.WithAll {
    enable?: boolean;
    onChange?: Dispatch<boolean>;
}

interface ToggleContext {
    isEnabled: boolean;
    setIsEnabled: Dispatch<SetStateAction<boolean>>;
}

const ToggleContext = createContext<ToggleContext | null>(null)

function useToggleContext() {
    const toggleContext = useContext(ToggleContext)
    if (!toggleContext) throw new Error("Component must be used within ToggleContainer")
    return toggleContext
}

export function ToggleContainer({ className, enable = false, onChange = () => {}, children }: Readonly<ToggleContainerProps>) {
    const [isEnabled, setIsEnabled] = useState(enable)

    useEffect(() => {
        onChange(isEnabled)
    }, [isEnabled, onChange])

    return (
        <section className={`flex items-center gap-x-6 bg-white px-4 py-2 rounded-md shadow-lg ${className}`}>
            <ToggleContext.Provider value={{ isEnabled, setIsEnabled }}>
                {children}
            </ToggleContext.Provider>
        </section>
    )
}

export function ToggleLabel({ className, children }: Readonly<ComponentProps.WithAll>) {
    return (
        <p className={`flex items-center gap-x-2 ${className}`}>{children}</p>
    )
}

export function ToggleContent({ className, children }: Readonly<ComponentProps.WithAll>) {
    const { isEnabled } = useToggleContext()

    return (
        <section className={`flex ${isEnabled ? "bg-lime-500 justify-end" : "bg-red-500 justify-start"} ml-auto p-0.5 w-9 h-5 rounded-full ${className}`}>
            {children}
        </section>
    )
}

export function ToggleButton({ className }: Readonly<ComponentProps.WithClassName>) {
    const { setIsEnabled } = useToggleContext()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        setIsEnabled(prevState => !prevState)
    }, [setIsEnabled])
    
    return (
        <button 
            type="button" 
            onClick={handleClick} 
            className={`bg-white h-full aspect-square rounded-full ${className}`}
        />
    )
}

