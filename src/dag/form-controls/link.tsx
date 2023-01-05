import type { NsJsonSchemaForm } from '@antv/xflow'
import React from 'react'
import { Input } from 'antd';

export const LinkShape: React.FC<NsJsonSchemaForm.IControlProps> = props => {
  console.log('LinkShape自定义组件的props: ',props)
    const { controlSchema } = props
    return (
        <div style={{ padding: '8px 0px', marginBottom: '8px' }}>
            <a href={controlSchema.value as string} target="_blank" style={{ color: 'red',fontSize:'20px' }}>
                {controlSchema.label}
            </a>
          <Input placeholder="Basic usage" size="large"/>
        </div>
    )
}
