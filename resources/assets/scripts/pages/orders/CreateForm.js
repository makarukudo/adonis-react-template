import React, { useState, useEffect } from 'react'
import useGlobal from '../../services/useGlobal'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, DatePicker,
  Select, Alert
} from 'antd'


function CreateForm({ form, onCreate }) {

  // console.log('Form', form)
  const initState = {}
  const [state, setState] = useState(initState)
  const [gState, gActions] = useGlobal()
  const { getFieldDecorator } = form

  useEffect(() => {
    if(!gState.productsLoaded) {
      gActions.getProducts()
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

  const productOptions = gState.products.map(product =>
    <Option key={ product._id } value={ product._id }>{ product.name }</Option>
  )

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
              'items',
              { rules: [{ required: true, message: 'Product name is required' }]}
            )
            (
              <Select
                showSearch
                placeholder="Product Name"
                defaultActiveFirstOption={ false }
                notFoundContent={ null }
                filterOption={ false }
                optionFilterProp= 'children'
                filterOption = {(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                { productOptions }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="Delivery Fee">
          {
            getFieldDecorator(
              'deliveryFee',
              { rules: [{ required: true, message: 'Delivery Fee is required' }]}
            )
            (<Input placeholder="Delivery Fee" />)
          }
        </Form.Item>

        <Form.Item label="Transfer Fee">
          {
            getFieldDecorator(
              'transFee',
              { rules: [{ required: true, message: 'Transfer Fee is required' }]}
            )
            (<Input placeholder="Trans Fee" />)
          }
        </Form.Item>

        <Form.Item label="Total">
          {
            getFieldDecorator(
              'total',
              { rules: [{ required: true, message: 'Total is required' }]}
            )
            (<Input placeholder="Total" />)
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
