import React from 'react'
import { Button, Form, Input, message } from 'antd'
import type { IFormSchema } from '@antv/xflow'
import {
  useXFlowApp,
  WorkspacePanel,
  MODELS,
  useModelAsync,
  FormBuilder, NsEdgeCmd, uuidv4,
  // NsEdgeCmd,
  // XFlowEdgeCommands
} from '@antv/xflow'
// import type { NsNodeCmd } from '@antv/xflow'
import { XFlowEdgeCommands } from '@antv/xflow'

interface IFormValues {
  id: string
  label: string
  x: string
  y: string
}

const formItems: IFormSchema[] = [
  {
    name: 'label',
    label: 'label',
    rules: [{ required: true }],
    render: Input,
  },
  {
    name: 'source',
    label: 'source',
    rules: [{ required: true }],
    render: Input,
  },
  {
    name: 'target',
    label: 'target',
    rules: [{ required: true }],
    render: Input,
  },
]

export const CmdForm = () => {
  const app = useXFlowApp()
  const [form] = Form.useForm<IFormValues>()
  const [selectNode] = useModelAsync<MODELS.SELECTED_NODE.IState>({
    getModel: async () => MODELS.SELECTED_NODE.getModel(app.modelService),
    initialState: null,
  })

  React.useEffect(() => {
    if (selectNode) {
      const nodeConfig = selectNode.getData()
      console.log(nodeConfig)
      form.setFieldsValue({
        id: nodeConfig.id,
        label: nodeConfig.label,
        x: nodeConfig.x,
        y: nodeConfig.y,
      })
    }
  }, [form, selectNode])

  const onFinish = async (values) => {
    console.log(values)
    const id = uuidv4()
    const {
      target,
      source} = values
    app.commandService.executeCommand<NsEdgeCmd.AddEdge.IArgs>(
      XFlowEdgeCommands.ADD_EDGE.id,{
        edgeConfig: {
          id,target,source
        }
      }
    )

    message.success(`${XFlowEdgeCommands.ADD_EDGE.label}: 命令执行成功`)
  }

  return (
    <FormBuilder<IFormValues>
      form={form}
      formItems={formItems}
      onFinish={onFinish}
      initialValues={{
        id: null,
        label: null,
        x: null,
        y: null,
      }}
      submitButton={
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} >
          添加边
        </Button>
      }
    />
  )
}

export const AddEdgeComponent = () => {
  return (
    <WorkspacePanel position={{ top: 0, right: 0, bottom: 0, width: 230,height:500 }} className="panel">
      <CmdForm />
    </WorkspacePanel>
  )
}
