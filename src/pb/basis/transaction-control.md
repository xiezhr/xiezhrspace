---
date: 2025-05-07
title: 事务控制详解
icon: note
---

## 事务控制详解

> 事务是数据库操作的基石。掌握事务控制，才能确保数据的完整性和一致性。

---

## 一、什么是事务

### 1.1 事务的定义

事务（Transaction）是一组逻辑上的数据库操作单元，这些操作要么**全部成功执行**，要么**全部不执行**。

举个生活中的例子：
> 银行转账：A 账户转 1000 元给 B 账户
> - 步骤1：A 账户扣减 1000 元
> - 步骤2：B 账户增加 1000 元
> 
> 这两个步骤必须同时成功，如果步骤1成功但步骤2失败，钱就"消失"了。事务就是保证这两个步骤要么都成功，要么都回滚。

### 1.2 事务的 ACID 特性

| 特性 | 英文 | 说明 |
|------|------|------|
| 原子性 | Atomicity | 事务是最小执行单位，不可再分，要么全做，要么全不做 |
| 一致性 | Consistency | 事务执行前后，数据库从一个一致状态变为另一个一致状态 |
| 隔离性 | Isolation | 多个事务并发执行时，互不干扰 |
| 持久性 | Durability | 事务一旦提交，对数据库的改变是永久性的 |

---

## 二、PB 中的事务对象

### 2.1 SQLCA 事务对象

PB 使用 **事务对象（Transaction Object）** 来管理数据库连接和事务。**SQLCA** 是 PB 默认的全局事务对象。

```vb
// SQLCA 的常用属性
SQLCA.DBMS        // 数据库管理系统类型
SQLCA.Database    // 数据库名称
SQLCA.ServerName  // 服务器名称
SQLCA.LogId       // 登录用户名
SQLCA.LogPass     // 登录密码
SQLCA.AutoCommit  // 是否自动提交（True/False）

// SQLCA 的常用状态属性
SQLCA.SQLCode     // SQL 执行结果代码（0成功，-1失败，100未找到数据）
SQLCA.SQLNRows    // 受影响的行数
SQLCA.SQLErrText  // 错误信息文本
SQLCA.SQLDBCode   // 数据库错误代码
```

### 2.2 自定义事务对象

当需要同时连接多个数据库时，可以创建自定义事务对象：

```vb
// 声明自定义事务对象
Transaction ltr_oracle
Transaction ltr_sqlserver

// 创建实例
ltr_oracle = CREATE Transaction
ltr_sqlserver = CREATE Transaction

// 配置连接参数
ltr_oracle.DBMS = "O90 Oracle9i (9.0.1)"
ltr_oracle.LogPass = "tiger"
ltr_oracle.ServerName = "127.0.0.1:1521/orcl"
ltr_oracle.LogId = "scott"
ltr_oracle.AutoCommit = False

ltr_sqlserver.DBMS = "ODBC"
ltr_sqlserver.AutoCommit = False
ltr_sqlserver.DBParm = "ConnectString='DSN=PB_SQLServer_Demo;UID=sa;PWD=密码'"

// 连接数据库
CONNECT USING ltr_oracle;
CONNECT USING ltr_sqlserver;

// 使用事务对象
 dw_1.SetTransObject(ltr_oracle)
 dw_2.SetTransObject(ltr_sqlserver)

// 断开连接
DISCONNECT USING ltr_oracle;
DISCONNECT USING ltr_sqlserver;

// 销毁对象
DESTROY ltr_oracle
DESTROY ltr_sqlserver
```

---

## 三、基本事务控制语句

### 3.1 CONNECT - 连接数据库

```vb
// 基本语法
CONNECT { USING 事务对象 };

// 使用默认事务对象 SQLCA
CONNECT;

// 使用自定义事务对象
CONNECT USING ltr_mytrans;
```

**示例：**

```vb
// 配置连接参数
SQLCA.DBMS = "ODBC"
SQLCA.AutoCommit = False
SQLCA.DBParm = "ConnectString='DSN=PB_Demo;UID=sa;PWD=123456'"

// 连接数据库
CONNECT;

// 判断连接是否成功
If SQLCA.SQLCode <> 0 Then
    MessageBox("连接失败", SQLCA.SQLErrText)
    Return -1
Else
    MessageBox("提示", "数据库连接成功")
End If
```

### 3.2 DISCONNECT - 断开连接

```vb
// 基本语法
DISCONNECT { USING 事务对象 };

// 断开默认事务对象
DISCONNECT;

// 断开自定义事务对象
DISCONNECT USING ltr_mytrans;
```

