import type { NsJsonSchemaForm } from '@antv/xflow'
import { FormItemWrapper } from '@antv/xflow'
import { Form ,Select as DSelect} from 'antd'
import React from 'react'

export const SelectMuiti: React.FC<NsJsonSchemaForm.IControlProps> = props => {
  const { controlSchema } = props
  // @ts-ignore
  const { required, tooltip, extra, name,optionsMuiti,label } = controlSchema
  const options = optionsMuiti

  return (
    <FormItemWrapper schema={controlSchema}>
      {({ hidden, initialValue }) => {
        return (
          <Form.Item
            name={name}
            label={label}
            initialValue={initialValue}
            tooltip={tooltip}
            extra={extra}
            required={required}
            hidden={hidden}
          >
            <DSelect options={options} mode="multiple"/>
          </Form.Item>
        )
      }}
    </FormItemWrapper>
  )
}
