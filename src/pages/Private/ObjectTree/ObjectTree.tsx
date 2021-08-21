import { FC, memo } from "react"
import { Theme, Box } from "@material-ui/core"
import type { SxProps } from "@material-ui/system"

import { useAppSelector } from "src/app/hooks"
import { Item } from "./Item"
import Button from "@material-ui/core/Button"
import { generatePath, Link as RouterLink } from "react-router-dom"
import { paths } from "src/app/constants"

import AddIcon from "@material-ui/icons/Add"

interface IProps {
  // TODO тут тоже для масштабирования проекта пока пустой интерфейс
}

export const ObjectTree: FC<IProps> = memo(() => {
  const treeRoot = useAppSelector(state => state.leftMenu.treeRoot)
  const pathToAdd = generatePath(paths.add)
  return (
    <Box
      component="ul"
      role="tree"
      sx={styles.container}
    >

      <Button
        variant="contained"
        sx={{
          boxShadow: "none",
          borderRadius: "10px", 
          marginBottom: "20px", 
          width: "100%", 
          textTransform: "none", 
          color: "white", 
          backgroundColor: "#3C3844", 
          fontFamily: "'Roboto', sans-serif",
        }}
        component={RouterLink}
        to={pathToAdd}
      >

        <AddIcon sx={{
          color: "white",
          marginRight: "5px"
        }}
        />
        {"Новая организация"}
      </Button>


      {treeRoot.map(itemId => (
        <Item
          key={itemId}
          id={itemId}
        />
      ))}
    </Box>
  )
})

const styles = {
  container: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  } as SxProps<Theme>,
}
