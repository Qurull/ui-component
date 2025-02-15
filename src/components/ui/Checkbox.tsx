"use client"
import type { ReactNode, Dispatch } from "react"
import { useCallback, useState } from "react"
import { FaCheck } from "react-icons/fa6"

interface BaseProps {
    className?: string;
    children?: ReactNode;
}

interface CheckboxProps extends BaseProps {
    enable?: boolean;
    onChange?: Dispatch<boolean>;
}

export function Checkbox({ enable = false, onChange }: Readonly<CheckboxProps>) {
    const [active, setActive] = useState(enable)
    
    const handleClick = useCallback(() => {
        setActive(prevState => !prevState)
        onChange && onChange(active)
    }, [setActive])

    return (
        <button type="button" onClick={handleClick} className={`grid place-content-center ${active ? "bg-blue-500": "bg-white"} size-5 p-3 rounded-md shadow-lg transition-colors`}>
            {active && <FaCheck className="text-white" />}
        </button>
    )
}