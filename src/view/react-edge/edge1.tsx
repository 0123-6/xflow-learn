import React from 'react'
import type { NsGraph } from '@antv/xflow'
import { useAppContext } from '@antv/xflow'
import { Tooltip } from 'antd'
import './edge1.less'

const Edge1: NsGraph.IEdgeRender = () => {
    useAppContext();
    return (
        <div className="edge1-container">
            <Tooltip
                title="这是连线上渲染的React内容"
                // defaultVisible={true}
            >
                <div>hover我</div>
            </Tooltip>
        </div>
    )
}
export default Edge1
