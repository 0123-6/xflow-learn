import React from 'react'
import {Button, Form, Input, message} from 'antd'
import type {IFormSchema} from '@antv/xflow'
import {useXFlowApp, WorkspacePanel, MODELS, useModelAsync, FormBuilder} from '@antv/xflow'
import type {NsNodeCmd} from '@antv/xflow'
import {XFlowNodeCommands} from '@antv/xflow'

interface IFormValues {
  id: string
  nodeConfig: string
}

const formItems: IFormSchema[] = [
  {
    name: 'id',
    label: 'node id',
    rules: [{required: true}],
    render: Input,
    renderProps: {disabled: true},
  },
  {
    name: 'nodeConfig',
    label: 'nodeConfig',
    rules: [{required: true}],
    render: Input.TextArea,
    renderProps: {rows: 5, disabled: true},
  },
]

export const CmdForm = () => {
	console.log('sssssssssssssssss')
  const app = useXFlowApp()
  console.log('into my delNode,app node',app.getAllNodes())
  console.log('into my delNode,app edge',app.getAllEdges())
  const [form] = Form.useForm<IFormValues>()

  const [selectNode] = useModelAsync({
    getModel: async () => MODELS.SELECTED_NODE.getModel(app.modelService),
    initialState: null,
  })

  React.useEffect(() => {
		console.log('fff')
    if (selectNode) {
      const node = selectNode.getData()
      form.setFieldsValue({
        id: node.id,
        nodeConfig: JSON.stringify(node),
      })
    }
  }, [form, selectNode])

  const onFinish = async (values: IFormValues) => {
    app.commandService.executeCommand<NsNodeCmd.DelNode.IArgs>(XFlowNodeCommands.DEL_NODE.id, {
      nodeConfig: JSON.parse(values.nodeConfig),
    })

    form.setFieldsValue({
      id: null,
      nodeConfig: null,
    })
    message.success(`${XFlowNodeCommands.DEL_NODE.label}: 命令执行成功`)
  }

  return (
    <FormBuilder<IFormValues>
      layout="vertical"
      form={form}
      formItems={formItems}
      onFinish={onFinish}
      initialValues={{
        id: null,
        nodeConfig: null,
      }}
      submitButton={
        <Button type="primary" htmlType="submit" style={{width: '100%'}} disabled={!selectNode}>
          选中节点执行命令
        </Button>
      }
    />
  )
}

export const DelNodeComponent = () => {
  return (
    <WorkspacePanel position={{top: 0, right:230, bottom: 0, width: 230}} className="panel">
			<CmdForm/>
    </WorkspacePanel>
  )
}