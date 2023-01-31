import React from "react";

export const Panel = (_targetType, _targetData, _modelService) => () => {

  return (
    //最外层
    <div className="w-full h-full flex flex-col bg-white">
      {/*标题*/}
      <div className="pt-4 pb-2 w-full flex text-sm text-black">
        {/*模型名称*/}
        <div className="ml-4">编辑面板</div>
        {/*模型名称2*/}
        {/*<div className="ml-5">{targetData.label}</div>*/}
      </div>
      {/*内容*/}
      <div className="w-full flex flex-col"
           style={{paddingLeft:'14px',paddingRight:'15px',}}>
      </div>
    </div>
  )
}
