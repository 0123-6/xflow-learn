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
            id: '读',
            header: '数据读取',
            children: [
                {
                    id: '读数据表',
                    label: '读数据表',
                    parentId: '读数据表',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="读数据表" content="读数据表"/>,
                    bd_component_name:"load_data_table",
                    data_path: '',
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
                    ]
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
                    popoverContent: <NodeDescription name="数据筛选" content="数据筛选"/>,
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
                    selectedColumnList: [],
                    test: '',
                },
                {
                    id: '测试',
                    label: '测试',
                    parentId: '测试',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="测试" content="测试"/>,
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
                    selectedColumnList: [],
                }
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

export const searchService: NsNodeCollapsePanel.ISearchService = async (
    nodes: NsNodeCollapsePanel.IPanelNode[] = [],
    keyword: string,
) => {
    const list = nodes.filter(node => node.label.includes(keyword))
    console.log(list, keyword, nodes)
    return list
}
