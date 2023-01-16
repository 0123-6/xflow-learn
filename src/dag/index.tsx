import React from 'react'
/** app 核心组件 */
import { XFlow, XFlowCanvas, KeyBindings } from '@antv/xflow'
import type { IApplication, IAppLoad } from '@antv/xflow'
/** 交互组件 */
import {
    /** 触发Command的交互组件 */
    CanvasScaleToolbar,
    JsonSchemaForm,
    NodeCollapsePanel,
    CanvasContextMenu,
    CanvasToolbar,
    /** Graph的扩展交互组件 */
        CanvasSnapline,
    CanvasNodePortTooltip,
    DagGraphExtension,
} from '@antv/xflow'

/** app 组件配置  */
/** 配置画布 */
import { useGraphHookConfig } from './config-graph'
/** 配置Command */
import { useCmdConfig, initGraphCmds } from './config-cmd'
/** 配置Model */
import { useModelServiceConfig } from './config-model-service'
/** 配置Menu */
import { useMenuConfig } from './config-menu'
/** 配置Toolbar */
import { useToolbarConfig } from './config-toolbar'
/** 配置快捷键 */
import { useKeybindingConfig } from './config-keybinding'
/** 配置Dnd组件面板 */
import * as dndPanelConfig from './config-dnd-panel'
/** 配置JsonConfigForm */
import {controlMapService, formSchemaService, formValueUpdateService} from "./config-form";

import './index.less'
import '@antv/xflow/dist/index.css'


export interface IProps {
    meta: { flowId: string }
}

// 组件定义,其中props = {
//   meta: { flowId: 'test-meta-flow-id' },
// }
export const Demo: React.FC<IProps> = props => {
    // meta = {flowId:'test-meta-flow-id'}
    const { meta } = props
    // 图表挂钩配置
    const graphHooksConfig = useGraphHookConfig(props)
    // 顶部导航栏配置
    const toolbarConfig = useToolbarConfig()
    // 菜单栏配置
    const menuConfig = useMenuConfig()
    console.log('typeof menuConfig: ',typeof menuConfig)
    console.log('menuConfig: ',menuConfig)
    // 命令配置
    const cmdConfig = useCmdConfig()
    // 数据模型配置
    const modelServiceConfig = useModelServiceConfig()
    // 键盘事件配置
    const keybindingConfig = useKeybindingConfig()

    const cache = React.useMemo<{ app: IApplication } | null>(
        () => ({
            // @ts-ignore
            app: null,
        }),
        [],
    )
    /**
     * @param app 当前XFlow工作空间
     * @param extensionRegistry 当前XFlow配置项
     */

    const onLoad: IAppLoad = async app => {
        // @ts-ignore
        cache.app = app
        // @ts-ignore
        initGraphCmds(cache.app)
    }

    // @ts-ignore
    // @ts-ignore

    /** 父组件meta属性更新时,执行initGraphCmds */
    React.useEffect(() => {
        // @ts-ignore
        if (cache.app) {
            // @ts-ignore
            initGraphCmds(cache.app)
        }
    }, // @ts-ignore
        [cache.app, meta])
    console.log('Demo组件重新执行了')
    return (
        <XFlow
            className="dag-user-custom-clz"
            hookConfig={graphHooksConfig}
            modelServiceConfig={modelServiceConfig}
            commandConfig={cmdConfig}
            onLoad={onLoad}
            meta={meta}
        >
            <DagGraphExtension />
            <NodeCollapsePanel
                className="xflow-node-panel"
                searchService={dndPanelConfig.searchService}
                nodeDataService={dndPanelConfig.nodeDataService}
                onNodeDrop={dndPanelConfig.onNodeDrop}
                position={{ width: 230, top: 0, bottom: 0, left: 0 }}
                footerPosition={{ height: 0 }}
                bodyPosition={{ top: 40, bottom: 0, left: 0 }}
            />
            <CanvasToolbar
                className="xflow-workspace-toolbar-top"
                layout="horizontal"
                config={toolbarConfig}
                position={{ top: 0, left: 230, right: 290, bottom: 0 }}
            />
            <XFlowCanvas position={{ top: 40, left: 230, right: 290, bottom: 0 }}>
                <CanvasScaleToolbar position={{ top: 12, right: 12 }} />
                <CanvasContextMenu config={menuConfig} />
                <CanvasSnapline color="#faad14" />
                <CanvasNodePortTooltip />
            </XFlowCanvas>
            {/*<JsonSchemaForm*/}
            {/*    controlMapService={controlMapService}*/}
            {/*    formSchemaService={formSchemaService}*/}
            {/*    formValueUpdateService={formValueUpdateService}*/}
            {/*    bodyPosition={{ top: 0, bottom: 0, right: 0 }}*/}
            {/*    position={{ width: 290, top: 0, bottom: 0, right: 0 }}*/}
            {/*    footerPosition={{ height: 0 }}*/}
            {/*/>*/}
            <JsonSchemaForm
              afterUpdatingCb={ async () => console.log('afterUpdatingCb')}
              controlMapService={controlMapService}
              formSchemaService={formSchemaService}
              formValueUpdateService={formValueUpdateService}
              position={{ top: 0, bottom: 0, right: 0, width: 290 }}
            />
            <KeyBindings config={keybindingConfig} />
        </XFlow>
    )
}

export default Demo

Demo.defaultProps = {
    meta: { flowId: 'test-meta-flow-id' },
}
