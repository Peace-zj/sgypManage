import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import Side from "./Sider";
import Head from "./Header";
import './Dashboard.css'
import Turnover from '../business/turnover'
import Message from '../employee/Message';
import Stocks from '../stocks/Stocks';
import Orders from '../orders/Orders';
import Customers from '../users/Customers';
import Home from '../home/Home';
import Nopermission from '../nopermission/Nopermission'
const { Content } = Layout;
const routes = [
    {
        path:'/home',
        component:Home,
        permission:[1,2]
    },
    {
        path:'/orders',
        component:Orders,
        permission:[1,2]
    },
    {
        path:'/users',
        component:Customers,
        permission:[1,2]
    },
    {
        path:'/stocks',
        component:Stocks,
        permission:[1,2]
    },
    {
        path:'/employee',
        component:Message,
        permission:[1,2]
    },
    {
        path:'/business',
        component:Turnover,
        permission:[1,2]
    }
]
export default class Dashboard extends Component {

    render() {
         let roleType = JSON.parse(localStorage.getItem("cookie"))
        //  JSON.parse(localStorage.getItem("cookie"))
        console.log(localStorage.getItem("cookie"))
        return (
                <Layout>
                    <Side></Side>
                    <Layout className="site-layout">
                        <Head></Head>
                            <Content
                                className="site-layout-background"
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    minHeight: 280,
                                }}
                            >
                                <Switch>
                                    {
                                        routes.map(item=>
                                            item.permission.includes(roleType) &&
                                            <Route path={item.path} key={item.path} component={item.component} />
                                        )  
                                    }
                                    <Redirect from='/' to='/home' exact/>
                                    <Route path="*" component={Nopermission}/>
                                </Switch>
                            </Content>
                    </Layout>
                </Layout>
        )
    }
}