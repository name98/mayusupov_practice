import { FC, memo } from "react"
import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import { actions as leftMenuActions, fetchLeftMenu } from 'src/store/leftMenu'
import { actions as organizationsAddActions } from 'src/store/organizationsAdd'
import { WorkBox } from 'src/components/WorkBox'
import { useNavigate } from 'react-router-dom'
import { AddOrganizationForm } from "./AddOrganizationForm"

export const AddOrganization: FC = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const status = useAppSelector(state => state.organizationsAdd.status)
  const error = useAppSelector(state => state.organizationsAdd?.error)
  const test = useAppSelector(state => state.organizationsAdd?.test)

  if (test){
    dispatch(fetchLeftMenu())
    leftMenuActions.expandBranch(test.payload)
    navigate(`/organization/${test.payload}/main`)
    dispatch(organizationsAddActions.fetchStarted())
  }

  return (
    <WorkBox
      status={status}
      error={error}
    >
      <AddOrganizationForm />
    </WorkBox>
  )
})