import React, { useState, useEffect } from 'react'
import {
  Button, Table, Card, Menu, Dropdown, Drawer,
  Icon, Form, Input, Row, Col, PageHeader, Modal
} from 'antd'
import MainLayout from '../../layouts/MainLayout'
import { apiRequest } from '../../services/api'
import useGlobal from '../../services/useGlobal'
import CreateEventForm from './CreateForm'
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

const eventColumns = [
  {
    title: 'Event Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Contact Number',
    dataIndex: 'contact',
    key: 'contact'
  },
  {
    title: 'Venue',
    dataIndex: 'venue.name',
    key: 'venue'
  },
  {
    title: 'Date',
    dataIndex: 'setDate',
    key: 'setDate',
    render: (row, record) => (
      <div>{moment(record.setDate).format('YYYY-MM-DD')}</div>
    )
  },
  {
    title: 'Organizers',
    key: 'organizers',
    render: (row, records) => (
      <div>{records.organizers.map(({ firstname, lastname }) => `${firstname} ${lastname}`).join(', ')}</div>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
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
    path: 'events',
    breadcrumbName: 'Events'
  },
  {
    path: '/',
    breadcrumbName: 'All'
  }
]

function Events({ form }) {

  const initState = {
    showCreate: false,
    requested: false,
    search: ''
  }

  const [gState, gActions] = useGlobal()
  const [state, setState] = useState(initState)

  useEffect(() => {

    if (!gState.eventsLoaded) {
      gActions.getEvents()
    }
  })


  function filterEvents() {
    if (state.search.length > 3) {
      return gState.events.filter(event => JSON.stringify(event).search(new RegExp(state.search, 'ig')) > -1)
    } else {
      return gState.events
    }
  }

  return (
    <MainLayout>
      <div className="filters">
        <Row>
          <Col span={12}>
            <Search
              placeholder="Find event by name, email or mobile"
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
              Add Event
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        width={480}
        title="Add Event"
        placement="right"
        closable={true}
        visible={state.showCreate}
        onClose={() => setState({ ...state, showCreate: false })}
        >
        <CreateEventForm form={form} onCreate={ gActions.createEvent } />
      </Drawer>


      <div className="records">
        <PageHeader
            title="Events"
            breadcrumb={{ routes }}
            subTitle="Manage all events"
          />
        <Card>
          <Table
            size="small"
            dataSource={filterEvents()}
            columns={eventColumns}
            rowKey={record => record._id} />
        </Card>

      </div>
    </MainLayout>
  )

}


export default Form.create()(Events)
