"use client"
import { useState } from "react"
import { FaHome, FaVolumeMute } from "react-icons/fa"
import { FaCaretLeft, FaCaretRight, FaGear, FaServer, FaVolumeHigh, FaVolumeLow } from "react-icons/fa6"

import { HeroSlider, HeroSliderButton, HeroSliderContent, HeroSliderControls, HeroSliderItem, SliderDirection } from "@/components/ui/HeroSlider"
import { DropdownButton, DropdownContainer, DropdownItem, DropdownLink, DropdownList } from "@/components/ui/Dropdown"
import { SliderContainer, SliderBar, SliderLabel, SliderThumb, SliderTrack, SliderValueLabel } from "@/components/ui/Slider"
import { ColorWheel, ColorWheelLabel, ColorWheelPicker } from "@/components/colorWheel/ColorWheel"
import { ToggleButton, ToggleContainer, ToggleContent, ToggleLabel } from "@/components/ui/Toggle"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"


export default function Home() {
    const [menuVisible, setMenuVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <main className="flex flex-col items-center gap-4 bg-slate-100 w-screen min-h-screen">
            <HeroSlider className="w-screen">
                <HeroSliderContent>
                    <HeroSliderItem className="grid place-content-center bg-yellow-500 text-white">
                        <p>Item #1</p>
                    </HeroSliderItem>
                    <HeroSliderItem className="grid place-content-center bg-orange-500 text-white">
                        <p>Item #2</p>
                    </HeroSliderItem>
                    <HeroSliderItem className="grid place-content-center bg-red-500 text-white">
                        <p>Item #3</p>
                    </HeroSliderItem>
                    <HeroSliderItem className="grid place-content-center bg-purple-500 text-white">
                        <p>Item #4</p>
                    </HeroSliderItem>
                </HeroSliderContent>
                <HeroSliderButton direction={SliderDirection.PREVIOUS}>
                    <FaCaretLeft />
                </HeroSliderButton>
                <HeroSliderButton direction={SliderDirection.NEXT}>
                    <FaCaretRight />
                </HeroSliderButton>
                <HeroSliderControls />
            </HeroSlider>
            <ColorWheel>
                <ColorWheelLabel />
                <ColorWheelPicker />
            </ColorWheel>
            <DropdownContainer hidden={menuVisible}>
                <DropdownButton>Menu</DropdownButton>
                <DropdownList>
                    <DropdownContainer>
                        <DropdownButton>
                            <FaHome className="text-blue-500"/>Home
                        </DropdownButton>
                        <DropdownList>
                            <DropdownItem className="items-center gap-2" rowable>
                                <DropdownLink href="/products">Products</DropdownLink>
                            </DropdownItem>
                            <DropdownItem className="items-center gap-2" rowable>
                                <DropdownLink href="/contact">Contact</DropdownLink>
                            </DropdownItem>
                        </DropdownList>
                    </DropdownContainer>
                    <DropdownContainer>
                        <DropdownButton>
                            <FaServer className="text-blue-500"/>Server
                        </DropdownButton>
                        <DropdownList>
                            <DropdownItem className="items-center gap-2" rowable>
                                <DropdownLink href="/database">Database</DropdownLink>
                            </DropdownItem>
                            <DropdownItem className="items-center gap-2" rowable>
                                <DropdownLink href="/api">API</DropdownLink>
                            </DropdownItem>
                        </DropdownList>
                    </DropdownContainer>
                    <DropdownContainer>
                        <DropdownButton>
                            <FaGear className="text-blue-500"/>Settings
                        </DropdownButton>
                        <DropdownList>
                            <DropdownItem className="items-center gap-2" rowable>
                            <DropdownLink href="/settings/appearance">Appearance</DropdownLink>
                            </DropdownItem>
                            <DropdownItem className="items-center gap-2" rowable>
                                <DropdownLink href="/settings/privacy">Privacy</DropdownLink>
                            </DropdownItem>
                        </DropdownList>
                    </DropdownContainer>
                </DropdownList>
            </DropdownContainer>
            <SliderContainer width={100} defaultValue={0} min={50} max={200}>
                <SliderLabel>
                    <FaVolumeLow className="text-blue-500" />
                </SliderLabel>
                <SliderBar>
                    <SliderThumb />
                    <SliderTrack />
                </SliderBar>
                <SliderLabel>
                    <FaVolumeHigh className="text-blue-500" />
                </SliderLabel>
            </SliderContainer>
            <ToggleContainer>
                <ToggleLabel>
                    Mute<FaVolumeMute className="text-blue-500" />
                </ToggleLabel>
                <ToggleContent>
                    <ToggleButton />
                </ToggleContent>
            </ToggleContainer>
            <ToggleContainer enable onChange={setMenuVisible}>
                <ToggleLabel>Hide Menu</ToggleLabel>
                <ToggleContent>
                    <ToggleButton />
                </ToggleContent>
            </ToggleContainer>
            <Checkbox enable />
            <Modal isOpen={modalVisible} onClose={setModalVisible}>
                <section className="flex flex-col gap-2 bg-white p-4 rounded-md shadow-lg">
                    <p>Hello, I'm a Modal!</p>
                    <Button onClick={() => setModalVisible(false)}>Close Modal</Button>
                </section>
            </Modal>
            <Button className="shadow-lg" onClick={() => setModalVisible(true)}>Open Modal</Button>
        </main>
    )
}