**注意：** 断开连接前，如果有未提交的事务，通常会先回滚。

### 3.3 COMMIT - 提交事务

```vb
// 基本语法
COMMIT { USING 事务对象 };

// 提交默认事务对象的事务
COMMIT;

// 提交自定义事务对象的事务
COMMIT USING ltr_mytrans;
```

**作用：** 将事务中的所有操作永久保存到数据库。

### 3.4 ROLLBACK - 回滚事务

```vb
// 基本语法
ROLLBACK { USING 事务对象 };

// 回滚默认事务对象的事务
ROLLBACK;

// 回滚自定义事务对象的事务
ROLLBACK USING ltr_mytrans;
```

**作用：** 撤销事务中的所有操作，恢复到事务开始前的状态。

---

## 四、AutoCommit 属性详解

### 4.1 AutoCommit = False（手动提交模式）

这是 PB 开发中**最常用**的模式，需要手动控制事务的提交和回滚。

```vb
// 设置手动提交模式
SQLCA.AutoCommit = False

// 执行数据库操作
INSERT INTO employee (emp_name, emp_dept, emp_salary) 
VALUES ('张三', '技术部', 8000);

// 根据执行结果决定提交或回滚
If SQLCA.SQLCode = 0 Then
    COMMIT;
    MessageBox("提示", "操作成功")
Else
    ROLLBACK;
    MessageBox("错误", "操作失败：" + SQLCA.SQLErrText)
End If
```

### 4.2 AutoCommit = True（自动提交模式）

每条 SQL 语句执行后自动提交，**不需要**手动调用 COMMIT。

```vb
// 设置自动提交模式
SQLCA.AutoCommit = True

// 执行SQL，会自动提交
INSERT INTO employee (emp_name, emp_dept, emp_salary) 
VALUES ('李四', '销售部', 7500);
// 不需要手动 COMMIT
```

**注意：** 自动提交模式下，无法使用 ROLLBACK 回滚操作。一般在简单的查询场景中使用。

### 4.3 两种模式对比

| 特性 | AutoCommit = False | AutoCommit = True |
|------|:------------------:|:-----------------:|
| 事务控制 | 手动控制 | 自动控制 |
| 数据安全性 | 高（可回滚） | 低（不可回滚） |
| 适用场景 | 增删改操作 | 纯查询操作 |
| 性能 | 较好（批量提交） | 一般（频繁提交） |
| 代码复杂度 | 需要判断提交/回滚 | 简单 |

---

## 五、完整的事务控制示例

### 5.1 单表操作事务

```vb
// 员工信息新增
String ls_name, ls_dept
Decimal ldc_salary

ls_name = sle_name.Text
ls_dept = ddlb_dept.Text
ldc_salary = Dec(sle_salary.Text)

// 验证数据
If Trim(ls_name) = "" Then
    MessageBox("提示", "姓名不能为空")
    Return
End If

// 开始事务（AutoCommit=False 时，CONNECT后即开始事务）
// 执行插入操作
INSERT INTO employee (emp_name, emp_dept, emp_salary, emp_hiredate)
VALUES (:ls_name, :ls_dept, :ldc_salary, Today())
USING SQLCA;

// 判断执行结果
If SQLCA.SQLCode = 0 Then
    // 提交事务
    COMMIT USING SQLCA;
    MessageBox("提示", "员工信息新增成功")
    
    // 刷新数据窗口
    dw_1.Retrieve()
Else
    // 回滚事务
    ROLLBACK USING SQLCA;
    MessageBox("错误", "新增失败：" + SQLCA.SQLErrText)
End If
```

### 5.2 多表操作事务（转账示例）

