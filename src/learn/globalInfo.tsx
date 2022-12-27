import React from 'react'
import {MODELS, useXFlowApp, WorkspacePanel} from '@antv/xflow'

export const GlobalInfo = () => {
  const app = useXFlowApp()
  console.log('app: ',app);
  const [meta, setMeta] = React.useState({})

  React.useEffect(() => {
    if(app) {
      MODELS.GRAPH_META.useValue(app.modelService).then(meta => {
        setMeta(meta)
      })
    }
  }, [])

  return (
    <WorkspacePanel position={{ top: 500, right: 0, bottom: 0, width: 230,height:500 }} className="panel">
      <div> {JSON.stringify(meta, null, 2)}</div>
    </WorkspacePanel>
  )
}
