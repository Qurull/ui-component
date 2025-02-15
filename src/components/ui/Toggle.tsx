"use client"
import type { ReactNode, Dispatch, SetStateAction } from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface BaseProps {
    className?: string;
    children?: ReactNode;
}

interface ToggleContainerProps extends BaseProps {
    enable?: boolean;
    onChange?: Dispatch<boolean>;
}

interface ToggleContextProps {
    isEnabled: boolean;
    setIsEnabled: Dispatch<SetStateAction<boolean>>;
}

const ToggleContext = createContext<ToggleContextProps | null>(null)

export function ToggleContainer({ className, enable = false, onChange, children }: Readonly<ToggleContainerProps>) {
    const [isEnabled, setIsEnabled] = useState(enable)

    useEffect(() => {
        onChange && onChange(isEnabled)
    }, [isEnabled, onChange])

    return (
        <section className={`flex items-center gap-x-6 bg-white px-4 py-2 rounded-md shadow-lg ${className}`}>
            <ToggleContext.Provider value={{ isEnabled, setIsEnabled }}>
                {children}
            </ToggleContext.Provider>
        </section>
    )
}

export function ToggleLabel({ className, children }: Readonly<BaseProps>) {
    return (
        <p className={`flex items-center gap-x-2 ${className}`}>{children}</p>
    )
}

export function ToggleContent({ className, children }: Readonly<BaseProps>) {
    const toggleContext = useContext(ToggleContext)
    if (!toggleContext) throw new Error("ToggleContent must be used within ToggleContainer")

    return (
        <section className={`flex ${toggleContext.isEnabled ? "bg-lime-500 justify-end" : "bg-red-500 justify-start"} ml-auto p-0.5 w-9 h-5 rounded-full ${className}`}>
            {children}
        </section>
    )
}

export function ToggleButton({ className }: Readonly<BaseProps>) {
    const toggleContext = useContext(ToggleContext)
    if (!toggleContext) throw new Error("ToggleButton must be used within ToggleContainer")

    const { setIsEnabled } = toggleContext

    const handleClick = useCallback(() => {
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

