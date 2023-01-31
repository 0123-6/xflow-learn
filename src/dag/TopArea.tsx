import React from "react";
import logoPng from '../icon/logo.svg';
import writeDarkSvg from '../icon/write-dark.svg'
import personSvg from '../icon/person.jpg'
import {message, Tooltip} from "antd";

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
          <Tooltip title="上一步" mouseEnterDelay={0} mouseLeaveDelay={0}>
            <div style={{width:'32px',height:'32px'}}
                 className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center text-main hover:text-main-hover active:text-main-focus"
                 onClick={clickUndo}>
              <svg width="22px" height="22px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="按钮备份" transform="translate(-899.000000, -515.000000)">
                    <g id="arrow-go-back-line-(1)" transform="translate(899.000000, 515.000000)">
                      <polygon id="路径" points="0 0 24 0 24 24 0 24"></polygon>
                      <path d="M5.828,7 L8.364,9.536 L6.95,10.95 L2,6 L6.95,1.05 L8.364,2.464 L5.828,5 L13,5 C17.418278,5 21,8.581722 21,13 C21,17.418278 17.418278,21 13,21 L4,21 L4,19 L13,19 C16.3137085,19 19,16.3137085 19,13 C19,9.6862915 16.3137085,7 13,7 L5.828,7 Z" id="路径" fill="currentColor" fill-rule="nonzero"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Tooltip>
          {/*重做*/}
          <Tooltip title="下一步" mouseEnterDelay={0} mouseLeaveDelay={0}>
            <div style={{width:'32px',height:'32px',marginLeft:'18px'}}
                 className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center text-main hover:text-main-hover active:text-main-focus"
                 onClick={clickRedo}>
              <svg width="22px" height="22px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="按钮备份" transform="translate(-955.000000, -515.000000)">
                    <g id="arrow-go-forward-line" transform="translate(955.000000, 515.000000)">
                      <polygon id="路径" points="0 0 24 0 24 24 0 24"></polygon>
                      <path d="M18.172,7 L11,7 C7.6862915,7 5,9.6862915 5,13 C5,16.3137085 7.6862915,19 11,19 L20,19 L20,21 L11,21 C6.581722,21 3,17.418278 3,13 C3,8.581722 6.581722,5 11,5 L18.172,5 L15.636,2.464 L17.05,1.05 L22,6 L17.05,10.95 L15.636,9.536 L18.172,7 Z" id="路径" fill="currentColor" fill-rule="nonzero"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Tooltip>
          {/*分割线*/}
          <div style={{marginLeft:'18px',width:'1px',height:'18px'}}
               className="bg-white-divide">
          </div>
          {/*开始*/}
          <Tooltip title="运行实验" mouseEnterDelay={0} mouseLeaveDelay={0}>
            <div style={{width:'32px',height:'32px',marginLeft:'18px'}}
                 className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center text-main hover:text-main-hover active:text-main-focus"
                 onClick={clickPlay}>
              <svg width="22px" height="22px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="按钮备份" transform="translate(-1044.000000, -515.000000)">
                    <g id="play-circle-line-(2)" transform="translate(1044.000000, 515.000000)">
                      <polygon id="路径" points="0 0 24 0 24 24 0 24"></polygon>
                      <path d="M12,22 C6.477,22 2,17.523 2,12 C2,6.477 6.477,2 12,2 C17.523,2 22,6.477 22,12 C22,17.523 17.523,22 12,22 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M10.622,8.415 L15.501,11.667 C15.6124353,11.7411597 15.67939,11.8661438 15.67939,12 C15.67939,12.1338562 15.6124353,12.2588403 15.501,12.333 L10.621,15.585 C10.4984097,15.6662611 10.3411132,15.6736917 10.2114085,15.6043488 C10.0817039,15.5350059 10.0005161,15.4000764 10,15.253 L10,8.747 C10.0002726,8.59958881 10.0816005,8.46427484 10.2116462,8.39486134 C10.341692,8.32544785 10.4993759,8.3331864 10.622,8.415 Z" id="形状" fill="currentColor" fill-rule="nonzero"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Tooltip>
          {/*保存*/}
          <Tooltip title="保存实验" mouseEnterDelay={0} mouseLeaveDelay={0}>
            <div style={{width:'32px',height:'32px',marginLeft:'18px'}}
                 className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center text-orange hover:text-orange-hover active:text-orange-focus"
                 onClick={clickSave}>
              <svg width="22px" height="22px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="按钮备份" transform="translate(-1100.000000, -515.000000)">
                    <g id="save-line" transform="translate(1100.000000, 515.000000)">
                      <polygon id="路径" points="0 0 24 0 24 24 0 24"></polygon>
                      <path d="M7,19 L7,13 L17,13 L17,19 L19,19 L19,7.828 L16.172,5 L5,5 L5,19 L7,19 Z M4,3 L17,3 L21,7 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 Z M9,15 L9,19 L15,19 L15,15 L9,15 Z" id="形状" fill="currentColor" fill-rule="nonzero"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Tooltip>
          {/*文件*/}
          <Tooltip title="保存加工流程" mouseEnterDelay={0} mouseLeaveDelay={0}>
            <div style={{width:'32px',height:'32px',marginLeft:'18px'}}
                 className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center text-blue-icon hover:text-blue-icon-hover active:text-blue-icon-focus"
                 onClick={clickFile}>
              <svg width="22px" height="22px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="按钮备份" transform="translate(-1156.000000, -515.000000)">
                    <g id="file-text-line-(1)" transform="translate(1156.000000, 515.000000)">
                      <polygon id="路径" points="0 0 24 0 24 24 0 24"></polygon>
                      <path d="M21.0000247,8 L21.0000247,20.993 C21.001863,21.2582184 20.8982888,21.5133136 20.7120638,21.7021642 C20.5258387,21.8910147 20.2722185,21.99815 20.007,22 L3.993,22 C3.44497153,22 3.00055189,21.5560282 3,21.008 L3,2.992 C3,2.455 3.449,2 4.002,2 L14.997,2 L21.0000247,8 Z M19,9 L14,9 L14,4 L5,4 L5,20 L19,20 L19,9 Z M8,7 L11,7 L11,9 L8,9 L8,7 Z M8,11 L16,11 L16,13 L8,13 L8,11 Z M8,15 L16,15 L16,17 L8,17 L8,15 Z" id="形状" fill="currentColor" fill-rule="nonzero"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Tooltip>
          {/*关机*/}
          <Tooltip title="退出实验" mouseEnterDelay={0} mouseLeaveDelay={0}>
            <div style={{width:'32px',height:'32px',marginLeft:'18px',color:'#A09D9D'}}
                 className="rounded hover:bg-white-bg hover:cursor-pointer flex justify-center items-center"
                 onClick={clickClose}>
              <svg width="28px" height="28px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="按钮备份" transform="translate(-1208.000000, -512.000000)">
                    <g id="edit-circle-line" transform="translate(1224.970563, 528.970563) rotate(-45.000000) translate(-1224.970563, -528.970563) translate(1212.970563, 516.970563)">
                      <polygon id="路径" points="0 0 24 0 24 24 0 24"></polygon>
                      <path d="M12.684,4.029 C9.33559541,3.74177405 6.16465494,5.57789922 4.74694464,8.62493213 C3.32923433,11.671965 3.96704255,15.2802083 6.34341711,17.6565829 C8.71979166,20.0329574 12.328035,20.6707657 15.3750679,19.2530554 C18.4221008,17.8353451 20.258226,14.6644046 19.971,11.316 C19.900889,10.4757991 19.6973367,9.65213818 19.368,8.876 L20.868,7.374 C21.6148845,8.80138777 22.0033839,10.3890187 22.0000219,11.9999961 C22.0000219,17.523 17.523,21.9999961 12,21.9999961 C6.477,21.9999961 2,17.523 2,11.9999961 C2,6.477 6.477,1.99999606 12,1.99999606 C13.6107474,1.99856877 15.1979181,2.38695555 16.626,3.132 L15.125,4.632 C14.3488348,4.30274429 13.5251871,4.09919528 12.685,4.029 L12.684,4.029 Z M20.485,2.1 L21.9,3.515 L12.708,12.707 L11.296,12.71 L11.294,11.293 L20.485,2.1 Z" id="形状" fill="currentColor" fill-rule="nonzero"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Tooltip>
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
