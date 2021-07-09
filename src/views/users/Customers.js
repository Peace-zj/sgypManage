import React, { Component } from 'react'
import { Table, Modal, Button, Form, Input,Radio, Popconfirm,Tag} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    LockOutlined 
} from '@ant-design/icons';
import axios from 'axios'
export default class Customers extends Component {
    state = {
        dataSource: [],
        visibleAdd: false,
        visibleUpdate:false,
        visibleDel:false,
        loading:false,
        crt:0,
    }
    addRef = React.createRef()
    updateRef = React.createRef()
    current=null
    columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            align:'center',
            render: text => <b>{text}</b>,
        },
        {
            title: '用户等级',
            dataIndex: 'level',
            align:'center',
            render: (text) => {
                if(text==='普通用户'){
                    return <Tag color={'geekblue'}>{text}</Tag> 
                }
                return <Tag color={'gold'}>{text}</Tag>
            }
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            align:'center',
            render: (text) => {
                var arr1 = text.split('').splice(0,3)
                var arr2 = text.split('').splice(6,4)
                var arr3 = ['****']
                return <div>{arr1.concat(arr3,arr2).join('')}</div>
            }
        },
        {
            title: '电子邮件',
            dataIndex: 'email',
            align:'center',
            render: (text) => {
                var arr1 = text.split('').splice(0,3)
                var arr2 = text.split('').splice(6)
                var arr3 = ['****']
                if (text === '/') {
                    return <Tag color={'blue'}>{text}</Tag>
                }
                return <div>{arr1.concat(arr3,arr2).join('')}</div>
            }
        },
        {
            title: '总下单数',
            dataIndex: 'order',
            align:'center',
            render: (text) => {
                return <div>{text}</div>
            }
        },
        {
            title: '总消费额',
            dataIndex: 'consumption',
            align:'center',
            render: (text) => {
                return <div>{text}</div>
            }
        },
        {
            title: '修改',
            key: 'edit',
            align:'center',
            render: (data) => (
                    <EditOutlined style={{color:'rgba(247, 214, 30, 0.979)'}}onClick={()=>{this.handleEdit(data)}} />
            ),
        },
        {
            title: '移除',
            align:'center',
            render: (data) => {
                return <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"
                visible={this.state.crt===data._id?true:false}
                onConfirm={()=>{this.handleDelete(data._id)}}
                onCancel={()=>{
                    this.setState({
                        crt:0
                    })
                  }
                }>
                        <DeleteOutlined onClick={()=>{
                            this.setState({
                                crt:data._id
                            })
                          }
                        }
                        style={{color:'red'}} />   
                </Popconfirm>
            },
        }
    ];
    componentDidMount() {
        axios.get('http://localhost:3003/customers/msg').then(res => {
            // console.log(res)
            this.setState({
                dataSource: res.data
            })
        })
    }

    handleDelete(_id){
        console.log(_id)
        this.setState({
            loading:true
        })
        axios.post(`http://localhost:3003/customers/del`,{_id}).then((res)=>{
            setTimeout(()=>{
                this.setState({
                    dataSource:this.state.dataSource.filter(item=>item._id!==_id),
                    loading:false,
                    crt:0
                })
                console.log(res.data)
            },500)
        })
    }
    editOk(){
        this.updateRef.current.validateFields().then(data=>{
            axios.post(`http://localhost:3003/customers/update`,{
                ...this.current,
                ...data
            }).then(res=>{
                console.log(res.data)
                this.setState({
                    dataSource:this.state.dataSource.map(item=>{
                        if(item._id===this.current._id){
                            return {
                                ...this.current,
                                ...data
                            }
                        }
                        return item
                    }),
                    visibleUpdate:false
                })
            })
        })
    }
    handleEdit(data){
        this.current=data
        console.log(data)
        setTimeout(()=>{
            this.setState({
                visibleUpdate:true
            })
            this.updateRef.current.setFieldsValue({
                name:data.name,
                account:data.account,
                tel:data.tel
            })
        },0)
    }
    handleOk(){
        // console.log(this.addRef.current)
        this.addRef.current.validateFields().then(data=>{
            return data
        }).catch(err=>{
        }).then(value=>{
            axios.post('http://localhost:3003/customers/vip',value).then(res=>{    
            this.setState({
                    dataSource:[...this.state.dataSource,res.data[0]],
                    visibleAdd:false
                })
            })
            this.addRef.current.resetFields()
        })
    }
    render() {
        return (
            <div>
                <Button style={{ background: '#000', border: '1px solid rgba(247, 214, 30, 0.979)', color: '#fff', marginBottom: '10px' }} onClick={() => {
                    this.setState({
                        visibleAdd: true
                    })
                }}>新的VIP</Button>
                <Modal
                    title="新的VIP"
                    visible={this.state.visibleAdd}
                    onOk={()=>{this.handleOk()}}
                    onCancel={() => {
                        this.setState({
                            visibleAdd: false
                        })
                    }}
                    width={350}
                >
                    <Form name="control-hooks" 
                    ref={this.addRef}>
                        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                            <Input prefix={<UserOutlined />} placeholder="username"/>
                        </Form.Item>
                        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
                            <Input prefix={<LockOutlined />}placeholder="password"/>
                        </Form.Item>
                        <Form.Item name="level" label="会员等级" rules={[{ required: true }]}>
                            <Radio.Group onChange={(ev)=>{
                                this.setState({
                                    level:ev.target.value
                                })
                            }} value={this.state.level}>
                                <Radio key='one' value={'普通用户'}>普通用户</Radio>
                                <Radio key='two' value={'VIP用户'}>VIP用户</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="consumption" label="总消费额" rules={[{ required: true }]}>
                            <Input suffix="RMB"/>
                        </Form.Item>
                        <Form.Item name="order" label="下单数" rules={[{ required: true }]}>
                            <Input suffix="笔"/>
                        </Form.Item>
                        <Form.Item name="tel" label="联系电话" rules={[{ required: true }]}>
                            <Input prefix={<PhoneOutlined />} placeholder="Tel"/>
                        </Form.Item>
                        <Form.Item name="email" label="电子邮件" rules={[{ required: true }]}>
                            <Input prefix={<MailOutlined />} placeholder="Email"/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="VIP用户信息修改"
                    visible={this.state.visibleUpdate}
                    onOk={()=>{this.editOk()}}
                    onCancel={() => {
                        this.setState({
                            visibleUpdate: false
                        })
                    }}
                    width={350}
                >
                    <Form
                    layout='vertical' 
                    name="control-hooks" 
                    ref={this.updateRef}>
                        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="level" label="会员等级" rules={[{ required: true }]}>
                            <Radio.Group onChange={(ev)=>{
                                this.setState({
                                    level:ev.target.value
                                })
                            }} value={this.state.level}>
                                <Radio key='one' value={'普通用户'}>普通用户</Radio>
                                <Radio key='two' value={'VIP用户'}>VIP用户</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="tel" label="联系电话" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table columns={this.columns} 
                loading={this.state.loading} 
                dataSource={this.state.dataSource} 
                pagination={{
                    pageSize: 6
                }
                } 
                rowKey={record => record._id} 
                size={"middle"}
                />
            </div>
        )
    }
}