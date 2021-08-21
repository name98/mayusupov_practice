import { UseControllerProps } from "react-hook-form"
import type { INewGroup } from "src/store/types"

export const nameProps: UseControllerProps<INewGroup, "name"> = {
    name: "name",
    rules: {
    }
}

export const tagListProps: UseControllerProps<INewGroup, "tagList"> = {
    name: "tagList",
    rules: {
    }
}

export const descriptionProps: UseControllerProps<INewGroup, "description"> = {
    name: "description",
    rules: {
    }
}