import React from 'react';
import Nav from '../common/pc_nav';
import { Steps,Form, Input, Tooltip, Layout,Icon,Breadcrumb, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Modal,DatePicker } from 'antd'; ///////////////////////////
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { Content, Sider } = Layout;
//部门选择数据
const residences = [{
    value: 'zhejiang',
    label: '部门1',
    children: [{
        value: 'hangzhou',
        label: '部门1.1',
        children: [{
            value: 'xihu',
            label: '部门1.2',
        }],
    }],
}, {
    value: 'jiangsu',
    label: '部门2',
    children: [{
        value: 'nanjing',
        label: '部门2.1',
        children: [{
            value: 'zhonghuamen',
            label: '部门2.2',
        }],
    }],
}];


//进度条数据
const Step = Steps.Step;


class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            loading:false,
            visible:false,
            current:0,
            username:'',
        };
    }

    //进度条相关函数
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    // 模态框相关函数
    showModal(){
        this.setState({
            visible:true,
        })
    }
    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel(){
        this.setState({visible:false})
    }
    handleSubmit(e){
        e.preventDefault();
        console.log("aa");
        alert("您已成功创建设备 "+this.props.form.getFieldValue('userName'));
        console.log(this.props.form.getFieldsValue())
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({visible:false})

            }
        });

    }
    handleChange(e){

    }


    // handleWebsiteChange(value){
    //     let autoCompleteResult;
    //     if (!value) {
    //         autoCompleteResult = [];
    //     } else {
    //         autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    //     }
    //     this.setState({ autoCompleteResult });
    // }

    render() {
        const { getFieldDecorator,getFieldProps } = this.props.form;
        const { current,visible} = this.state;
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间' }],
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        // const InforA=React.createClass({
        //     render:function(){
        //         return(
        //
        //             <FormItem
        //                 {...formItemLayout}
        //                 label={(
        //                     <span>设备类型&nbsp;</span>
        //                 )}
        //                 hasFeedback
        //             >
        //                 {getFieldDecorator('nickname', {
        //                     rules: [{ required: true, message: '请输入合适的类型', whitespace: true,min:2 }],
        //                 })(
        //                     <Input />
        //                 )}
        //             </FormItem>
        //
        //
        //         )
        //     }
        // })
        //
        // const InforB=React.createClass({
        //     render:function(){
        //         return(
        //             <FormItem
        //                 {...formItemLayout}
        //                 label="所属部门"
        //             >
        //                 {getFieldDecorator('residence', {
        //                     initialValue: ['zhejiang', 'hangzhou', 'xihu'],
        //                     rules: [{ type: 'array', required: true, message: '请填写所属部门' }],
        //                 })(
        //                     <Cascader options={residences} />
        //                 )}
        //             </FormItem>
        //         )
        //     }
        // })
        //
        // const InforC=React.createClass({
        //     render:function(){
        //         return(
        //             <FormItem
        //                 {...formItemLayout}
        //                 label="DatePicker"
        //             >
        //                 {getFieldDecorator('date-picker', config)(
        //                     <DatePicker />
        //                 )}
        //             </FormItem>
        //         )
        //     }
        // })

        const steps = [{
            title: '第一步',
            content: '',
        }, {
            title: '第二步',
            content: '',
        }, {
            title: '完成',
            content: '',
        }];

    return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>新增设备</Button>
                <Modal
                    visible={visible}
                    title="新增设备"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <div className="steps-action">
                            {
                                this.state.current < steps.length - 1
                                &&
                                <Button type="primary" onClick={() => this.next()}>下一步</Button>
                            }
                            {
                                this.state.current === steps.length - 1
                                &&
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>确认</Button>
                            }
                            {
                                this.state.current > 0
                                &&
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    返回
                                </Button>
                            }

                        </div>
                    ]}
                >
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">
                        <Form>
                            {
                                this.state.current === steps.length -3
                                &&
                                <FormItem
                                          {...formItemLayout}
                                          label={(
                                              <span>设备类型&nbsp;</span>
                                          )}
                                          hasFeedback
                                >
                                    {getFieldDecorator('nickname', {
                                        rules: [{ required: true, message: '请输入合适的类型', whitespace: true,min:2 }],
                                    })(
                                        <Input {...getFieldProps('userName')}/>

                                    )}

                                </FormItem>

                            }

                            {
                                this.state.current === steps.length -2
                                &&
                                <FormItem
                                          {...formItemLayout}
                                          label="所属部门"
                                >
                                    {getFieldDecorator('residence', {
                                        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                                        rules: [{ type: 'array', required: true, message: '请填写所属部门' }],
                                    })(
                                        <Cascader options={residences}/>
                                    )}
                                </FormItem>

                            }
                            {
                                this.state.current === steps.length -1
                                &&
                                <FormItem
                                          {...formItemLayout}
                                          label="日期"
                                >
                                    {getFieldDecorator('date-picker', config)(
                                        <DatePicker style={{marginLeft:"-45%"}}/>
                                    )}
                                </FormItem>

                            }
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}


class TopHeader extends React.Component{
    render(){
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>设备管理</Breadcrumb.Item>
                    <Breadcrumb.Item>创建设备</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default class WatchManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            operate_modal_visible: false,
        }
    }
    render(){
        return(
            <div>
                <TopHeader/>
                <Layout style={{padding:'24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Nav/>
                    </Sider>
                    <Content style={{padding:'0 24px', minHeight: 280 }}>
                        <WrappedRegistrationForm />
                    </Content>
                </Layout>
            </div>
        )
    }
}
