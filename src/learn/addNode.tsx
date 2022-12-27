import React from 'react'
import { Form, Input, message } from 'antd'
// import type { IFormSchema } from '@antv/xflow'
import {usePanelContext, WorkspacePanel, randomInt, FormBuilder, uuidv4, NsGraph} from '@antv/xflow'
import { NsNodeCmd } from '@antv/xflow'
import { XFlowNodeCommands } from '@antv/xflow'

type IFormValues = NsGraph.INodeConfig

const formItems = [
  {
    name: 'id',
    label: 'id',
    rules: [{ required: true }],
    render: Input,
  },
  {
    name: 'label',
    label: 'label',
    rules: [{ required: true }],
    render: Input,
  },
  {
    name: 'x',
    label: 'x',
    render: Input,
  },
  {
    name: 'y',
    label: 'y',
    render: Input,
  },
  {
    name: 'width',
    label: 'width',
    render: Input,
  },
  {
    name: 'height',
    label: 'height',
    render: Input,
  },
]

let nodeId = 1

// CustomNodeCollapsePanel/ports.ts
// const getAnchorStyle = (position: string) => {
//   return {
//     position: { name: position },
//     attrs: {
//       circle: {
//         r: 4,
//         magnet: true,
//         stroke: '#31d0c6',
//         strokeWidth: 2,
//         fill: '#fff',
//         style: {
//           visibility: 'hidden',
//         },
//       },
//     },
//     zIndex: 10,
//   };
// };

// const getPorts = (position = ['top', 'right', 'bottom', 'left']) => {
//   return {
//     items: position.map((name) => {
//       return { group: name, id: uuidv4() };
//     }),
//     groups: {
//       top: getAnchorStyle('top'),
//       right: getAnchorStyle('right'),
//       bottom: getAnchorStyle('bottom'),
//       left: getAnchorStyle('left'),
//     },
//   };
// };

export const CmdForm = () => {
  const { commandService } = usePanelContext()
  const [form] = Form.useForm<IFormValues>()

  React.useEffect(() => {
    nodeId = 1
  }, [])

  const onFinish = async (values: IFormValues) => {

    console.log('my 新建  节点')
    console.info('addNode service running, add node:', values)

    // const nodeId = uuidv4()
    /** 这里添加连线桩 */
    // const ports = []
    const ports = [
      {
        id: uuidv4(),
        type: "input",
        group: "top",
        tooltip: '输入桩1',
      },
      // {
      //   type: NsGraph.AnchorType.INPUT,
      //   group: NsGraph.AnchorGroup.TOP,
      //   tooltip: '输入桩3',
      // },
      // {
      //   type: NsGraph.AnchorType.OUTPUT,
      //   group: NsGraph.AnchorGroup.BOTTOM,
      //   tooltip: '输出桩',
      // },
    ] as NsGraph.INodeAnchor[]
    const node: NsNodeCmd.AddNode.IArgs['nodeConfig'] = {
      ...values,
      id: uuidv4(),
      ports: (ports as NsGraph.INodeAnchor[]).map(port => {
        return { ...port, id: uuidv4() }
      }),
      // renderKey: 'DND_NDOE',
    }
    nodeId+=1;
    console.log('node: ',node)
    commandService.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: node
    })
    form.setFieldsValue({
      id: uuidv4(),
      x: randomInt(20, 600),
      y: randomInt(50, 270),
      width:200,
      height:40,
      label: 'Node_' + nodeId,
    })
    message.success(`${XFlowNodeCommands.ADD_NODE.label}: 命令执行成功`)
  }

  return (
    <FormBuilder
      form={form}
      formItems={formItems}
      onFinish={onFinish}
      initialValues={{
        id: 'node_' + nodeId,
        x: randomInt(20, 100),
        y: randomInt(50, 150),
        width:100,
        height:40,
        label: 'Node_' + nodeId,
      }}
    />
  )
}

export const AddNodeComponent = () => {
  return (
    <WorkspacePanel
      position={{ top: 500, right: 0, bottom: 0, width: 230,height:500 }}
      className="panel">
      <CmdForm />
    </WorkspacePanel>
  )
}
