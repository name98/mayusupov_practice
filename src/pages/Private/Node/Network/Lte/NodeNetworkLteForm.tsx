import { FC, useCallback, useEffect, useMemo } from "react"
import { useForm, useController } from "react-hook-form"
import { Theme, Box } from "@material-ui/core"
import type { SxProps } from "@material-ui/system"

import { INodeNetworkLte, ICatalog, IAlertMessage } from "src/store/types"
import { useAppDispatch } from "src/app/hooks"
import { uploadNodeNetworkLte } from "src/store/nodeNetworkLte"

import { TextInput } from "src/components/TextInput"
import { FormButton } from "src/components/FormButton"
import { TextSelect } from "src/components/TextSelect"
import { MessageBox, MESSAGE_TYPES } from "src/components/MessageBox"

const INPUT_RULES = {
  REGEX_PATTERNS: {
    IP: /^([1-9][0-9]?|1[0-9]{2}|2[01][0-9]|22[0-3])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/,
    MASK: /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/,
    DOMAIN: /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/,
  },
  MAX_LENGTHS: {
    IP: 15,
    MASK: 15,
    APN: 30
  },
  MIN_LENGTHS: {
    IP: 7,
    MASK: 7,
    APN: 4,
  },
}

const hasMessage = (message: any, messages: IAlertMessage[]) => {
  for (const alertMessage of messages)
    if (alertMessage.message === message) {
      return true
    }
  return false
}

const fetchMessages = (errors: object) => {
  let result: IAlertMessage[] = []
  if (errors && Object.keys(errors).length !== 0) {
    for (const [, error] of Object.entries(errors)) {
      if (error && typeof error === 'object') {        
        for (const [messageKey, messageValue] of Object.entries(error)) {
          if (messageValue && typeof messageValue === 'string' &&
            messageKey === 'message' && !hasMessage(messageValue, result)) {
            result.push({ type: MESSAGE_TYPES.ERROR, message: messageValue })
            continue
          }          
          if (messageValue && typeof messageValue === 'object' && typeof messageValue !== 'string') {
            const insideErrors = fetchMessages(error)
            if (insideErrors && typeof insideErrors !== 'undefined' && insideErrors.length) {
              result = result.concat(insideErrors)
              break
            }
          }
        }
      }
    }
  }
  return result
}

interface IProps {
  nodeLte: INodeNetworkLte,
  pathId: string,
  networks?: ICatalog[],
}

export const NodeNetworkLteForm: FC<IProps> = ({
  nodeLte,
  pathId,
  networks,
}) => {

  const dispatch = useAppDispatch()

  const { control, handleSubmit, formState, setValue } = useForm<INodeNetworkLte>()

  useController({
    name: "id",
    control,
    defaultValue: nodeLte.id,
    rules: {
      required: true,
    }
  })

  const { field: nameProps } = useController({
    name: "name",
    control,
    defaultValue: nodeLte.name,
    rules: {
      required: true,
    },
  })

  const { field: networkIdProps } = useController({
    name: "networkId",
    control,
    defaultValue: nodeLte.networkId,
    rules: {
      required: true,
    },
  })

  const { field: apnProps } = useController({
    name: "apn",
    control,
    defaultValue: nodeLte.apn,
    rules: {
      required: {
        value: true,
        message: "APN: Заполните поле!"
      },
      maxLength: {
        value: INPUT_RULES.MAX_LENGTHS.APN,
        message: `APN: Максимальная длина ${INPUT_RULES.MAX_LENGTHS.APN} символов`
      },
      minLength: {
        value: INPUT_RULES.MIN_LENGTHS.APN,
        message: `APN: Минимальная длина ${INPUT_RULES.MIN_LENGTHS.APN} символов`
      },
    },
  })

  const { field: passwordProps } = useController({
    name: "password",
    control,
    defaultValue: nodeLte.password,
    rules: {
        ////// TODO rename rules messages and add constants
      required: {
        value: true,
        message: "Пароль: Заполните поле!"
      },
      maxLength: {
        value: INPUT_RULES.MAX_LENGTHS.APN,
        message: `Пароль: Максимальная длина ${INPUT_RULES.MAX_LENGTHS.APN} символов`
      },
      minLength: {
        value: INPUT_RULES.MIN_LENGTHS.APN,
        message: `Пароль: Минимальная длина ${INPUT_RULES.MIN_LENGTHS.APN} символов`
      },
    },
  })

  const { field: loginProps } = useController({
    name: "login",
    control,
    defaultValue: nodeLte.login,
    rules: {
         ////// TODO rename rules messages and add constants
         required: {
          value: true,
          message: "Логин: Заполните поле!"
        },
        maxLength: {
          value: INPUT_RULES.MAX_LENGTHS.APN,
          message: `Логин: Максимальная длина ${INPUT_RULES.MAX_LENGTHS.APN} символов`
        },
        minLength: {
          value: INPUT_RULES.MIN_LENGTHS.APN,
          message: `Логин: Минимальная длина ${INPUT_RULES.MIN_LENGTHS.APN} символов`
        },
    },
  })

  const handleRequest = useCallback((nodeLte) => {
    if (pathId) {
      dispatch(uploadNodeNetworkLte(pathId, nodeLte))
    }
  }, [dispatch, pathId])

  useEffect(() => {
    if (networks && networks.length > 0 && nodeLte) {
      setValue("networkId", nodeLte.networkId ?? "")
    }
  }, [setValue, nodeLte, networks])

  const alertMessages = useMemo(() => {
    return fetchMessages(formState.errors)
  }, [formState])


  return (
    <Box
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit(handleRequest)}
    >
      {
        alertMessages && (
          <MessageBox
            alerts={alertMessages}
          />
        )
      }

      <Box
        sx={styles.fields}
      >
        <TextSelect
          type={"text"}
          label={"Имя сети"}
          items={networks}
          inputProps={networkIdProps}
          error={formState.errors.networkId !== undefined}
        />

        <TextInput
          type="text"
          label={"APN"}
          InputProps={apnProps}
          error={formState.errors.apn !== undefined}
        />

        <TextInput
          type="text"
          label={"Наименование"}
          InputProps={nameProps}
          error={formState.errors.name !== undefined}
        />

        <TextInput
          type="text"
          label={"Имя пользователя"}
          InputProps={loginProps}
          error={formState.errors.login !== undefined}
        />

        <TextInput
          type="password"
          label={"Пароль"}
          InputProps={passwordProps}
          error={formState.errors.networkId !== undefined}
        />
      </Box>

      <FormButton
        type="submit"
        variant="contained"
        sx={styles.button}
      >
        {"Сохранить"}
      </FormButton>
    </Box>
  )
}

const styles = {
  form: {
    display: "flex",
    margin: "0 70px",
    alignItems: "center",
    flexDirection: "column",
  } as SxProps<Theme>,

  fields: {
    display: "flex",
    flexDirection: "row",
    alighItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  } as SxProps<Theme>,

  button: {
    m: 2,
    width: "300px",
  } as SxProps<Theme>,
}