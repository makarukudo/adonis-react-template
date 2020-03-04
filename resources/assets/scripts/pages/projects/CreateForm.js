import React, { useState, useEffect } from 'react'
import useGlobal from '../../services/useGlobal'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Select,
  Alert
} from 'antd'

const { Option } = Select


function CreateForm({ form, onCreate }) {

  // console.log('Form', form)
  const initState = { search: '', users: [] }
  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)
  const { getFieldDecorator } = form

  useEffect(() => {
    if (!gState.professionalsLoaded) {
      gActions.getProfessionals()
    }
  })

  function onSubmitHandler(e) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err === null) {
        onCreate(values)
        form.resetFields()
        gState.showSuccess === false ? gActions.showSuccess() : ''
      }
      else{
        gState.showError === false  ? gActions.showError() : ''
      }
    })
  }

  function onChangeHandler() {
    gState.showSuccess ? gActions.showSuccess() : ''
    gState.showError ? gActions.showError() : ''
  }

  const professionalOptions = gState.professionals.map(professional =>
    <Select.Option key={ professional._id } value={ professional._id }>
      { professional.firstname } { professional.lastname }
    </Select.Option>)

  return (
    <React.Fragment>
      <div>
        { gState.showSuccess && <Alert message="Successfullly registered" type="success" /> }
        { gState.showError && <Alert message="Oops! Error" type="error" /> }
      </div>
      <Form onSubmit={ onSubmitHandler } onChange={ onChangeHandler }>
        <Form.Item label="Project name">
          {
            getFieldDecorator(
              'name',
              { rules: [{ required: true, message: 'Project Name is required' }]}
            )
            (<Input placeholder="Project Name" />)
          }
        </Form.Item>

        <Form.Item label="Owner">
          {
            getFieldDecorator(
              'owner',
              { rules: [{ required: true, message: 'Middle name is required' }]}
            )
            (<Input placeholder="Owner  " />)
          }
        </Form.Item>

        <Form.Item label="Permit Number">
          {
            getFieldDecorator(
              'permitNum',
              { rules: [{ required: true, message: 'Permit number is required' }]}
            )
            (<Input placeholder="Permit Number" />)
          }
        </Form.Item>

        <Form.Item label="Start Date">
          {
            getFieldDecorator(
              'startDate',
              { rules: [{ required: true, message: 'Start date is required' }]}
            )
            (<Input placeholder="Start Date" />)
          }
        </Form.Item>

        <Form.Item label="End Date">
          {
            getFieldDecorator(
              'endDate',
              { rules: [{ required: true, message: 'End Date is required' }]}
            )
            (<Input placeholder="End Date" />)
          }
        </Form.Item>

        <Form.Item label="Detail">
          {
            getFieldDecorator(
              'details',
              { rules: [{ required: true, message: 'Detail is required' }]}
            )
            (<Input placeholder="Details" />)
          }
        </Form.Item>

        <Form.Item label="Project Type">
          {
            getFieldDecorator(
              'projectType',
              { rules: [{ required: true, message: 'Project Type is required' }]}
            )
            (
              <Select placeholder="Project Type">
                <Option value='private'>Private</Option>
                <Option value='public'>Public</Option>
                <Option value='lgu'>LGU</Option>
                <Option value='ngo'>NGO</Option>
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="Professionals">
          {
            getFieldDecorator(
              'professionals',
              { rules: [{ required: true, message: 'Professionals is required', type: 'array' }]}
            )
            (
              <Select
                showSearch
                mode='multiple'
                placeholder="Professionals"
                defaultActiveFirstOption={false}
                notFoundContent={null}
                filterOption={false}
                optionFilterProp= 'children'
                filterOption = {(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                { professionalOptions }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Add User</Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  )
}

export default CreateForm
