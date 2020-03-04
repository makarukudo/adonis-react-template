import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Modal
} from 'antd'
import MainLayout from '../../layouts/MainLayout'
import { apiRequest } from '../../services/api'
import useGlobal from '../../services/useGlobal'
import CreateProductForm from './CreateForm'
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

const productColumns = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Available',
    dataIndex: 'available',
    key: 'available'
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
    key: 'sold',
  },
  {
    title: 'Category',
    dataIndex: 'category.name',
    key: 'category'
  },
  {
    title: 'Supplier',
    dataIndex: 'company.name',
    key: 'campany'
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
    path: 'products',
    breadcrumbName: 'Products'
  },
  {
    path: '/',
    breadcrumbName: 'All'
  }
]

function Products({ form }) {

  const initState = {
    showCreate: false,
    requested: false,
    search: ''
  }

  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)

  useEffect(() => {

    if (!gState.productsLoaded) {
      gActions.getProducts()
    }
  })


  function filterProducts() {
    if (state.search.length > 3) {
      return gState.products.filter(product => JSON.stringify(product).search(new RegExp(state.search, 'ig')) > -1)
    } else {
      return gState.products
    }
  }

  return (
    <MainLayout>
      <div className="filters">
        <Row>
          <Col span={12}>
            <Search
              placeholder="Find product by name, email or mobile"
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
              Add Product
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        width={480}
        title="Add Product"
        placement="right"
        closable={true}
        visible={state.showCreate}
        onClose={() => setState({ ...state, showCreate: false })}
        >
        <CreateProductForm form={form} onCreate={product => apiRequest('POST', 'products', product)} />
      </Drawer>


      <div className="records">
        <PageHeader
            title="Products"
            breadcrumb={{ routes }}
            subTitle="Manage all products"
          />
        <Card>
          <Table
            size="small"
            dataSource={filterProducts()}
            columns={productColumns}
            rowKey={record => record._id} />
        </Card>

      </div>
    </MainLayout>
  )

}


export default Form.create()(Products)
