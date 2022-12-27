import React from "react"
import {Card} from "antd";
import {NsNodeCollapsePanel, uuidv4, XFlowNodeCommands} from "@antv/xflow";
import {DND_RENDER_ID} from "../dag/constant";

export const onNodeDrop = async (node, commands) => {
  console.log('通过拖拽创建节点')
  console.log('node: ',node)
  console.log('command: ',commands)
  const args = {
    nodeConfig: {
      ...node,
      id: uuidv4()
    }
  }
  commands.executeCommand(XFlowNodeCommands.ADD_NODE.id,args)
}

const NodeDescription = (props) => {
  return (
    <Card size="small" title={props.name} style={{width:'200px'}} bordered={false}>
      {props.name}
    </Card>
  )
}

export const nodeDataService2 = async (meta, modelService) => {
  console.log('左侧节点初始信息: ')
  console.log('meta: ',meta)
  console.log('modelService: ',modelService)
  return [
    {
      id: '分组1',
      header: '分组1',
      children: [
        {
          id:'2',
          parentId: '1',
          label:'组件1-1',
          popoverContent: <NodeDescription name='组件1-1' />,
          renderKey: DND_RENDER_ID,
        },
        {
          id:'3',
          parentId: '1',
          label:'组件1-2',
          popoverContent: <NodeDescription name='组件1-2' />,
          renderKey: DND_RENDER_ID,
        },
        {
          id:'4',
          parentId: '1',
          label:'组件1-3',
          popoverContent: <NodeDescription name='组件1-3' />,
          renderKey: DND_RENDER_ID,
        },
      ],
    },
    {
      id: '分组2',
      header: '分组2',
      children: [
        {
          id:'6',
          parentId: '5',
          label:'组件2-1',
          popoverContent: <NodeDescription name='组件2-1' />,
          renderKey: DND_RENDER_ID,
        },
        {
          id:'7',
          parentId: '5',
          label:'组件2-2',
          popoverContent: <NodeDescription name='组件2-2' />,
          renderKey: DND_RENDER_ID,
        },
        {
          id:'8',
          parentId: '5',
          label:'组件2-3',
          popoverContent: <NodeDescription name='组件2-3' />,
          renderKey: DND_RENDER_ID,
        },
      ],
    },
    {
      id: '分组3',
      header: '分组3',
      children: [
        {
          id:'10',
          parentId: '9',
          label:'组件3-1',
          popoverContent: <NodeDescription name='组件3-1' />,
          renderKey: DND_RENDER_ID,
        },
        {
          id:'11',
          parentId: '9',
          label:'组件3-2',
          popoverContent: <NodeDescription name='组件3-2' />,
          renderKey: DND_RENDER_ID,
        },
        {
          id:'12',
          parentId: '9',
          label:'组件3-3',
          popoverContent: <NodeDescription name='组件3-3' />,
          renderKey: DND_RENDER_ID,
        },
      ],
    },
  ]
}
export const nodeDataService: NsNodeCollapsePanel.INodeDataService = async (meta, modelService) => {
  console.log(meta, modelService)
  return [
    {
      id: '数据读写',
      header: '数据读写',
      children: [
        {
          id: '2',
          label: '算法组件1',
          parentId: '1',
          // renderKey: uuidv4(),
          popoverContent: <NodeDescription name="算法组件1" />,
        },
      ],
    },
  ]
  return [
    {
      id: '数据读写',
      header: '数据读写',
      children: [
        {
          id: '2',
          label: '算法组件1',
          parentId: '1',
          renderKey: DND_RENDER_ID,
          popoverContent: <NodeDescription name="算法组件1" />,
        },
        {
          id: '3',
          label: '算法组件2',
          parentId: '1',
          renderKey: DND_RENDER_ID,
          popoverContent: <NodeDescription name="算法组件2" />,
        },
        {
          id: '4',
          label: '算法组件3',
          parentId: '1',
          renderKey: DND_RENDER_ID,
          popoverContent: <NodeDescription name="算法组件3" />,
        },
      ],
    },
    {
      id: '数据加工',
      header: '数据加工',
      children: [
        {
          id: '6',
          label: '算法组件4',
          parentId: '5',
          renderKey: DND_RENDER_ID,
        },
        {
          id: '7',
          label: '算法组件5',
          parentId: '5',
          renderKey: DND_RENDER_ID,
        },
        {
          id: '8',
          label: '算法组件6',
          parentId: '5',
          renderKey: DND_RENDER_ID,
        },
      ],
    },
    {
      id: '模型训练',
      header: '模型训练',
      children: [
        {
          id: '6',
          label: '算法组件4',
          parentId: '5',
          renderKey: DND_RENDER_ID,
        },
        {
          id: '7',
          label: '算法组件5',
          parentId: '5',
          renderKey: DND_RENDER_ID,
        },
        {
          id: '8',
          label: '算法组件6',
          parentId: '5',
          renderKey: DND_RENDER_ID,
        },
      ],
    },
  ]
}

export const searchService = async (nodes, keyword) => {
  return nodes.filter(node => node.label.includes(keyword))
}
