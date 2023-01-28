import React from "react";
import logoPng from '../icon/logo.svg';
import writeDarkSvg from '../icon/write-dark.svg'
import personSvg from '../icon/person.jpg'
import undoSvg from '../icon/arrow-go-back.svg'
import redoSvg from '../icon/arrow-go-forward.svg'
import playSvg from '../icon/play.svg'
import saveSvg from '../icon/save.svg'
import fileSvg from '../icon/file.svg'
import closeSvg from '../icon/close-black.svg'
import {message} from "antd";

export const TopArea:React.FC = () => {

  const clickUndo = () => {
    message.warn('该功能正在开发')
  }

  const clickRedo = () => {
    message.warn('该功能正在开发')
  }

  const clickPlay = () => {
    message.warn('该功能正在开发')
  }

  const clickFile = () => {
    message.warn('该功能正在开发')
  }

  const clickSave = () => {
    message.warn('该功能正在开发')
  }

  const clickClose = () => {
    message.warn('该功能正在开发')
  }

  return (
    //最外层
    <div className="w-full h-full flex justify-between items-center bg-white border-b border-white-divide">
      {/*左*/}
      <div className="h-full flex items-center">
        {/*logo*/}
        <img src={logoPng} style={{marginLeft: '27px'}} width="140px" height="37px"/>
        {/*名称*/}
        <div style={{marginLeft:'85px'}}
             className="flex items-center">
          {/*文字*/}
          <span className="text-sm font-semibold" style={{color:'#323232',lineHeight:'14px'}}>企业发展力指数</span>
          <img style={{marginLeft:'10px'}} src={writeDarkSvg} alt="" width="12px" height="12px"/>
        </div>
      </div>
      {/*右*/}
      <div className="h-full flex items-center">
        {/*操作区域*/}
        <div className="h-full flex items-center">
          {/*撤销*/}
          <div style={{width:'32px',height:'32px'}}
               className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center"
               onClick={clickUndo}>
            <img src={undoSvg} alt="" width="20px" height="20px"/>
          </div>
          {/*重做*/}
          <div style={{width:'32px',height:'32px',marginLeft:'26px'}}
               className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center"
               onClick={clickRedo}>
            <img src={redoSvg} alt="" width="20px" height="20px"/>
          </div>
          {/*分割线*/}
          <div style={{marginLeft:'26px',width:'1px',height:'26px'}}
               className="bg-white-divide">
          </div>
          {/*开始*/}
          <div style={{width:'32px',height:'32px',marginLeft:'26px'}}
               className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center"
               onClick={clickPlay}>
            <img src={playSvg} alt="" width="20px" height="20px"/>
          </div>
          {/*保存*/}
          <div style={{width:'32px',height:'32px',marginLeft:'26px'}}
               className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center"
               onClick={clickSave}>
            <img src={saveSvg} alt="" width="20px" height="20px"/>
          </div>
          {/*文件*/}
          <div style={{width:'32px',height:'32px',marginLeft:'26px'}}
               className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center"
               onClick={clickFile}>
            <img src={fileSvg} alt="" width="20px" height="20px"/>
          </div>
          {/*关机*/}
          <div style={{width:'32px',height:'32px',marginLeft:'26px'}}
               className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center"
               onClick={clickClose}>
            <img src={closeSvg} alt="" width="28px" height="28px"/>
          </div>
        </div>
        {/*头像区域*/}
        <div style={{marginLeft:'158px'}} className="mr-9 h-full flex items-center">
          {/*头像*/}
          <div className="rounded-full overflow-hidden outline-2 outline outline-white-divide"
               style={{width:'36px',height:'36px'}}>
            <img className="" src={personSvg} alt="" width="36px"/>
          </div>
          {/*昵称*/}
          <span className="ml-2 text-sm text-black font-semibold">演示账号</span>
        </div>
      </div>
    </div>
  )
}
