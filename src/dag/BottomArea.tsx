import React from "react";
import playSvg from '../icon/play.svg';
import saveSvg from '../icon/save.svg'
import {message} from "antd";

export const BottomArea:React.FC = () => {

  const clickRun = () => {
    message.warn('该功能正在开发中')
  }

  const clickSave = () => {
    message.warn('该功能正在开发中')
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-white"
         style={{boxShadow: '0px 5px 18px 0px rgba(205,205,205,0.11)'}}>
      {/*运行试验*/}
      <div className="border border-main rounded-lg flex justify-center items-center text-main text-sm hover:cursor-pointer"
           style={{width:'104px',height:'32px'}}
           onClick={clickRun}>
        {/*左，图标按钮*/}
        <img className="mr-2" src={playSvg} alt="" width="18px" height="18px"/>
        {/*右，文字*/}
        <span>运行实验</span>
      </div >
      {/*保存实验*/}
      <div className="border border-main rounded-lg flex justify-center items-center text-main text-sm hover:cursor-pointer"
           style={{width:'104px',height:'32px',marginLeft:'22px',}}
           onClick={clickSave}>
        {/*左，图标按钮*/}
        <img className="mr-2" src={saveSvg} alt="" width="18px" height="18px"/>
        {/*右，文字*/}
        <span>保存实验</span>
      </div>
      {/*保存加工流程*/}
      <div style={{marginLeft:'126px',width:'134px',height:'32px',lineHeight:'14px'}}
           onClick={clickSave}
           className="rounded-lg bg-main shadow-button text-sm text-white hover:cursor-pointer hover:bg-main-hover active:bg-main-focus flex justify-center items-center">
        <span>保存加工流程</span>
      </div>
    </div>
  )
}
