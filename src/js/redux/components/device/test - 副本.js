import React, { Component } from 'react';
import { Table, Input, Popconfirm } from 'antd';

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: this.props.value,
    editable: this.props.editable || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value.toString() || ' '}
            </div>
        }
      </div>
    );
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '设备类型',
      dataIndex: 'kind',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'kind', text),
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'username', text),
    }, {
      title: '密码',
      dataIndex: 'password',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'password', text),
    }, {
    }, {
      title: '主题名称',
      dataIndex: 'topic',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'topic', text),
    }, {
    }, {
      title: '描述',
      dataIndex: 'description',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'description', text),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].username;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.editDone(index, 'save')}>Save </a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                :
                <span>
                  <a onClick={() => this.edit(index)}>Edit</a>
                </span>
            }
          </div>
        );
      },
    }];
    this.state = {
    data: [{
        key: 1,
        kind: { value: 'T-100' },
        topic: {value:'主题1'},
        description: {value:'每一类设备，共用一组用户名密码'},
        username: { editable: false, value: 'device_kin' },
        password: { editable: false, value: 'abcde****vb' },
      }, {
        key: 2,
        kind: {value: 'T-666' },
        topic: {value:'主题66'},
        description: {value:'用户名密码，对应一个主题'},
        username: { editable: false, value: 'device_222' },
        password: { editable: false, value: '2****vb' },
      }, {
        key: 3,
        kind: {value: 'T-888' },
        topic: {value:'主题88'},
        description: {value:'每次连接成功，发送一个主题'},
        username: { editable: false, value: 'device_888' },
        password: { editable: false, value: '***' },
      }]
    };
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return <Table bordered dataSource={dataSource} columns={columns} />;
  }
}

