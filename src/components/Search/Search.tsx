import { FC, memo, useMemo } from "react"
import { useAppSelector } from 'src/app/hooks'
import { Box, TextField, Autocomplete } from '@material-ui/core'

interface IProps {
  name: string,
  id: string,
  type: string
}

const itemTypes: { [key: string]: string } = {
  group: "Группы",
  organization: "Организации",
  node: "Узлы"
}

export const Search: FC = memo(() => {
  const items = useAppSelector(state => state.leftMenu.items)

  const data = useMemo(() => {
    const founds: IProps[] = []
    for (const [, item] of Object.entries(items)) {
      if (typeof item === 'object' && item.hasOwnProperty('name')) {
        founds.push({ name: item.name, type: itemTypes[item.type], id: item.id })
      }
    }
    return founds
  }, [items])

  return (
    <Box
      sx={{ width: "100%" }}>

      <Autocomplete
        // freeSolo
        disableClearable
        sx={{ width: "100%", borderRadius: "99px" }}
        options={data.sort()}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (

          <TextField
            {...params}
            label="Найти"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </Box >
  )
})

