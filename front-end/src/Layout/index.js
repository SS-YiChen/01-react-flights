import { Layout, Menu, Popconfirm } from 'antd'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const {pathname} = useLocation()


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">SignUp</span>
          <span className="user-name">Login</span>
          <span className="user-logout">
            <Popconfirm title="Are you sure to exit？" okText="exit" cancelText="cancel">
              <LogoutOutlined /> Exit
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/view">
              <Link to="/view">Flights</Link>
            </Menu.Item>
            <Menu.Item icon={<PlusOutlined />} key="/add">
              <Link to="/add">Add</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/update">
              <Link to="/update">Update</Link>
            </Menu.Item>
            <Menu.Item icon={<  SearchOutlined />} key="/search">
              <Link to="/search">Search</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout