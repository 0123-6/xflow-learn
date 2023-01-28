import React, {useState} from "react";
import {Input, Select} from "antd";
import {NsNodeCmd, XFlowNodeCommands} from "@antv/xflow";

export const DataFiltering = (_targetType, _targetData, _modelService, commandService) => () => {

  const [targetData,setTargetData] = useState(_targetData)
  const options = targetData.params_column_list.map(value => {
    return {
      'label':value,
      value
    }
  })

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
      <div className="pt-4 pb-2 w-full border-b border-white-divide flex text-sm text-black">
        {/*模型名称*/}
        <div className="ml-4">模型名称</div>
        {/*模型名称2*/}
        <div className="ml-5">{targetData.label}</div>
      </div>
      {/*内容*/}
      <div className="w-full flex flex-col"
           style={{paddingLeft:'14px',paddingRight:'15px',}}>
        {/*label*/}
        <div className="w-full mt-6 flex flex-col">
          {/*title*/}
          <span className="flex text-sm text-black-light">节点Label</span>
          {/*输入框*/}
          <Input value={targetData.label} onChange={e => changeLabel(e,'label')} className="mt-2" allowClear size="middle"/>
        </div>
        {/*列选择筛选*/}
        <div className="w-full mt-5 flex flex-col">
          {/*title*/}
          <span className="flex text-sm text-black-light mb-2">列选择筛选</span>
          {/*输入框*/}
          <Select
            value={targetData.params_user_column_filter_list}
            onChange={e => changeLabel(e,'params_user_column_filter_list')}
            allowClear size="middle" mode="multiple" maxTagCount="responsive"
            options={options}/>
        </div>
      </div>
    </div>
  )
}
