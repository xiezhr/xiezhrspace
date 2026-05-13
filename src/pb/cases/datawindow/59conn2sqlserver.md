---
date: 2025-05-07
title: 59PB连接SQLServer数据库
icon: note
---

### 写在前面

这是PB案例学习笔记系列文章的第59篇，该系列文章适合具有一定PB基础的读者。

通过一个个由浅入深的编程实战案例学习，提高编程技巧，以保证小伙伴们能应付公司的各种开发需求。

文章中涉及到的源码，小凡都上传到了gitee代码仓库[https://gitee.com/xiezhr/pb-project-example.git](https://gitee.com/xiezhr/pb-project-example.git)

需要源代码的小伙伴们可以自行下载查看，后续文章涉及到的案例代码也都会提交到这个仓库【**[pb-project-example](https://gitee.com/xiezhr/pb-project-example)**】

如果对小伙伴有所帮助，希望能给一个小星星⭐支持一下小凡。

### 一、小目标

我们日常开发中，SQLServer 是非常常见的一款关系型数据库，尤其在企业级应用中广泛使用。

通过本案例，我们使用 PB 连接 SQLServer 数据库，并且查询数据表中数据显示出来。

最终实现效果如下：

![连接SQLServer查询数据](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-demo.gif)

### 二、环境准备

#### 2.1 安装SQLServer数据库

确保你已经安装了 SQLServer 数据库，可以是以下版本之一：
- SQLServer 2008/2012/2014/2016/2017/2019/2022
- SQLServer Express（免费版）

#### 2.2 创建测试数据库

使用 SQLServer Management Studio (SSMS) 执行以下脚本创建测试数据：

```sql
-- 创建数据库
CREATE DATABASE PB_Demo;
GO

-- 使用数据库
USE PB_Demo;
GO

-- 创建员工表
CREATE TABLE employee (
    emp_id INT PRIMARY KEY IDENTITY(1,1),
    emp_name NVARCHAR(50) NOT NULL,
    emp_dept NVARCHAR(50),
    emp_salary DECIMAL(10,2),
    emp_hiredate DATE,
    emp_status NVARCHAR(10) DEFAULT '在职'
);
GO

-- 插入测试数据
INSERT INTO employee (emp_name, emp_dept, emp_salary, emp_hiredate, emp_status) VALUES
('张三', '技术部', 8000.00, '2020-06-01', '在职'),
('李四', '销售部', 7500.00, '2019-03-15', '在职'),
('王五', '技术部', 9000.00, '2018-08-20', '在职'),
('赵六', '财务部', 7000.00, '2021-01-10', '在职'),
('孙七', '销售部', 8500.00, '2017-11-05', '在职'),
('周八', '技术部', 9500.00, '2016-09-12', '在职'),
('吴九', '人事部', 6500.00, '2022-04-01', '在职'),
('郑十', '财务部', 7200.00, '2020-12-20', '在职');
GO

-- 查询数据
SELECT * FROM employee;
```

#### 2.3 确认SQLServer服务运行

确保 SQLServer 服务正在运行，可以通过以下方式检查：

1. 打开 **SQL Server 配置管理器**
2. 确认 **SQL Server (MSSQLSERVER)** 或你的实例名服务状态为 **正在运行**

### 三、配置SQLServer网络连接

#### 3.1 启用TCP/IP协议

1. 打开 **SQL Server 配置管理器**
2. 展开 **SQL Server 网络配置** → 选择你的实例的协议
3. 右键 **TCP/IP** → 选择 **启用**

![启用TCP/IP](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-tcpip.png)

#### 3.2 查看端口号

1. 双击 **TCP/IP** 协议
2. 切换到 **IP地址** 选项卡
3. 滚动到底部，找到 **IPAll** → **TCP端口**，默认是 **1433**

> 如果端口号为空，手动填入 `1433`，然后重启 SQLServer 服务。

![查看端口号](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-port.png)

#### 3.3 重启SQLServer服务

1. 在 **SQL Server 配置管理器** 中，选择 **SQL Server 服务**
2. 右键 **SQL Server (MSSQLSERVER)** → **重新启动**

### 四、创建程序基本框架

① 新建 `examplework` 工作区

② 新建 `exampleapp` 应用

③ 新建 `w_main` 窗口，将 `title` 设置为"员工信息"

以上步骤，由于篇幅原因，这里不再赘述。忘记了的小伙伴翻一翻该系列文章的第一篇。

### 五、建立数据源

#### 5.1 新建 DB Profile

① 点击工具栏上的 **DB Profile** 按钮，或选择菜单 **Tools → DB Profile**

② 在弹出的窗口中，展开 **ODB ODBC**，点击 **New**

![新建DB Profile](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-new-profile.png)

#### 5.2 配置ODBC数据源

PB 连接 SQLServer 有两种方式：
- **方式一**：使用 ODBC 数据源（推荐，配置简单）
- **方式二**：使用 SNC（SQL Native Client）接口（性能更好）

这里我们先介绍 **方式一：ODBC 数据源**。

##### 步骤1：配置ODBC数据源

1. 打开 **控制面板 → 管理工具 → ODBC 数据源(32位)** 或 **ODBC 数据源(64位)**
   > 注意：PB 是 32 位程序，如果 PB 是 32 位版本，需要使用 **32位 ODBC 数据源管理器**

2. 切换到 **系统 DSN** 选项卡，点击 **添加**

3. 选择 **SQL Server** 驱动，点击 **完成**

![选择SQLServer驱动](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-odbc-driver.png)

4. 填写数据源名称和服务器信息：
   - **名称**：`PB_SQLServer_Demo`（自定义）
   - **描述**：`PB连接SQLServer测试`（可选）
   - **服务器**：`localhost` 或 `(local)` 或你的服务器IP地址

![配置ODBC](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-odbc-config1.png)

5. 点击 **下一步**，选择 **使用用户输入登录ID和密码的SQL Server验证**
   - **登录ID**：`sa`（或你的SQLServer用户名）
   - **密码**：你的SQLServer密码

![配置登录信息](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-odbc-config2.png)

6. 点击 **下一步**，勾选 **更改默认的数据库为**，选择 `PB_Demo`

![选择数据库](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-odbc-config3.png)

7. 点击 **下一步** → **完成**

8. 点击 **测试数据源**，确认连接成功

![测试连接](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-odbc-test.png)

##### 步骤2：在PB中配置DB Profile

1. 回到 PB 的 **Database Profile Setup** 窗口
2. **Profile Name**：`sqlserver_demo`
3. **Data Source**：选择刚才创建的 `PB_SQLServer_Demo`
4. **User ID**：`sa`
5. **Password**：你的密码
6. 点击 **Preview** 选项卡，可以看到连接字符串：

```
ConnectString='DSN=PB_SQLServer_Demo;UID=sa;PWD=你的密码'
```

![配置PB Profile](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-pb-profile.png)

7. 点击 **OK** 保存

8. 在 **DB Profile** 窗口中，右键 `sqlserver_demo` → **Connect**

9. 连接成功后，可以在 **Database** 画板中看到数据库表

![连接成功](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-connected.png)

#### 5.3 方式二：使用SNC接口（可选）

如果你希望使用原生的 SQLServer 接口（性能更好），可以使用 SNC：

1. 在 **DB Profile** 窗口中，展开 **SNC SQL Native Client**
2. 点击 **New**
3. 配置参数：
   - **Profile Name**：`sqlserver_snc`
   - **Server Name**：`localhost` 或 `127.0.0.1,1433`
   - **Database**：`PB_Demo`
   - **LogId**：`sa`
   - **LogPassword**：你的密码

![SNC配置](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-snc-config.png)

### 六、创建数据窗口

① 单击菜单栏上的 **File → New** 命令，在弹出的窗口中选择 **DataWindow** 选项卡中的 **Grid** 风格的数据窗口

② 选择 **Quick Select**

③ 选择 `employee` 表并选择需要展示的表字段

④ 默认下一步，并修改表头

⑤ 设置薪水显示格式，并设置右对齐
- **Style Type** 选择 `EditMask` 类型
- **Mask** 格式为：`###,###.00`

⑥ 将数据窗口保存为 `d_employee`

### 七、在窗口中添加控件

① 在 `w_main` 窗口中添加 2 个 **CommandButton** 控件，分别为 `cb_query` 和 `cb_exit`，**Text** 分别为"查询"和"退出"

② 在 `w_main` 窗口上添加 **DataWindow** 控件，名称为 `dw_1`
- 将 **HScrollBar** 框勾选上
- 将 **VScrollBar** 框勾选上
- 将数据窗口的 **DataObject** 设置成 `d_employee`

### 八、编写代码

#### 8.1 应用Open事件

单击开发界面左边的 **System Tree** 中的 `exampleapp` 对象，并在其 **Open** 事件中添加如下脚本：

```java
// 使用ODBC方式连接SQLServer
SQLCA.DBMS = "ODBC"
SQLCA.AutoCommit = False
SQLCA.DBParm = "ConnectString='DSN=PB_SQLServer_Demo;UID=sa;PWD=你的密码'"

// 或者使用SNC方式（如果配置了SNC）
// SQLCA.DBMS = "SNC SQL Native Client"
// SQLCA.LogPass = "你的密码"
// SQLCA.ServerName = "localhost"
// SQLCA.LogId = "sa"
// SQLCA.DBParm = "Database='PB_Demo'"

CONNECT USING SQLCA;

// 判断连接是否成功
If SQLCA.SQLCode <> 0 Then
    MessageBox("连接失败", "数据库连接失败：" + SQLCA.SQLErrText)
    Return
End If

Open(w_main)
```

#### 8.2 数据窗口Constructor事件

在 `dw_1` 的 **constructor** 事件中添加如下代码：

```java
this.SetTransObject(SQLCA)
```

#### 8.3 查询按钮Clicked事件

在【查询】按钮 `cb_query` 的 **clicked** 中添加如下代码：

```java
// 检索数据
Long ll_rowCount

ll_rowCount = dw_1.Retrieve()

If ll_rowCount > 0 Then
    MessageBox("提示", "成功查询到 " + String(ll_rowCount) + " 条记录")
ElseIf ll_rowCount = 0 Then
    MessageBox("提示", "未查询到数据")
Else
    MessageBox("错误", "查询失败：" + SQLCA.SQLErrText)
End If
```

#### 8.4 退出按钮Clicked事件

在【退出】按钮 `cb_exit` 的 **clicked** 中添加如下代码：

```java
Close(Parent)
```

#### 8.5 应用Close事件

单击开发界面左边的 **System Tree** 中的 `exampleapp` 对象，并在其 **Close** 事件中添加如下脚本：

```java
// 断开数据库连接
DISCONNECT USING SQLCA;

If SQLCA.SQLCode <> 0 Then
    MessageBox("断开连接失败", SQLCA.SQLErrText)
End If
```

### 九、运行程序

运行程序，点击【查询】按钮，看看能不能查询出 SQLServer 数据库中的数据。

![运行效果](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-demo.gif)

### 十、常见问题排查

#### 10.1 连接失败：无法找到服务器

**原因**：SQLServer 服务未启动或网络配置问题

**解决**：
1. 确认 SQLServer 服务正在运行
2. 确认 TCP/IP 协议已启用
3. 确认防火墙未阻止 1433 端口

#### 10.2 连接失败：登录失败

**原因**：用户名或密码错误，或SQLServer身份验证未启用

**解决**：
1. 确认用户名密码正确
2. 在 SSMS 中，右键服务器 → **属性** → **安全性** → 选择 **SQL Server 和 Windows 身份验证模式**
3. 重启 SQLServer 服务

![启用混合身份验证](https://blog.xiezhrspace.cn/blog-img/pb-cases/sqlserver-auth-mode.png)

#### 10.3 连接失败：数据库不存在

**原因**：数据库名称错误或数据库未创建

**解决**：
1. 在 SSMS 中确认数据库存在
2. 确认数据库名称拼写正确

#### 10.4 中文乱码

**原因**：字符集不匹配

**解决**：
在连接字符串中添加字符集参数：

```java
SQLCA.DBParm = "ConnectString='DSN=PB_SQLServer_Demo;UID=sa;PWD=你的密码;',CharSet='UTF8'"
```

或者在 ODBC 数据源配置中设置 ANSI 字符集。

### 十一、连接字符串汇总

| 连接方式 | DBMS | DBParm |
|----------|------|--------|
| ODBC | `ODBC` | `ConnectString='DSN=数据源名;UID=用户名;PWD=密码'` |
| SNC | `SNC SQL Native Client` | `Database='数据库名'` |
| OLE DB | `OLE DB` | `Provider=SQLOLEDB.1;Data Source=服务器;Initial Catalog=数据库` |

### 十二、小结

通过本篇文章，我们学习了：

1. SQLServer 数据库的安装和配置
2. ODBC 数据源的创建和配置
3. PB 中连接 SQLServer 的两种方式（ODBC 和 SNC）
4. 常见连接问题的排查方法

| 数据库 | 连接方式 | 适用场景 |
|--------|----------|----------|
| Oracle | O90/O10 等原生接口 | 大型企业应用 |
| MySQL | ODBC | 中小型应用 |
| SQLServer | ODBC / SNC | 企业级应用、.NET生态 |
| Access | ODBC | 小型单机应用 |
| SQLite | ODBC | 嵌入式、移动应用 |

至此，我们已经掌握了 PB 连接主流数据库的方法。下一篇我们将学习 **事务控制详解**，掌握数据库操作中的事务管理技巧。

以上就是本期内容的全部 *★,°*:.☆(￣▽￣)/$:*.°★* 。 希望对您有所帮助

我们下期再见 ヾ(•ω•`)o   (●'◡'●)
