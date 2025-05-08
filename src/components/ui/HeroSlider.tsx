"use client"
import type { RefObject, Dispatch, SetStateAction, MouseEventHandler } from "react"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { ComponentProps } from "@/lib/interfaces/componentProps"

export enum SliderDirection {
    PREVIOUS = "Previous",
    NEXT = "Next"
}

interface HeroSliderProps extends ComponentProps.WithAll {
    starterIndex?: number;
}

interface HeroSliderButtonProps extends ComponentProps.WithAll {
    direction: SliderDirection;
}

interface HeroSliderContext {
    sliderIndex: number;
    setSliderIndex: Dispatch<SetStateAction<number>>;
    contentRef: RefObject<HTMLOListElement | null>;
}

const HeroSliderContext = createContext<HeroSliderContext | null>(null)

function useHeroSliderContext() {
    const heroSliderContext = useContext(HeroSliderContext)
    if (!heroSliderContext) throw new Error("Component must be used within HeroSlider")
    return heroSliderContext
}

export function HeroSlider({ className, children, starterIndex = 0 }: Readonly<HeroSliderProps>) {
    const [sliderIndex, setSliderIndex] = useState<number>(starterIndex)
    const contentRef = useRef<HTMLOListElement>(null)

    useEffect(() => {
        const content = contentRef.current
        if (!content) return

        const sliderItems = content.children
        const sliderItem = sliderItems.item(sliderIndex)

        sliderItem?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }, [sliderIndex])

    return (
        <section className={`relative ${className}`}>
            <HeroSliderContext.Provider value={{ sliderIndex, setSliderIndex, contentRef }}>
                {children}
            </HeroSliderContext.Provider>
        </section>
    )
}

export function HeroSliderContent({ children }: Readonly<ComponentProps.WithChildren>) {
    const { contentRef } = useHeroSliderContext()

    return (
        <ol ref={contentRef} className="grid grid-flow-col auto-cols-[100%] auto-rows-[12rem] overflow-x-hidden">
            {children}
        </ol>
    )
}

export function HeroSliderItem({ className, children }: Readonly<ComponentProps.WithAll>) {
    return (
        <li className={className}>
            {children}
        </li>
    )
}

export function HeroSliderButton({ direction, children }: Readonly<HeroSliderButtonProps>) {
    const { setSliderIndex, contentRef } = useHeroSliderContext()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        const content = contentRef.current
        if (!content) return

        const childrenCount = content.children.length

        setSliderIndex(prevState => (
            (direction === SliderDirection.NEXT ? (prevState + 1) : (prevState - 1 + childrenCount)) % childrenCount
        ))
    }, [setSliderIndex])

    return (
        <button 
            type="button" 
            onClick={handleClick} 
            className={`absolute grid place-content-center inset-4 bg-black bg-opacity-25 text-white size-fit my-auto ${direction === SliderDirection.NEXT ? "ml-auto" : "mr-auto"} p-4 rounded-md hover:bg-opacity-50 transition-colors`}
            children={children}
        />
    )
}

export function HeroSliderControls() {
    const { sliderIndex, setSliderIndex, contentRef } = useHeroSliderContext()

    const handleClick: Dispatch<number> = useCallback(index => setSliderIndex(index), [setSliderIndex])

    return (
        <ol className="absolute flex gap-x-2 mx-auto inset-x-0 bottom-2 w-fit">
            {Array.from({ length: contentRef.current?.children.length ?? 0 }).map((_, index) => (
                <li key={index}>
                    <button type="button" onClick={() => handleClick(index)} className={"bg-black bg-opacity-50 size-3 p-[3px] rounded-full"}>
                        <div hidden={index !== sliderIndex} className="bg-white size-full rounded-full" />
                    </button>
                </li>
            ))}
        </ol>
    )
}
