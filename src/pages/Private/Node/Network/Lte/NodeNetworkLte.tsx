import { FC, memo, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { usePrivatePath } from "src/app/hooks/usePrivatePath"

import { WorkBox } from "src/components/WorkBox"
import { fetchNodeNetworkLte } from "src/store/nodeNetworkLte"
import { fetchNetworksCatalog } from "src/store/catalogs"

import { NodeNetworkLteForm } from "src/pages/Private/Node/Network/Lte/NodeNetworkLteForm"


export const NodeNetworkLte: FC = memo(() => {
    const dispatch = useAppDispatch()

    const { path } = usePrivatePath()
    
    useEffect(() => {
      if (path?.objectId) {
        dispatch(fetchNetworksCatalog(path.objectId))
        dispatch(fetchNodeNetworkLte(path.objectId))
      }
    }, [dispatch, path?.objectId])

    const status = useAppSelector(state => state.nodeNetworkLte.status)
    const error = useAppSelector(state => state.nodeNetworkLte.error)
    const payload = useAppSelector(state => state.nodeNetworkLte?.payload)
    const networks = useAppSelector(state => state.networksCatalog?.payload)


    if (!path) {
      return (
        <WorkBox
          status={"NOT_LOADED"}
        />
      )
    }

    return (
      <WorkBox
        status={status}
        error={error}
      >
         {payload && networks &&(
            <NodeNetworkLteForm 
              nodeLte={payload}
              pathId={path.objectId}
              networks={networks}
            />
         )}
      </WorkBox>
    )
  })