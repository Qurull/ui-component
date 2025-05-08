import type { PropsWithChildren } from "react"

export namespace ComponentProps {
    export interface WithClassName {
        className?: string;
    }
    export interface WithChildren extends PropsWithChildren {
    }
    export interface WithAll extends WithClassName, WithChildren {
    }
}
