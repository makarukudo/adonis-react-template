import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Modal
} from 'antd'
import MainLayout from '../../layouts/MainLayout'
import { apiRequest } from '../../services/api'
import useGlobal from '../../services/useGlobal'
import CreateUserForm from './CreateForm'

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

const userColumns = [
  {
    title: 'Name',
    key: 'name',
    render: (row, record) => (
      <div>{record.firstname} {record.lastname}</div>
    )
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile'
  },
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
    path: 'users',
    breadcrumbName: 'Users'
  },
  {
    path: '/',
    breadcrumbName: 'All'
  }
]

// const [gState, gActions] = useGlobal()


function Users({ form }) {

  // console.log("USER FORM", form)

  const initState = {
    showCreate: false,
    requested: false,
    search: ''
  }

  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)

  useEffect(() => {
    if (!gState.usersLoaded) {
      gActions.getUsers()
    }
  })

  function filterUsers() {
    if (state.search.length > 3) {
      return gState.users.filter(user => JSON.stringify(user).search(new RegExp(state.search, 'ig')) > -1)
    } else {
      return gState.users
    }
  }

  return (
    <MainLayout>
      <div className="filters">
        <Row>
          <Col span={12}>
            <Search
              placeholder="Find user by name, email or mobile"
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
              Add User
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        width={480}
        title="Add User"
        placement="right"
        closable={true}
        visible={state.showCreate}
        onClose={() => setState({ ...state, showCreate: false })}
        >
        <CreateUserForm form={ form } onCreate={ gActions.createUser } />
      </Drawer>


      <div className="records">
        <PageHeader
            title="Users"
            breadcrumb={{ routes }}
            subTitle="Manage all users"
          />
        <Card>
          <Table
            size="small"
            dataSource={filterUsers()}
            columns={userColumns}
            rowKey={record => record._id} />
        </Card>

      </div>
    </MainLayout>
  )

}


export default Form.create()(Users)
