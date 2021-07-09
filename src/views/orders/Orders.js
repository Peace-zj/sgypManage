import React,{Component} from 'react'
import { Table, Tag,Input,Button } from 'antd';
import {
    ReloadOutlined
} from '@ant-design/icons';
import Axios from 'axios';
const { Search } = Input;
// import moment from 'moment'
export default class Orders extends Component{
    state={
        dataSource:[]
    }
    columns = [
        {
          title: '用户名',
          dataIndex: 'customer',
          align:'center',
          render: text => <b>{text}</b>,
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            align:'center'
          },
          {
            title: '地址',
            dataIndex: 'address',
            align:'center'
          },
        {
            title: '商品名称',
            dataIndex: 'tradeName',
            align:'center',
            render: text => <div>{text}</div>,
        },
        {
            title: '商品颜色',
            dataIndex: 'tradeColor',
            align:'center',
            render: text => <div>{text}</div>,
        },
        {
          title: '商品图片',
          dataIndex: 'tradeImg',
          align:'center',
          render: text => <img src={text} alt="" style={{width:'30px',height:'30px'}}/>,
        },
        {
            title: '商品价格',
            dataIndex: 'tradePrice',
            align:'center',
            render: text => <div>￥{text}.00</div>,
        },
        {
            title: '数量',
            dataIndex: 'tradeNum',
            align:'center'
        },
        {
            title: '审核状态',
            dataIndex: 'state',
            align:'center',
            render: (text,data)=>{
                if(text === true){
                    return <Tag color={'green'}>{'已审核'}</Tag>
                }
                return <Button type="primary" danger size='small' 
                onClick={()=>{this.handleChange(data._id)}}>
                        待审核
              </Button>
            }
        }
      ];
      handleChange(_id){
        Axios.post('http://localhost:3003/orders/state',{_id}).then(res=>{
            this.setState({
                dataSource:res.data
            })
        })

      }
    componentDidMount(){
        Axios.get('http://localhost:3003/orders/msg').then(res=>{
            // console.log(res.data)
            this.setState({
                dataSource:res.data
            })
        })
    }
    onSearch = value => {
        // console.log(value)
        Axios.get(`http://localhost:3003/orders/msg?customer=${value}`).then(res => {
            // console.log(res.data)
            this.setState({
                dataSource: res.data
            })

        })
    }
    nameSearch = value => {
        // console.log(value)
        Axios.get(`http://localhost:3003/orders/msg?tradeName=${value}`).then(res => {
            // console.log(res.data)
            this.setState({
                dataSource: res.data
            })

        })
    }
    render(){
        return(
            <div>
                <Search placeholder="用户名" onSearch={this.onSearch} style={{ width: 380, marginBottom: '10px' }} allowClear />
                <Search placeholder="商品名称" onSearch={this.nameSearch} style={{ width: 380, marginBottom: '10px' ,marginLeft:'20px'}} allowClear />
                    <ReloadOutlined style={{ float: 'right', fontSize: '20px', color: '#aaa' ,marginRight:'20px'}} onClick={() => {
                        Axios.get(`http://localhost:3003/orders/msg`).then(res => {
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
                        pageSize:5
                    }
                }/>
            </div>
        )
    }
}