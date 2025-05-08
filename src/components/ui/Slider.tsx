"use client"
import type { Dispatch, SetStateAction, RefObject } from "react"
import { createContext, useState, useRef, useContext, useCallback, useEffect } from "react"
import { ComponentProps } from "@/lib/interfaces/componentProps"

interface SliderContainerProps extends ComponentProps.WithAll {
    defaultValue: number;
    min: number;
    max: number;
    width: number;
    onChange?: Dispatch<number>;
}

interface SliderContext {
    width: number;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    contentRef: RefObject<HTMLDivElement | null>;
    thumbRef: RefObject<HTMLButtonElement | null>;
}

const SliderContext = createContext<SliderContext | null>(null)

function useSliderContext() {
    const sliderContext = useContext(SliderContext)
    if (!sliderContext) throw new Error("Component must be used within SliderContainer")
    return sliderContext
}

export function SliderContainer({ className, defaultValue, max, width, onChange = () => {}, children }: Readonly<SliderContainerProps>) {
    const [value, setValue] = useState(() => defaultValue/max * width)
    const contentRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        onChange(value)
    }, [value, onChange])

    return (
        <section className={`flex items-center gap-x-4 bg-white px-4 py-2 rounded-md shadow-lg ${className}`}>
            <SliderContext.Provider value={{ width, value, setValue, contentRef, thumbRef }}>
                {children}
            </SliderContext.Provider>
        </section>
    )
}

export function SliderLabel({ className, children }: Readonly<ComponentProps.WithAll>) {
    return (
        <p className={className}>{children}</p>
    )
}

export function SliderBar({ className, children }: Readonly<ComponentProps.WithAll>) {
    const { contentRef, width } = useSliderContext()

    return (
        <div ref={contentRef} style={{ width }} className={`relative flex bg-slate-100 h-2 rounded-full ${className}`}>
            {children}
        </div>
    )
}

export function SliderThumb({ className }: Readonly<ComponentProps.WithClassName>) {
    const { width, value, setValue, contentRef, thumbRef } = useSliderContext()

    const handleMouseMove = useCallback(({ clientX }: MouseEvent) => {
        const content = contentRef.current
        if (!content) return

        const contentTransform: DOMRect = content.getBoundingClientRect()

        setValue(Math.max(Math.min(clientX - contentTransform.left, width), 0))
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
            className={`absolute -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white border border-blue-500 size-4 rounded-full shadow-lg ${className}`}
            style={{ left: value }}
        />
    )
}

export function SliderTrack({ className }: Readonly<ComponentProps.WithClassName>) {
    const { value } = useSliderContext()

    return (
        <div style={{ width: value }} className={`bg-blue-500 rounded-full ${className}`}/>
    )
}

export function SliderValueLabel({ className }: Readonly<ComponentProps.WithClassName>) {
    const { value, width } = useSliderContext()

    return (
        <p className={`${className}`}>{Math.round(value/width * 100)}%</p>
    )
}
