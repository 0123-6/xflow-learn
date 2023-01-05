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
                    /** Tab的title */
                    name: '画布配置',
                    groups: [],
                },
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
                                {
                                    label: '查看日志链接',
                                    name: 'Tab1-1',
                                    /** 使用自定义shape */
                                    shape: ControlShapeEnum.LINKSHAPE,
                                    disabled: false,
                                    required: true,
                                    tooltip: 'hello world',
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
                                    shape: ControlShapeEnum.SELECTMUITI,
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
                                },
                                {
                                    label: '测试放一个连接',
                                    shape: ControlShapeEnum.LINKSHAPE,
                                    name: 'test',
                                    value: targetData.test,
                                }
                            ],
                        }
                    ],
                }
            ],
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

export { controlMapService }
