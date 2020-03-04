import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Modal
} from 'antd'
import MainLayout from '../../layouts/MainLayout'
import { apiRequest } from '../../services/api'
import useGlobal from '../../services/useGlobal'
import CreateCompanyForm from './CreateForm'

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

const companyColumns = [
  {
    title: 'Company Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
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
    path: 'companies',
    breadcrumbName: 'Companies'
  },
  {
    path: '/',
    breadcrumbName: 'All'
  }
]

function Companies({ form }) {

  const initState = {
    showCreate: false,
    requested: false,
    search: ''
  }

  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)

  useEffect(() => {
    if (!gState.companiesLoaded) {
      gActions.getCompanies()
    }
  })


  function filterCompanies() {
    if (state.search.length > 3) {
      return gState.companies.filter(company => JSON.stringify(company).search(new RegExp(state.search, 'ig')) > -1)
    } else {
      return gState.companies
    }
  }

  return (
    <MainLayout>
      <div className="filters">
        <Row>
          <Col span={12}>
            <Search
              placeholder="Find company by name, email or mobile"
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
              Add Company
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        width={480}
        title="Add Company"
        placement="right"
        closable={true}
        visible={state.showCreate}
        onClose={() => setState({ ...state, showCreate: false })}
        >
        <CreateCompanyForm form={form} onCreate={gActions.createCompany} />
      </Drawer>


      <div className="records">
        <PageHeader
            title="Companies"
            breadcrumb={{ routes }}
            subTitle="Manage all companies"
          />
        <Card>
          <Table
            size="small"
            dataSource={filterCompanies()}
            columns={companyColumns}
            rowKey={record => record._id} />
        </Card>

      </div>
    </MainLayout>
  )

}


export default Form.create()(Companies)
