import React, { useState, useEffect } from 'react'
import useGlobal from '../../services/useGlobal'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, AutoComplete,
  Alert
} from 'antd'

function CreateForm({ form, onCreate }) {

  // console.log('Form', form)
  const { Option } = AutoComplete
  const [gState, gActions] = useGlobal()
  const [emailSuffix, setEmailSuffix ] = useState([])
  const { getFieldDecorator } = form

  function onSubmitHandler(e) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err === null) {
        onCreate(values)
        form.resetFields()
        gState.showSuccess === false ? gActions.showSuccess() : ''
      }
      else{
        gState.showError === false ? gActions.showError() : ''
      }
    })
  }

  function onChangeHandler() {
    gState.showSuccess ? gActions.showSuccess() : ''
    gState.showError ? gActions.showError() : ''

  }

  function selectEmail(value) {
    let result
    if(!value || value.indexOf('@') >= 0){
      result = []
    }
    else{
      result = ['gmail.com', 'yahoo.com'].map(domain => `${value}@${domain}`)
    }
    setEmailSuffix(result)
  }

  const emailsDomain = emailSuffix.map(suffix => <Option key={suffix}>{ suffix }</Option>)

  return (
    <React.Fragment>
      {gState.showSuccess && <Alert message= "Successfully registered" type="success" />}
      {gState.showError && <Alert message= "Oops! error" type="error" />}
      <Form onSubmit={onSubmitHandler} onChange={onChangeHandler}>
        <Form.Item label="First Name">
          {
            getFieldDecorator(
              'firstname',
              { rules: [{ required: true, message: 'First name is required' }]}
            )
            (<Input placeholder="First Name" />)
          }
        </Form.Item>

        <Form.Item label="Last Name">
          {
            getFieldDecorator(
              'lastname',
              { rules: [{ required: true, message: 'Last name is required' }]}
            )
            (<Input placeholder="Last Name" />)
          }
        </Form.Item>

        <Form.Item label="Mobile Number">
          {
            getFieldDecorator(
              'mobile',
              {
                rules: [
                  { required: true, message: 'Mobile number is required'},
                  { max: 10, message: "Type 10 digit number" },
                  { min: 10, message: 'Mobile Number must be valid' }
                ]
              }
            )
            (<Input addonBefore='+63' placeholder="Mobile Number" />)
          }
        </Form.Item>

        <Form.Item label="Email Address">
          {
            getFieldDecorator(
              'email',
              { rules: [{ required: true, message: 'Email is required' }]}
            )
            (
              <AutoComplete
                placeholder="Email"
                onSearch={ selectEmail }
              >
              { emailsDomain }
              </AutoComplete>
            )
          }
        </Form.Item>

        <Form.Item label="Password">
          {
            getFieldDecorator(
              'password',
              { rules: [{ required: true, message: 'Password is required' }]}
            )
            (<Input.Password placeholder="Password" />)
          }
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Add User</Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  )
}

// <Form.Item label="First Name">
//   {
//     getFieldDecorator(
//       'firstname',
//       { rules: [{ required: true, message: 'Input your firstname' }]}
//     )
//     (<Input placeholder="First Name" />)
//   }
// </Form.Item>

export default CreateForm
