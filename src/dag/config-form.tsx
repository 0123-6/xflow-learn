import {controlMapService, ControlShapeEnum} from './form-controls'
import {NsGraph, NsJsonSchemaForm, NsNodeCmd, XFlowNodeCommands} from '@antv/xflow'
import {set} from 'lodash'

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(() => resolve(true), ms))
}
/** ControlShape的Enum */
const { ControlShape } = NsJsonSchemaForm
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
  // 我的
  console.log(`formSchemaService args:`, args)
  const { targetData } = args
  if (!targetData) {
    return {
      tabs: [
        {
          name: 'GraphMeta',
          groups: [
            {
              name: 'groupName',
              controls: [
                {
                  name: 'Tab2-1',
                  label: '项目名',
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: '图的业务项目名',
                  extra: '和图的ID对应',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{ title: '', value: '' }],
                  originData: {}, // 原始数据
                },
                {
                  label: '图数222据',
                  name: 'Tab1-0',
                  /** 使用自定义shape */
                  shape: ControlShapeEnum.EDITOR,
                  disabled: false,
                  required: true,
                  tooltip: 'JSON 数据',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{ title: '', value: '' }],
                  originData: {}, // 原始数据
                },
              ],
            },
          ],
        },
      ],
    }
  }
  else if (targetData.parentId === '读取数据') {
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
                  label: '数据类型',
                  shape: ControlShape.SELECT,
                  name: 'params_user_data_type',
                  value: targetData.params_user_data_type,
                  options: [
                    {
                      title: 'csv表格',
                      value: 'csv',
                    },
                    {
                      title: '视频',
                      value: 'video',
                    },
                  ]
                },
                {
                  label: '数据路径',
                  shape: ControlShape.INPUT,
                  name: 'params_user_data_path_url',
                  value: targetData.params_user_data_path_url,
                },
                // {
                //   label: '执行代码名',
                //   shape: ControlShape.INPUT,
                //   name: 'params_bd_component_name',
                //   value: targetData.params_bd_component_name,
                // },
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
              ],
            },
            {
              name: 'group2',
              controls: [
                {
                  label: '列选择筛选',
                  shape: ControlShapeEnum.SELECTMUITI,
                  name: 'params_user_column_filter_list',
                  value: targetData.params_user_column_filter_list,
                  optionsMuiti: targetData.params_column_list.map(value => {
                    return {
                      'label':value,
                      value
                    }
                  }),
                },
              ]
            }
          ],
        }
      ],
    }
  }
  else if (targetData.parentId === '熵权法') {
    return {
      tabs: [
        {
          name: targetData.label,
          groups: [
            {
              name: 'group1',
              controls: [
                // 节点名称
                {
                  label: '节点名称',
                  shape: ControlShape.INPUT,
                  name: 'label',
                  value: targetData.label,
                },
                // 正向指标
                {
                  label: '正向指标',
                  shape: ControlShapeEnum.SELECTMUITI,
                  name: 'params_user_positive_index',
                  value: targetData.params_user_positive_index,
                  optionsMuiti: targetData.params_column_list.map(value => {
                    return {
                      'label':value,
                      value
                    }
                  }),
                },
                // 负向指标
                {
                  label: '负向指标',
                  shape: ControlShapeEnum.SELECTMUITI,
                  name: 'params_user_negative_index',
                  value: targetData.params_user_negative_index,
                  optionsMuiti: targetData.params_column_list.map(value => {
                    return {
                      'label':value,
                      value
                    }
                  }),
                },
                // 指数列名称
                {
                  label: '指数列名称',
                  shape: ControlShape.INPUT,
                  name: 'params_user_index_column_name',
                  value: targetData.params_user_index_column_name,
                },
                // 选择输出列
                {
                  label: '选择输出列',
                  shape: ControlShapeEnum.SELECTMUITI,
                  name: 'params_user_column_filter_list',
                  value: targetData.params_user_column_filter_list,
                  optionsMuiti: targetData.params_column_list.map(value => {
                    return {
                      'label':value,
                      value
                    }
                  }),
                }
              ]
            }
          ]
        }
      ]
    }
  }
  else if (targetData.parentId === 'Min-Max标准化') {
    return {
      tabs: [
        {
          name: targetData.label,
          groups: [
            {
              name: 'group1',
              controls: [
                // 节点名称
                {
                  label: '节点名称',
                  shape: ControlShape.INPUT,
                  name: 'label',
                  value: targetData.label,
                },
                // 列处理
                {
                  label: '列处理',
                  shape: ControlShapeEnum.SELECTMUITI,
                  name: 'params_user_column_filter_list',
                  value: targetData.params_user_column_filter_list,
                  optionsMuiti: targetData.params_column_list.map(value => {
                    return {
                      'label':value,
                      value
                    }
                  }),
                },
                // 最大值
                {
                  label: '最大值',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_max_value',
                  value: targetData.params_user_max_value,
                },
                // 最小值
                {
                  label: '最小值',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_min_value',
                  value: targetData.params_user_min_value,
                },
              ]
            }
          ]
        }
      ]
    }
  }
  else if (targetData.parentId === '测试') {
    return {
      tabs: [
        {
          name: 'Tab1',
          groups: [
            {
              name: 'groupName',
              controls: [
                {
                  label: 'GraphEditor',
                  name: 'Tab1-0',
                  /** 使用自定义shape */
                  shape: ControlShapeEnum.EDITOR,
                  disabled: false,
                  required: true,
                  tooltip: 'hello world',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
                {
                  label: 'Tab1-2',
                  name: 'Tab1-2',
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: 'hello world',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
                {
                  label: 'Tab1-3',
                  name: 'Tab1-3',
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: 'hello world',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
                {
                  label: 'Tab1-4',
                  name: 'Tab1-4',
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: 'hello world',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
              ],
            },
          ],
        },
        {
          name: 'Tab2',
          groups: [
            {
              name: 'groupName',
              controls: [
                {
                  name: 'Tab2-1',
                  label: 'Tab2-1',
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: 'hello world',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
                {
                  label: 'Tab2-2',
                  name: 'Tab2-2', // 也可以是数组
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: 'hello world',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
                {
                  label: 'Tab2-3',
                  name: 'Tab2-3', // 也可以是数组
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: 'hello world',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
              ],
            },
          ],
        },
        {
          name: 'Tab3',
          groups: [
            {
              name: 'hhhhh',
              controls: [
                {
                  name: 'Tab3-1',
                  label: '算法配置1',
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: '算法配置1',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
                {
                  name: 'Tab3-2',
                  label: '算法配置2',
                  shape: 'Input',
                  disabled: false,
                  required: true,
                  tooltip: '算法配置2',
                  placeholder: 'please write something',
                  value: '',
                  defaultValue: '', // 可以认为是默认值
                  hidden: false,
                  options: [{title: '', value: ''}],
                  originData: {}, // 原始数据
                },
              ],
            },
          ],
        },
      ],
    }
  }
  else if (targetData.parentId === '视频解码') {
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
              ],
            }
          ],
        }
      ],
    }
  }
  else if (targetData.parentId === '调整图片尺寸') {
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
                  label: '图片宽度',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_resize_x',
                  value: targetData.params_user_resize_x,
                },
                {
                  label: '图片高度',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_resize_y',
                  value: targetData.params_user_resize_y,
                },
              ],
            }
          ],
        }
      ],
    }
  }
  else if (targetData.parentId === '车辆检测') {
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
                  label: '模型id',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_model_id',
                  value: targetData.params_user_model_id,
                },
              ],
            }
          ],
        }
      ],
    }
  }
  else if (targetData.parentId === '车流量统计') {
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
                  label: '检测区域x1',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_detection_location_x1',
                  value: targetData.params_user_detection_location_x1,
                },
                {
                  label: '检测区域y1',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_detection_location_y1',
                  value: targetData.params_user_detection_location_y1,
                },
                {
                  label: '检测区域x2',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_detection_location_x2',
                  value: targetData.params_user_detection_location_x2,
                },
                {
                  label: '检测区域y2',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_detection_location_y2',
                  value: targetData.params_user_detection_location_y2,
                },
                {
                  label: '检测区域x3',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_detection_location_x3',
                  value: targetData.params_user_detection_location_x3,
                },
                {
                  label: '检测区域y3',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_detection_location_y3',
                  value: targetData.params_user_detection_location_y3,
                },
                {
                  label: '检测区域x4',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_detection_location_x4',
                  value: targetData.params_user_detection_location_x4,
                },
                {
                  label: '检测区域y4',
                  shape: ControlShape.FLOAT,
                  name: 'params_user_detection_location_y4',
                  value: targetData.params_user_detection_location_y4,
                },
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

/** 保存form的values */
export const formValueUpdateService: NsJsonSchemaForm.IFormValueUpdateService = async args => {
  console.log('update args: ',args)
  const { allFields, commandService, targetData } = args
  // await commandService.executeCommand<NsGraphCmd.GraphLoadData.IArgs>(XFlowGraphCommands.LOAD_DATA.id);
  const updateNode = (node: NsGraph.INodeConfig) => {
    return commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
      XFlowNodeCommands.UPDATE_NODE.id,
      { nodeConfig: node },
    )
  }
  // console.log('formValueUpdateService  values:', values, args)
  const nodeConfig: NsGraph.INodeConfig = {
    ...targetData
  }
  allFields.forEach(val => {
    set(nodeConfig, val.name, val.value)
  })
  updateNode(nodeConfig)
}

export { controlMapService }
