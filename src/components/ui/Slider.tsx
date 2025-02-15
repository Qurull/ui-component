"use client"
import type { ReactNode, Dispatch, SetStateAction, RefObject } from "react"
import { createContext, useState, useRef, useContext, useCallback, useEffect } from "react"

interface BaseProps {
    className?: string;
    children?: ReactNode;
}

interface SliderContainerProps extends BaseProps {
    defaultValue: number;
    min: number;
    max: number;
    width: number;
    onChange?: Dispatch<number>;
}

interface SliderContextProps {
    width: number;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    contentRef: RefObject<HTMLDivElement | null>;
    thumbRef: RefObject<HTMLButtonElement | null>;
}

const SliderContext = createContext<SliderContextProps | null>(null)

export function SliderContainer({ className, defaultValue, max, width, onChange, children }: Readonly<SliderContainerProps>) {
    const [value, setValue] = useState(() => defaultValue/max * width)
    const contentRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        onChange && onChange(value)
    }, [value, onChange])

    return (
        <section className={`flex items-center gap-x-4 bg-white px-4 py-2 rounded-md shadow-lg ${className}`}>
            <SliderContext.Provider value={{ width, value, setValue, contentRef, thumbRef }}>
                {children}
            </SliderContext.Provider>
        </section>
    )
}

export function SliderLabel({ className, children }: Readonly<BaseProps>) {
    return (
        <p className={className}>{children}</p>
    )
}

export function SliderBar({ className, children }: Readonly<BaseProps>) {
    const sliderContext = useContext(SliderContext)
    if (!sliderContext) throw new Error("SliderContent must be used within SliderContainer")

    return (
        <div ref={sliderContext.contentRef} style={{ width: sliderContext.width }} className={`relative flex bg-slate-100 h-2 rounded-full ${className}`}>
            {children}
        </div>
    )
}

export function SliderThumb({ className }: Readonly<BaseProps>) {
    const sliderContext = useContext(SliderContext)
    if (!sliderContext) throw new Error("SliderThumb must be used within SliderContainer")

    const { width, value, setValue, contentRef, thumbRef } = sliderContext

    const handleMouseMove = useCallback(({ clientX }: MouseEvent) => {
        if (!contentRef.current) return
        const contentBoundingBox: DOMRect = contentRef.current.getBoundingClientRect()
        setValue(Math.max(Math.min(clientX - contentBoundingBox.left, width), 0))
    }, [width, setValue])
    
    const handleMouseDown = useCallback(() => {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }, [handleMouseMove])

    const handleMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }, [handleMouseMove])

    return (
        <button 
            ref={thumbRef} 
            type="button"
            onMouseDown={handleMouseDown}
            style={{ left: value }}
            className={`absolute -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white border border-blue-500 size-4 rounded-full shadow-lg ${className}`}
        />
    )
}

export function SliderTrack({ className }: Readonly<BaseProps>) {
    const sliderContext = useContext(SliderContext)
    if (!sliderContext) throw new Error("SliderTrack must be used within SliderContainer")

    return (
        <div style={{ width: sliderContext.value }} className={`bg-blue-500 rounded-full ${className}`}/>
    )
}

export function SliderValueLabel({ className }: Readonly<BaseProps>) {
    const sliderContext = useContext(SliderContext)
    if (!sliderContext) throw new Error("SliderValueLabel must be used within SliderContainer");

    return (
        <p className={`${className}`}>{Math.round(sliderContext.value/sliderContext.width * 100)}%</p>
    )
}
