import { FC, memo } from "react"
import { useAppDispatch, useAppSelector, usePrivatePath } from "src/app/hooks"
import { actions as leftMenuActions, fetchLeftMenu } from 'src/store/leftMenu'
import { actions as groupsAddActions } from 'src/store/groupAdd'
import { useNavigate } from 'react-router-dom'
import { IErrorCode } from "src/store/types"
import { AddGroupForm } from "./AddGroupForm"
import { WorkBox } from "src/components/WorkBox"


export const AddGroup: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { path } = usePrivatePath()
  const status = useAppSelector(state => state.groupAdd.status)
  const error = useAppSelector(state => state.groupAdd?.error)
  const newGroupId = useAppSelector(state => state.groupAdd?.groupId)
  const navigate = useNavigate()
  
  if ( newGroupId ) {

    dispatch(fetchLeftMenu())
    leftMenuActions.expandBranch(newGroupId.payload.payload)
    navigate(`/group/${newGroupId.payload.payload}/main`)
    dispatch(groupsAddActions.reset())
  }

  if (!path) {
    return (
      <WorkBox
        status={"NOT_LOADED"}
        error={{
          code: IErrorCode.UNKNOWN,
          message: "Неизвестная ошибка. Пожалуйста, перезагрузите страницу.",
        }}
      />
    )
  }

  return (
    <WorkBox
      status={status}
      error={error}
    >
      <AddGroupForm
        pathId={path.objectId} 
      />
    </WorkBox>
  )
})