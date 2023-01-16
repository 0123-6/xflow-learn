import type { NsNodeCmd, NsEdgeCmd, IMenuOptions, NsGraph } from '@antv/xflow'
import type { NsRenameNodeCmd } from './cmd-extensions/cmd-rename-node-modal'
import {createCtxMenuConfig, MenuItemType, NsGraphCmd, NsGraphStatusCommand, XFlowGraphCommands} from '@antv/xflow'
import { IconStore, XFlowNodeCommands, XFlowEdgeCommands } from '@antv/xflow'
import { DeleteOutlined, EditOutlined, StopOutlined,PlayCircleOutlined } from '@ant-design/icons'
import { CustomCommands } from './cmd-extensions/constants'
import { MockApi } from './service'
import {queryComponentStatus, runComponent} from "../axios/xflow";
import { message } from 'antd';

/** menuitem 配置 */
export namespace NsMenuItemConfig {
    /** 注册菜单依赖的icon */
    IconStore.set('DeleteOutlined', DeleteOutlined)
    IconStore.set('EditOutlined', EditOutlined)
    IconStore.set('StopOutlined', StopOutlined)
    IconStore.set('PlayCircleOutlined', PlayCircleOutlined)

    export const DELETE_EDGE: IMenuOptions = {
        id: XFlowEdgeCommands.DEL_EDGE.id,
        label: '删除边',
        iconName: 'DeleteOutlined',
        onClick: async ({ target, commandService }) => {
            commandService.executeCommand<NsEdgeCmd.DelEdge.IArgs>(XFlowEdgeCommands.DEL_EDGE.id, {
                edgeConfig: target.data as NsGraph.IEdgeConfig,
            })
        },
    }

    export const DELETE_NODE: IMenuOptions = {
        id: XFlowNodeCommands.DEL_NODE.id,
        label: '删除节点',
        iconName: 'DeleteOutlined',
        onClick: async ({ target, commandService }) => {
            commandService.executeCommand<NsNodeCmd.DelNode.IArgs>(XFlowNodeCommands.DEL_NODE.id, {
                nodeConfig: { id: target.data.id },
            })
        },
    }

    export const EMPTY_MENU: IMenuOptions = {
        id: 'EMPTY_MENU_ITEM',
        label: '暂无可用',
        isEnabled: false,
        iconName: 'DeleteOutlined',
    }

    export const RENAME_NODE: IMenuOptions = {
        id: CustomCommands.SHOW_RENAME_MODAL.id,
        label: '重命名',
        isVisible: true,
        iconName: 'EditOutlined',
        onClick: async ({ target, commandService }) => {
            const nodeConfig = target.data as NsGraph.INodeConfig
            commandService.executeCommand<NsRenameNodeCmd.IArgs>(CustomCommands.SHOW_RENAME_MODAL.id, {
                nodeConfig,
                updateNodeNameService: MockApi.renameNode,
            })
        },
    }

    export const RUN_NODE: IMenuOptions = {
        id: 'runNode',
        label: '运行',
        iconName: 'PlayCircleOutlined',
        onClick: async (args) => {
            console.log(args)
            const {commandService} = args
            let data = args.target.data
            // 判断是否可以运行
            const canRun = data.canRun(data)
            if(!canRun) {
                message.warning('请先完善节点信息');
                return
            }
            data.params_is_single_debug = 1
            // 修改该节点信息为运行中
            commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(XFlowNodeCommands.UPDATE_NODE.id,{
                nodeConfig:{
                    ...data,
                    status: NsGraphStatusCommand.StatusEnum.PROCESSING,
                }
            })
            // 修改该节点与该节点的前继节点的连线为高亮状态
            // commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
            //   XFlowGraphCommands.SAVE_GRAPH_DATA.id, {
            //       saveGraphDataService: async (_meta, graphData) => {
            //           console.log('graphData: ',graphData)
            //           const {edges} = graphData
            //           for(let i=0;i<edges.length;i++) {
            //               if(edges[i].target === data.id) {
            //                   // 高亮这条线
            //                   commandService.executeCommand(XFlowEdgeCommands.HIGHLIGHT_EDGE.id,{
            //                       edgeId:edges[i].id,
            //                       strokeColor:'blue'
            //                   })
            //               }
            //           }
            //       }
            //   },
            // )
            runComponent(data).then(res => {
                console.log(res)
                const a = setInterval(()=>{
                    queryComponentStatus(res.data).then(res => {
                        console.log(res)
                        let data2 = res.data
                        let status = data2.pipeline_status
                        if(status === 'Running') {

                        }
                        else if(status === 'Succeeded') {
                            clearInterval(a)
                            // 更新本节点
                            commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(XFlowNodeCommands.UPDATE_NODE.id,{
                                nodeConfig:{
                                    ...data,
                                    status: NsGraphStatusCommand.StatusEnum.SUCCESS,
                                    ...data2.nodes[data.params_bd_component_name]['outputs']
                                }
                            })
                            // 更新后继节点
                            const paramList = Object.keys(data2.nodes[data.params_bd_component_name]['outputs'])
                            let params = {}
                            for(let i=0;i<paramList.length;i++) {
                                const oldParam = paramList[i]
                                const newParam = oldParam.replace('output','params')
                                params[newParam] = data2.nodes[data.params_bd_component_name]['outputs'][oldParam]
                            }
                            commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
                              XFlowGraphCommands.SAVE_GRAPH_DATA.id, {
                                  saveGraphDataService: async (_meta, graphData) => {
                                      console.log('graphData: ',graphData)
                                      const {nodes,edges} = graphData
                                      for(let i=0;i<edges.length;i++) {
                                          if(edges[i].source === data.id) {
                                              // 获取target节点原来的信息
                                              let nodeConfig2: NsGraph.INodeConfig = {
                                                  id:"0",
                                              }
                                              for(let j=0;j<nodes.length;j++) {
                                                  if(edges[i].target === nodes[j].id) {
                                                      nodeConfig2 = nodes[j]
                                                  }
                                              }
                                              // 更新后继节点
                                              commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(XFlowNodeCommands.UPDATE_NODE.id,{
                                                  nodeConfig: {
                                                      ...nodeConfig2,
                                                      ...params,
                                                  }
                                              })
                                          }
                                      }
                                  }
                              },
                            )

                        }
                        else if(status === 'Failed') {
                            clearInterval(a)
                            commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(XFlowNodeCommands.UPDATE_NODE.id,{
                                nodeConfig:{
                                    ...data,
                                    status: NsGraphStatusCommand.StatusEnum.ERROR,
                                }
                            })
                        }
                    })
                },5000)
            })
        }
    }

    export const SEPARATOR: IMenuOptions = {
        id: 'separator',
        type: MenuItemType.Separator,
    }
}

export const useMenuConfig = createCtxMenuConfig(config => {
    config.setMenuModelService(async (target, model) => {
        const { type} = target
        console.log('sss',type)
        switch (type) {
            /** 节点菜单 */
            case 'node':
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [NsMenuItemConfig.DELETE_NODE, NsMenuItemConfig.RENAME_NODE,NsMenuItemConfig.RUN_NODE],
                })
                break
            /** 边菜单 */
            case 'edge':
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [NsMenuItemConfig.DELETE_EDGE],
                })
                break
            /** 画布菜单 */
            case 'blank':
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [NsMenuItemConfig.EMPTY_MENU],
                })
                break
            /** 默认菜单 */
            default:
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [NsMenuItemConfig.EMPTY_MENU],
                })
                break
        }
    })
})
