import React, { useState, useEffect } from 'react'
import useGlobal from '../../services/useGlobal'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Checkbox,
  Select, Alert
} from 'antd'

const { Option } = Select

function CreateForm({ form, onCreate }) {

  // console.log('Form', form)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [gState, gActions] = useGlobal()
  const { getFieldDecorator } = form
  const [city, setCity] = useState([])

  useEffect(() => {
    if(!gState.citiesLoaded){
      gActions.getCities()
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

  const cityOption = gState.cities.map(city => <Option key={ city.name } value={ city._id } >{ city.name }</Option>)

  return (
    <React.Fragment>
      <div>
        {gState.showSuccess && <Alert message="Successfullly registered" type="success" /> }
        {gState.showError && <Alert message="Oops! Error" type="error" /> }
      </div>
      <Form onSubmit={onSubmitHandler} onChange={ onChangeHandler }>
        <Form.Item label="Company Name">
          {
            getFieldDecorator(
              'name',
              { rules: [{ required: true, message: 'Company name is required' }]}
            )
            (<Input placeholder="Company Name" />)
          }
        </Form.Item>

        <Form.Item label="Phone Number">
          {
            getFieldDecorator(
              'phone',
              { rules: [{ required: true, message: 'Phone number is required' }]}
            )
            (<Input placeholder="Phone Number" />)
          }
        </Form.Item>

        <Form.Item label="Mobile Number">
          {
            getFieldDecorator('mobile',{
              rules: [
                { max: 10, message: 'Must be 10 digit only' },
                { min: 10, message: 'Must be a valid mobile number' }
              ]
            })
            (<Input addonBefore= '+63' placeholder="Mobile Number" />)
          }
        </Form.Item>

        <Form.Item label="Website">
          {
            getFieldDecorator('website')
            (<Input placeholder="Website" />)
          }
        </Form.Item>

        <Form.Item label="City">
          {
            getFieldDecorator('city',{
              rules: [ { required: true, message: 'City is required' }]
            })
            (
              <Select
                showSearch
                placeholder="Select City"
                defaultActiveFirstOption={ false }
                notFoundContent={ null }
                filterOption={ false }
                optionFilterProp= 'children'
                filterOption = {(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                { cityOption }
              </Select>)
          }
        </Form.Item>

        <Form.Item label="Address">
          {
            getFieldDecorator('address',{
              rules: [{ required: true, message: 'Address is required'}]
            })
            (<Input placeholder="Address" />)
          }
        </Form.Item>

        <Form.Item>
          {
            getFieldDecorator('isSupplier', {
            valuePropName: 'checked',
            initialValue: false,
            })
            (<Checkbox >Supplier</Checkbox>)
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
