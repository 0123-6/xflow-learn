import React, {useState} from "react";
import {Input, Select} from "antd";
import {NsNodeCmd, XFlowNodeCommands} from "@antv/xflow";

export const ReadData = (_targetType, _targetData, _modelService, commandService) => () => {

  const [targetData,setTargetData] = useState(_targetData)
  const options = [
    {
      label: 'csv表格',
      value: 'csv',
    },
    {
      label: '视频',
      value: 'video',
    },
  ]

  const changeLabel = (e,key) => {
    // 普通input框，取e.target.value,数字input框,取e
    const value = e.target ? e.target.value : e;
    setTargetData({
      ...targetData,
      [key]: value
    })
    // @ts-ignore
    let executeCommand = commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(XFlowNodeCommands.UPDATE_NODE.id,{
      nodeConfig:{
        ...targetData,
        [key]: value
      }
    });
  }

  return (
    //最外层
    <div className="w-full h-full flex flex-col bg-white">
      {/*标题*/}
      <div className="pt-4 pb-2 w-full flex text-sm text-black">
        {/*模型名称*/}
        <div className="ml-4">模型名称</div>
        {/*模型名称2*/}
        <div className="ml-5">{targetData.label}</div>
      </div>
      {/*内容*/}
      <div className="w-full flex flex-col"
           style={{paddingLeft:'14px',paddingRight:'15px',}}>
        {/*label*/}
        <div className="w-full mt-2 flex items-center">
          {/*title*/}
          <span className="flex text-sm text-black-light mr-3" style={{width:'56px'}}>节点名称</span>
          {/*输入框*/}
          <Input className="flex-1" value={targetData.label} onChange={e => changeLabel(e,'label')} allowClear size="middle"/>
        </div>
        {/*数据类型*/}
        <div className="w-full mt-5 flex items-center text-sm text-black-light">
          <span className="mr-3">数据类型</span>
          <Select
            className="flex-1"
            value={targetData.params_user_data_type}
            onChange={e => changeLabel(e,'params_user_data_type')}
            allowClear size="middle"
            options={options}/>
        </div>
        {/*数据路径*/}
        <div className="w-full mt-6 flex flex-col">
          {/*title*/}
          <span className="flex text-sm text-black-light">数据路径</span>
          {/*输入框*/}
          <Input value={targetData.params_user_data_path_url} onChange={e => changeLabel(e,'params_user_data_path_url')} className="mt-2" allowClear size="middle"/>
        </div>
      </div>
    </div>
  )
}
