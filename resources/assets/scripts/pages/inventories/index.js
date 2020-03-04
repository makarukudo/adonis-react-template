import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Modal
} from 'antd'
import MainLayout from '../../layouts/MainLayout'
import { apiRequest } from '../../services/api'
import useGlobal from '../../services/useGlobal'
import CreateInventoryForm from './CreateForm'
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

const inventoryColumns = [
  {
    title: 'Inventory ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Products',
    dataIndex: 'product.name',
    key: 'product'
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
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
    path: 'inventories',
    breadcrumbName: 'Inventories'
  },
  {
    path: '/',
    breadcrumbName: 'All'
  }
]

function Inventories({ form }) {

  const initState = {
    showCreate: false,
    requested: false,
    search: ''
  }

  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)

  useEffect(() => {

    if (!gState.inventoriesLoaded) {
      //gActions.getInventories()
      console.log(gActions.getInventories())
    }
  })


  function filterInventories() {
    if (state.search.length > 3) {
      return gState.inventories.filter(inventory => JSON.stringify(inventory).search(new RegExp(state.search, 'ig')) > -1)
    } else {
      return gState.inventories
    }
  }

  return (
    <MainLayout>
      <div className="filters">
        <Row>
          <Col span={12}>
            <Search
              placeholder="Find inventory by name, email or mobile"
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
              Add Inventory
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        width={480}
        title="Add Inventory"
        placement="right"
        closable={true}
        visible={state.showCreate}
        onClose={() => setState({ ...state, showCreate: false })}
        >
        <CreateInventoryForm form={form} onCreate={inventory => apiRequest('POST', 'inventories', inventory)} />
      </Drawer>


      <div className="records">
        <PageHeader
            title="Inventories"
            breadcrumb={{ routes }}
            subTitle="Manage all inventories"
          />
        <Card>
          <Table
            size="small"
            dataSource={filterInventories()}
            columns={inventoryColumns}
            rowKey={record => record._id} />
        </Card>

      </div>
    </MainLayout>
  )

}


export default Form.create()(Inventories)
