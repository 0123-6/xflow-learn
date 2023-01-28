import React, {useState} from "react";
import {Input, InputNumber} from "antd";
import {NsNodeCmd, XFlowNodeCommands} from "@antv/xflow";

export const TrafficStatistics = (_targetType, _targetData, _modelService, commandService) => () => {

  const [targetData,setTargetData] = useState(_targetData)

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
        {/*检测区域*/}
        <div className="w-full mt-6 flex flex-col text-sm text-black-light">
          {/*title*/}
          <span className="flex text-sm text-black-light">检测区域</span>
          {/*点1*/}
          <div className="w-full mt-2 flex justify-between">
            {/*x*/}
            <div className="flex items-center"
                 style={{width:'calc(50% - 10px)'}}>
              <span className="mr-2">x1</span>
              <InputNumber value={targetData.params_user_detection_location_x1} onChange={e => changeLabel(e,'params_user_detection_location_x1')} size="middle"/>
            </div>
            {/*y*/}
            <div className="flex items-center"
                 style={{width:'calc(50% - 10px)'}}>
              <span className="mr-2">y1</span>
              <InputNumber value={targetData.params_user_detection_location_y1} onChange={e => changeLabel(e,'params_user_detection_location_y1')} size="middle"/>
            </div>
          </div>
          {/*点2*/}
          <div className="w-full mt-2 flex justify-between">
            {/*x*/}
            <div className="flex items-center"
                 style={{width:'calc(50% - 10px)'}}>
              <span className="mr-2">x2</span>
              <InputNumber value={targetData.params_user_detection_location_x2} onChange={e => changeLabel(e,'params_user_detection_location_x2')} size="middle"/>
            </div>
            {/*y*/}
            <div className="flex items-center"
                 style={{width:'calc(50% - 10px)'}}>
              <span className="mr-2">y2</span>
              <InputNumber value={targetData.params_user_detection_location_y2} onChange={e => changeLabel(e,'params_user_detection_location_y2')} size="middle"/>
            </div>
          </div>
          {/*点3*/}
          <div className="w-full mt-2 flex justify-between">
            {/*x*/}
            <div className="flex items-center"
                 style={{width:'calc(50% - 10px)'}}>
              <span className="mr-2">x3</span>
              <InputNumber value={targetData.params_user_detection_location_x3} onChange={e => changeLabel(e,'params_user_detection_location_x3')} size="middle"/>
            </div>
            {/*y*/}
            <div className="flex items-center"
                 style={{width:'calc(50% - 10px)'}}>
              <span className="mr-2">y3</span>
              <InputNumber value={targetData.params_user_detection_location_y3} onChange={e => changeLabel(e,'params_user_detection_location_y3')} size="middle"/>
            </div>
          </div>
          {/*点4*/}
          <div className="w-full mt-2 flex justify-between">
            {/*x*/}
            <div className="flex items-center"
                 style={{width:'calc(50% - 10px)'}}>
              <span className="mr-2">x4</span>
              <InputNumber value={targetData.params_user_detection_location_x4} onChange={e => changeLabel(e,'params_user_detection_location_x4')} size="middle"/>
            </div>
            {/*y*/}
            <div className="flex items-center"
                 style={{width:'calc(50% - 10px)'}}>
              <span className="mr-2">y4</span>
              <InputNumber value={targetData.params_user_detection_location_y4} onChange={e => changeLabel(e,'params_user_detection_location_y4')} size="middle"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
