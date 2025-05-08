"use client"
import type { CSSProperties, Dispatch, PropsWithChildren, RefObject, SetStateAction } from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"

import { Point } from "@/lib/helpers/point"
import { deg2Rad } from "@/lib/helpers/math"

import styles from "./ColorWheel.module.css"

interface LabelCSSProperties extends CSSProperties {
    "--hue": number;
}

interface ColorWheelProps extends PropsWithChildren {
    defaultValue?: number;
}

interface ColorWheelContextProps {
    containerRef: RefObject<HTMLDivElement | null>;
    pickerRef: RefObject<HTMLButtonElement | null>;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
}

const ColorWheelContext = createContext<ColorWheelContextProps | null>(null)

function useColorWheelContext() {
    const colorWheelContext = useContext(ColorWheelContext)
    if (!colorWheelContext) throw new Error("Component must be used within ColorWheel")
    return colorWheelContext
}

export function ColorWheel({ defaultValue = 0, children }: Readonly<ColorWheelProps>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const pickerRef = useRef<HTMLButtonElement>(null)
    const [value, setValue] = useState(defaultValue)

    return (
        <section ref={containerRef} className={styles.wheel}>
            <ColorWheelContext.Provider value={{ containerRef, pickerRef, value, setValue }}>
                {children}
            </ColorWheelContext.Provider>
        </section>
    )
}

export function ColorWheelPicker() {
    const { containerRef, pickerRef, value, setValue } = useColorWheelContext()

    useEffect(() => {
        const container = containerRef.current
        const picker = pickerRef.current
        if (!container || !picker) return

        const containerRect: DOMRect = container.getBoundingClientRect()
        const pickerRect: DOMRect = picker.getBoundingClientRect()

        const pickerCenter: Point = new Point(pickerRect.width/2, pickerRect.height/2)
        const containerCenter: Point = new Point(containerRect.width/2 - pickerCenter.x/2, containerRect.height/2 - pickerCenter.x/2)

        const DISTANCE: number = containerCenter.x - pickerCenter.x

        const updatePickerPosition = (theta: number) => {
            const direction: Point = new Point(Math.sin(theta), -Math.cos(theta))
            picker.style.left = `${containerCenter.x + direction.x * DISTANCE}px`
            picker.style.top = `${containerCenter.y + direction.y * DISTANCE}px`
        }

        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            const direction: Point = new Point(clientX - (containerRect.x + containerCenter.x), clientY - (containerRect.y + containerCenter.y))
            const theta: number = Math.atan2(direction.y, direction.x) + Math.PI / 2
            setValue(Math.floor((theta + Math.PI * 2) % (Math.PI * 2) / deg2Rad))
            updatePickerPosition(theta)
        }

        const handleMouseDown = () => {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }
    
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        updatePickerPosition(value * deg2Rad)
        
        picker.addEventListener("mousedown", handleMouseDown)

        return () => picker.removeEventListener("mousedown", handleMouseDown)
    }, [value, setValue])

    return (
        <button ref={pickerRef} type="button" className={styles.picker} />
    )
}

export function ColorWheelLabel() {
    const { value } = useColorWheelContext()

    return (
        <p style={{ "--hue": value } as LabelCSSProperties} className={styles.label}>{Math.floor(value)}&deg;</p>
    )
}