```vb
// 银行账户转账：从A账户转1000元到B账户
String ls_fromAccount, ls_toAccount
Decimal ldc_amount

ls_fromAccount = sle_from.Text
ls_toAccount = sle_to.Text
ldc_amount = Dec(sle_amount.Text)

// 验证余额是否充足
Decimal ldc_balance
SELECT balance INTO :ldc_balance
FROM bank_account
WHERE account_no = :ls_fromAccount
USING SQLCA;

If SQLCA.SQLCode <> 0 Then
    MessageBox("错误", "查询余额失败：" + SQLCA.SQLErrText)
    Return
End If

If ldc_balance < ldc_amount Then
    MessageBox("提示", "余额不足")
    Return
End If

// 步骤1：扣减A账户余额
UPDATE bank_account
SET balance = balance - :ldc_amount
WHERE account_no = :ls_fromAccount
USING SQLCA;

If SQLCA.SQLCode <> 0 Then
    ROLLBACK USING SQLCA;
    MessageBox("错误", "扣减余额失败：" + SQLCA.SQLErrText)
    Return
End If

// 步骤2：增加B账户余额
UPDATE bank_account
SET balance = balance + :ldc_amount
WHERE account_no = :ls_toAccount
USING SQLCA;

If SQLCA.SQLCode <> 0 Then
    ROLLBACK USING SQLCA;
    MessageBox("错误", "增加余额失败：" + SQLCA.SQLErrText)
    Return
End If

// 步骤3：记录转账日志
INSERT INTO transfer_log (from_account, to_account, amount, transfer_time)
VALUES (:ls_fromAccount, :ls_toAccount, :ldc_amount, DateTime(Today(), Now()))
USING SQLCA;

If SQLCA.SQLCode <> 0 Then
    ROLLBACK USING SQLCA;
    MessageBox("错误", "记录日志失败：" + SQLCA.SQLErrText)
    Return
End If

// 所有步骤都成功，提交事务
COMMIT USING SQLCA;
MessageBox("提示", "转账成功")
```

### 5.3 使用数据窗口的事务控制

```vb
// 数据窗口保存数据的事务控制
Integer li_result

// 接受数据窗口中的编辑数据
 dw_1.AcceptText()

// 检查数据窗口是否有修改
If dw_1.ModifiedCount() + dw_1.DeletedCount() = 0 Then
    MessageBox("提示", "数据未修改，无需保存")
    Return
End If

// 执行更新
li_result = dw_1.Update()

If li_result = 1 Then
    // 更新成功，提交事务
    COMMIT USING SQLCA;
    MessageBox("提示", "保存成功")
Else
    // 更新失败，回滚事务
    ROLLBACK USING SQLCA;
    MessageBox("错误", "保存失败：" + SQLCA.SQLErrText)
End If
```

---

## 六、事务嵌套与保存点

### 6.1 事务嵌套

PB 中事务对象本身不支持真正的嵌套事务，但可以通过逻辑控制模拟：

```vb
// 模拟事务嵌套
Boolean lb_outerSuccess, lb_innerSuccess

lb_outerSuccess = False
lb_innerSuccess = False

// 外层事务开始
// ... 外层操作1 ...
If SQLCA.SQLCode = 0 Then
    lb_outerSuccess = True
    
    // 内层事务（逻辑上的）
    // ... 内层操作 ...
    If SQLCA.SQLCode = 0 Then
        lb_innerSuccess = True
    End If
End If

// 根据各层结果决定提交或回滚
If lb_outerSuccess And lb_innerSuccess Then
    COMMIT;
Else
    ROLLBACK;
End If
```

### 6.2 使用数据库保存点（Savepoint）

某些数据库支持保存点，可以在事务中设置回滚点：

```vb
// Oracle 数据库示例
// 设置保存点
EXECUTE IMMEDIATE "SAVEPOINT sp_1" USING SQLCA;

// 执行一些操作
INSERT INTO table1 (...) VALUES (...);

// 如果出错，回滚到保存点
If SQLCA.SQLCode <> 0 Then
    EXECUTE IMMEDIATE "ROLLBACK TO SAVEPOINT sp_1" USING SQLCA;
    // 继续其他操作
End If

// 最终提交或回滚整个事务
COMMIT;
```

---

## 七、事务控制最佳实践

### 7.1 事务范围尽量小

```vb
// 不好的做法：事务范围太大，锁定资源时间长
CONNECT;
// ... 大量操作 ...
// ... 用户交互 ...  // 不要在事务中等待用户操作！
// ... 更多操作 ...
COMMIT;

// 好的做法：事务范围尽量小
CONNECT;
// 获取数据（查询不需要事务）
DISCONNECT;

// 用户操作...

// 需要保存时再连接并执行事务
CONNECT;
// 执行更新操作
COMMIT;
DISCONNECT;
```

### 7.2 始终判断 SQLCode

```vb
// 不好的做法：不判断执行结果
UPDATE employee SET salary = salary + 1000;
COMMIT;

// 好的做法：始终判断执行结果
UPDATE employee SET salary = salary + 1000;

If SQLCA.SQLCode = 0 Then
    COMMIT;
Else
    ROLLBACK;
    // 记录日志
    // 提示用户
End If
```

### 7.3 使用异常处理结构

