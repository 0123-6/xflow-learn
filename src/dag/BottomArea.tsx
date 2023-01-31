import React from "react";
// import playSvg from '../icon/bottom-play.svg';
// import saveSvg from '../icon/bottom-save.svg'
import {message} from "antd";
import {NsGraphCmd, useXFlowApp, XFlowGraphCommands} from "@antv/xflow";
import {saveExperiment} from "../axios/xflow";

export const BottomArea:React.FC = () => {
  const app = useXFlowApp()

  const clickRun = () => {
    message.warn('该功能正在开发中')
    app.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
      XFlowGraphCommands.SAVE_GRAPH_DATA.id,
      {
        saveGraphDataService: async (_meta, graphData) => {
          console.log('图的信息：')
          console.log(graphData)
        }
      },
    )
  }

  const clickSave = () => {
    message.warn('该功能正在开发中')
    app.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
      XFlowGraphCommands.SAVE_GRAPH_DATA.id,
      {
        saveGraphDataService: async (_meta, graphData) => {
          console.log('图的信息：')
          console.log(graphData)
          let params = {
            "id": 1,
            "name": "试验1",
            "user_id": 1,
            "description": "介绍信息",
            "content": graphData
          }
          saveExperiment(params).then(res => {
            console.log(res)
          })
        }
      },
    )
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-white"
         style={{boxShadow: '0px 5px 18px 0px rgba(205,205,205,0.11)'}}>
      {/*运行试验*/}
      <div className="border border-main rounded-lg flex justify-center items-center text-main text-sm
                      hover:cursor-pointer hover:border-main-hover hover:text-main-hover
                      active:border-main-focus active:text-main-focus"
           style={{width:'104px',height:'32px'}}
           onClick={clickRun}>
        {/*左，图标按钮*/}
        <div className="mr-2">
          <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
               xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="按钮备份" transform="translate(-949.000000, -635.000000)">
                <g id="play-normal" transform="translate(949.000000, 635.000000)">
                  <polygon id="路径" points="0 0 18 0 18 18 0 18"></polygon>
                  <path d="M12.2955,9 L7.5,5.80275 L7.5,12.19725 L12.2955,9 Z M14.532,9.312 L6.58275,14.6115 C6.46769046,14.6880666 6.31984251,14.6951393 6.19799958,14.6299055 C6.07615664,14.5646717 6,14.4377069 6,14.2995 L6,3.7005 C6,3.56229311 6.07615664,3.43532826 6.19799958,3.37009446 C6.31984251,3.30486066 6.46769046,3.31193335 6.58275,3.3885 L14.532,8.688 C14.6363082,8.75755244 14.6989591,8.8746296 14.6989591,9 C14.6989591,9.1253704 14.6363082,9.24244756 14.532,9.312 L14.532,9.312 Z" id="形状" fill="currentColor" fill-rule="nonzero"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        {/*右，文字*/}
        <span>运行实验</span>
      </div >
      {/*保存实验*/}
      <div className="border border-main rounded-lg flex justify-center items-center text-main text-sm
                      hover:cursor-pointer hover:border-main-hover hover:text-main-hover
                      active:border-main-focus active:text-main-focus"
           style={{width:'104px',height:'32px',marginLeft:'22px',}}
           onClick={clickSave}>
        {/*左，图标按钮*/}
        <div className="mr-2">
          <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="按钮备份" transform="translate(-996.000000, -635.000000)">
                <g id="save-normal" transform="translate(996.000000, 635.000000)">
                  <polygon id="路径" points="0 0 18 0 18 18 0 18"></polygon>
                  <path d="M13.5,14.25 L14.25,14.25 L14.25,5.121 L12.879,3.75 L12,3.75 L12,6.75 L5.25,6.75 L5.25,3.75 L3.75,3.75 L3.75,14.25 L4.5,14.25 L4.5,9 L13.5,9 L13.5,14.25 Z M3,2.25 L13.5,2.25 L15.53025,4.28025 C15.670912,4.42086955 15.75,4.61160389 15.75,4.8105 L15.75,15 C15.75,15.4142136 15.4142136,15.75 15,15.75 L3,15.75 C2.58578644,15.75 2.25,15.4142136 2.25,15 L2.25,3 C2.25,2.58578644 2.58578644,2.25 3,2.25 Z M6,10.5 L6,14.25 L12,14.25 L12,10.5 L6,10.5 Z" id="形状" fill="currentColor" fill-rule="nonzero"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
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
