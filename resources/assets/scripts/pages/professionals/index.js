import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Modal
} from 'antd'
import MainLayout from '../../layouts/MainLayout'
import { apiRequest } from '../../services/api'
import useGlobal from '../../services/useGlobal'
import CreateProfessionalForm from './CreateForm'

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

const professionalColumns = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    key: 'firstname',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastname',
    key: 'lastname'
  },
  {
    title: 'Professions',
    key: 'professions',
    render: (row, records) => (
      <div> { records.professions.map( profession => `${ profession.name }` )} </div>
    )
  },
  {
    title: 'License Number',
    dataIndex: 'licenseNum',
    key: 'licenseNum'
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
    path: 'professionals',
    breadcrumbName: 'Professionals'
  },
  {
    path: '/',
    breadcrumbName: 'All'
  }
]

function Professionals({ form }) {

  const initState = {
    showCreate: false,
    requested: false,
    search: ''
  }

  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)

  useEffect(() => {
    if (!gState.professionalsLoaded) {
      gActions.getProfessionals()
    }
  })

  function filterProfessionals() {
    if (state.search.length > 3) {
      return gState.professionals.filter(professional => JSON.stringify(professional).search(new RegExp(state.search, 'ig')) > -1)
    } else {
      return gState.professionals
    }
  }

  return (
    <MainLayout>
      <div className="filters">
        <Row>
          <Col span={12}>
            <Search
              placeholder="Find professional by name, email or mobile"
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
              Add Professional
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        width={480}
        title="Add Professional"
        placement="right"
        closable={true}
        visible={state.showCreate}
        onClose={() => setState({ ...state, showCreate: false })}
        >
        <CreateProfessionalForm form={form} onCreate={gActions.createProfessional} />
      </Drawer>


      <div className="records">
        <PageHeader
            title="Professionals"
            breadcrumb={{ routes }}
            subTitle="Manage all professionals"
          />
        <Card>
          <Table
            size="small"
            dataSource={filterProfessionals()}
            columns={professionalColumns}
            rowKey={record => record._id} />
        </Card>

      </div>
    </MainLayout>
  )

}


export default Form.create()(Professionals)
