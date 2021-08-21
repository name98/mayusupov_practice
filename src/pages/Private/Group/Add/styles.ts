import { Theme } from "@material-ui/core"
import type { SxProps } from "@material-ui/system"

export const form: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    margin: "0 70px",
} 
  
export const fields: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "10px",
}
  
export const button: SxProps<Theme> = {
    m: 2,
    alignSelf: "center",
} 