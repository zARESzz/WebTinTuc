import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;

const Home = () => <div>Home Page</div>;
const Users = () => <div>Users Page</div>;
const Products = () => <div>Products Page</div>;

const Admin = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/products">Products</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/users" component={Users} />
              <Route path="/products" component={Products} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Admin Panel</Footer>
      </Layout>
    </Router>
  );
};

export default Admin;
