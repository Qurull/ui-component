"use client"
import type { ReactNode, RefObject, Dispatch, SetStateAction } from "react"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

export enum SliderDirection {
    PREVIOUS = "Previous",
    NEXT = "Next"
}

interface BaseProps {
    className?: string;
    children?: ReactNode;
}

interface HeroSliderProps extends BaseProps {
    starterIndex?: number;
}

interface HeroSliderButtonProps extends BaseProps {
    direction: SliderDirection;
}

interface HeroContextProps {
    sliderIndex: number;
    setSliderIndex: Dispatch<SetStateAction<number>>;
    contentRef: RefObject<HTMLOListElement | null>;
}

const HeroSliderContext = createContext<HeroContextProps | null>(null)

export function HeroSlider({ className, starterIndex = 0, children }: Readonly<HeroSliderProps>) {
    const [sliderIndex, setSliderIndex] = useState(starterIndex)
    const contentRef = useRef<HTMLOListElement>(null)

    useEffect(() => {
        if (!contentRef.current) return
        const sliderItems: HTMLCollection = contentRef.current.children
        const sliderItem = sliderItems.item(sliderIndex) as HTMLLIElement | undefined
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

export function HeroSliderContent({ children }: Readonly<BaseProps>) {
    const heroSliderContext = useContext(HeroSliderContext)
    if (!heroSliderContext) throw new Error("HeroSliderContent must be used within HeroSlider")

    return (
        <ol ref={heroSliderContext.contentRef} className="grid grid-flow-col auto-cols-[100%] auto-rows-[12rem] overflow-x-hidden">
            {children}
        </ol>
    )
}

export function HeroSliderItem({ className, children }: Readonly<BaseProps>) {
    return (
        <li className={className}>
            {children}
        </li>
    )
}

export function HeroSliderButton({ direction, children }: Readonly<HeroSliderButtonProps>) {
    const heroSliderContext = useContext(HeroSliderContext)
    if (!heroSliderContext) throw new Error("HeroSliderButton must be used within HeroSlider")

    const { setSliderIndex, contentRef } = heroSliderContext

    const handleClick = useCallback(() => {
        if (!contentRef.current) return
        const childrenCount: number = contentRef.current.children.length
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
    const heroSliderContext = useContext(HeroSliderContext)
    if (!heroSliderContext) throw new Error("HeroSliderControls must be used within HeroSlider")

    const { sliderIndex, setSliderIndex, contentRef } = heroSliderContext

    const handleClick = useCallback((index: number) => setSliderIndex(index), [setSliderIndex])

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
