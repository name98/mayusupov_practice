import { FC, useCallback } from "react"
import { Box } from "@material-ui/core"
import { TextInput, TextariaInput } from "src/components/TextInput"
import { FormButton } from "src/components/FormButton"
import { useAppDispatch } from "src/app/hooks"
import type { INewGroup } from "src/store/types"
import { useForm, useController } from "react-hook-form"
import { addGroup } from "src/store/groupAdd"

import * as fields from "./formFields"
import * as styles from "./styles"

const group: INewGroup = {
  name: "",
  tagList: [],
  description: "",
  parentId: "",
}

export const AddGroupForm: FC<{pathId: string}> = ({ pathId }) => {
  
  const dispatch = useAppDispatch()

  const { control, handleSubmit, formState } = useForm<INewGroup>({
    defaultValues: group
  })

  const { field: nameProps } = useController({ control, ...fields.nameProps })
  const { field: tagListProps } = useController({ control, ...fields.tagListProps })
  const { field: descriptionProps } = useController({ control, ...fields.descriptionProps })

  const handleRequest = useCallback((group: INewGroup) => {
    if (pathId) {
      group.parentId = pathId
      dispatch(addGroup(group))
    }
  }, [dispatch, pathId])

  return (
    <Box
      component="form"
      sx={styles.form}
      onSubmit={handleSubmit(handleRequest)}
    >
      <Box 
        sx={styles.fields}
      >
        <TextInput
          type="text"
          label={"Наименование"}
          InputProps={nameProps}
          error={formState.errors.name !== undefined}
        />

        <TextInput
          type="text"
          label={"Метки"}
          InputProps={tagListProps}
          error={formState.errors.tagList !== undefined}
        />
      </Box>

        <TextariaInput
        type="text"
        label={"Описание"}          
        InputProps={descriptionProps}
        error={formState.errors.description !== undefined}
        />
        
      <FormButton
        type="submit"
        sx={styles.button}
      >
        {"Создать группу"}
      </FormButton>
    </Box>   
  )
}
