import React, { useState, useEffect } from 'react'
import useGlobal from '../../services/useGlobal'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, DatePicker,
  Select, Alert
} from 'antd'

const { TextArea } = Input
const { Option } = Select

function CreateForm({ form, onCreate }) {

  // console.log('Form', form)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [gState, gActions] = useGlobal()
  const { getFieldDecorator } = form

  useEffect(() => {
    if(!gState.venuesLoaded){
      gActions.getVenues()
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

  const venuesOption = gState.venues.map(venue =>
    <Option
      key={venue._id}
      value={venue._id}
    >
      { venue.name }
    </Option>
  )

  return (
    <React.Fragment>
      <div>
        { gState.showSuccess && <Alert message="Successfullly registered" type="success" /> }
        { gState.showError && <Alert message="Oops! Error" type="error" /> }
      </div>
      <Form onSubmit={ onSubmitHandler } onChange={ onChangeHandler }>
        <Form.Item label="Event Name">
          {
            getFieldDecorator(
              'name',
              { rules: [{ required: true, message: 'Event name is required' }]}
            )
            (<Input placeholder="Event Name" />)
          }
        </Form.Item>

        <Form.Item label="Detail Details">
          {
            getFieldDecorator('details',)
            (<TextArea rows={4} placeholder='Event Details' />)
          }
        </Form.Item>

        <Form.Item label="Venue">
          {
            getFieldDecorator(
              'venue',
              { rules: [{ required: true, message: 'venue number is required' }]}
            )
            (
              <Select
                showSearch
                placeholder="Select venue"
                defaultActiveFirstOption={ false }
                notFoundContent={ null }
                filterOption={ false }
                optionFilterProp= 'children'
                filterOption = {(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                {venuesOption}
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="Organizers">
          {
            getFieldDecorator(
              'organizers',
              { rules: [{ required: true, message: 'Organizers is required' }]}
            )
            (<Input placeholder="Organizers" />)
          }
        </Form.Item>

        <Form.Item label="Contact Number">
          {
            getFieldDecorator(
              'contact',
              { rules: [{ required: true, message: 'Contact number is required' }]}
            )
            (<Input placeholder="Contact Number" />)
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
