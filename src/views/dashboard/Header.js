import React, { Component } from 'react'
import { Layout, Dropdown, Menu } from 'antd';
import {
    ExportOutlined
} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import './head.css'
const { Header } = Layout;

class Head extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const menu = (
            <Menu>
              <Menu.Item danger onClick={()=>{
                  localStorage.removeItem('cookie')
                  this.props.history.push('/login')
              }}>退出</Menu.Item>
            </Menu>
          );
        return (
            <div>
                <Header className="site-layout-background" style={{ paddingLeft: '16px', background: '#000' }}>
                    <span style={{color:'#ddd',fontSize:'18px'}}>Hello , {String(JSON.parse(localStorage.getItem("user")))} !</span>
                    <Dropdown overlay={menu}>
                    <ExportOutlined style={{color:'rgba(247, 214, 30, 0.979)',fontSize:'22px',float:'right',marginTop:'22px'}}/>
                    </Dropdown>
                </Header>

            </div>
        )
    }
}
export default withRouter(Head)