import {NsGraph, uuidv4} from '@antv/xflow'
import { XFlowNodeCommands } from '@antv/xflow'
import { DND_RENDER_ID } from './constant'
import type { NsNodeCmd } from '@antv/xflow'
import type { NsNodeCollapsePanel } from '@antv/xflow'
import { Card } from 'antd'
import React from 'react'

export const onNodeDrop: NsNodeCollapsePanel.IOnNodeDrop = async (node, commands) => {

    debugger
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
                    parentId: '读',
                    renderKey: DND_RENDER_ID,
                    popoverContent: <NodeDescription name="读数据表" content="读数据表"/>,
                    bd_component_name:"load_data_table",
                    params:{
                        data_path: ''
                    },
                    ports:[
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
