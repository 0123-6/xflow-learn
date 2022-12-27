import React from 'react'
import type { IAppLoad, NsNodeCmd } from '@antv/xflow'
import {
  XFlow,
  createGraphConfig,
  XFlowCanvas,
  XFlowNodeCommands,
  XFlowEdgeCommands,
  NsEdgeCmd,
  uuidv4, CanvasToolbar
} from '@antv/xflow'
import {DelNodeComponent} from "./delNode";
import {UpdateNodeComponent} from "./updateNode";
import {AddEdgeComponent} from "./AddEdge";
import './index.css'
// import {GlobalInfo} from "./globalInfo";
import {useToolbarConfig} from "./toolbar-config";
import {AddNodeComponent} from "./addNode";
// import * as dndPanelConfig from "./config-dnd-panel";
// import {useGraphHookConfig} from "./config-graph";
// import {useCmdConfig} from "../dag/config-cmd";
// import {useModelServiceConfig} from "../dag/config-model-service";
// 左侧创建组件

/**  graphConfig hook  */
export const useGraphConfig = createGraphConfig(graphConfig => {
  graphConfig.setX6Config({ grid: true })
  graphConfig.setDefaultNodeRender(props => {
    return <div className="react-node"> {props.data.label} </div>
  })
})
// props
const Demo: React.FC<{}> = () => {
  // const graphHooksConfig = useGraphHookConfig(props)
  // const graphConfig = useGraphConfig()
  // const cmdConfig = useCmdConfig()
  // const modelServiceConfig = useModelServiceConfig()
  const toolbarConfig = useToolbarConfig()
  const onLoad: IAppLoad = async app => {
    // 在appReadyCallback中可以通过app执行command
    // 删除节点
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node1',
        x: 100,
        y: 30,
        label: 'Hello World 1',
        width:100,
        height:40,
      },
    })
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node2',
        x: 50,
        y: 150,
        label: 'Hello World 2',
        width:100,
        height:40,
      },
    })
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node3',
        x: 200,
        y: 150,
        label: 'Hello World 3',
        width:100,
        height:40,
      },
    })
    const EDGE_COMMON_PROPS = {
      attrs: {
        line: {
          targetMarker: {
            name: 'block',
            width: 4,
            height: 8,
          },
          strokeDasharray: '',
          stroke: '#A2B1C3',
          strokeWidth: 1,
        },
      },
    } as const
    // 添加连线XFlowEdgeCommands.ADD_EDGE
    app.executeCommand<NsEdgeCmd.AddEdge.IArgs>(XFlowEdgeCommands.ADD_EDGE.id, {
      edgeConfig: {
        id: uuidv4(),
        source: 'node1',
        target: 'node2',
        ...EDGE_COMMON_PROPS
      }
    })

    return app
  }

  return (
    <XFlow onLoad={onLoad}
           className="xflow-workspace"
           // modelServiceConfig={modelServiceConfig}
           // commandConfig={cmdConfig}
           // hookConfig={graphHooksConfig}
    >
      {/*<NodeCollapsePanel*/}
      {/*  searchService={dndPanelConfig.searchService}*/}
      {/*  nodeDataService={dndPanelConfig.nodeDataService}*/}
      {/*  onNodeDrop={dndPanelConfig.onNodeDrop}*/}
      {/*  footerPosition={{ height: 0 }}*/}
      {/*  bodyPosition={{ top: 40, bottom: 0, left: 0 }}*/}
      {/*  position={{ top: 0, left: 0, bottom: 0, width: 230 }}/>*/}
      <AddNodeComponent />
      <CanvasToolbar
        className="xflow-workspace-toolbar-top"
        layout="horizontal"
        config={toolbarConfig}
        position={{ top: 0, left: 230, right: 460,height:40 }}
      />
      <XFlowCanvas
        className="app-main-content"
        // config={graphConfig}
        position={{ top: 40, left: 230, right: 460, bottom: 0 }}
      />
      <DelNodeComponent />
      <UpdateNodeComponent/>
      <AddEdgeComponent/>
      {/*<GlobalInfo/>*/}
    </XFlow>
  )
}

export default Demo

Demo.defaultProps = {
  meta: { flowId: 'test-meta-flow-id' },
}
