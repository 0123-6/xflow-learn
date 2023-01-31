import React from 'react'
import {
  // DatabaseOutlined,
  RedoOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import type {NsGraph} from '@antv/xflow'
import {NsGraphStatusCommand} from '@antv/xflow'
import './algo-node.less'
import modelSvg from '../../icon/model.svg'
import pictureAdd from '../../icon/picture-add.svg'
import play2 from '../../icon/play-2.svg'
import car from '../../icon/car.svg'
import car2 from '../../icon/car-2.svg'
import filter from '../../icon/filter.svg'
import statistics from '../../icon/statistics.svg'
import power from '../../icon/power.svg'


// const fontStyle = {fontSize: '16px', color: '#3057e3'}

interface IProps {
  status: NsGraphStatusCommand.StatusEnum
  hide: boolean
}

export const AlgoIcon: React.FC<IProps> = props => {
  // console.log('algo icon: ',props)
  if (props.hide) {
    return null
  }
  switch (props.status) {
    case NsGraphStatusCommand.StatusEnum.PROCESSING:
      return <RedoOutlined spin style={{color: '#c1cdf7', fontSize: '16px'}}/>
    case NsGraphStatusCommand.StatusEnum.ERROR:
      return <CloseCircleOutlined style={{color: '#ff4d4f', fontSize: '16px'}}/>
    case NsGraphStatusCommand.StatusEnum.SUCCESS:
      return <CheckCircleOutlined style={{color: '#39ca74cc', fontSize: '16px'}}/>
    case NsGraphStatusCommand.StatusEnum.WARNING:
      return <ExclamationCircleOutlined style={{color: '#faad14', fontSize: '16px'}}/>
    case NsGraphStatusCommand.StatusEnum.DEFAULT:
      return <InfoCircleOutlined style={{color: '#d9d9d9', fontSize: '16px'}}/>
    default:
      return null
  }
}

export const AlgoNode: NsGraph.INodeRender = props => {
  let icon = null
  console.log(props);
  let who = props.data.parentId
  if(who === '读取数据') {
    icon = modelSvg
  } else if (who === '调整图片尺寸') {
    icon = pictureAdd
  } else if (who === '视频解码') {
    icon = play2
  } else if (who === '车辆检测') {
    icon = car
  } else if (who === '车流量统计') {
    icon = car2
  } else if (who === '数据筛选') {
    icon = filter
  } else if (who === 'Min-Max标准化') {
    icon = statistics
  } else if (who === '熵权法') {
    icon = power
  }
  return (
    <div className={`xflow-algo-node ${props.isNodeTreePanel ? 'panel-node' : ''}`}>
      <span className="icon">
        {/*<DatabaseOutlined style={fontStyle}/>*/}
        <img src={icon} alt=""/>
      </span>
      <span className="label">{props.data.label}hhh</span>
      <span className="status flex justify-center items-center mr-1">
        <AlgoIcon status={props.data && props.data.status} hide={props.isNodeTreePanel}/>
      </span>
    </div>
  )
}
