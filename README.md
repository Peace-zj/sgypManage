# sgypManage

搜狗有品（模仿）的后台管理系统

>### 后台系统简单介绍
>
>- 该后台系统能够进行角色权限控制并可以实现商品的数据可视化
>- 员工可通过后台管理系统审核用户提交的订单，管理维护用户信息，查询商品信息和销售情况
>- 管理员比员工多一项的权限，就是可以管理维护系统内部员工信息
>- 搭建MongoDB数据库，其中包含用户信息、用户订单、管理员和员工信息、商品信息表等

## 操作

* 下载并解压后，在集成终端中打开并输入：

>   npm i

* 启动数据库：

>   mongod

* 连接server：

>   node server.js

* 运行

>   npm start

## 系统界面截图

1.后台首页

![index](public\assets\后台首页.PNG)

2.商品销售

![sale]( https://github.com/Peace-zj/sgypManage/raw/master/public/assets/商品销售.PNG)

3.商品信息

![Product Information](assets\商品信息.PNG)

4.审核订单

![orders](assets\审核订单.PNG)

5.用户信息

![Customer Message](assets\用户信息.PNG)

6.员工信息

![Employees](assets/员工.PNG)

### 用户名和密码

***普通员工*** 

**用户名** ：周一   

**密码** ：asdqwe

***管理员***   

**用户名** ：李四  

**密码** ：567567