import React, { Component } from 'react'
import { Input, Table, Tag, Button, Descriptions } from 'antd';
import axios from 'axios'
import {
    ReloadOutlined,
    FileTextOutlined
} from '@ant-design/icons';
const { Search } = Input;

export default class Message extends Component {
    state = {
        dataSource: [],
        detail: true

    }
    msgObj={}
    componentDidMount() {
        axios.get('http://localhost:3003/employees/message').then(res => {
            console.log(res.data)
            this.setState({
                dataSource: res.data
            })
        })
    }
    columns = [
        {
            title: '员工编号',
            dataIndex: 'code',
            align: 'center',
            
        },
        {
            title: '员工姓名',
            dataIndex: 'name',
            align: 'center',
            render: text => <b>{text}</b>
        },
        {
            title: '性别',
            dataIndex: 'sex',
            align: 'center',
            render: (text) => {
                if (text === '男') {
                    return <Tag color={'blue'}>{text}</Tag>
                }
                return <Tag color={'red'}>{text}</Tag>
            }
        },
        {
            title: '年龄',
            dataIndex: 'age',
            align: 'center'
        },
        {
            title: '入职时间',
            dataIndex: 'entryTime',
            align: 'center'
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            align: 'center',
            render: (text) => {
                var arr1 = text.split('').splice(0,3)
                var arr2 = text.split('').splice(6,4)
                var arr3 = ['****']
                return <div>{arr1.concat(arr3,arr2).join('')}</div>
            }
        },
        {
            title: '查看详情',
            key: 'search',
            align: 'center',
            render: (data) => (
                <Button type="text" onClick={() => { this.handleClick(data._id) }}><FileTextOutlined style={{fontSize:'20px',color:'rgba(247, 214, 30, 0.979)'}}/></Button>
            )
        }
    ];
    //查看详情
    handleClick(_id) {
        setTimeout(()=>{
            axios.get(`http://localhost:3003/employees/message?_id=${_id}`).then(res=>{
                this.msgObj=[...res.data]
                console.log(this.msgObj[0])
                this.setState({
                    detail: false
                })
            })
        })
    }
    //查看单独的个人信息
    onSearch = value => {
        console.log(value)
        axios.get(`http://localhost:3003/employees/message?code=${value}`).then(res => {
            console.log(res.data)
            this.setState({
                dataSource: res.data
            })

        })
    }
    nameSearch = value => {
        console.log(value)
        axios.get(`http://localhost:3003/employees/message?name=${value}`).then(res => {
            console.log(res.data)
            this.setState({
                dataSource: res.data
            })

        })
    }
    render() {
        return (
            <div>
                <div>{
                    this.state.detail ?
                    <div>
                    <Search placeholder="员工编号" onSearch={this.onSearch} style={{ width: 380, marginBottom: '8px',marginTop:'-5px'}} allowClear />
                    <Search placeholder="员工姓名" onSearch={this.nameSearch} style={{ width: 380, marginBottom: '8px' ,marginTop:'-5px',marginLeft:'20px'}} allowClear />
                    <ReloadOutlined style={{ float: 'right', fontSize: '20px', color: '#aaa' }} onClick={() => {
                        axios.get(`http://localhost:3003/employees/message`).then(res => {
                            this.setState({
                                dataSource: res.data
                            })
                        })
                    }} />
                    <p style={{fontSize:'14px'}}>共 {this.state.dataSource.length} 条记录</p>
                    <Table columns={this.columns} dataSource={this.state.dataSource} bordered={true}
                        size={'small'}
                        rowKey={record => record._id} pagination={
                            {
                                pageSize: 7
                            }
                        } /> 
                    </div>:
                        <Descriptions
                            column={2}
                            size='middle'
                            bordered
                            title="个人信息"
                            extra={<Button type="primary" onClick={()=>{
                                this.setState({
                                    detail:true
                                })
                            }}>返回</Button>}
                        >
                            <Descriptions.Item label="姓名">{this.msgObj[0].name}</Descriptions.Item>
                            <Descriptions.Item label="性别">{this.msgObj[0].sex}</Descriptions.Item>
                            <Descriptions.Item label="出生日期">{this.msgObj[0].birth}</Descriptions.Item>
                            <Descriptions.Item label="年龄">{this.msgObj[0].age}</Descriptions.Item>
                            <Descriptions.Item label="学历">{this.msgObj[0].edu}</Descriptions.Item>
                            <Descriptions.Item label="员工编号">{this.msgObj[0].code}</Descriptions.Item>
                            <Descriptions.Item label="入职时间">{this.msgObj[0].entryTime}</Descriptions.Item>
                            <Descriptions.Item label="工作期限">{this.msgObj[0].workDuration}</Descriptions.Item>
                            <Descriptions.Item label="爱好">{this.msgObj[0].hobby}</Descriptions.Item>
                            <Descriptions.Item label="邮箱">{this.msgObj[0].email}</Descriptions.Item>
                            <Descriptions.Item label="联系电话">{this.msgObj[0].tel}</Descriptions.Item>
                            <Descriptions.Item label="联系地址 ">{this.msgObj[0].address}
                                <br />
                            </Descriptions.Item>
                            <Descriptions.Item label="自我评价">{this.msgObj[0].skill}
                                <br />
                                <br />
                                <br />
                            </Descriptions.Item>
                        </Descriptions>
                }
                </div>
            </div>
        )
    }
}