import type {IToolbarItemOptions} from '@antv/xflow'
import {createToolbarConfig, MODELS} from '@antv/xflow'
import {XFlowGraphCommands, XFlowNodeCommands, IconStore} from '@antv/xflow'
import {SaveOutlined, PlusCircleOutlined, DeleteOutlined} from '@ant-design/icons'
import {message} from 'antd'
import type {NsGraphCmd, NsNodeCmd} from '@antv/xflow'

class MyNode {
  id: any;
  beforeNodeList: Array<any>;
  afterNodeList: Array<any>;

  constructor(id) {
    this.id = id
    this.beforeNodeList = []
    this.afterNodeList = []
  }

  setBeforeNodeList(list) {
    this.beforeNodeList = list
  }

  addBeforeNodeList(nodeId) {
    this.beforeNodeList.push(nodeId);
  }

  decBeforeNodeList(nodeId) {
    let index = this.beforeNodeList.indexOf(nodeId);
    if (index !== -1) {
      this.beforeNodeList.splice(index, 1);
    }
  }

  setAfterNodeList(list) {
    this.afterNodeList = list
  }

  addAfterNodeList(nodeId) {
    this.afterNodeList.push(nodeId);
  }

  decAfterNodeList(nodeId) {
    let index = this.afterNodeList.indexOf(nodeId);
    if (index !== -1) {
      this.afterNodeList.splice(index, 1);
    }
  }
}

function mySort(data) {
  console.log(data);
  let nodeMap = new Map();
  let result = [];
  for (let i = 0; i < data.nodes.length; i++) {
    let node = data.nodes[i]
    let node2 = new MyNode(node.id);
    nodeMap.set(node2.id, node2)
  }
  for (let i = 0; i < data.edges.length; i++) {
    let edge = data.edges[i]
    nodeMap.get(edge.source).addAfterNodeList(edge.target);
    nodeMap.get(edge.target).addBeforeNodeList(edge.source);
  }
  while (nodeMap.size > 0) {
    let nodeId = -1
    nodeMap.forEach((node) => {
      if (nodeId === -1 && node.beforeNodeList.length === 0) {
        nodeId = node.id
      }
    })
    if (nodeId === -1) {
      console.error('存在环，拓扑排序失败')
      break
    }
    let node = nodeMap.get(nodeId);
    nodeMap.delete(nodeId);
    result.push(node.id)
    nodeMap.forEach((node2) => {
      node2.decBeforeNodeList(nodeId)
    })
  }
  console.log(result)
}

namespace NSToolbarConfig {
  /** 注册icon 类型 */
  IconStore.set('PlusCircleOutlined', PlusCircleOutlined)
  IconStore.set('DeleteOutlined', DeleteOutlined)
  IconStore.set('SaveOutlined', SaveOutlined)
  /** nodeId */
  let id = 1
  /**获取toolbar依赖的状态*/
  export const getToolbarState = async (modelService) => {
    const node = await MODELS.SELECTED_NODE.useValue(modelService);
    let obj = {
      selectedNode:null,
      isSelectedNode:false,
    }
    if(node === null) {
      console.log('无')
      obj.selectedNode = null
      obj.isSelectedNode = false
    } else {
      obj.selectedNode = node.data
      obj.isSelectedNode = true
    }
    return obj
  }
  /** 获取toobar配置项 */
  export const getToolbarItems = async (state) => {
    const toolbarGroup1: IToolbarItemOptions[] = []
    /** 保存数据 */
    toolbarGroup1.push({
      id: XFlowNodeCommands.ADD_NODE.id,
      iconName: 'PlusCircleOutlined',
      tooltip: '添加节点',
      onClick: async ({commandService}) => {
        const nodeName = `Node-${id}`
        commandService.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
          nodeConfig: {
            id: nodeName,
            label: nodeName,
            x: 100 + id * 5,
            y: 50 + id * 5,
            width: 160,
            height: 32,
          },
        })
        id += 1
      },
    })
    toolbarGroup1.push({
      id: XFlowNodeCommands.MOVE_NODE.id,
      iconName: 'DeleteOutlined',
      tooltip: '删除节点',
      isEnabled: state.isSelectedNode,
      onClick: async ({commandService}) => {
        commandService.executeCommand(XFlowNodeCommands.DEL_NODE.id,{
          nodeConfig:state.selectedNode
        })
        message.success(`${XFlowNodeCommands.DEL_NODE.label}: 命令执行成功`)
      }
    })

    /** 保存数据 */
    toolbarGroup1.push({
      id: XFlowGraphCommands.SAVE_GRAPH_DATA.id,
      iconName: 'SaveOutlined',
      tooltip: '保存数据',
      onClick: async ({commandService}) => {
        commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
          XFlowGraphCommands.SAVE_GRAPH_DATA.id,
          {
            saveGraphDataService: async (_meta, data) => {
              // console.log(data)
              mySort(data);
              message.success('nodes count:' + data.nodes.length)
            },
          },
        )
      },
    })

    return [
      {name: 'nodeGroup', items: toolbarGroup1}
    ]
  }
}

/** wrap出一个hook */
export const useToolbarConfig = createToolbarConfig(toolbarConfig => {
  /** 生产 toolbar item */
  toolbarConfig.setToolbarModelService(async (toolbarModel, modelService) => {
    const updateToolbarState = async () => {
      const toolbarState = await NSToolbarConfig.getToolbarState(modelService);
      const toolbarItems = await NSToolbarConfig.getToolbarItems(toolbarState)
      toolbarModel.setValue(toolbar => {
        toolbar.mainGroups = toolbarItems
      })
    }
    const model = await MODELS.SELECTED_NODE.getModel(modelService);
    model.watch(() => {
      updateToolbarState()
    })
  })

})
