import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Modal
} from 'antd'
import MainLayout from '../../layouts/MainLayout'
import { apiRequest } from '../../services/api'
import useGlobal from '../../services/useGlobal'
import CreateProjectForm from './CreateForm'

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

const projectColumns = [
  {
    title: 'Project Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner'
  },
  {
    title: 'Permit Number',
    dataIndex: 'permitNum',
    key: 'permitNum'
  },
  {
    title: 'Project Type',
    dataIndex: 'projectType',
    key: 'projectType'
  },
  {
    title: 'Professionals',
    dataIndex: 'professionals',
    key: 'professionals'
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
    path: 'projects',
    breadcrumbName: 'Projects'
  },
  {
    path: '/',
    breadcrumbName: 'All'
  }
]

function Projects({ form }) {

  const initState = {
    showCreate: false,
    requested: false,
    search: ''
  }

  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)

  useEffect(() => {
    if (!gState.projectsLoaded) {
      gActions.getProjects()
    }
  })


  function filterProjects() {
    if (state.search.length > 3) {
      return gState.projects.filter(project => JSON.stringify(project).search(new RegExp(state.search, 'ig')) > -1)
    } else {
      return gState.projects
    }
  }

  return (
    <MainLayout>
      <div className="filters">
        <Row>
          <Col span={12}>
            <Search
              placeholder="Find project by name, email or mobile"
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
              Add Project
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        width={480}
        title="Add Project"
        placement="right"
        closable={true}
        visible={state.showCreate}
        onClose={() => setState({ ...state, showCreate: false })}
        >
        <CreateProjectForm form={form} onCreate={gActions.createProject} />
      </Drawer>


      <div className="records">
        <PageHeader
            title="Projects"
            breadcrumb={{ routes }}
            subTitle="Manage all projects"
          />
        <Card>
          <Table
            size="small"
            dataSource={filterProjects()}
            columns={projectColumns}
            rowKey={record => record._id} />
        </Card>

      </div>
    </MainLayout>
  )

}


export default Form.create()(Projects)
