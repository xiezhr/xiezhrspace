---
title: PB学习路线图
date: 2025-05-07
icon: route
---

## PB学习路线图

> 无论你是刚毕业需要完成毕业设计、入职新公司需要维护老项目，还是公司要求用PB开发新项目，这份路线图都能帮你系统地掌握PB开发技能。

### 学习路径总览

```mermaid
graph LR
    A[零基础入门] --> B[基础语法与规范]
    B --> C[窗口与控件]
    C --> D[数据窗口核心]
    D --> E[数据库操作]
    E --> F[进阶开发]
    F --> G[项目实战]
    G --> H[现代化扩展]
    
    style A fill:#e1f5fe
    style D fill:#fff3e0
    style G fill:#e8f5e9
    style H fill:#fce4ec
```

---

## 第一阶段：零基础入门 ⏱️ 1-2周

> 目标：能独立创建、编译、发布一个PB应用程序

| 序号 | 内容 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 1.1 | PB简介与开发环境搭建 | ✅ | [查看](basis/hello-world.md#二powerbuilder-下载安装) |
| 1.2 | 第一个HelloWorld程序 | ✅ | [第一个HelloWorld程序](basis/hello-world.md) |
| 1.3 | 程序编译与发布 | ✅ | [查看](basis/hello-world.md#四程序编译与发布) |
| 1.4 | 安装包制作 | ✅ | [查看](basis/hello-world.md#五安装包制作) |

::: tip 学习建议
- 推荐安装版本：PB 9 / 11.5 / 12.5（稳定且资料多）
- 先跟着文章一步步操作，不要跳步
- 源码下载：[pb-project-example](https://gitee.com/xiezhr/pb-project-example)
:::

---

## 第二阶段：基础语法与规范 ⏱️ 2-3周

> 目标：掌握PowerScript语言，写出规范的PB代码

### 2.1 语言基础（待补充）

| 序号 | 内容 | 状态 | 说明 |
|:----:|------|:----:|------|
| 2.1.1 | PowerScript语法基础 | ✅ | [PowerScript语言基础](basis/powerscript-basic.md) |
| 2.1.2 | 流程控制语句 | ✅ | [查看](basis/powerscript-basic.md#五流程控制) |
| 2.1.3 | 函数与事件 | ✅ | [查看](basis/powerscript-basic.md#六数组) |
| 2.1.4 | 面向对象基础 | ✅ | [面向对象编程](basis/oop-basic.md) |

### 2.2 编码规范

| 序号 | 内容 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 2.2.1 | 命名规范 | ✅ | [PB编码规范](basis/coding-rules.md) |
| 2.2.2 | 代码书写规范 | ✅ | [查看](basis/coding-rules.md#十代码编写规范) |
| 2.2.3 | 注释规范 | ✅ | [查看](basis/coding-rules.md#九关于注释) |
| 2.2.4 | 错误处理规范 | ✅ | [查看](basis/coding-rules.md#十二错误处理) |

### 2.3 常用函数

| 序号 | 内容 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 2.3.1 | 字符串函数 | ✅ | [常用函数](basis/comm-function.md) |
| 2.3.2 | 日期时间函数 | ✅ | [查看](basis/comm-function.md#二日期时间相关) |
| 2.3.3 | 数据类型转换 | ✅ | [查看](basis/comm-function.md#五数据类型转换) |
| 2.3.4 | 配置文件读写 | ✅ | [查看](basis/comm-function.md#三配置文件读取) |
| 2.3.5 | 数组操作 | ✅ | [查看](basis/comm-function.md#四数组相关) |

::: tip 提示
2.1 语言基础部分已补充完整，可直接学习
:::

---

## 第三阶段：窗口与控件 ⏱️ 3-4周

> 目标：熟练掌握各种窗口类型和控件的使用

### 3.1 窗口基础

| 序号 | 内容 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 3.1.1 | 窗口类型与属性 | ✅ | [窗口使用技巧](basis/usewindow.md) |
| 3.1.2 | 窗口事件 | ✅ | [查看](basis/usewindow.md#四窗口事件) |
| 3.1.3 | 窗口间传值 | ✅ | [查看](basis/usewindow.md#六值传递与接收) |
| 3.1.4 | 窗口函数 | ✅ | [查看](basis/usewindow.md#五窗口常用函数) |

### 3.2 基础控件案例（01-10）

| 序号 | 案例 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 01 | 创建应用、窗口及控件 | ✅ | [查看](cases/winbasicctrl/01application-win-control.md) |
| 02 | 目录浏览器 | ✅ | [查看](cases/winbasicctrl/02directory-browser.md) |
| 03 | 用户名密码校验 | ✅ | [查看](cases/winbasicctrl/03password-authentication.md) |
| 04 | 文件浏览器 | ✅ | [查看](cases/winbasicctrl/04fileBrowser.md) |
| 05 | 图片浏览器 | ✅ | [查看](cases/winbasicctrl/05pic-browser.md) |
| 06 | 图标移动 | ✅ | [查看](cases/winbasicctrl/06drag-icon.md) |
| 07 | 闪烁文字 | ✅ | [查看](cases/winbasicctrl/07flashing-text.md) |
| 08 | 控件拖动实现 | ✅ | [查看](cases/winbasicctrl/08drag-control.md) |
| 09 | 滚动条实现 | ✅ | [查看](cases/winbasicctrl/09scroll-bar.md) |
| 10 | 进度条 | ✅ | [查看](cases/winbasicctrl/10progress-bar.md) |

### 3.3 控件应用案例（11-21）

| 序号 | 案例 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 11 | 动画显示窗口 | ✅ | [查看](cases/winctrlapp/11animation-window.md) |
| 12 | 秒表实现 | ✅ | [查看](cases/winctrlapp/12stopwatch.md) |
| 13 | 电子时钟 | ✅ | [查看](cases/winctrlapp/13electronic-clock.md) |
| 14 | 使用次数和日期限制 | ✅ | [查看](cases/winctrlapp/14use-num-usedate-limit.md) |
| 15 | 限制应用程序运行次数 | ✅ | [查看](cases/winctrlapp/15app-usenum-limit.md) |
| 16 | 修改系统时间 | ✅ | [查看](cases/winctrlapp/16set-system-time.md) |
| 17 | 颜色对话框 | ✅ | [查看](cases/winctrlapp/17color-dialog-box.md) |
| 18 | IP地址编辑框 | ✅ | [查看](cases/winctrlapp/18ipaddress-edit.md) |
| 19 | 图片按钮 | ✅ | [查看](cases/winctrlapp/19pic-button.md) |
| 20 | 超链接按钮 | ✅ | [查看](cases/winctrlapp/20hyperlink-button.md) |
| 21 | 大小写金额转换 | ✅ | [查看](cases/winctrlapp/21lowercase-amount-conversion.md) |

### 3.4 菜单与MDI案例（22-32）

| 序号 | 案例 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 22 | 语音朗读金额 | ✅ | [查看](cases/menumdi/22voice-broadcast-amount.md) |
| 23 | 窗口菜单 | ✅ | [查看](cases/menumdi/23window-menu.md) |
| 24 | 图形菜单 | ✅ | [查看](cases/menumdi/24graphics-menu.md) |
| 25 | 带底图的MDI窗口 | ✅ | [查看](cases/menumdi/25mdi-window-with-pictures.md) |
| 26 | 浮动工具栏 | ✅ | [查看](cases/menumdi/26floating-toolbar.md) |
| 27 | 任务栏控制 | ✅ | [查看](cases/menumdi/27taskbar-hidden-display.md) |
| 28 | 右键菜单 | ✅ | [查看](cases/menumdi/28right-click-menu.md) |
| 29 | 调用帮助文档 | ✅ | [查看](cases/menumdi/29html-helpapp.md) |
| 30 | 动态打开窗口 | ✅ | [查看](cases/menumdi/30dynamically-create-windows.md) |
| 31 | 动态设置菜单 | ✅ | [查看](cases/menumdi/31dynamic-settings-menu.md) |
| 32 | 记事本程序 | ✅ | [查看](cases/menumdi/32notepad.md) |

---

## 第四阶段：数据窗口核心 ⏱️ 4-6周

> 目标：精通DataWindow，这是PB最核心的竞争力

### 4.1 数据窗口基础

| 序号 | 内容 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 4.1.1 | 数据窗口画板 | ✅ | [数据窗口](basis/datawindow.md#一数据窗口画板) |
| 4.1.2 | 数据源类型 | ✅ | [查看](basis/datawindow.md#二数据窗口的数据源) |
| 4.1.3 | 显示样式 | ✅ | [查看](basis/datawindow.md#三数据窗口显示样式) |
| 4.1.4 | 数据窗口对象结构 | ✅ | [查看](basis/datawindow.md#四数据窗口对象介绍) |
| 4.1.5 | 常用函数大全 | ✅ | [查看](basis/datawindow.md#五数据窗口常用函数) |
| 4.1.6 | 使用技巧 | ✅ | [查看](basis/datawindow.md#六数据窗口使用技巧) |

### 4.2 DataWindow基本操作（33-45）

| 序号 | 案例 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 33 | 连接Oracle | ✅ | [查看](cases/datawindow/33conn2oracle.md) |
| 34 | 连接MySQL | ✅ | [查看](cases/datawindow/34conn2mysql.md) |
| 35 | 连接Access | ✅ | [查看](cases/datawindow/35conn2access.md) |
| 36 | 连接SQLite | ✅ | [查看](cases/datawindow/36conn2sqlite.md) |
| 37 | 设置数据窗口颜色 | ✅ | [查看](cases/datawindow/37set-tab-color.md) |
| 38 | 设置数据窗口位图 | ✅ | [查看](cases/datawindow/38set-tab-pic.md) |
| 39 | 比例图显示数据 | ✅ | [查看](cases/datawindow/39char-display-data.md) |
| 40 | 数据窗口缩放显示 | ✅ | [查看](cases/datawindow/40window-zoom-display.md) |
| 41 | 动态设置风格 | ✅ | [查看](cases/datawindow/41dynamic-set-datawindow-style.md) |
| 42 | 使用选项卡 | ✅ | [查看](cases/datawindow/42use-the-tabs.md) |
| 43 | 使用列表视窗 | ✅ | [查看](cases/datawindow/43use-list-view.md) |
| 44 | 使用下拉子数据窗口 | ✅ | [查看](cases/datawindow/44use-dropdown-datawindow.md) |
| 45 | 动态创建数据窗口 | ✅ | [查看](cases/datawindow/45dyn-create-datawindow.md) |

### 4.3 DataWindow高级应用（46-58）

| 序号 | 案例 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 46 | 编辑数据 | ✅ | [查看](cases/datawindowapp/46edit-data-window.md) |
| 47 | 恢复删除数据 | ✅ | [查看](cases/datawindowapp/47data-recovery.md) |
| 48 | 按编号排序 | ✅ | [查看](cases/datawindowapp/48sortempmo.md) |
| 49 | 数据窗口排序 | ✅ | [查看](cases/datawindowapp/49data-window-sort.md) |
| 50 | DataStore共享数据 | ✅ | [查看](cases/datawindowapp/50use-datastore-sharedata.md) |
| 51 | 数据查询 | ✅ | [查看](cases/datawindowapp/51query-data.md) |
| 52 | 模糊查询 | ✅ | [查看](cases/datawindowapp/52fuzzy-query-data.md) |
| 53 | 获取拼音首字母 | ✅ | [查看](cases/datawindowapp/53get-pinyin-fist.md) |
| 54 | 键盘模拟器 | ✅ | [查看](cases/datawindowapp/54keyboard-simulation.md) |
| 55 | 保存到Word | ✅ | [查看](cases/datawindowapp/55save-data2word.md) |
| 56 | 保存到Excel | ✅ | [查看](cases/datawindowapp/56save-data2excel.md) |
| 57 | 报表打印预览 | ✅ | [查看](cases/datawindowapp/57print-preview.md) |
| 58 | 报表打印 | ✅ | [查看](cases/datawindowapp/58report-print.md) |

::: tip DataWindow是PB的灵魂
PB开发中80%的工作都在和数据窗口打交道，务必精通！
:::

---

## 第五阶段：数据库操作 ⏱️ 2-3周

> 目标：掌握PB与各种数据库的交互

| 序号 | 内容 | 状态 | 文章链接 |
|:----:|------|:----:|----------|
| 5.1 | 事务对象SQLCA详解 | ✅ | [事务控制详解](basis/transaction-control.md#二pb-中的事务对象) |
| 5.2 | 连接Oracle数据库 | ✅ | [查看](cases/datawindow/33conn2oracle.md) |
| 5.3 | 连接MySQL数据库 | ✅ | [查看](cases/datawindow/34conn2mysql.md) |
| 5.4 | 连接Access数据库 | ✅ | [查看](cases/datawindow/35conn2access.md) |
| 5.5 | 连接SQLite数据库 | ✅ | [查看](cases/datawindow/36conn2sqlite.md) |
| 5.6 | 连接SQLServer | ✅ | [查看](cases/datawindow/59conn2sqlserver.md) |
| 5.7 | 动态SQL应用 | ✅ | [动态SQL应用](basis/dynamic-sql-applications.md) |
| 5.8 | 游标使用 | ✅ | [查看](basis/dynamic-sql-applications.md#二使用游标) |
| 5.9 | 存储过程调用 | ✅ | [查看](basis/dynamic-sql-applications.md#三调用存储过程) |
| 5.10 | 事务控制 | ✅ | [事务控制详解](basis/transaction-control.md) |

---

## 第六阶段：进阶开发 ⏱️ 3-4周

> 目标：掌握高级特性，能开发复杂应用

| 序号 | 内容 | 状态 | 说明 |
|:----:|------|:----:|------|
| 6.1 | 用户对象(UserObject) | ✅ | [面向对象编程](basis/oop-basic.md#二用户对象user-object) |
| 6.2 | 调试技巧 | ✅ | [调试技巧](basis/debug-skills.md) |
| 6.3 | API调用 | 🟡 | Windows API、自定义DLL |
| 6.4 | 管道(Pipeline) | ⏳ | 数据迁移、异构数据库同步 |
| 6.5 | 多线程编程 | ⏳ | SharedObject、异步处理 |
| 6.6 | Pbidea扩展库 | ✅ | [PBidea入门](basis/pber-gospel.md) |

---

## 第七阶段：项目实战 ⏱️ 4-6周

> 目标：独立完成一个完整的PB项目

| 序号 | 项目 | 状态 | 说明 |
|:----:|------|:----:|------|
| 7.1 | 权限管理系统 | ⏳ | 用户/角色/菜单权限 |
| 7.2 | 进销存系统 | ⏳ | 完整的业务系统 |
| 7.3 | 数据报表系统 | ⏳ | 复杂报表设计与打印 |
| 7.4 | 系统迁移方案 | ⏳ | PB→Web/云原生 |

---

## 第八阶段：现代化扩展 ⏱️ 持续学习

> 目标：让PB项目拥抱现代技术，为转型做准备

| 序号 | 内容 | 状态 | 说明 |
|:----:|------|:----:|------|
| 8.1 | PB调用WebAPI | ✅ | [PB调用WebAPI](basis/pb-call-webapi.md) |
| 8.2 | PB与Java交互 | ⏳ | JNI、Socket通信 |
| 8.3 | AI辅助PB开发 | 🟡 | 用Cursor等AI工具辅助 |
| 8.4 | PB→Spring Boot转型 | 🟡 | 技术栈迁移指南 |
| 8.5 | PB→Vue3前端转型 | 🟡 | 前后端分离改造 |

---

## 学习资源推荐

### 书籍
- 《PowerBuilder 9.0 实用解析》
- 《PowerBuilder 10.0 应用基础与实例教程》
- 《PowerBuilder高级编程及其项目应用开发》

### 视频
- [B站-PB视频教程](https://space.bilibili.com/305330347)（程序员晓凡）
- [B站-郭宝利PB视频教程](https://space.bilibili.com/305330347)

### 源码
- [pb-project-example](https://gitee.com/xiezhr/pb-project-example) - 案例源码
- [pbidea](https://github.com/lxb320124/pbidea) - PB扩展库

### 工具
- [PB各版本安装包](https://pan.baidu.com/s/1WdGfYRw5jNLD70QXbaDmBg)（提取码：8888）
- [Inno Setup](https://jrsoftware.org/isinfo.php) - 安装包制作

---

## 学习进度追踪

| 阶段 | 预计时间 | 完成状态 |
|------|:--------:|:--------:|
| 第一阶段：零基础入门 | 1-2周 | ⬜ |
| 第二阶段：基础语法与规范 | 2-3周 | ⬜ |
| 第三阶段：窗口与控件 | 3-4周 | ⬜ |
| 第四阶段：数据窗口核心 | 4-6周 | ⬜ |
| 第五阶段：数据库操作 | 2-3周 | ⬜ |
| 第六阶段：进阶开发 | 3-4周 | ⬜ |
| 第七阶段：项目实战 | 4-6周 | ⬜ |
| 第八阶段：现代化扩展 | 持续 | ⬜ |

> **预计总学习时间：20-30周（约5-7个月）**

---

::: tip 给PB开发者的话
PB虽然是一门"老"技术，但在很多传统行业（医疗、金融、政务）中仍有大量存量系统需要维护。掌握PB不仅能帮你保住现有工作，更是你向现代技术栈转型的跳板——因为你比纯Java开发者更懂业务，比纯前端开发者更懂数据。

**把PB当作起点，而不是终点。**
:::
