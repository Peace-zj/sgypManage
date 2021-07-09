import React,{Component} from 'react'
import { Card,Table,Progress } from 'antd'
import axios from 'axios';
import './Home.css'
const columns = [
    {
      title: '排名',
      dataIndex: 'number',
      align: 'center',
    },
    {
        title: '用户名',
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: '总消费额',
        dataIndex: 'consumption',
        align: 'center',
        render: text => <div>{'￥'+text}</div>
      }
  ];

export default class Home extends Component{
    state={
        usersSum:0,
        orderSum:0,
        reviewSum:0,  //待审核订单
        empSum:0,
        priceSum:0,    //总销售额
        arr:[],
        userPer:0,
        orderPer:0,
        pricePer:0
    }
    priceSum=0
    userPer=0
    orderPer=0
    pricePer=0
    componentDidMount(){
        //查询员工人数
        axios.get('http://localhost:3003/employees/message').then(res=>{
            this.setState({
                empSum:res.data.length
            })
        })
        //查询订单数量和用户数量
        axios.get('http://localhost:3003/customers/msg').then(res=>{
            var sum = 0
            var Narr = []
            res.data.forEach((item,index)=>{
                sum += item.order
                Narr.push({number:0,name:item.name,consumption:item.consumption})
            }) 
            
            var a ={}
            for(var i=0;i<Narr.length;i++){             
                for(var j=0;j<Narr.length-i-1;j++){
                if(Narr[j].consumption < Narr[j+1].consumption){
                        a = Narr[j]
                        Narr[j] = Narr[j+1]
                        Narr[j+1] = a
                    }
                }
            }
            Narr = Narr.splice(0,6)
            Narr.forEach((item,index)=>{
                item.number=index+1
            })
            this.setState({
                orderSum:sum,
                usersSum:res.data.length,
                arr:Narr
            })
            console.log(this.state.arr)
        })
        //查询待审核订单数
        axios.get('http://localhost:3003/orders/review').then(res=>{
            var sum = 0
            res.data.forEach(item=>{
                sum = res.data.length
            })
            this.setState({
                reviewSum:sum
            })
        })
        //查询总销售额
        axios.get("http://localhost:3003/stocks/msg").then(res => {
            res.data.forEach(item=>{
                this.priceSum += item.price*item.order
            })
            this.pricePer=Math.floor((this.priceSum/3000000)*100)
            this.setState({
                pricePer:this.pricePer
            })
        })
        
        
    }
    render(){
        return(
            <div>
                <div style={{display:'flex',justifyContent:'space-around',marginTop:'-15px'}}>
                    <Card size="small" title="用户人数" className='card cardOne'>
                        <p>{this.state.usersSum+'  位'}</p>
                    </Card>
                    <Card size="small" title="订单数量" className='card cardTwo'>
                        <p>{this.state.orderSum+'  笔'}</p>
                    </Card>
                    <Card size="small" title="待审核订单" className='card cardThree'>
                        <p>{this.state.reviewSum+'  笔'}</p>
                    </Card>
                    <Card size="small" title="员工人数" className='card cardFour'>
                        <p>{this.state.empSum+'  名'}</p>
                    </Card>
                </div>
                <div className='divs'>
                    <div style={{width:'75%'}}>
                        <div className='prediv'>
                            <div>
                                <p>目标用户完成度</p>
                                <Progress
                                    type="circle"
                                    strokeColor={{
                                        '0%': '#EEBD89',
                                        '100%': '#f17de2',
                                    }}
                                    percent={84}
                                    className='pro'
                                    />
                            </div>
                            <div>
                                <p>目标订单数完成度</p>
                                <Progress
                                    type="circle"
                                    strokeColor={{
                                        '0%': '#C973FF',
                                        '100%': '#AEBAF8',
                                    }}
                                    percent={58}
                                    className='pro'
                                    />
                            </div>
                            <div>
                                <p>目标销售额完成度</p>
                                <Progress
                                    type="circle"
                                    strokeColor={{
                                        '0%': '#322275',
                                        '100%': '#A098C4',
                                    }}
                                    percent={this.state.pricePer}
                                    className='pro'
                                    />
                            </div>
                            <div>
                                <p>目标员工完成度</p>
                                <Progress
                                    type="circle"
                                    strokeColor={{
                                        '0%': '#9FA5D5',
                                        '100%': '#E8F5C8',
                                    }}
                                    percent={79}
                                    className='pro'
                                    />
                            </div>
                        </div>
                        <div className='sufdiv'>
                            <Card size="small" title="系统通知" extra={'More'} style={{ width: 300 }}>
                                <p>关于部分商品的下架问题需要多次商议</p>
                                <p>关于系统发生故障待维护的问题需要商议</p>
                                <p>关于系统最近计划上线新功能的通知请确认</p>
                                <p>关于系统更新的通知请查看详细情况并确认</p>
                            </Card>
                            <Card size="small" title="活动安排" extra={'More'} style={{ width: 300 }}>
                                <p>关于建党节的活动安排需要多个部门开会商议</p>
                                <p>关于建军节的活动安排需要多个部门开会商议</p>
                                <p>关于国庆节的活动安排需要多个部门开会商议</p>
                                <p>关于新员工的团建活动安排需要各部门开会商议</p>
                            </Card>
                        </div>
                    </div>
                    <div className='tab'>
                        <Table
                            columns={columns}
                            dataSource={this.state.arr}
                            pagination={{
                                hideOnSinglePage:true
                            }}
                            size='small'
                            title={() => {return <b>用户消费排行榜</b>}}
                        />
                    </div>
                </div>
            </div>
            
        )
    }
}