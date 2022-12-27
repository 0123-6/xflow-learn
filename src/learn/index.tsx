import React from 'react'
import {IAppLoad, NodeCollapsePanel, NsNodeCmd, XFlowGraphCommands} from '@antv/xflow'
import {
  XFlow,
  createGraphConfig,
  XFlowCanvas,
  XFlowNodeCommands,
  uuidv4, CanvasToolbar, XFlowConstants
} from '@antv/xflow'
import {DelNodeComponent} from "./delNode";
import {UpdateNodeComponent} from "./updateNode";
import {AddEdgeComponent} from "./AddEdge";
import './index.css'
// import {GlobalInfo} from "./globalInfo";
import {useToolbarConfig} from "./toolbar-config";
// import * as dndPanelConfig from "./config-dnd-panel";
// import {useGraphHookConfig} from "./config-graph";
// import {useCmdConfig} from "../dag/config-cmd";
// import {useModelServiceConfig} from "../dag/config-model-service";
// 左侧创建组件

const nodeDataService = async (meta,modelService) => {
  console.log('meta: ',meta)
  console.log('modelService: ',modelService)
  return [
    {
      id:'数据读写',
      header:'数据读写',
      children: [
        {
          id:'2',
          label:'算法组件1',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
          popoverContent: <div>算法组件1的描述</div>
        },
        {
          id:'3',
          label:'算法组件2',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
          popoverContent: <div>算法组件2的描述</div>
        },
        {
          id:'4',
          label:'算法组件3',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
          popoverContent: <div>算法组件3的描述</div>
        },
      ],
    },
    {
      id:'数据加工',
      header: '数据加工',
      children: [
        {
          id:'6',
          label:'算法组件4',
          parentId: '5',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
        },
        {
          id:'7',
          label: '算法组件5',
          parentId: '5',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
        },
        {
          id:'8',
          label: '算法组件6',
          parentId: '5',
          renderKey: XFlowConstants.XFLOW_DEFAULT_NODE
        }
      ]
    }
  ]
}

const onNodeDrop = (nodeConfig,commandService) => {
  console.log('into onNodeDrop')
  commandService.executeCommand(XFlowNodeCommands.ADD_NODE.id,{
    nodeConfig: {
      ...nodeConfig,
      id:'hh'+uuidv4(),
      width:160,
      heigth:32
    }
  })
  return undefined
}

const NODE_COMMON_PROPS = {
  width: 160,
  height: 32,
}

const EDGE_COMMON_PROPS = {
  attrs: {
    line: {
      targetMarker: {
        name: 'block',
        width:4,
        height:8
      },
      strokeDasharray: '',
      stroke: '#A2B1C3',
      strokeWidth: 1,
    }
  }
}

const getGraphData = () => {
  const nodes = [
    {
      id:'node1',
      label:'算法节点-1',
      ...NODE_COMMON_PROPS,
    },
    {
      id:'node2',
      label:'算法节点-2',
      ...NODE_COMMON_PROPS,
    },
    {
      id:'node3',
      label:'算法节点-3',
      ...NODE_COMMON_PROPS,
    },
    {
      id:'node4',
      label:'算法节点-4',
      ...NODE_COMMON_PROPS,
    }
  ]
  const edges = [
    {
      id:uuidv4(),
      source:'node1',
      target:'node2',
      ...EDGE_COMMON_PROPS
    },
    {
      id:uuidv4(),
      source:'node1',
      target:'node3',
      ...EDGE_COMMON_PROPS
    },
    {
      id:uuidv4(),
      source:'node1',
      target:'node4',
      ...EDGE_COMMON_PROPS
    },
  ]
  return {
    nodes,
    edges
  }
}


/**  graphConfig hook  */
export const useGraphConfig = createGraphConfig(graphConfig => {
  graphConfig.setX6Config({ grid: true })
  graphConfig.setDefaultNodeRender(props => {
    return <div className="react-node"> {props.data.label} </div>
  })
})

// props
const Demo: React.FC<{}> = (props) => {
  // const graphHooksConfig = useGraphHookConfig(props)
  // const graphConfig = useGraphConfig()
  // const cmdConfig = useCmdConfig()
  // const modelServiceConfig = useModelServiceConfig()
  const toolbarConfig = useToolbarConfig()
  const onLoad: IAppLoad = async app => {
    const res = await app.executeCommand(XFlowGraphCommands.GRAPH_LAYOUT.id,{
      layoutType: 'dagre',
      layoutOptions: {
        type: 'dagre',
        rankdir:'TB',
        nodesep:60,
        ranksep:30,
      },
      graphData:getGraphData(),
    })
    const {graphData} = res.contextProvider().getResult()
    await app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id,{
      graphData:graphData
    })
    await app.executeCommand(XFlowGraphCommands.GRAPH_ZOOM.id,{
      factor: 'real'
    })
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

    return app
  }

  return (
    <XFlow onLoad={onLoad}
           className="xflow-workspace"
    >
      <NodeCollapsePanel
        header={<h4>组件面板</h4>}
        footer={<div>底部</div>}
        position={{width:230,top:0,bottom:0,left:0}}
        onNodeDrop={onNodeDrop}
        nodeDataService={nodeDataService}>
      </NodeCollapsePanel>
      <CanvasToolbar
        className="xflow-workspace-toolbar-top"
        layout="horizontal"
        config={toolbarConfig}
        position={{ top: 0, left: 230, right: 460,height:40 }}
      />
      <XFlowCanvas
        className="app-main-content"
        config={useGraphConfig(props)}
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
