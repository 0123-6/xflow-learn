import type {IProps} from './index'
import type {NsGraph, NsNodeCmd} from '@antv/xflow'
import {XFlowNodeCommands} from '@antv/xflow'
import {createHookConfig, DisposableCollection} from '@antv/xflow'
import {DND_RENDER_ID, GROUP_NODE_RENDER_ID} from './constant'
import {AlgoNode} from './react-node/algo-node'
import {GroupNode} from './react-node/group'

// 配置画布,createHookConfig的文档是
/**
 * export declare const createHookConfig: <T extends unknown = any>(addOptions: (config: HookConfig, container: IValueProxy<T>) => void) => (value?: T) => XFlowHookConfig;
 *
 * addOptions是一个箭头函数(config,container),没有返回值
 * createHookConfig是一个箭头函数,该箭头函数的参数为一个箭头函数addOptions，返回值为1个箭头函数
 * const createHookConfig(addOptions) => (value) => XFlowHookConfig;
 */
export const useGraphHookConfig = createHookConfig<IProps>((config, proxy) => {
  // console.log('config: ',config)
  // console.log('proxy: ',proxy)
  // 获取 Props
  const props = proxy.getValue()
  console.log('get main props', props)
  config.setRegisterHook(hooks => {
    const disposableList = [
      // 注册增加 react Node Render
      hooks.reactNodeRender.registerHook({
        name: 'add react node',
        handler: async renderMap => {
          renderMap.set(DND_RENDER_ID, AlgoNode)
          console.log('my add react node')
          renderMap.set(GROUP_NODE_RENDER_ID, GroupNode)
        },
      }),
      // 注册修改graphOptions配置的钩子
      hooks.graphOptions.registerHook({
        name: 'custom-x6-options',
        after: 'dag-extension-x6-options',
        handler: async options => {
          options.grid = false
          options.keyboard = {
            enabled: true,
          }
        },
      }),
      // 注册增加 graph event
      hooks.x6Events.registerHook({
        name: 'add',
        handler: async events => {
          events.push({
            eventName: 'node:moved',
            callback: (e, cmds) => {
              const {node} = e
              cmds.executeCommand<NsNodeCmd.MoveNode.IArgs>(XFlowNodeCommands.MOVE_NODE.id, {
                id: node.id,
                position: node.getPosition(),
              })
            },
          } as NsGraph.IEvent<'node:moved'>)
        },
      }),
    ]
    const toDispose = new DisposableCollection()
    toDispose.pushAll(disposableList)
    return toDispose
  })
})
