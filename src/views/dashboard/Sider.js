import React, {  Component } from 'react'
import { Layout, Menu } from 'antd';
import {withRouter} from 'react-router'
import {
    HomeOutlined,
    IdcardOutlined,
    OrderedListOutlined,
    ProfileOutlined,
    TeamOutlined
} from '@ant-design/icons';
import './Sider.css'
const menus = [
    {
        id:1,
        path:'/home',
        icon:<HomeOutlined />,
        title:"首页",
        permission:[1,2]
    },
    {
        id:2,
        path:'/orders',
        icon:<OrderedListOutlined />,
        title:"审核订单",
        permission:[1,2]
    },
    {
        id:3,
        path:'/users',
        icon:<TeamOutlined />,
        title:"用户信息",
        permission:[1,2]
    },
    {
        id:4,
        path:'/employee',
        icon:<IdcardOutlined />,
        title:"员工信息",
        permission:[1]
    },
    {
        id:5,
        path:'/stocks',
        icon:<HomeOutlined />,
        title:"商品库存",
        permission:[1,2]
    },
    {
        id:6,
        path:'/business',
        icon:<ProfileOutlined />,
        title:"商品销售",
        permission:[1,2]
    }   
]
const { Sider } = Layout;
const { SubMenu } = Menu;
class Side extends Component {
    state = {
        collapsed: false,
        color:false,
        current:0
    };
    renderMenu(menus){
        let roleType = Number(JSON.parse(localStorage.getItem("cookie")))
       return menus.map(item=>{
            if(item.children){
                if(!item.permission.includes(roleType)){
                    return null
                }
                return <SubMenu key={item.path} title={item.title} icon={item.icon}>
                {this.renderMenu(item.children)}
            </SubMenu>
            }
            if(!item.permission.includes(roleType)){
                return null
            }
        return <Menu.Item key={item.path} icon={item.icon} id={this.state.current===item.id?'active':''} onClick={
            ()=>{
                this.setState({
                    color:true,
                    current:item.id
                })
                this.props.history.push(item.path)
            }
        }>{item.title}</Menu.Item>
        })
    }
    render() {
        //console.log(this.props.location.pathname)
        let openKeys=['/'+this.props.location.pathname.split('/')[1]]
        let selKey=[this.props.location.pathname]
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} id="sideMenu">
                <div className="logo">后台管理系统</div>
                <Menu theme="dark" mode="inline" style={{width:'195px'}} defaultOpenKeys={openKeys} selectedKeys={selKey}>
                        {
                            this.renderMenu(menus)
                        }
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(Side)