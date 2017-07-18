import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Popconfirm, Cascader, InputNumber } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import EditableCell from './edit'
import { getProductList, getDevicekinds } from 'actions/index';

const { Content, Sider } = Layout;


const Option = Select.Option;
class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看设备</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

export default class ManageDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
  render() {
    var { list } = this.state;

    return (
      <div>
        <TopHeader />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>

          </Content>
        </Layout>
      </div>
    )
  }

  // componentDidMount() {
  //   getProductList()
  //     .done((data) => {
  //       console.log(data)
  //     })
  //     .fail(msg => {
  //       message(msg || '网络异常，请稍后再试')
  //     })
  // }

  // componentDidMount() {
  //   getDevicekinds()
  //     .done((data) => {
  //       console.log(data)
  //     })
  //     .fail(msg => {
  //       message(msg || '网络异常，请稍后再试')
  //     })
  // }

}