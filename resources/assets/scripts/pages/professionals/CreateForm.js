import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Select,
  AutoComplete, Alert
} from 'antd'

import useGlobal from '../../services/useGlobal'

function CreateForm({ form, onCreate }) {

  // console.log('Form', form)
  const { Option } = AutoComplete

  const initState = { search: '', users: [] }
  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)
  const [profs, setProfs] = useState()
  const { getFieldDecorator } = form

  useEffect(() => {
    if (!gState.usersLoaded) {
      gActions.getUsers()
    }
    if(!gState.professionsLoaded) {
      gActions.getProfessions()
    }

    return () => {
      console.log("unmount")
    }
  },[gState.usersLoaded, gState.professionsLoaded])

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

  function selectUsers(search) {
    let users = gState.users
    if (search.length > 3) {
      users = users.filter(user => JSON.stringify(user).search(new RegExp(search, 'ig')) > -1)
    }
    setState({ users, search })
  }

  const professionOptions = gState.professions.map(profession => <Select.Option key={profession._id} value={profession._id}>{profession.name}</Select.Option>)
  const userOptions = state.users.map(user => <Select.Option key={user._id}>{user.firstname} {user.lastname}</Select.Option>)
  return (
    <React.Fragment>
      <div>
        {gState.showSuccess && <Alert message="Successfullly registered" type="success" /> }
        {gState.showError && <Alert message="Oops! Error" type="error" /> }
      </div>
      <Form onSubmit={ onSubmitHandler } onChange={ onChangeHandler }>
        <Form.Item label="First Name">
          {
            getFieldDecorator(
              'firstname',
              { rules: [{ required: true, message: 'First name is required' }]}
            )
            (<Input placeholder="First Name" />)
          }
        </Form.Item>

        <Form.Item label="Middle Name">
          {
            getFieldDecorator(
              'middlename',
              { rules: [{ required: true, message: 'Middle name is required' }]}
            )
            (<Input placeholder="Middle Name" />)
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

        <Form.Item label="Professions">
          {
            getFieldDecorator(
              'professions',
              { rules: [{ required: true, message: 'Professions is required', type: 'array' }]}
            )
            (
              <Select
                showSearch
                mode="multiple"
                placeholder="Please select Professions"
                defaultActiveFirstOption={ false }
                notFoundContent={ null }
                filterOption={ false }
                optionFilterProp= 'children'
                filterOption = {(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
              {professionOptions}
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="License Number">
          {
            getFieldDecorator(
              'licenseNum',
              { rules: [{ required: true, message: 'License number is required' }]}
            )
            (<Input placeholder="License Number" />)
          }
        </Form.Item>

        <Form.Item label="User">
          {
            getFieldDecorator(
              'user',
              { rules: [{ required: true, message: 'User is required' }]}
            )
            (
              <Select
                showSearch
                placeholder="Select the user"
                onSearch={selectUsers}
                defaultActiveFirstOption={false}
                notFoundContent={null}
                filterOption={false}
                showArrow={false}
                >
                {userOptions}
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
