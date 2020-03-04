import React, { useState, useEffect } from 'react'
import useGlobal from '../../services/useGlobal'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, DatePicker,
  Select, Alert
} from 'antd'

const { Option } = Select


function CreateForm({ form, onCreate }) {
  // console.log('Form', form)
  const initState = {}
  const [state, setState] = useState(initState)
  const [gState, gActions] = useGlobal()
  const { getFieldDecorator } = form

  useEffect(() => {
    if(!gState.suppliersLoaded){
      gActions.getSuppliers()
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

  const suppliersOption = gState.suppliers.map(supplier => <Option key={ supplier._id } value= {supplier._id}>{ supplier.name }</Option>)

  return (
    <React.Fragment>
      <div>
        { gState.showSuccess && <Alert message="Successfullly registered" type="success" /> }
        { gState.showError && <Alert message="Oops! Error" type="error" /> }
      </div>
      <Form onSubmit={ onSubmitHandler } onChange={ onChangeHandler }>
        <Form.Item label="Product Name">
          {
            getFieldDecorator(
              'name',
              { rules: [{ required: true, message: 'Product name is required' }]}
            )
            (<Input placeholder="Product Name" />)
          }
        </Form.Item>

        <Form.Item label="Price">
          {
            getFieldDecorator(
              'price',
              { rules: [{ required: true, message: 'Price is required' }]}
            )
            (<Input placeholder="Price" />)
          }
        </Form.Item>

        <Form.Item label="Available">
          {
            getFieldDecorator(
              'available',
              { rules: [{ required: true, message: 'Available is required' }]}
            )
            (<Input placeholder="Available" />)
          }
        </Form.Item>

        <Form.Item label="Sold">
          {
            getFieldDecorator(
              'sold',
              { rules: [{ required: true, message: 'Sold is required' }]}
            )
            (<Input placeholder="Sold" />)
          }
        </Form.Item>

        <Form.Item label="Supplier">
          {
            getFieldDecorator(
              'company',
              { rules: [{ required: true, message: 'Company is required' }]}
            )
            (
              <Select
                showSearch
                placeholder="Supplier"
                defaultActiveFirstOption={ false }
                notFoundContent={ null }
                filterOption={ false }
                optionFilterProp= 'children'
                filterOption = {(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                { suppliersOption }
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
