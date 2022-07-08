import { Component } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, message, Button, Popconfirm, Table, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'
import './index.scss'

const { Search } = Input;

class ViewFlights extends Component {

  state = {
    dataSource: [],
  };

  loadData = () => {
      axios.get('http://localhost:8085/view')
      .then((res) => {
        //console.log(res)
        this.setState({ dataSource: res.data })
      })
  };

  //delete
  handleDelete = (pid) => {
    axios.delete(`http://localhost:8085/del/${pid}`)
      .then((res) => {
        //console.log(res)
        if (res.status == "201") {
          message.info("Delete Successfully!")
          this.loadData()
        } else {
          message.info("Delete Failed!")
        }
      })
  }

  //close update pop dialog
  closeEditFlightDialog = () => {
    this.setState({ showEditFlightDialog: false })
  }

  // get the flight info 
  handleUpdate = (pid) => {
    axios.get(`http://localhost:8085/upd`, { params: { flightNumber: pid } })
      .then((res) => {
        this.setState({
          updateData: res.data,
          showUpdateFlight: true,
        })
      })
  }

  onSearch = (value) => {
    console.log(value)
    axios.get(`http://localhost:8085/view/${value}`)
      .then((res) => this.setState({ dataSource: res.data }));
  }

  toPage = () => {
    const navigate = useNavigate();
    navigate('/update')
  }

  componentDidMount() {
    this.loadData();
  }

  // onChange = (pagination, filters, sorter, extra) => {
  //     console.log('params', pagination, filters, sorter, extra);
  //   };

  render() {

    const columns = [
      {
        title: "Flight Number",
        dataIndex: "flightNumber",
        key: "flightNumber",
        filters: [
          {
            text: 'American Airline',
            value: 'AA',
          },
          {
            text: 'Southwest Airline',
            value: 'WN',
          },
          {
            text: 'Delta Airline',
            value: 'DL',
          },
        ],
        onFilter: (value, record) => record.flightNumber.indexOf(value) === 0,
      },
      {
        title: "Departure Date",
        dataIndex: "departureDate",
        key: "departureDate",
        sorter: {
          compare: (a, b) => {
            //console.log('a')
            a = a.departureDate == 'null' ? 0 : new Date(a.departureDate).getTime();
            b = b.departureDate == 'null' ? 0 : new Date(b.departureDate).getTime();
            return a - b;
          }
        },
      },
      {
        title: "Arrival Date",
        dataIndex: "arrivalDate",
        key: "arrivalDate",
        // sorter: {
        //     compare: (a, b) => {
        //       //console.log('a')
        //       a = a.arrivalDate == 'null' ? 0 : new Date(a.arrivalDate).getTime();
        //       b = b.arrivalDate == 'null' ? 0 : new Date(b.arrivalDate).getTime();
        //       return a - b;
        //     }
        // },
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
        filters: [
          {
            text: 'ORD',
            value: 'ORD',
          },
          {
            text: 'IAD',
            value: 'IAD',
          },
        ],
        onFilter: (value, record) => record.departureAirport.indexOf(value) === 0,
      },
      {
        title: "Arrival Airport",
        dataIndex: "arrivalAirport",
        key: "arrivalAirport",
        filters: [
          {
            text: 'LAX',
            value: 'LAX',
          },
          {
            text: 'JFK',
            value: 'JFK',
          },
        ],
        onFilter: (value, record) => record.arrivalAirport.indexOf(value) === 0,
      },
      {
        title: "Passengers",
        dataIndex: "currentPassengers",
        key: "currentPassengers",
        sorter: {
          compare: (a, b) => a.currentPassengers - b.currentPassengers,
          multiple: 3,
        },
      },
      {
        title: "Passenger Limit",
        dataIndex: "passengerLimit",
        key: "passengerLimit"
      },
      {
        title: "Manipulation",
        dataIndex: "flightNumber",
        key: "flightNumber",
        render: (record) => (
          <>
            <Popconfirm
              okText='Confirm'
              cancelText='Cancel'
              title='Are you sure to delete this?'
              onConfirm={() => {
                this.handleDelete(record)
              }}
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>

            <Link to='/update'>
              <Popconfirm
                okText='Go Update'
                cancelText='Cancel'
                title='Are you sure to update?'
                onConfirm={this.toPage}
              >
                <Button
                  type='primary'
                  shape="circle"
                  icon={<EditOutlined />}
                  style={{ marginLeft: "10px" }}

                ></Button>
              </Popconfirm>
            </Link>
          </>
        )
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
              <Breadcrumb.Item>Flights</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Search
            placeholder="please input the search flight number "
            allowClear
            enterButton="Search"
            size="large"
            style={{
              width: 500,
              marginBottom:20,
              marginTop:-5,
            }}
            onSearch={this.onSearch}
          />

          <Table className="table" 
            dataSource={this.state.dataSource} 
            onChange={this.onChange} 
            columns={columns} 
            rowKey='flightNumber' 
            pagination={{
              pageSize:7,
            }}
          />
        </Card>
      </div>

    )
  }
}

export default ViewFlights;