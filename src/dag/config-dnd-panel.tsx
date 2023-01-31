import {NsGraph, NsGraphStatusCommand, uuidv4} from '@antv/xflow'
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
                    id: '读取数据',
                    label: '读取数据',
                    parentId: '读取数据',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="读取数据" content="读取数据"/>,
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

                    // 前端需要的前端运行状态
                    status: NsGraphStatusCommand.StatusEnum.DEFAULT,//状态,init初始未运行，running运行中，finished结束运行
                    canRun: (node) => {
                        // return node.status === NsGraphStatusCommand.StatusEnum.DEFAULT && node.params_user_data_path_url !=='';
                        return node.params_user_data_path_url !=='';
                    },

                    // 输入参数
                    params_user_data_path_url: '',
                    params_user_data_type: 'csv', //数据类型 csv video

                    // 节点自己的参数
                    params_bd_component_name:"load_data",
                    params_is_single_debug: 0,  // 是否是单节点运行

                    // 输出参数
                    output_data_path_url: '',//csw文件url
                    output_column_list: [],// 表头名列表
                }
            ],
        },
        {
            id: '图像处理',
            header: '图像处理',
            children: [
                {
                    id: '调整图片尺寸',
                    label: '调整图片尺寸',
                    parentId: '调整图片尺寸',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="调整图片尺寸" content="根据设定调整图片尺寸"/>,
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

                    // 前端需要的前端运行状态
                    status: NsGraphStatusCommand.StatusEnum.DEFAULT,//状态,init初始未运行，running运行中，finished结束运行
                    canRun: (node) => {
                        // node.status === NsGraphStatusCommand.StatusEnum.DEFAULT
                        return node.params_data_path_url !==''
                          && (
                            node.params_user_resize_x >= 0
                            && node.params_user_resize_y >= 0
                          );
                    },

                    // 输入参数
                    params_data_path_url: '',

                    // 用户自定义参数
                    params_user_resize_x: 1920,  //resize x宽度
                    params_user_resize_y: 1080,  //resize y高度

                    // 节点自己的参数
                    params_bd_component_name:"resize_image",
                    params_is_single_debug: 0,  // 是否是单节点运行

                    // 输出参数
                    output_data_path_url: '',//zip文件url
                },
            ],
        },
        {
            id: '视频处理',
            header: '视频处理',
            children: [
                {
                    id: '视频解码',
                    label: '视频解码',
                    parentId: '视频解码',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="视频解码" content="从url读取视频数据转图片,每一帧都抽出来"/>,
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

                    // 前端需要的前端运行状态
                    status: NsGraphStatusCommand.StatusEnum.DEFAULT,//状态,init初始未运行，running运行中，finished结束运行
                    canRun: (node) => {
                        // node.status === NsGraphStatusCommand.StatusEnum.DEFAULT
                        return node.params_data_path_url !=='';
                    },

                    // 输入参数
                    params_data_path_url: '',  // 读取视频数据

                    // 节点自己的参数  -->
                    params_bd_component_name:"video_extract",
                    params_is_single_debug: 0,  // 是否是单节点运行

                    // 输出参数
                    output_data_path_url: '',//zip文件url
                },
            ],
        },
        {
            id: '预训练模型',
            header: '预训练模型',
            children: [
                {
                    id: '车辆检测',
                    label: '车辆检测',
                    parentId: '车辆检测',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="车辆检测" content="交通视频图片车辆检测"/>,
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

                    // 前端需要的前端运行状态
                    status: NsGraphStatusCommand.StatusEnum.DEFAULT,//状态,init初始未运行，running运行中，finished结束运行
                    canRun: (node) => {
                        // node.status === NsGraphStatusCommand.StatusEnum.DEFAULT
                        return node.params_data_path_url !==''
                          && (
                            node.params_user_model_id >= 0
                          );
                    },

                    // 输入参数
                    params_data_path_url: '',

                    // 用户自己的参数
                    params_user_model_id: 421,  // 模型id

                    // 节点自己的参数
                    params_bd_component_name: "yolov5_car_detect",
                    params_is_single_debug: 0,  // 是否是单节点运行

                    // 输出参数
                    output_data_path_url: '',//zip文件url
                },
            ],
        },
        {
            id: '自定义模型',
            header: '自定义模型',
            children: [
                {
                    id: '车流量统计',
                    label: '车流量统计',
                    parentId: '车流量统计',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="车流量统计" content="交通车流量统计"/>,
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

                    // 前端需要的前端运行状态
                    status: NsGraphStatusCommand.StatusEnum.DEFAULT,//状态,init初始未运行，running运行中，finished结束运行
                    canRun: (node) => {
                        // node.status === NsGraphStatusCommand.StatusEnum.DEFAULT
                        return node.params_data_path_url !==''
                          && (
                            node.params_user_detection_location_x1 >= 0
                            && node.params_user_detection_location_y1 >= 0
                            && node.params_user_detection_location_x2 >= 0
                            && node.params_user_detection_location_y2 >= 0
                            && node.params_user_detection_location_x3 >= 0
                            && node.params_user_detection_location_y3 >= 0
                            && node.params_user_detection_location_x4 >= 0
                            && node.params_user_detection_location_y4 >= 0
                          );
                    },

                    // 输入参数
                    params_data_path_url: '',

                    // 用户输入参数
                    params_user_detection_location_x1: 769, //检测区域点1 x宽度
                    params_user_detection_location_y1: 259, //检测区域点1 y高度
                    params_user_detection_location_x2: 1444,//检测区域点2 x宽度
                    params_user_detection_location_y2: 299,//检测区域点2 y高度
                    params_user_detection_location_x3: 1477,//检测区域点3 x宽度
                    params_user_detection_location_y3: 619,//检测区域点3 y高度
                    params_user_detection_location_x4: 137,//检测区域点4 x宽度
                    params_user_detection_location_y4: 453,//检测区域点4 y高度

                    // 节点自己的参数
                    params_bd_component_name:"traffic_analysis",
                    params_is_single_debug: 0,  // 是否是单节点运行

                    // 输出参数
                    output_data_path_url: '',//txt文件url
                },
            ],
        },
        {
            id: '筛选与分组',
            header: '筛选与分组',
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

                    // 前端需要的前端运行状态
                    status: NsGraphStatusCommand.StatusEnum.DEFAULT,//状态,init初始未运行，running运行中，finished结束运行
                    canRun: (node) => {
                        // node.status === NsGraphStatusCommand.StatusEnum.DEFAULT
                        return (node.params_data_path_url!=='') && (node.params_user_column_filter_list.length > 0);
                    },

                    // 输入参数
                    params_data_path_url: '',  //上一步输出
                    params_column_list: [],// 传入的全部列名列表
                    // 节点自己的属性
                    params_bd_component_name: 'data_screening',
                    params_is_single_debug: 0,  // 是否是单节点运行
                    // 用户筛选的列名列表
                    params_user_column_filter_list: [],

                    // 输出参数,输出csw文件对应的url
                    output_data_path_url: '',
                    // 筛选列列表,后端返回给前端的csv文件表的列名列表
                    output_column_list: [],
                },
            ],
        },
        {
            id: '标准化',
            header: '标准化',
            children: [
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

                    // 前端需要的前端运行状态
                    status: NsGraphStatusCommand.StatusEnum.DEFAULT,//状态,init初始未运行，running运行中，finished结束运行
                    canRun: (node) => {
                        // node.status === NsGraphStatusCommand.StatusEnum.DEFAULT
                        return (node.params_data_path_url !=='') && (
                          node.params_user_min_value <= node.params_user_max_value
                          && node.params_user_column_filter_list.length > 0
                        );
                    },

                    // 上一节点输入
                    params_data_path_url: '',  //上一步输出
                    params_column_list: [], // 传入的全部列名列表
                    // 节点自己属性
                    params_bd_component_name: 'min_max_scale',
                    params_is_single_debug: 0,  // 是否是单节点运行
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
        {
            id: '指数计算',
            header: '指数计算',
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
                    // 前端需要的前端运行状态
                    status: NsGraphStatusCommand.StatusEnum.DEFAULT,//状态,init初始未运行，running运行中，finished结束运行
                    canRun: (node) => {
                        // node.status === NsGraphStatusCommand.StatusEnum.DEFAULT
                        return (node.params_data_path_url !=='') && (
                          node.params_user_positive_index.length > 0
                          && node.params_user_negative_index.length > 0
                          && node.params_user_index_column_name !== ''
                          && node.params_user_column_filter_list.length > 0
                        );
                    },

                    // 上一节点输入
                    params_data_path_url: '',  //上一步输出
                    params_column_list: [],// 传入的全部列名列表
                    // 节点自己的属性
                    params_bd_component_name: 'entropy_weight_method',
                    params_is_single_debug: 0,  // 是否是单节点运行
                    // 用户输入属性
                    params_user_positive_index: [],  // 正向
                    params_user_negative_index: [],  // 负向
                    params_user_index_column_name: "",// 指数列名称
                    params_user_column_filter_list: [],// 用户筛选列名列表
                    // 节点输出
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
