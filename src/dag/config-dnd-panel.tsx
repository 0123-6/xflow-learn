import {NsGraph, uuidv4} from '@antv/xflow'
import { XFlowNodeCommands } from '@antv/xflow'
import { DND_RENDER_ID } from './constant'
import type { NsNodeCmd } from '@antv/xflow'
import type { NsNodeCollapsePanel } from '@antv/xflow'
import { Card } from 'antd'
import React from 'react'

export const onNodeDrop: NsNodeCollapsePanel.IOnNodeDrop = async (node, commands) => {
    console.log('add Node', node)
    const args: NsNodeCmd.AddNode.IArgs = {
        nodeConfig: { ...node, id: uuidv4() },
    }
    console.log('args: ',args)
    commands.executeCommand(XFlowNodeCommands.ADD_NODE.id, args)
}

const NodeDescription = (props: { name:string, content: string }) => {
    return (
        <Card size="small" title="介绍" style={{ width: '200px' }} bordered={false}>
            {props.content}
        </Card>
    )
}

export const nodeDataService: NsNodeCollapsePanel.INodeDataService = async (meta, modelService) => {
    console.log(meta, modelService)
    return [
        {
            id: '数据读取',
            header: '数据读取',
            children: [
                {
                    id: '读数据表',
                    label: '读数据表',
                    parentId: '读数据表',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="读数据表" content="读取表格数据"/>,
                    ports:[
                        {
                            id:uuidv4(),
                            type: NsGraph.AnchorType.INPUT,
                            group: NsGraph.AnchorGroup.TOP,
                            tooltip: '输入桩',
                        },
                        {
                            id:uuidv4(),
                            type: NsGraph.AnchorType.OUTPUT,
                            group: NsGraph.AnchorGroup.BOTTOM,
                            tooltip: '输出桩',
                        }
                    ],

                    // 节点自己的参数
                    // 执行代码名
                    params_bd_component_name: 'load_data_table',
                    // 用户输入
                    // 输入参数
                    params_user_data_path_url: '',

                    // 输出参数
                    output_data_path_url: '',
                    // 表头名列表
                    output_column_list: [],
                }
            ],
        },
        {
            id: '数据加工',
            header: '数据加工',
            children: [
                {
                    id: '数据筛选',
                    label: '数据筛选',
                    parentId: '数据筛选',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="数据筛选" content="通过选择行、列与列条件筛选的方式来选择数据"/>,
                    ports: [
                        {
                            id:uuidv4(),
                            type: NsGraph.AnchorType.INPUT,
                            group: NsGraph.AnchorGroup.TOP,
                            tooltip: '输入桩',
                        },
                        {
                            id:uuidv4(),
                            type: NsGraph.AnchorType.OUTPUT,
                            group: NsGraph.AnchorGroup.BOTTOM,
                            tooltip: '输出桩',
                        }
                    ],

                    // 输入参数
                    params_data_path_url: '',  //上一步输出
                    params_column_list: [],// 传入的全部列名列表
                    params_bd_component_name: 'data_screening',
                    params_is_singal_debug: 0,  // 是否是单节点运行
                    // 用户筛选的列名列表
                    params_user_column_filter_list: [],

                    // 输出参数,输出csw文件对应的url
                    output_data_path_url: '',
                    // 筛选列列表,后端返回给前端的csv文件表的列名列表
                    output_column_list: [],
                },
                // {
                //     id: '测试',
                //     label: '测试',
                //     parentId: '测试',
                //     renderKey: DND_RENDER_ID,
                //     popoverContent: <NodeDescription name="测试" content="测试"/>,
                //     ports: [
                //         {
                //             id:uuidv4(),
                //             type: NsGraph.AnchorType.INPUT,
                //             group: NsGraph.AnchorGroup.TOP,
                //             tooltip: '输入桩',
                //         },
                //         {
                //             id:uuidv4(),
                //             type: NsGraph.AnchorType.OUTPUT,
                //             group: NsGraph.AnchorGroup.BOTTOM,
                //             tooltip: '输出桩',
                //         }
                //     ],
                //     selectedColumnList: [],
                // }
            ],
        },
        {
            id: '模型训练',
            header: '模型训练',
            children: [
                {
                    id: '熵权法',
                    label: '熵权法',
                    parentId: '熵权法',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="熵权法" content="对构建的指标体系进行熵权法计算得到指数结果"/>,
                    ports: [
                        {
                            id:uuidv4(),
                            type: NsGraph.AnchorType.INPUT,
                            group: NsGraph.AnchorGroup.TOP,
                            tooltip: '输入桩',
                        },
                        {
                            id:uuidv4(),
                            type: NsGraph.AnchorType.OUTPUT,
                            group: NsGraph.AnchorGroup.BOTTOM,
                            tooltip: '输出桩',
                        }
                    ],

                    // 上一节点输入
                    params_data_path_url: '',  //上一步输出
                    params_column_list: [],// 传入的全部列名列表
                    // 节点自己的属性
                    params_bd_component_name: 'entropy_weight_method',
                    params_is_singal_debug: 0,  // 是否是单节点运行
                    // 用户输入属性
                    params_user_positive_index: [],  // 正向
                    params_user_negative_index: [],  // 负向
                    params_user_index_column_name: "",// 指数列名称
                    params_user_column_filter_list: [],// 用户筛选列名列表
                    // 节点输出
                    output_data_path_url: '',// 输出csw文件对应的url
                    output_column_list: [],// 输出列名列表
                },
                {
                    id: 'Min-Max标准化',
                    label: 'Min-Max标准化',
                    parentId: 'Min-Max标准化',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="Min-Max标准化" content="对数据中某特征取值进行MinMax标准化"/>,
                    ports: [
                        {
                            id:uuidv4(),
                            type: NsGraph.AnchorType.INPUT,
                            group: NsGraph.AnchorGroup.TOP,
                            tooltip: '输入桩',
                        },
                        {
                            id:uuidv4(),
                            type: NsGraph.AnchorType.OUTPUT,
                            group: NsGraph.AnchorGroup.BOTTOM,
                            tooltip: '输出桩',
                        }
                    ],

                    // 上一节点输入
                    params_data_path_url: '',  //上一步输出
                    params_column_list: [], // 传入的全部列名列表
                    // 节点自己属性
                    params_bd_component_name: 'minmax_scaling',
                    params_is_singal_debug: 0,  // 是否是单节点运行
                    // 用户输入属性
                    params_user_min_value:0,
                    params_user_max_value:100,
                    params_user_column_filter_list: [],// 用户筛选列名列表
                    // 节点输出属性
                    output_data_path_url: '',// 输出csw文件对应的url
                    output_column_list: [],// 输出列名列表
                },
            ],
        },
    ]
}

export const searchService: NsNodeCollapsePanel.ISearchService = async (
    nodes: NsNodeCollapsePanel.IPanelNode[] = [],
    keyword: string,
) => {
    const list = nodes.filter(node => node.label.includes(keyword))
    console.log(list, keyword, nodes)
    return list
}
