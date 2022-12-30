import {NsGraph, NsJsonSchemaForm, NsNodeCmd, XFlowNodeCommands} from "@antv/xflow";
import { set } from 'lodash'

  /** ControlShape的Enum */
  const { ControlShape } = NsJsonSchemaForm

  /** 保存form的values */
  export const formValueUpdateService: NsJsonSchemaForm.IFormValueUpdateService = async args => {
    const { values, commandService, targetData } = args
    const updateNode = (node: NsGraph.INodeConfig) => {
      return commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
        XFlowNodeCommands.UPDATE_NODE.id,
        { nodeConfig: node },
      )
    }
    console.log('formValueUpdateService  values:', values, args)
    const nodeConfig: NsGraph.INodeConfig = {
      ...targetData,
    }
    values.forEach(val => {
      set(nodeConfig, val.name, val.value)
    })
    updateNode(nodeConfig)
  }

  /** 根据选中的节点更新formSchema */
  export const formSchemaService: NsJsonSchemaForm.IFormSchemaService = async args => {
    const { targetData } = args
    console.log(`formSchemaService args:`, args)
    if (!targetData) {
      return {
        tabs: [
          {
            /** Tab的title */
            name: '画布配置',
            groups: [],
          },
        ],
      }
    } else if (targetData.label === '读数据表') {
      return {
        tabs: [
          {
            name: '读数据表',
            groups: [
              {
                name: 'group1',
                controls: [
                  {
                    name: 'data_path',
                    label: 'path',
                    shape: ControlShape.INPUT,
                    value: targetData.data_path,
                  },
                ]
              }
            ],
          }
        ]
      }
    }

    return {
      /** 配置一个Tab */
      tabs: [
        {
          /** Tab的title */
          name: '节点配置',
          groups: [
            {
              name: 'group1',
              controls: [
                {
                  name: 'label',
                  label: '节点Label',
                  shape: ControlShape.INPUT,
                  value: targetData.label,
                },
                {
                  name: 'x',
                  label: 'x',
                  shape: ControlShape.FLOAT,
                  value: targetData.x,
                },
                {
                  name: 'y',
                  label: 'y',
                  shape: ControlShape.FLOAT,
                  value: targetData.y,
                },
                {
                  name: 'width',
                  label: '节点width',
                  shape: ControlShape.INPUT,
                  value: targetData.width,
                },
                {
                  name: 'height',
                  label: '节点height',
                  shape: ControlShape.INPUT,
                  value: targetData.height,
                },
              ],
            },
          ],
        },
      ],
    }
  }

