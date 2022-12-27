import React from "react"
import {
  createGraphConfig,
  NodeCollapsePanel,
  uuidv4,
  XFlow,
  XFlowCanvas,
  XFlowConstants,
  XFlowGraphCommands, XFlowNodeCommands
} from "@antv/xflow";

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
      id:uuidv4(),
      width:190,
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

const xFlowOnLoad = async app => {
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
}

const useGraphConfig = createGraphConfig(graphConfig => {
  graphConfig.setDefaultNodeRender(props => {
    return <div>{props.data.label}</div>
  })
})

export const Demo = (props) => {
  const graphConfig = useGraphConfig(props)
  return (
    <XFlow onLoad={xFlowOnLoad}>
      <NodeCollapsePanel
        header={<h4>组件面板</h4>}
        footer={<div>底部</div>}
        position={{width:230,top:0,bottom:0,left:0}}
        onNodeDrop={onNodeDrop}
        nodeDataService={nodeDataService}>
      </NodeCollapsePanel>
      <XFlowCanvas
        position={{top:0,left:230,right:0,bottom:0}}
        config={graphConfig}/>
    </XFlow>
  )
}
