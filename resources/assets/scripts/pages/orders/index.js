import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Modal
} from 'antd'
import MainLayout from '../../layouts/MainLayout'
import { apiRequest } from '../../services/api'
import useGlobal from '../../services/useGlobal'
import CreateOrderForm from './CreateForm'
import moment from 'moment'

const { Search } = Input

const menu = (
  <Menu>
    <Menu.Item>
      <a href="#">Edit</a>
    </Menu.Item>
    <Menu.Item>
      <a href="#">Delete</a>
    </Menu.Item>
  </Menu>
);

const orderColumns = [
  {
    title: 'Order ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Buyer',
    dataIndex: 'buyer.lastname',
    key: 'buyer'
  },
  {
    title: 'Seller',
    dataIndex: 'seller.name',
    key: 'seller'
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Payment',
    dataIndex: 'paymentOption',
    key: 'paymentOption'
  },
  {
    title: 'IsPaid',
    dataIndex: 'isPaid',
    key: 'isPaid'
  },
  {
    title: 'IsReceived',
    dataIndex: 'isReceived',
    key: 'IsReceived'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  // {
  //   title: 'AddedBy',
  //   key: 'campany',
  //   render: (row, records) => (
  //     <div>{records.addedBy.map(({ firstname, lastname }) => `${firstname} ${lastname}`)}</div>
  //   )
  //},
  {
    width: 50,
    title: '',
    key: 'actions',
    render: () => (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button size="small"><Icon type="down" /></Button>
      </Dropdown>
    )
  }
]

const routes = [
  {
    path: 'orders',
    breadcrumbName: 'Orders'
  },
  {
    path: '/',
    breadcrumbName: 'All'
  }
]

function Orders({ form }) {

  const initState = {
    showCreate: false,
    requested: false,
    search: ''
  }

  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)

  useEffect(() => {

    if (!gState.ordersLoaded) {
      //gActions.getOrders()
      console.log(gActions.getOrders())
    }
  })


  function filterOrders() {
    if (state.search.length > 3) {
      return gState.orders.filter(order => JSON.stringify(order).search(new RegExp(state.search, 'ig')) > -1)
    } else {
      return gState.orders
    }
  }

  return (
    <MainLayout>
      <div className="filters">
        <Row>
          <Col span={12}>
            <Search
              placeholder="Find order by name, email or mobile"
              onSearch={search => setState({ ...state, search })}
              style={{ width: '100%' }}
              />
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => {
                setState({ ...state, showCreate: true })
                gState.showSuccess ? gActions.showSuccess() : ''
                gState.showError ? gActions.showError() : ''
              }}
              style={{ float: 'right' }}>
              <Icon type="plus-circle" />
              Add Order
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        width={480}
        title="Add Order"
        placement="right"
        closable={true}
        visible={state.showCreate}
        onClose={() => setState({ ...state, showCreate: false })}
        >
        <CreateOrderForm form={form} onCreate={order => apiRequest('POST', 'orders', order)} />
      </Drawer>


      <div className="records">
        <PageHeader
            title="Orders"
            breadcrumb={{ routes }}
            subTitle="Manage all orders"
          />
        <Card>
          <Table
            size="small"
            dataSource={filterOrders()}
            columns={orderColumns}
            rowKey={record => record._id} />
        </Card>

      </div>
    </MainLayout>
  )

}


export default Form.create()(Orders)
