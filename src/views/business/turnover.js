import React,{Component} from 'react'
import echarts from "echarts"
import axios from 'axios'
// import _ from 'lodash'
import {Divider,Progress,Statistic} from 'antd'
export default class Askforleave extends Component{
    state={
        orderSum:0,
        priceSum:0,
        tPercent:0,
        lPercent:0
    }
    goodsList = [] //包含所有的商品销售量
    topFive=[]
    topFiveName=[]     //销售量前五的商品名称
    topFiveOrder=[]     //销售量前五的销售量
    lastFive=[]
    lastFiveName=[]    //销售量最后的五种商品名称
    lastFiveOrder=[]    //销售量最后的五种商品销售量
    orderSum=0
    priceSum=0
    TFOSum=0    //前五的总销售量
    LFOSum=0    //后五的总销售量
    tPercent=0
    lPercent=0
    componentDidMount() {
        axios.get("http://localhost:3003/stocks/msg").then(res => {
           
            res.data.forEach(item=>{
                this.goodsList.push({name:item.name,order:item.order})
                
                this.orderSum += item.order
                this.priceSum += item.price*item.order
            })
            var a ={}
            for(var i=0;i<this.goodsList.length;i++){             
                for(var j=0;j<this.goodsList.length-i-1;j++){
                if(this.goodsList[j].order < this.goodsList[j+1].order){
                        a = this.goodsList[j]
                        this.goodsList[j] = this.goodsList[j+1]
                        this.goodsList[j+1] = a
                    }
                }
            }                       
            this.lastFive = this.goodsList.splice(this.goodsList.length-5,5)
            this.topFive = this.goodsList.splice(0,5)
            this.lastFive.forEach(item=>{
                this.lastFiveName.push(item.name)
                this.lastFiveOrder.push(item.order)
                this.LFOSum += item.order
            })
            this.topFive.forEach(item=>{
                this.topFiveName.push(item.name)
                this.topFiveOrder.push(item.order)
                this.TFOSum += item.order
            })
            this.tPercent = Math.floor((this.TFOSum/this.orderSum)*100)
            this.lPercent = Math.floor((this.LFOSum/this.orderSum)*100)
            this.setState({
                orderSum:this.orderSum,
                priceSum:this.priceSum,
                tPercent:this.tPercent,
                lPercent:this.lPercent
            })
            this.renderEchart()
        })
        window.onresize = ()=>{
            this.tops && this.tops.resize()
            this.lasts && this.lasts.resize()
        }
    }

    componentWillUnmount(){
        window.onresize = null
    }

    renderEchart() {
        this.tops = echarts.init(document.getElementById('tops'));
        this.lasts = echarts.init(document.getElementById('lasts'));

        // 指定图表的配置项和数据
        var seriesLabel = {
            show: true
        }
 
        var topFive_option = {
            title: {
                text: '销售量最多的五种商品'
            },
            grid:{
                right:"30px",
                bottom:"28%" 
            },
            xAxis: {
                data: this.topFiveName,
                axisLabel:{
                    
                    formatter:function(value){                       
                        var Number = value.length
                        var allowNumber = 5
                        var str = ''
                        var row = Math.ceil(Number/allowNumber)
                        for(var i=0;i<row;i++){
                            str += value.substring(i*allowNumber,(i+1)*allowNumber)+'\n'
                        }
                        return str
                } 
                }
            },
            yAxis: {
                name:'销售量',
                minInterval: 100
            },
            series: [{
                name: '销售量',
                type: 'bar',
                data: this.topFiveOrder,
                label: seriesLabel,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                  '#322275',
                                '#3A2885', '#511F90','#635BA2', '#8273BD','#A098C4'
                            ]
                            return colorList[params.dataIndex]
                        }
                    }
                } //不同柱颜色不一样
            }]
        };
        var lastFive_option = {
            title: {
                text: '销售量最少的五种商品'
            },
            grid:{
                right:"30px",
                bottom:"28%" 
            },
            xAxis: {
                data: this.lastFiveName,
                axisLabel:{
                    
                    formatter:function(value){                       
                        var Number = value.length
                        var allowNumber = 5
                        var str = ''
                        var row = Math.ceil(Number/allowNumber)
                        for(var i=0;i<row;i++){
                            str += value.substring(i*allowNumber,(i+1)*allowNumber)+'\n'
                        }
                        return str
                    }
                }
            },
            yAxis: {
                name:'销售量',
                minInterval: 50
            },
            series: [{
                name: '销售量',
                type: 'bar',
                data: this.lastFiveOrder,
                label: seriesLabel,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                 '#1B4F93', '#205AA7',
                                '#426EB4', '#7388C1','#94AAD6', '#BFCAE6'
                            ]
                            return colorList[params.dataIndex]
                        }
                    }
                }, //不同柱颜色不一样
            }]
        };
        this.tops.setOption(topFive_option);
        this.lasts.setOption(lastFive_option);
    }

    render() {
        return (
            <div>
                <Divider orientation="center" style={{fontSize:'20px',fontWeight:'800',marginTop:'-25px',marginBottom:'5px'}}>商品销售情况</Divider> 
                <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginBottom:'20px'}}>
                <div>
                <p>销售量最多的五种商品总销售量所占比</p>
                <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#322275',
                        '100%': '#A098C4',
                    }}
                    percent={this.state.tPercent}
                    style={{display:'flex',justifyContent:'center'}}
                    />
                </div>
                <Statistic title="总销售量" value={this.state.orderSum} />
                <Statistic title="总销售额" suffix='RMB' value={this.state.priceSum} style={{textAlign:'center'}}/>
                <div>
                <p>销售量最少的五种商品总销售量所占比</p>
                <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#1B4F93',
                        '100%': '#BFCAE6',
                    }}
                    percent={this.state.lPercent}
                    style={{display:'flex',justifyContent:'center'}}
                />    
                 </div>
                </div>        
                <div id="tops" style={{ width: "490px", height: '250px' ,float:'left'}}></div>
                <div id="lasts" style={{ width: "490px", height: '250px' ,float:'left'}}></div>
            </div>
        )
    }
}