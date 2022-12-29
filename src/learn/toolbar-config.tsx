import type {IToolbarItemOptions, NsGraphCmd, NsNodeCmd} from '@antv/xflow'
import {createToolbarConfig, IconStore, MODELS, NsGraph, XFlowGraphCommands, XFlowNodeCommands} from '@antv/xflow'
import {DeleteOutlined, PlusCircleOutlined, SaveOutlined} from '@ant-design/icons'
import {message} from 'antd'
import AnchorGroup = NsGraph.AnchorGroup;

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

// 拓扑排序,输入为一张图的节点数组和边数组
function mySort(data,iiii) {
  console.log('第'+iiii+'个联通子图: ',data);
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
      console.error('第'+iiii+'个联通子图: '+'存在环，拓扑排序失败')
      break
    }
    let node = nodeMap.get(nodeId);
    nodeMap.delete(nodeId);
    result.push(node.id)
    nodeMap.forEach((node2) => {
      node2.decBeforeNodeList(nodeId)
    })
  }
  console.log('第'+iiii+'个联通子图: '+'拓扑排序结果: ',result)
}

// 将data中的节点和边分组，按照联通子图
function getChildrenGraph(data) {
  // console.log(data)
  let result = []

  // 找出联通子图
  // 将为分类的节点数组
  let willClassifyNodeList = [...data.nodes]
  let willClassifyEdgeList = [...data.edges]
  // console.log(willClassifyNodeList)
  // console.log(willClassifyEdgeList)
  // 如果待分类的节点数组不为空
  while (willClassifyNodeList.length > 0) {
    // 创建一个新的联通子图
    let childGraph = {
      nodes: [],
      edges: [],
    }
    // 从待分类的节点数组中取一个，放入这个bfs数组中
    // bfsList中的节点，willClassifyNodeList已没有，但还没有放到childGraph中
    let bfsList = []
    let node = willClassifyNodeList[0]
    willClassifyNodeList.splice(0,1);
    bfsList.push(node)
    // bfs
    while (bfsList.length > 0) {
      let node2 = bfsList[0]
      bfsList.splice(0,1);

      // 把和node2有关系的边和顶点找到，边直接放到graph.edges中，顶点放到bfsList中
      // node2为source
      for(let i=0;i<willClassifyEdgeList.length;i++) {

        if(willClassifyEdgeList[i].source === node2.id) {
          // 有以该节点为source的边
          let targetNodeId = willClassifyEdgeList[i].target
          for(let j=0;j<willClassifyNodeList.length;j++) {
            if(willClassifyNodeList[j].id === targetNodeId) {
              bfsList.push(willClassifyNodeList[j])
              willClassifyNodeList.splice(j,1)
              break
            }
          }
          // 删除掉该边
          childGraph.edges.push(willClassifyEdgeList[i])
          willClassifyEdgeList.splice(i,1)
          i -= 1
        }
      }
      // ndoe2为target
      for(let i=0;i<willClassifyEdgeList.length;i++) {

        if(willClassifyEdgeList[i].target === node2.id) {
          // 有以该节点为source的边
          let targetNodeId = willClassifyEdgeList[i].source
          for(let j=0;j<willClassifyNodeList.length;j++) {
            if(willClassifyNodeList[j].id === targetNodeId) {
              bfsList.push(willClassifyNodeList[j])
              willClassifyNodeList.splice(j,1)
              break
            }
          }
          // 删除掉该边
          childGraph.edges.push(willClassifyEdgeList[i])
          willClassifyEdgeList.splice(i,1)
          i -= 1
        }
      }

      childGraph.nodes.push(node2)
    }
    // bfs结束，该联通子图的节点和边已经保存在childGraph中
    // 将创建的联通子图放入联通子图数组中
    result.push(childGraph);
  }

  return result
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
            ports:[
              {
                id:nodeName+'input1',
                type:NsGraph.AnchorType.INPUT,
                group:AnchorGroup.TOP,
                tooltip:'这是一个自定义输入顶点',
              },
              {
                id:nodeName+'input2',
                type:NsGraph.AnchorType.INPUT,
                group:AnchorGroup.TOP,
                tooltip:'这是一个自定义输入顶点',
              },
              {
                id:nodeName+'output1',
                type:NsGraph.AnchorType.OUTPUT,
                group:AnchorGroup.BOTTOM,
                tooltip:'这是一个自定义输出顶点',
              },
            ],
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
              // 将图中的所有节点分组(联通子图)
              const childrenGraph = getChildrenGraph(data);
              console.log('共存在'+childrenGraph.length+'个联通子图:',childrenGraph)
              for(let i=0;i<childrenGraph.length;i++) {
                mySort(childrenGraph[i],i+1)
              }
              // mySort(data);
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
