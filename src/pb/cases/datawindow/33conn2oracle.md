---
date: 2024-08-20
title: 33PB连接Oracle
icon: note
---

### 写在前面

这是PB案例学习笔记系列文章的第33篇，该系列文章适合具有一定PB基础的读者。

通过一个个由浅入深的编程实战案例学习，提高编程技巧，以保证小伙伴们能应付公司的各种开发需求。

文章中设计到的源码，小凡都上传到了gitee代码仓库[https://gitee.com/xiezhr/pb-project-example.git](https://gitee.com/xiezhr/pb-project-example.git)

![gitee代码仓库](./assets/02ed72631bf452f50e147bae63035433.png)



需要源代码的小伙伴们可以自行下载查看，后续文章涉及到的案例代码也都会提交到这个仓库【**[pb-project-example](https://gitee.com/xiezhr/pb-project-example)**】

如果对小伙伴有所帮助，希望能给一个小星星⭐支持一下小凡。

### 一、小目标

我们日常开发一个应用，不管应用再小，基本上都离不开数据库的支持。

`PB`对一些主流的大型关系型数据库（`Oracle`、`SQLServer`、`MySQL`）提供了专用的数据库接口，对一些小型数据库如

(`Excel`、`Access`)数据库提供了`ODBC`接口支持。

通过本案例，我们使用`PB`连接`Oracle`数据库，并且查询数据表中数据显示出来。

最终实现效果如下

![连接数据库](./assets/3f5b854c14a73fb36a59f62df8ad361b.gif)



### 二、数据库信息

我们在安装完`Oracle`数据库之后，默认会带有`scott`这个用户，在`scott`用户下面有一张员工信息表`emp`.

`emp`表结构如下

```sql
create table EMP
(
  EMPNO    NUMBER(4) not null,  --员工编号
  ENAME    VARCHAR2(10),    --员工姓名
  JOB      VARCHAR2(9),  --员工职位
  MGR      NUMBER(4),   -- 员工上级领导
  HIREDATE DATE,        --雇佣日期
  SAL      NUMBER(7,2), -- 薪水
  COMM     NUMBER(7,2),  --奖金
  DEPTNO   NUMBER(2)     --部门编号
)
```

表数据如下

![emp表数据](./assets/131d0cc1fd07bedec4a11a5be97718f1.png)



### 三、创建程序基本框架

① 新建`examplework`工作区

② 新建`exampleapp`应用

③ 新建`w_main`窗口，将`title`设置为“员工信息”

![搭建程序基本框架](./assets/f39bc635036c9ba7ecead6f7f021b6b0.png)

以上步骤，由于篇幅原因，这里不再赘述。

### 四、建立数据源

① 新建`DB Profile`

![新建`DB Profile`](./assets/a20228eab8e861f969d8bdbc1c790bc7.png)



② 配置数据库连接信息

![配置数据库信息](./assets/7c124b5ee8927fd5e1da6ac068bfa9d2.png)

![数据表拥有者](./assets/b4400e7a2a054aa54882b3ad46ffcb83.png)

③ 测试是否连接成功

![测试是否生成成功](./assets/b51fce1b8805fb7214c9b2462a117c87.png)

出现下面提示表示连接成功

![连接成功](./assets/49dc3cfd86cc0d790caadec1be55d919.png)

### 五、创建数据窗口

① 单击菜单栏上的`File`-->`New`命令，在弹出的窗口中选择`DataWindow`选项卡中的`Grid`风格的数据窗口

![grid风格数据窗口](./assets/a3f4079d1afe014fac13e31d4d2674d4.png)

② 选择`Quick Select`

![Quick Select](./assets/8483edf8f84651d7b808f35f6a1da6b2.png)

③ 选择`emp`表并选择需要展示的表字段

![选择表和字段](./assets/716b8f45d8b17be944505d31cf5ae4b3.png)

④ 默认下一步，并修改表头

![修改表头](./assets/4d87fc616c69fb8196b6fabdb20f2596.png)

⑤ 设置薪水、奖金显示格式，并设置右对齐

- `Style Type` 选择`EditMask`类型
- `Mask`格式为：###,###.00

![设置金额格式](./assets/d7f237d4e0e6b1b61a2fd1ac074b8152.png)

⑥ 将数据窗口保存为`d_emp`

![d_emp](./assets/5a279b79f5f8ec8520d3022df0fbecb7.png)

### 六、在窗口中添加控件

① 在`w_main`窗口中添加2个`CommandButton`控件，分别为`cb_1`和`cb_2`,`Text`分别为查询和退出

![添加按钮控件](./assets/2b58e6d915af6508b0ac38a7668162cd.png)

② 在`w_main`窗口上添加`DataWindon` 控件，名称为`dw_1`

- 将`HScrollBar` 框勾选上，横向滚动条（当横向显示不下时，会自动产生滚动条）
- 将`VScrollBar`框勾选上，纵向滚动条（当纵向显示不下时，会自动产生滚动条）

- 将数据窗的`DataObject`设置成`d_emp`

![控件布局](./assets/f0c4af580cf7182a76c138d9ce64e070.png)

### 七、编写代码

① 单击开发界面左边的`System Tree`中的`exampleapp`对象，并在其`Open`事件中添加如下脚本

```java
SQLCA.DBMS = "O90 Oracle9i (9.0.1)"
SQLCA.LogPass = "tiger"
SQLCA.ServerName = "127.0.0.1:1521/orcl"
SQLCA.LogId = "scott"
SQLCA.AutoCommit = False
SQLCA.DBParm = "PBCatalogOwner='scott'"
connect;
open(w_main)
```

② 在`dw_1`的`constructor`事件中添加如下代码

```java
this.settransobject( sqlca)
```

![dw_1中添加代码](./assets/74f5905deb6f25a042b9cab8a4a925c8.png)

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

### 八、运行程序

看看能不能查询出数据

![连接数据库](./assets/3f5b854c14a73fb36a59f62df8ad361b.gif)



以上就是本期内容的全部 *★,°*:.☆(￣▽￣)/$:*.°★* 。 希望对您有所帮助

我们下期再见 ヾ(•ω•`)o   (●'◡'●)