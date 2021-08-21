import { FC, useCallback, useEffect } from "react"
import { useForm, useController } from "react-hook-form"

import { Box, Theme } from "@material-ui/core"
import type { SxProps } from "@material-ui/system"

import { TextInput, TextariaInput } from "src/components/TextInput"
import { FormButton } from "src/components/FormButton"
import type { INewOrganization } from "src/store/types"

import { useAppDispatch } from "src/app/hooks"

import { addOrganization } from "src/store/organizationsAdd"

const organization: INewOrganization = {
  name: "",
  alias: "",
  tagList: [],
  address: "",
  phoneNumber: "",
  email: "",
  description: ""
}

export const AddOrganizationForm: FC = () => {

  const dispatch = useAppDispatch()

  const { control, handleSubmit, formState } = useForm<INewOrganization>()

  const { field: nameProps } = useController({
    name: "name",
    control,
    defaultValue: organization?.name,
    rules: {
      required: true,
    }
  })

  const { field: aliasProps } = useController({
    name: "alias",
    control,
    defaultValue: organization?.alias,
    rules: {
      required: true
    }
  })

  const { field: tagListProps } = useController({
    name: "tagList",
    control,
    defaultValue: organization?.tagList
  })

  const { field: addressProps } = useController({
    name: "address",
    control,
    defaultValue: organization?.address
  })

  const { field: phoneNumberProps } = useController({
    name: "phoneNumber",
    control,
    defaultValue: organization?.phoneNumber
  })

  const { field: emailProps } = useController({
    name: "email",
    control,
    defaultValue: organization?.email
  })

  const { field: descriptionProps } = useController({
    name: "description",
    control,
    defaultValue: organization?.description ?? ""
  })

  const handleRequest = useCallback((organization: INewOrganization) => {
    return dispatch(addOrganization(organization))
  }, [dispatch])

  useEffect(() => {
    console.log(handleRequest)
  }, [handleRequest])

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
          label={"Псевдоним"}
          InputProps={aliasProps}
          error={formState.errors.alias !== undefined}
        />

        <TextInput
          type="text"
          label={"Метки"}
          InputProps={tagListProps}
          error={formState.errors.tagList !== undefined}
        />

        <TextInput
          type="text"
          label={"Адрес"}
          InputProps={addressProps}
          error={formState.errors.address !== undefined}
        />

        <TextInput
          type="text"
          label={"Телефонный номер"}
          InputProps={phoneNumberProps}
          error={formState.errors.phoneNumber !== undefined}
        />

        <TextInput
          type="text"
          label={"email"}
          InputProps={emailProps}
          error={formState.errors.email !== undefined}
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
        {"Добавить организацию"}
      </FormButton>
    </Box>
  )
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "0 70px",
  } as SxProps<Theme>,

  fields: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "10px",
  } as SxProps<Theme>,

  button: {
    m: 2,
    alignSelf: "center",
  } as SxProps<Theme>,
}
