import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Popconfirm, message, Input, TimePicker } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.scss'

const { Option } = Select
const { RangePicker } = DatePicker
const { Search } = Input;

const SearchFlight = () => {

  const navigate = useNavigate();

  const [flight, setFlightList] = useState({
    list: [],
    count: 0,
    searchContent: "",
  })

  const onSearch = (value) => {
    console.log(value)
    axios.get(`http://localhost:8085/view/${value}`)
      .then(res => setFlightList({list:res.data}));
  }

  // useEffect(() => {
    
  // }, []);

  //delete
  const handleDelete = (pid) => {
    axios.delete(`http://localhost:8085/del/${pid}`)
      .then((res) => {
        //console.log(res)
        if (res.status == "201") {
          message.info("Delete Successfully!")
        } else {
          message.info("Delete Failed!")
        }
      })
  }

  const handleUpdate = () => {
    navigate('../update', { replace: true });
  }

  const columns = [
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber",
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      key: "departureDate",
    },
    {
      title: "Arrival Date",
      dataIndex: "arrivalDate",
      key: "arrivalDate",
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime"
    },
    {
      title: "Arrival Time",
      dataIndex: "arrivalTime",
      key: "arrivalTime"
    },
    {
      title: "Departure Airport",
      dataIndex: "departureAirport",
      key: "departureAirport",
    },
    {
      title: "Arrival Airport",
      dataIndex: "arrivalAirport",
      key: "arrivalAirport",
    },
    {
      title: "Passengers",
      dataIndex: "currentPassengers",
      key: "currentPassengers",
    },
    {
      title: "Passenger Limit",
      dataIndex: "passengerLimit",
      key: "passengerLimit"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    }
  ];

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Search</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 0 }}
      >
        <Form
          //onFinish={onFinish}
          initialValues={{ status: null }}
        >
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={null}>All</Radio>
              <Radio value={0}>Departure</Radio>
              <Radio value={1}>Arrival</Radio>
              <Radio value={2}>Pending Successfully</Radio>
              <Radio value={3}>Pending Failed</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Airline" name="airline_id">
            <Select
              placeholder="please choose your airline"
              defaultValue="American Airline"
              style={{ width: 180 }}
            >
              <Option value="delta">Delta Airline</Option>
              <Option value="south">Southwest Airline</Option>
              <Option value="hawa">Hawaiian Airline</Option>
              <Option value="alaska">Alaska Airline</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <RangePicker></RangePicker>
          </Form.Item>


          <Form.Item label="Time" name="time">
             <TimePicker.RangePicker/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card>
      <Search
          placeholder="please input a specific flight number "
          allowClear
          enterButton="Search"
          size="large"
          style={{
            width: 400,
            marginBottom: 0,
            marginTop: 0,
          }}
          onSearch={onSearch}
        />
      </Card>
        
      <Card title={"according to filter,  there are COUNT results"}>

        <Table
          rowKey='flightNumber'
          columns={columns}
          dataSource={flight.list}
          pagination={{
            pageSize: 7,
          }}
        />
      </Card>
    </div>
  )
}

export default SearchFlight