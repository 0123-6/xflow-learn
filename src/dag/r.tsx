import {NsGraph, NsJsonSchemaForm, NsNodeCmd, XFlowNodeCommands} from "@antv/xflow";
import {set} from 'lodash'

/** ControlShape的Enum */
  const { ControlShape } = NsJsonSchemaForm

  /** 保存form的values */
  export const formValueUpdateService: NsJsonSchemaForm.IFormValueUpdateService = async args => {
    console.log('update args: ',args)
    const { values, commandService, targetData } = args
    const updateNode = (node: NsGraph.INodeConfig) => {
      return commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
        XFlowNodeCommands.UPDATE_NODE.id,
        { nodeConfig: node },
      )
    }
    // console.log('formValueUpdateService  values:', values, args)
    const nodeConfig: NsGraph.INodeConfig = {
      ...targetData,
    }
    values.forEach(val => {
      set(nodeConfig, val.name, val.value)
    })
    updateNode(nodeConfig)
  }

  /*
  * 返回的数据结构
  * {
  *   tabs: [
  *     {
  *       name: 'tab1',
  *       // 目前没有发现把不同的选项写在groups数组中，与写在controls数组中的区别
  *       groups:[
  *         name: 'group1',
  *         controls: [
  *           {
  *             label: '网络路径', // 渲染的选项名字
  *             shape: ControlShape.INPUT, // 渲染为何种组件
                name: 'data_path', // 更新时你要更新node的哪个属性啊
                value: targetData.data_path, // 组件的默认值
              }
  *         ],
  *       ],
  *     },
  *     {},
  *     {},
  *   ],
  * }
  *
  * */
  /** 根据选中的节点更新formSchema */
  export const formSchemaService: NsJsonSchemaForm.IFormSchemaService = async args => {
    console.log(`formSchemaService args:`, args)
    const { targetData } = args
    if (!targetData) {
      return {
        tabs: [
          {
            /** Tab的title */
            name: '画布配置',
            groups: [],
          }
        ],
      }
    }
    else if (targetData.parentId === '读数据表') {
      return {
        tabs: [
          {
            name: targetData.label,
            groups: [
              {
                name: 'group1',
                controls: [
                  {
                    label: '节点名称',
                    shape: ControlShape.INPUT,
                    name: 'label',
                    value: targetData.label
                  },
                  {
                    label: '网络路径',
                    shape: ControlShape.INPUT,
                    name: 'data_path',
                    value: targetData.data_path,
                  }
                ]
              }
            ],
          }
        ]
      }
    }
    else if (targetData.parentId === '数据筛选') {
      return {
        tabs: [
          {
            name: targetData.label,
            groups: [
              {
                name: 'group1',
                controls: [
                  {
                    label: '节点名称',
                    shape: ControlShape.INPUT,
                    name: 'label',
                    value: targetData.label,
                  },
                  {
                    label: '列选择筛选',
                    shape: ControlShape.SELECT,
                    name: 'selectedColumnList',
                    value: targetData.selectedColumnList,
                    options: [
                      {
                        title:'title1',
                        value:'value1',
                      },
                      {
                        title:'title2',
                        value:'value2',
                      },
                      {
                        title:'title3',
                        value:'value3',
                      },
                      {
                        title:'title4',
                        value:'value4',
                      },
                      {
                        title:'title5',
                        value:'value5',
                      },
                    ],
                  }
                ],
              }
            ],
          }
        ],
      }
    }
    else {
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
  }