```vb
// 推荐的事务控制模板
Integer li_result

li_result = 0

// 操作1
If li_result = 0 Then
    INSERT INTO ...;
    If SQLCA.SQLCode <> 0 Then li_result = -1
End If

// 操作2
If li_result = 0 Then
    UPDATE ...;
    If SQLCA.SQLCode <> 0 Then li_result = -1
End If

// 操作3
If li_result = 0 Then
    DELETE FROM ...;
    If SQLCA.SQLCode <> 0 Then li_result = -1
End If

// 统一提交或回滚
If li_result = 0 Then
    COMMIT;
    MessageBox("提示", "操作成功")
Else
    ROLLBACK;
    MessageBox("错误", "操作失败：" + SQLCA.SQLErrText)
End If
```

### 7.4 在应用关闭时处理未提交事务

```vb
// 应用 CloseQuery 事件
If SQLCA.DBHandle() <> 0 Then  // 检查是否还有连接
    // 检查是否有未提交的事务
    // 可以提示用户保存或回滚
    Integer li_flag
    li_flag = MessageBox("提示", "有未保存的数据，是否保存？", Question!, YesNoCancel!)
    
    Choose Case li_flag
        Case 1  // Yes
            // 触发保存逻辑
            cb_save.TriggerEvent(Clicked!)
        Case 2  // No
            ROLLBACK;
        Case 3  // Cancel
            Return 1  // 阻止关闭
    End Choose
End If
```

---

## 八、常见问题排查

### 8.1 事务未提交导致数据丢失

**现象：** 程序运行正常，但重启后数据消失

**原因：** 执行了 INSERT/UPDATE/DELETE 但没有 COMMIT

**解决：**
```vb
// 确保在操作成功后提交
If SQLCA.SQLCode = 0 Then
    COMMIT;  // 不要忘记这行！
End If
```

### 8.2 事务长时间未提交导致死锁

**现象：** 程序卡住，数据库报死锁错误

**原因：** 事务中执行了耗时操作或等待用户输入

**解决：**
- 缩短事务范围
- 不要在事务中等待用户操作
- 及时提交或回滚

### 8.3 回滚后数据窗口状态不一致

**现象：** ROLLBACK 后，数据窗口显示的数据和数据库不一致

**解决：**
```vb
ROLLBACK;
dw_1.Retrieve();  // 回滚后重新检索数据
```

### 8.4 多个数据窗口共享事务对象

**现象：** 一个数据窗口保存失败，影响其他数据窗口

**解决：**
```vb
// 为不同的数据窗口使用不同的事务对象
// 或者确保所有数据窗口操作成功后再提交

Integer li_result1, li_result2

li_result1 = dw_1.Update(True, False)  // 不重置更新标志
li_result2 = dw_2.Update(True, False)

If li_result1 = 1 And li_result2 = 1 Then
    COMMIT;
    dw_1.ResetUpdate()  // 重置更新标志
    dw_2.ResetUpdate()
Else
    ROLLBACK;
End If
```

---

## 九、小结

通过本篇文章，我们学习了：

| 知识点 | 掌握要点 |
|--------|----------|
| 事务概念 | ACID 特性、原子性 |
| 事务对象 | SQLCA、自定义事务对象 |
| 基本语句 | CONNECT、DISCONNECT、COMMIT、ROLLBACK |
| AutoCommit | 手动模式 vs 自动模式 |
| 多表事务 | 转账示例、多步骤控制 |
| 数据窗口事务 | Update + Commit/Rollback |
| 最佳实践 | 事务范围最小化、始终判断 SQLCode |

### 事务控制速查表

| 场景 | 操作 |
|------|------|
| 开始事务 | `CONNECT;` 或设置 `AutoCommit = False` |
| 提交事务 | `COMMIT;` |
| 回滚事务 | `ROLLBACK;` |
| 断开连接 | `DISCONNECT;` |
| 判断成功 | `If SQLCA.SQLCode = 0 Then` |
| 判断失败 | `If SQLCA.SQLCode = -1 Then` |
| 获取错误 | `SQLCA.SQLErrText` |

掌握事务控制是 PB 开发的关键技能，务必在实际项目中多加练习。下一篇我们将学习 **用户对象(UserObject)**，这是 PB 面向对象编程的核心内容。

以上就是本期内容的全部 *★,°*:.☆(￣▽￣)/$:*.°★* 。 希望对您有所帮助

我们下期再见 ヾ(•ω•`)o   (●'◡'●)
