---
date: 2025-09-01
title: 34PB连接MySQL数据库
icon: note
---

### 写在前面

这是PB案例学习笔记系列文章的第34篇，该系列文章适合具有一定PB基础的读者。

通过一个个由浅入深的编程实战案例学习，提高编程技巧，以保证小伙伴们能应付公司的各种开发需求。

文章中设计到的源码，小凡都上传到了gitee代码仓库[https://gitee.com/xiezhr/pb-project-example.git](https://gitee.com/xiezhr/pb-project-example.git)

![gitee代码仓库](https://i-blog.csdnimg.cn/img_convert/732459902c2f325fef61011dd939837c.png)



需要源代码的小伙伴们可以自行下载查看，后续文章涉及到的案例代码也都会提交到这个仓库【**[pb-project-example](https://gitee.com/xiezhr/pb-project-example)**】

如果对小伙伴有所帮助，希望能给一个小星星⭐支持一下小凡。



### 一、小目标

我们日常开发一个应用，不管应用再小，基本上都离不开数据库的支持。

`PB`对一些主流的大型关系型数据库（`Oracle`、`SQLServer`、`MySQL`）提供了专用的数据库接口，对一些小型数据库如

(`Excel`、`Access`)数据库提供了`ODBC`接口支持。

通过本案例，我们使用`ODBC`的方式让`PB`连接`MySQL`数据库，并且查询数据表中数据显示出来。

最终实现效果如下
![连接MySQL数据库](https://i-blog.csdnimg.cn/img_convert/2a3db41855f9ae500d2765d860b1aa83.gif)


### 二、数据库准备

① 创建数据库

```sql
CREATE DATABASE db_employee
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

② 创建员工信息表

```sql
CREATE TABLE employee_info (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 员工ID，自动递增
    empl_code VARCHAR(50) NOT NULL,             -- 员工编号
    empl_name VARCHAR(50) NOT NULL,              -- 员工姓名
    job_title VARCHAR(100),                       -- 职位
    department VARCHAR(100),                      -- 部门
    hire_date DATE NOT NULL,                     -- 入职日期
    salary DECIMAL(10, 2),                       -- 工资
    email VARCHAR(100) UNIQUE NOT NULL,          -- 邮箱，唯一
    create_date DATETIME ,  -- 创建时间，默认当前时间
    update_date DATETIME   -- 更新时间
);
```

③ 插入数据，最终表数据如下

![表数据](https://i-blog.csdnimg.cn/img_convert/69391a4623166aff991993eb38c64856.png)

### 三、创建程序基本框架

① 新建`examplework`工作区

② 新建`exampleapp`应用

③ 新建`w_main`窗口，将`title`设置为“员工信息”

![新建w_main窗口](https://i-blog.csdnimg.cn/img_convert/e48806292ec7798df261b24aafeba229.png)

以上步骤，由于篇幅原因，这里不再赘述。忘记了的小伙伴可以翻一翻该系列文章的第一篇复习一下

### 四、下载并`MySQL`的`ODBC`驱动

#### 4.1 驱动下载

> 注：晓凡本地安装的是MySQL8，所以下载的odbc版本是8.0.43。小伙伴们根据自己数据库版本选择对应的odbc版本

官网地址：https://dev.mysql.com/downloads/connector/odbc/

这里晓凡帮大家下载好了，小伙伴们可以到下面网盘获取
链接：https://pan.quark.cn/s/4e165be435ca

#### 4.2 安装

双击上一步下载好的odbc驱动包，默认下一步安装即可
![安装odbc驱动](https://i-blog.csdnimg.cn/img_convert/500a14a58844563f8d12d175318a4933.png)
![安装完成](https://i-blog.csdnimg.cn/img_convert/e2d9abe37415a11a0cea27ba8bae902f.png)

#### 4.3 配置ODBC

1. 启动ODBC管理工具
   ![启动odbc](https://i-blog.csdnimg.cn/img_convert/c7d71ad7e8d732d8b43acd70e9ae75f8.png)
2. 新增DSN，选择MySQL驱动
   ![新增DSN](https://i-blog.csdnimg.cn/img_convert/4b8fe68ea9b74fa62ec88f6d305837d9.png)  
3. 填写连接信息
   ![填写数据库连接信息](https://i-blog.csdnimg.cn/img_convert/4a681957a9bdc89cc9c933432dd5146e.png)
4. 测试连接 并保存配置信息
   ![测试连接](https://i-blog.csdnimg.cn/img_convert/9406f7a9970174e9f4d918d62ff77ad2.png)

### 五、建立数据源

① 新建`DB Profile`
![a新建`DB Profile`](https://i-blog.csdnimg.cn/img_convert/45a59de7e4c27a28850e3fa8efc6bbf0.png)

② 配置数据库连接信息
![配置数据库信息](https://i-blog.csdnimg.cn/img_convert/904955a1a7ebd274fa78f9fa06164663.png)
![数据表拥有者](https://i-blog.csdnimg.cn/img_convert/0cb9c05393e50fa74006a517c2a31b33.png)

③ 测试是否连接成功
![测试是否生成成功](https://i-blog.csdnimg.cn/img_convert/1ea990c15b894d68f2c6b8a642ffafb4.png)

点击【Test Connection】按钮，出现下面提示表示连接成功

![连接成功](https://i-blog.csdnimg.cn/img_convert/edd68739b933f58794c1e15aefe22eae.png)

### 六、创建数据窗口

① 单击菜单栏上的`File`-->`New`命令，在弹出的窗口中选择`DataWindow`选项卡中的`Grid`风格的数据窗口
![grid风格数据窗口](https://i-blog.csdnimg.cn/img_convert/32a4b51386304901d18ea3e25dc29e00.png)

② 选择`Quick Select`
![Quick Select](https://i-blog.csdnimg.cn/img_convert/c549c4a2c76ab951d08e547a8cc1f49b.png)

③ 选择`employee_info`表并选择需要展示的表字段
![选择表和字段](https://i-blog.csdnimg.cn/img_convert/1bee2c8ad5a6e68e26a40557ea77696a.png)

④ 默认下一步，并修改表头

![修改表头信息](https://i-blog.csdnimg.cn/img_convert/79ee8dc4a86563954aee3f40fcb00b07.png)

⑤ 设置薪水显示格式，并设置右对齐

- `Style Type` 选择`EditMask`类型
- `Mask`格式为：###,###.00

![设置金额格式](https://i-blog.csdnimg.cn/img_convert/7003d9e3169aff91a2fdf0ae2e40e240.png)

⑥ 将数据窗口保存为`d_emp`

![`d_emp`](https://i-blog.csdnimg.cn/img_convert/43e672ff3041c16550807dc6eb74c832.png)



### 七、在窗口中添加控件

① 在`w_main`窗口中添加2个`CommandButton`控件，分别为`cb_1`和`cb_2`,`Text`分别为查询和退出

![添加按钮控件](https://i-blog.csdnimg.cn/img_convert/011bbcec0bee1fe162177a6a3b51fdc8.png)


② 在`w_main`窗口上添加`DataWindon` 控件，名称为`dw_1`

- 将`HScrollBar` 框勾选上，横向滚动条（当横向显示不下时，会自动产生滚动条）
- 将`VScrollBar`框勾选上，纵向滚动条（当纵向显示不下时，会自动产生滚动条）

- 将数据窗的`DataObject`设置成`d_emp`
  ![控件布局](https://i-blog.csdnimg.cn/img_convert/f861192861c5b4c296c7672ae15c7f28.png)

### 八、编写代码

① 单击开发界面左边的`System Tree`中的`exampleapp`对象，并在其`Open`事件中添加如下脚本

```java
SQLCA.DBMS = "ODBC"
SQLCA.AutoCommit = False
SQLCA.DBParm = "ConnectString='DSN=mysql-3308;UID=root;PWD=123456',PBCatalogOwner='db_employee'"

connect;
open(w_main)
```

② 在`dw_1`的`constructor`事件中添加如下代码

```java
this.settransobject( sqlca)
```

![dw_1中添加代码](https://i-blog.csdnimg.cn/img_convert/a533aaf3001d27ccd096da385bb954f8.png)


② 在刚才添加的【查询】按钮 `cb_1`的`clicked`中添加如下代码

```java
//使数据窗口与事务对象连接
dw_1.settransobject(sqlca)
//执行检索操作
dw_1.retrieve()
```

③ 在【退出】按钮`cb_2`的`clicked`中添加如下代码

```java
close(parent)
```

④ 单击开发界面左边的`System Tree`中的`exampleapp`对象，并在其`close`事件中添加如下脚本

```java
//关闭程序释放资源
disconnect;
```

### 九、运行程序

看看能不能查询出数据

![连接MySQL数据库](https://i-blog.csdnimg.cn/img_convert/2a3db41855f9ae500d2765d860b1aa83.gif)