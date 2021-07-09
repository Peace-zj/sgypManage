import React,{Component} from 'react'
import { Table, Tag,Divider,Input } from 'antd';
import {
    ReloadOutlined
} from '@ant-design/icons';
import Axios from 'axios';
const { Search } = Input;
// import moment from 'moment'
export default class Stocks extends Component{
    state={
        dataSource:[]
    }
    columns = [
        {
            title: '商品编号',
            dataIndex: 'code',
            align:'center'
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          align:'center',
          render: text => <b>{text}</b>,
        },
        {
            title: '商品颜色',
            dataIndex: 'color',
            align:'center',
            render: text => <div>{text}</div>,
        },
        {
          title: '商品图片',
          dataIndex: 'img',
          align:'center',
          render: text => <img src={text} alt="" style={{width:'30px',height:'30px'}}/>,
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            align:'center',
            render: text => <div>￥{text}.00</div>,
        },
        {
            title: '库存量',
            dataIndex: 'total',
            align:'center',
            render:(text)=>{
                if(text <= 1000){
                    return <Tag color={'red'}>{'库存不足'}</Tag>
                }
                return <div>{text}</div>
            }
        },
        {
            title: '销售量',
            dataIndex: 'order',
            align:'center',
            render: text => <div>{text}</div>,
        }
      ];
    handleEdit(data){
        // console.log(moment(new Date().getTime()).format('HH:mm'))

    }
    componentDidMount(){
        Axios.get('http://localhost:3003/stocks/msg').then(res=>{
            // console.log(res.data)
            this.setState({
                dataSource:res.data
            })
        })
    }
    onSearch = value => {
        // console.log(value)
        Axios.get(`http://localhost:3003/stocks/msg?name=${value}`).then(res => {
            // console.log(res.data)
            this.setState({
                dataSource: res.data
            })

        })
    }
    codeSearch = value => {
        // console.log(value)
        Axios.get(`http://localhost:3003/stocks/msg?code=${value}`).then(res => {
            // console.log(res.data)
            this.setState({
                dataSource: res.data
            })

        })
    }
    render(){
        return(
            <div>
                <Search placeholder="商品名称" onSearch={this.onSearch} style={{ width: 380, marginBottom: '10px' }} allowClear />
                <Search placeholder="商品编号" onSearch={this.codeSearch} style={{ width: 380, marginBottom: '10px' ,marginLeft:'20px'}} allowClear />
                    <ReloadOutlined style={{ float: 'right', fontSize: '20px', color: '#aaa' ,marginRight:'20px'}} onClick={() => {
                        Axios.get(`http://localhost:3003/stocks/msg`).then(res => {
                            this.setState({
                                dataSource: res.data
                            })
                        })
                    }} />
                 <p style={{fontSize:'14px'}}>共 {this.state.dataSource.length} 条记录</p>
                <Table columns={this.columns} dataSource={this.state.dataSource} bordered={true}
                size={'small'}
                rowKey={record=>record._id} pagination={
                    {
                        pageSize:6
                    }
                }/>
            </div>
        )
    }
}