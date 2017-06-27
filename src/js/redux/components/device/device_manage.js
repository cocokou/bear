import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm, Upload } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';

const { Content, Sider } = Layout;
const Search = Input.Search;
const treeData = [{
  label: '设备状态',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '正常',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: '不正常',
    value: '0-0-2',
    key: '0-0-2',
  }, {
    label: '未登记',
    value: '0-0-3',
    key: '0-0-3',
  }],
}, {
  label: '部门',
  value: '0-1',
  key: '0-1',
  children: [{
    label: 'A部门',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: 'B部门',
    value: '0-0-2',
    key: '0-0-2',
  }, {
    label: 'C部门',
    value: '0-0-3',
    key: '0-0-3',
  }]
}];

const statusData = [{
  label: '正常',
  value: '0-0-1',
  key: '0-0-1',
}, {
  label: '不正常',
  value: '0-0-2',
  key: '0-0-2',
}, {
  label: '未登记',
  value: '0-0-3',
  key: '0-0-3',
}];

const orgData = [{
  label: '深圳',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '科技园',
    value: '0-0-1',
    key: '0-0-1',
    children: [{
      label: '研发部',
      value: '0-0-0-1',
      key: '0-0-0-1',
    }, {
      label: '生产部',
      value: '0-0-0-2',
      key: '0-0-0-2',
    }, {
      label: '销售部',
      value: '0-0-0-3',
      key: '0-0-0-3',
    }]
  }, {
    label: '海岸城',
    value: '0-0-2',
    key: '0-0-2',
  }]
}, {
  label: '北京',
  value: '0-1',
  key: '0-1',
  children: [{
    label: 'A部门',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    label: 'B部门',
    value: '0-2-2',
    key: '0-2-2',
    children: [{
      label: 'B1',
      value: '0-2-2-1',
      key: '0-2-2-1',
    }, {
      label: 'B2',
      value: '0-2-2-2',
      key: '0-2-2-2',
    }, {
      label: 'B3',
      value: '0-2-2-3',
      key: '0-2-2-3',
    }]
  }, {
    label: 'C部门',
    value: '0-2-3',
    key: '0-2-3',
  }]
}];

const deviceData = [{
  id: 1,
  key: 1,
  name: 'R2000',
  type: '桌面式读写器',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: 'A部门',
  location: '* * *',
}, {
  id: 2,
  key: 2,
  name: 'F5019-H',
  type: '固定式一体化读写器',
  status: '不正常',
  last_update_time: '2017-01-01 12:00',
  org: 'B部门',
  location: '* * *',
}, {
  id: 3,
  key: 3,
  name: 'F5880-H',
  type: '固定式多通道读写器',
  status: '未登记',
  last_update_time: '2017-01-01 12:00',
  org: 'C部门',
  location: '* * *',
}, {
  id: 4,
  key: 4,
  name: 'R2000',
  type: '桌面式读写器',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: 'A部门',
  location: '* * *',
}, {
  id: 5,
  key: 5,
  name: 'F5019-H',
  type: '固定式一体化读写器',
  status: '不正常',
  last_update_time: '2017-01-01 12:00',
  org: 'B部门',
  location: '* * *',
}, {
  id: 6,
  key: 6,
  name: 'F5880-H',
  type: '固定式多通道读写器',
  status: '未登记',
  last_update_time: '2017-01-01 12:00',
  org: 'C部门',
  location: '* * *',
}];

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(info.file.name + ' 上传成功。');
    } else if (info.file.status === 'error') {
      message.error(info.file.name + ' 上传失败。');
    }
  }
};



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

class FilterHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: undefined,
    }
  }
  render() {
    return (
      <div className="panel search">
        <div style={{ lineHeight: 3 }}>
          <label>搜索设备：&nbsp; </label>
          <Search placeholder="请输入关键字" style={{ maxWidth: 200, marginRight: 60 }} />
          <Button type="primary" icon="search">Search</Button>
        </div>
        <div style={{ lineHeight: 3 }}>

          <label style={{ width: 70 }}>设备状态：&nbsp; </label>
          <TreeSelect
            style={{ width: 200 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={statusData}
            placeholder="--请选择--"
            treeDefaultExpandAll
            class='space-right'
          />

          <label style={{ marginLeft: 60 }}>所属部门：&nbsp; </label>
          <TreeSelect
            style={{ width: 200 }}
            dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
            treeData={orgData}
            placeholder="--请选择--"
            treeDefaultExpandAll
            class='space-right'
          />
        </div>

        <div style={{ lineHeight: 3 }}>
          <label>设备位置：&nbsp; </label>
          <TreeSelect
            style={{ width: 200 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="--请选择--"
            treeDefaultExpandAll
            class='space-right'
          />
          <label style={{ marginLeft: 60 }}>设备类型：&nbsp; </label>
          <TreeSelect
            style={{ width: 200 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="--请选择--"
            treeDefaultExpandAll
            class='space-right'
          />
        </div>

      </div>
    )
  }
  onChange(e) {
    this.search({ keyword: e })
  }
}

class ETable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: deviceData,
      index: '',
      selectedRowKeys: [],
      selectedRows: [],
      record: ''
    };
    this.onDelete = this.onDelete.bind(this);


    this.handleSelectedDelete = this.handleSelectedDelete.bind(this);
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    }, {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '设备状态',
      dataIndex: 'status',
      key: 'status'
    }, {
      title: '所属部门',
      dataIndex: 'org',
      key: 'org'
    }, {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type'
    }, {
      title: '状态更新时间',
      dataIndex: 'last_update_time',
      key: 'last_update_time'
    }, {
      title: '设备位置',
      dataIndex: 'location',
      key: 'location'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <div>
          <span>
            <a href="#">查看</a>
          </span>
          <span className="ant-divider" />
          <span>
            <a href="#">编辑</a>
          </span>
          <span className="ant-divider" />
          <span>
            <Popconfirm title="设备删除后不能恢复，确定要删除这台设备吗？" onConfirm={this.onDelete.bind(this, index)} placement="leftBottom" okText="删除" cancelText="取消">
              <a href="javascript:;" >删除</a>
            </Popconfirm>

          </span>
        </div>
      ),
    }];
  }

  onDelete(index) {
    const dataSource = [...this.state.dataSource]
    dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行  
    this.setState({ dataSource });
  }

  handleSelectedDelete() {
    if (this.state.selectedRowKeys.length > 0) {
      const dataSource = [...this.state.dataSource]
      dataSource.splice(this.state.selectedRows, this.state.selectedRows.length)
      this.setState({ dataSource });
    }
    else {
    }
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows
        })
      },
    }
    return (
      <div>

        <Upload {...props}>
          <Button type="primary" style={{ marginLeft: 20 }} >
            <Icon type="upload" /> 批量上传
          </Button>
        </Upload>        
        
        <Button type="primary" style={{ margin: 20 }} >创建设备</Button>

        <Popconfirm title="设备删除后不能恢复，确定要删除所选设备吗？" onConfirm={this.handleSelectedDelete} okText="删除" cancelText="取消">
          <Button type="primary">删除设备</Button>
        </Popconfirm>

        <Button type="primary" style={{ margin: 20 }}>暂停设备</Button>
        <Button type="primary">重启设备</Button>

        <Table columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
        />


      </div>

    );
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
            <FilterHeader />

            <ETable />

          </Content>
        </Layout>
      </div>
    )
  }

}