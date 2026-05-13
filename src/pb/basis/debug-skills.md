---
date: 2025-05-07
title: PB调试技巧
icon: note
---

## PB调试技巧

> 调试是程序员的日常必修课。掌握 PB 的调试工具，能让你快速定位问题，提高开发效率。

---

## 一、调试环境准备

### 1.1 进入调试模式

PB 提供了两种运行方式：

| 方式 | 操作 | 说明 |
|------|------|------|
| 普通运行 | 点击 **Run** 按钮（奔跑的小人） | 直接运行程序 |
| 调试运行 | 点击 **Debug** 按钮（带虫子的图标） | 进入调试模式 |

![调试按钮](https://blog.xiezhrspace.cn/blog-img/pb-cases/debug-buttons.png)

### 1.2 调试工具栏

进入调试模式后，会出现调试工具栏：

| 按钮 | 快捷键 | 功能 |
|:----:|:------:|------|
| ▶️ Start | F5 | 开始/继续运行 |
| ⏸ Pause | Ctrl+Break | 暂停执行 |
| ⏹ Stop | Shift+F5 | 停止调试 |
| ⬇️ Step In | F8 | 单步进入（进入函数内部） |
| ➡️ Step Over | F10 | 单步跳过（不进入函数内部） |
| ⬆️ Step Out | Shift+F8 | 跳出当前函数 |
| 🔄 Run To Cursor | F7 | 运行到光标位置 |

---

## 二、断点（Breakpoint）

### 2.1 设置断点

断点是最常用的调试手段，程序运行到断点处会暂停。

**设置方法：**

1. 在脚本编辑器左侧的灰色边栏（Gutter）点击
2. 或者将光标放在目标行，按 **F9**

```vb
// 示例：在以下位置设置断点
Integer li_count
li_count = 10          // ← 在这里设置断点

For li_i = 1 To li_count
    // 处理逻辑
Next
```

**断点显示：**
- 红色圆点：有效断点
- 灰色圆点：无效断点（代码未编译或行号不对）

### 2.2 管理断点

**查看所有断点：**

选择菜单 **Edit → Breakpoints**，打开断点管理窗口：

| 操作 | 方法 |
|------|------|
| 删除单个断点 | 在断点行再次点击或按 F9 |
| 删除所有断点 | Edit → Clear All Breakpoints |
| 禁用断点 | 在 Breakpoints 窗口取消勾选 |
| 启用断点 | 在 Breakpoints 窗口勾选 |

### 2.3 条件断点

条件断点只在满足特定条件时才暂停，非常实用。

**设置方法：**

1. 在 Breakpoints 窗口中，右键点击断点
2. 选择 **Properties**
3. 在 **Condition** 框中输入条件表达式

```vb
// 示例：循环中只在 i = 50 时暂停
For li_i = 1 To 100
    // 处理逻辑
    // 条件断点：li_i = 50
Next
```

**常用条件：**

```vb
li_i = 50                    // 变量等于某个值
li_count > 100               // 变量大于某个值
Trim(ls_name) = "张三"       // 字符串匹配
IsNull(ld_date)              // 判断 NULL
SQLCA.SQLCode = -1           // 数据库操作失败
```

### 2.4 临时断点（Temporary Breakpoint）

临时断点在触发一次后自动删除，适合一次性调试。

**设置方法：** Shift+F9

---

## 三、单步调试

### 3.1 Step Into（单步进入）F8

逐行执行代码，如果遇到函数调用，会进入函数内部。

```vb
// 当前断点在这里
Integer li_result
li_result = uf_calculate(10, 20)  // 按 F8 会进入 uf_calculate 函数内部

// uf_calculate 函数内部
Integer uf_calculate(Integer ai_a, Integer ai_b)
    Return ai_a + ai_b  // 会执行到这里
End Function
```

### 3.2 Step Over（单步跳过）F10

逐行执行代码，如果遇到函数调用，不会进入函数内部，而是直接执行完函数。

```vb
// 当前断点在这里
Integer li_result
li_result = uf_calculate(10, 20)  // 按 F10 直接执行完函数，不进入内部
MessageBox("结果", String(li_result))  // 直接到这一行
```

**使用建议：**
- 确认系统函数内部没问题 → 用 F10
- 需要查看自己写的函数逻辑 → 用 F8

### 3.3 Step Out（跳出）Shift+F8

执行完当前函数剩余代码，返回到调用处。

```vb
// 在函数内部调试时
Integer uf_complex_function()
    // 步骤1
    // 步骤2  ← 当前在这里
    // 步骤3
    // 步骤4
    Return 1
End Function

// 按 Shift+F8 会执行完步骤3、4，直接返回到调用处
```

### 3.4 Run To Cursor（运行到光标）F7

从当前位置直接运行到光标所在行，中间不停顿。

**使用场景：** 跳过大量确认没问题的代码。

---

## 四、变量监视（Watch）

### 4.1 查看变量值

程序暂停时，可以通过以下方式查看变量：

#### 方法一：鼠标悬停

将鼠标悬停在变量上，会显示当前值：

```vb
Integer li_count = 100
// 鼠标悬停在 li_count 上，显示 "100"
```

#### 方法二：Variables 窗口

选择菜单 **View → Variables**，打开变量窗口：

| 标签页 | 显示内容 |
|--------|----------|
| Local | 当前脚本的局部变量 |
| Instance | 当前对象的实例变量 |
| Global | 全局变量 |
| Parent | 父对象的变量 |
| Shared | 共享变量 |

#### 方法三：表达式查看

在 **Watch** 窗口中添加表达式：

1. 选择菜单 **View → Watch**
2. 在空白处双击，输入变量名或表达式

```vb
// 可以监视的内容
li_count                    // 变量
dw_1.RowCount()            // 函数返回值
SQLCA.SQLCode              // 对象属性
li_a + li_b                // 表达式
Trim(ls_name)              // 函数结果
```

### 4.2 修改变量值

调试过程中可以直接修改变量值，测试不同场景：

1. 在 **Variables** 或 **Watch** 窗口中找到变量
2. 双击变量值
3. 输入新值，按回车

```vb
// 原值
Integer li_score = 60

// 在调试器中修改为 90
li_score = 90  // 程序会继续使用新值执行
```

### 4.3 查看数据窗口数据

```vb
// 在 Watch 窗口中添加
// 查看数据窗口总行数
dw_1.RowCount()

// 查看第1行第1列的值
dw_1.GetItemString(1, 1)

// 查看当前行号
dw_1.GetRow()

// 查看数据窗口SQL
dw_1.GetSQLSelect()
```

---

## 五、调用堆栈（Call Stack）

### 5.1 查看调用堆栈

当程序暂停时，可以通过调用堆栈查看当前执行路径：

选择菜单 **View → Call Stack**

```vb
// 示例调用链
// 应用 Open 事件
Open(w_main)

// 窗口 w_main 的 Open 事件
uf_init_data()  // ← 在这里设置断点

// 函数 uf_init_data
dw_1.Retrieve()
```

**Call Stack 显示：**
```
uf_init_data (w_main)
w_main::open
exampleapp::open
```

### 5.2 跳转到调用处

在 Call Stack 窗口中双击某一行，可以跳转到对应的代码位置。

---

## 六、调试实用技巧

### 6.1 使用 MessageBox 快速调试

在不能设置断点的地方（如编译后的 exe），可以用 MessageBox 输出变量值：

```vb
// 快速查看变量值
MessageBox("调试", "li_count = " + String(li_count))
MessageBox("调试", "ls_name = " + ls_name)
MessageBox("调试", "SQLCode = " + String(SQLCA.SQLCode))

// 查看数据窗口状态
MessageBox("调试", "行数 = " + String(dw_1.RowCount()))
MessageBox("调试", "修改行数 = " + String(dw_1.ModifiedCount()))
```

### 6.2 使用 DebugBreak 函数

在代码中插入 `DebugBreak()`，相当于代码断点：

```vb
// 只在调试模式下生效，发布版本无影响
If li_count > 100 Then
    DebugBreak()  // 程序会在这里暂停
End If
```

### 6.3 记录日志调试法

对于复杂问题，可以写日志文件追踪程序执行：

```vb
// 定义日志函数
Integer uf_writeLog(String as_msg)
    Integer li_fileNum
    String ls_fileName
    
    ls_fileName = "c:\temp\debug_log.txt"
    li_fileNum = FileOpen(ls_fileName, LineMode!, Write!, LockReadWrite!, Append!)
    
    If li_fileNum < 0 Then Return -1
    
    FileWrite(li_fileNum, String(Today(), "yyyy-mm-dd") + " " + &
              String(Now(), "hh:mm:ss") + " - " + as_msg)
    FileClose(li_fileNum)
    
    Return 1
End Function

// 使用日志
uf_writeLog("开始处理，li_count = " + String(li_count))
// ... 处理逻辑 ...
uf_writeLog("处理完成，结果 = " + String(li_result))
```

### 6.4 数据库调试技巧

```vb
// 查看执行的SQL语句
String ls_sql
ls_sql = dw_1.GetSQLSelect()
MessageBox("SQL", ls_sql)  // 查看数据窗口的SQL

// 查看动态SQL
// 在 EXECUTE IMMEDIATE 前输出
MessageBox("动态SQL", ls_sqlStatement)

// 查看数据库错误
If SQLCA.SQLCode = -1 Then
    MessageBox("数据库错误", "Code: " + String(SQLCA.SQLDBCode) + &
               "~r~n错误信息: " + SQLCA.SQLErrText)
End If
```

### 6.5 数据窗口调试技巧

```vb
// 查看数据窗口缓冲区数据
// 主缓冲区
dw_1.GetItemString(1, "emp_name", Primary!, True)   // 原始值
dw_1.GetItemString(1, "emp_name", Primary!, False)  // 当前值

// 过滤缓冲区
dw_1.GetItemString(1, "emp_name", Filter!, False)

// 删除缓冲区
dw_1.GetItemString(1, "emp_name", Delete!, False)

// 查看数据窗口状态
MessageBox("状态", "修改: " + String(dw_1.ModifiedCount()) + &
           "~r~n删除: " + String(dw_1.DeletedCount()) + &
           "~r~n过滤: " + String(dw_1.FilteredCount()))
```

---

## 七、常见问题调试

### 7.1 程序突然崩溃

**调试方法：**

1. 在 Application 的 SystemError 事件中设置断点
2. 查看错误信息

```vb
// SystemError 事件
MessageBox("系统错误", "错误编号: " + String(error.number) + &
           "~r~n错误文本: " + error.text + &
           "~r~n发生位置: " + error.object + "." + error.objectevent + &
           "~r~n行号: " + String(error.line))

// 记录到日志
uf_writeLog("系统错误: " + error.text + " at line " + String(error.line))
```

### 7.2 数据窗口不显示数据

**检查清单：**

```vb
// 1. 检查事务对象是否设置
dw_1.SetTransObject(SQLCA)

// 2. 检查SQL是否正确
MessageBox("SQL", dw_1.GetSQLSelect())

// 3. 检查Retrieve返回值
Long ll_rows
ll_rows = dw_1.Retrieve()
MessageBox("结果", "返回 " + String(ll_rows) + " 行")

// 4. 检查数据库连接
If SQLCA.SQLCode <> 0 Then
    MessageBox("错误", SQLCA.SQLErrText)
End If

// 5. 检查数据窗口是否可见
dw_1.Visible = True
```

### 7.3 保存数据失败

```vb
// 调试数据窗口保存
Integer li_result

// 1. 检查是否有修改
MessageBox("修改状态", "Modified: " + String(dw_1.ModifiedCount()) + &
           "~r~nDeleted: " + String(dw_1.DeletedCount()))

// 2. 执行更新
li_result = dw_1.Update()

// 3. 检查更新结果
If li_result = 1 Then
    COMMIT;
    MessageBox("成功", "保存成功")
Else
    ROLLBACK;
    // 4. 查看详细错误
    MessageBox("失败", "Update返回: " + String(li_result) + &
               "~r~nSQLCode: " + String(SQLCA.SQLCode) + &
               "~r~n错误: " + SQLCA.SQLErrText)
End If
```

### 7.4 窗口打不开

```vb
// 在打开窗口的代码处调试
If IsValid(w_main) Then
    MessageBox("调试", "w_main 已存在")
Else
    MessageBox("调试", "w_main 不存在，准备打开")
End If

Open(w_main)

// 检查打开后是否有效
If IsValid(w_main) Then
    MessageBox("调试", "w_main 打开成功")
Else
    MessageBox("调试", "w_main 打开失败")
End If
```

### 7.5 性能问题定位

```vb
// 使用计时器定位性能瓶颈
Time lt_start, lt_end
Long ll_elapsed

lt_start = Now()

// ... 待测试的代码 ...
dw_1.Retrieve()

lt_end = Now()
ll_elapsed = SecondsAfter(lt_start, lt_end)

MessageBox("性能", "执行耗时: " + String(ll_elapsed) + " 秒")
```

---

## 八、调试最佳实践

### 8.1 调试前准备

1. **编译全部对象**：Design → Full Build
2. **清除旧断点**：Edit → Clear All Breakpoints
3. **准备测试数据**：确保有代表性的测试数据

### 8.2 调试中原则

| 原则 | 说明 |
|------|------|
| 先定位后修复 | 不要急于修改代码，先找到根本原因 |
| 最小化测试 | 用最简单的数据重现问题 |
| 逐步缩小范围 | 通过断点逐步缩小问题范围 |
| 记录关键信息 | 记录变量值、SQL语句、错误信息 |

### 8.3 调试后清理

1. 删除所有临时断点
2. 删除或注释掉 DebugBreak()
3. 删除或注释掉调试用的 MessageBox
4. 重新编译发布版本

---

## 九、调试快捷键速查表

| 快捷键 | 功能 | 使用频率 |
|:------:|------|:--------:|
| F5 | 开始/继续运行 | ⭐⭐⭐⭐⭐ |
| F8 | 单步进入 | ⭐⭐⭐⭐⭐ |
| F9 | 设置/取消断点 | ⭐⭐⭐⭐⭐ |
| F10 | 单步跳过 | ⭐⭐⭐⭐⭐ |
| F7 | 运行到光标 | ⭐⭐⭐⭐ |
| Shift+F5 | 停止调试 | ⭐⭐⭐⭐ |
| Shift+F8 | 跳出函数 | ⭐⭐⭐ |
| Shift+F9 | 设置临时断点 | ⭐⭐ |
| Ctrl+Break | 暂停执行 | ⭐⭐ |

---

## 小结

通过本篇文章，我们学习了 PB 调试的核心技能：

| 技能 | 掌握要点 |
|------|----------|
| 断点 | 设置、条件断点、临时断点 |
| 单步调试 | Step Into / Over / Out |
| 变量监视 | 查看、修改、Watch窗口 |
| 调用堆栈 | 查看执行路径 |
| 实用技巧 | MessageBox、DebugBreak、日志 |
| 问题排查 | 崩溃、数据窗口、保存失败 |

### 调试心法

> **"代码写得好，不如调得好。"**
>
> 调试不是能力不足的体现，而是专业程序员的必备技能。善用调试工具，能让你：
> - 快速定位 Bug，减少加班
> - 深入理解代码执行流程
> - 学习他人代码时事半功倍

掌握调试技巧后，你会发现之前需要几小时才能找到的问题，现在几分钟就能解决。

以上就是本期内容的全部 *★,°*:.☆(￣▽￣)/$:*.°★* 。 希望对您有所帮助

我们下期再见 ヾ(•ω•`)o   (●'◡'●)
