---
date: 2025-05-07
title: PowerScript语言基础
icon: note
---

## PowerScript语言基础

> PowerScript 是 PowerBuilder 的编程语言，类似于 BASIC 和 Pascal 的混合体。掌握它是 PB 开发的第一步。

---

## 一、注释

### 1.1 单行注释

使用 `//` 开头，注释内容从 `//` 开始到行尾结束。

```vb
// 这是单行注释
string ls_name  // 定义字符串变量，用于存储姓名
```

### 1.2 多行注释

使用 `/* */` 包裹注释内容。

```vb
/*
  这是多行注释
  可以写多行内容
  常用于函数说明、版权信息等
*/
```

---

## 二、数据类型

### 2.1 标准数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `Blob` | 二进制大对象，存储图片、文件等 | `Blob lb_pic` |
| `Boolean` | 布尔型，值为 `True` 或 `False` | `Boolean lb_flag` |
| `Char` / `Character` | 单个 ASCII 字符 | `Char lc_sex` |
| `Date` | 日期型（年-月-日） | `Date ld_birth` |
| `DateTime` | 日期时间型 | `DateTime ldt_now` |
| `Decimal` / `Dec` | 有符号十进制数，精度18位 | `Decimal ldc_salary` |
| `Double` | 双精度浮点数 | `Double ldb_result` |
| `Integer` / `Int` | 16位有符号整数 | `Integer li_count` |
| `Long` | 32位有符号整数 | `Long ll_id` |
| `Real` | 单精度浮点数 | `Real lr_rate` |
| `String` | 字符串 | `String ls_name` |
| `Time` | 时间型（时:分:秒） | `Time lt_start` |
| `UnsignedInteger` | 16位无符号整数 | `UnsignedInteger lui_flag` |
| `UnsignedLong` | 32位无符号整数 | `UnsignedLong lul_id` |

### 2.2 变量声明

变量必须先声明后使用，声明语法为：

```vb
数据类型 变量名
```

```vb
// 声明单个变量
String ls_name
Integer li_age

// 同时声明多个同类型变量
String ls_firstName, ls_lastName, ls_fullName
Integer li_count, li_index, li_total
```

### 2.3 变量作用域

| 作用域 | 前缀 | 说明 | 有效范围 |
|--------|------|------|----------|
| Local（局部） | `l_` | 在脚本内部声明 | 仅在当前脚本有效 |
| Instance（实例） | `i_` | 在对象的实例变量区声明 | 仅在对象实例内有效 |
| Shared（共享） | `s_` | 在对象的共享变量区声明 | 对象的所有实例共享 |
| Global（全局） | `g_` | 在全局变量区声明 | 整个应用程序有效 |

```vb
// 局部变量（在事件/函数脚本中声明）
String ls_name
Integer li_count

// 实例变量（在 Declare Instance Variables 选项卡中声明）
// 在窗口或用户对象的实例变量区声明
String is_userName
Integer ii_userAge
```

---

## 三、常量

使用 `CONSTANT` 关键字定义常量，常量一旦定义不可修改。

```vb
// 定义常量
CONSTANT Integer MAX_COUNT = 100
CONSTANT String APP_NAME = "医院管理系统"
CONSTANT Decimal PI = 3.1415926
CONSTANT Date DEFAULT_DATE = 2020-01-01

// 使用常量
If li_count > MAX_COUNT Then
    MessageBox("提示", "超出最大数量限制")
End If
```

---

## 四、运算符

### 4.1 算术运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `+` | 加法 | `li_sum = li_a + li_b` |
| `-` | 减法 | `li_diff = li_a - li_b` |
| `*` | 乘法 | `li_prod = li_a * li_b` |
| `/` | 除法 | `lr_result = ll_a / ll_b` |
| `^` | 幂运算 | `lr_result = li_base ^ li_exp` |

### 4.2 比较运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `=` | 等于 | `If ls_a = ls_b Then` |
| `<>` / `!=` | 不等于 | `If li_a <> li_b Then` |
| `>` | 大于 | `If li_a > li_b Then` |
| `<` | 小于 | `If li_a < li_b Then` |
| `>=` | 大于等于 | `If li_a >= li_b Then` |
| `<=` | 小于等于 | `If li_a <= li_b Then` |

### 4.3 逻辑运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `AND` | 逻辑与 | `If lb_a AND lb_b Then` |
| `OR` | 逻辑或 | `If lb_a OR lb_b Then` |
| `NOT` | 逻辑非 | `If NOT lb_flag Then` |

### 4.4 字符串连接

使用 `+` 连接字符串：

```vb
String ls_firstName, ls_lastName, ls_fullName
ls_firstName = "张"
ls_lastName = "三"
ls_fullName = ls_firstName + ls_lastName  // 结果：张三

// 字符串与数值连接，数值会自动转字符串
String ls_msg
Integer li_age = 25
ls_msg = "年龄：" + String(li_age)  // 结果：年龄：25
```

---

## 五、流程控制

### 5.1 IF 条件语句

#### 5.1.1 单分支

```vb
If li_score >= 60 Then
    MessageBox("提示", "考试通过")
End If
```

#### 5.1.2 双分支

```vb
If li_score >= 60 Then
    MessageBox("提示", "考试通过")
Else
    MessageBox("提示", "考试不及格")
End If
```

#### 5.1.3 多分支

```vb
If li_score >= 90 Then
    ls_grade = "优秀"
ElseIf li_score >= 80 Then
    ls_grade = "良好"
ElseIf li_score >= 70 Then
    ls_grade = "中等"
ElseIf li_score >= 60 Then
    ls_grade = "及格"
Else
    ls_grade = "不及格"
End If
```

### 5.2 CHOOSE CASE 多分支选择

`CHOOSE CASE` 是 PB 特有的多分支结构，比多个 `If ElseIf` 更清晰：

```vb
CHOOSE CASE li_score
    CASE IS >= 90
        ls_grade = "优秀"
    CASE 80 TO 89
        ls_grade = "良好"
    CASE 70 TO 79
        ls_grade = "中等"
    CASE 60 TO 69
        ls_grade = "及格"
    CASE ELSE
        ls_grade = "不及格"
END CHOOSE
```

#### 其他用法示例

```vb
// 匹配单个值
CHOOSE CASE ls_deptCode
    CASE "01"
        ls_deptName = "内科"
    CASE "02"
        ls_deptName = "外科"
    CASE "03"
        ls_deptName = "儿科"
    CASE ELSE
        ls_deptName = "未知科室"
END CHOOSE

// 匹配多个值
CHOOSE CASE ls_sex
    CASE "M", "m", "男"
        ls_sexName = "男"
    CASE "F", "f", "女"
        ls_sexName = "女"
    CASE ELSE
        ls_sexName = "未知"
END CHOOSE

// 使用逗号分隔的列表
CHOOSE CASE li_month
    CASE 1, 3, 5, 7, 8, 10, 12
        li_days = 31
    CASE 4, 6, 9, 11
        li_days = 30
    CASE 2
        li_days = 28
END CHOOSE
```

### 5.3 FOR 循环

```vb
// 基本语法：For 变量 = 起始值 To 结束值 [Step 步长]

// 正向循环（步长为1，可省略Step）
Integer li_i
For li_i = 1 To 10
    // 循环体
    MessageBox("提示", "当前值：" + String(li_i))
Next

// 带步长的循环
For li_i = 1 To 10 Step 2
    // 1, 3, 5, 7, 9
Next

// 倒序循环
For li_i = 10 To 1 Step -1
    // 10, 9, 8, ... , 1
Next

// 遍历数组
String ls_names[]
ls_names[1] = "张三"
ls_names[2] = "李四"
ls_names[3] = "王五"

Integer li_index
For li_index = 1 To UpperBound(ls_names)
    MessageBox("提示", ls_names[li_index])
Next
```

### 5.4 DO LOOP 循环

#### 5.4.1 DO WHILE ... LOOP（先判断后执行）

```vb
Integer li_count = 1

DO WHILE li_count <= 10
    MessageBox("提示", "当前值：" + String(li_count))
    li_count = li_count + 1
LOOP
```

#### 5.4.2 DO UNTIL ... LOOP（先判断后执行，条件为真时退出）

```vb
Integer li_count = 1

DO UNTIL li_count > 10
    MessageBox("提示", "当前值：" + String(li_count))
    li_count = li_count + 1
LOOP
```

#### 5.4.3 DO ... LOOP WHILE（先执行后判断）

```vb
Integer li_count = 1

DO
    MessageBox("提示", "当前值：" + String(li_count))
    li_count = li_count + 1
LOOP WHILE li_count <= 10
```

#### 5.4.4 DO ... LOOP UNTIL（先执行后判断，条件为真时退出）

```vb
Integer li_count = 1

DO
    MessageBox("提示", "当前值：" + String(li_count))
    li_count = li_count + 1
LOOP UNTIL li_count > 10
```

### 5.5 CONTINUE 和 EXIT

```vb
// CONTINUE：跳过当前循环剩余代码，进入下一次循环
Integer li_i
For li_i = 1 To 10
    If Mod(li_i, 2) = 0 Then CONTINUE  // 跳过偶数
    MessageBox("提示", "奇数：" + String(li_i))
Next

// EXIT：立即退出循环
Integer li_j
For li_j = 1 To 100
    If li_j > 50 Then EXIT  // 当 li_j > 50 时退出循环
    // 处理逻辑
Next
```

### 5.6 RETURN 和 HALT

```vb
// RETURN：从当前脚本返回，可带返回值
// 在函数中使用
Return 1  // 返回成功
Return -1 // 返回失败

// 在事件中使用（不带返回值）
Return

// HALT：终止应用程序
HALT  // 正常终止
HALT CLOSE // 先执行应用程序的 Close 事件，再终止
```

---

## 六、数组

### 6.1 声明数组

```vb
// 声明固定大小数组
String ls_names[10]      // 声明包含10个元素的字符串数组
Integer li_scores[5]     // 声明包含5个元素的整数数组

// 声明动态数组（大小不固定）
String ls_names[]
Integer li_scores[]
```

### 6.2 数组赋值

```vb
String ls_names[3]
ls_names[1] = "张三"
ls_names[2] = "李四"
ls_names[3] = "王五"

// 动态数组赋值
String ls_names[]
ls_names[1] = "张三"
ls_names[2] = "李四"
// 可以随时添加更多元素
ls_names[10] = "赵六"  // 数组会自动扩展
```

### 6.3 数组操作

```vb
String ls_names[]
ls_names[1] = "张三"
ls_names[2] = "李四"
ls_names[3] = "王五"

// 获取数组大小
Long ll_upper, ll_lower
ll_upper = UpperBound(ls_names)  // 返回最大下标：3
ll_lower = LowerBound(ls_names)  // 返回最小下标：1

// 清空数组
String ls_empty[]
ls_names = ls_empty  // 将数组置为空

// 遍历数组
Integer li_i
For li_i = 1 To UpperBound(ls_names)
    MessageBox("提示", ls_names[li_i])
Next
```

### 6.4 多维数组

```vb
// 声明二维数组
Integer li_matrix[3, 3]

// 赋值
li_matrix[1, 1] = 1
li_matrix[1, 2] = 2
li_matrix[1, 3] = 3
li_matrix[2, 1] = 4
li_matrix[2, 2] = 5
li_matrix[2, 3] = 6
li_matrix[3, 1] = 7
li_matrix[3, 2] = 8
li_matrix[3, 3] = 9

// 遍历二维数组
Integer li_i, li_j
For li_i = 1 To 3
    For li_j = 1 To 3
        // 处理 li_matrix[li_i, li_j]
    Next
Next
```

---

## 七、结构体（Structure）

结构体用于将相关的数据组合在一起。

### 7.1 定义结构体

在 Structure 画板中定义，或通过菜单 `File → New → PB Object → Structure` 创建。

```vb
// 定义员工信息结构体
str_employee
    Integer emp_id
    String emp_name
    String emp_dept
    Decimal emp_salary
    Date emp_hireDate
```

### 7.2 使用结构体

```vb
// 声明结构体变量
str_employee lstr_emp

// 赋值
lstr_emp.emp_id = 1001
lstr_emp.emp_name = "张三"
lstr_emp.emp_dept = "技术部"
lstr_emp.emp_salary = 8000.50
lstr_emp.emp_hireDate = 2020-06-01

// 使用
MessageBox("员工信息", "姓名：" + lstr_emp.emp_name + "~r~n部门：" + lstr_emp.emp_dept)

// 结构体数组
str_employee lstr_emps[10]
lstr_emps[1].emp_name = "张三"
lstr_emps[2].emp_name = "李四"
```

---

## 八、NULL 值处理

### 8.1 NULL 的特性

在 PB 中，`NULL` 表示"未知"或"未赋值"，任何与 `NULL` 的运算结果都是 `NULL`。

```vb
Integer li_a, li_b, li_c
li_a = 10
li_b = NULL

li_c = li_a + li_b  // 结果：NULL（不是10！）
li_c = li_a * li_b  // 结果：NULL
```

### 8.2 判断 NULL

使用 `IsNull()` 函数判断变量是否为 `NULL`：

```vb
Integer li_value

// 判断是否为 NULL
If IsNull(li_value) Then
    MessageBox("提示", "变量未赋值")
Else
    MessageBox("提示", "变量值：" + String(li_value))
End If
```

### 8.3 设置 NULL

```vb
Integer li_value
SetNull(li_value)  // 将变量设置为 NULL

// 常用于数据窗口中，表示清空字段
SetNull(ls_name)
dw_1.SetItem(1, "emp_name", ls_name)  // 将数据窗口对应字段设为 NULL
```

---

## 九、代码书写规范

### 9.1 缩进与格式

```vb
// 使用 Tab 缩进，层次分明
If li_score >= 60 Then
    If li_score >= 90 Then
        ls_grade = "优秀"
    Else
        ls_grade = "及格"
    End If
Else
    ls_grade = "不及格"
End If

// 操作符前后留空格
li_sum = li_a + li_b
ls_msg = "姓名：" + ls_name + "，年龄：" + String(li_age)
```

### 9.2 一行一条语句

```vb
// 推荐：每行一条语句
ls_name = "张三"
li_age = 25
ls_dept = "技术部"

// 不推荐：多条语句写在一行
ls_name = "张三"; li_age = 25; ls_dept = "技术部"
```

### 9.3 长语句换行

使用 `&` 连接符换行：

```vb
// 长字符串换行
ls_sql = "SELECT emp_id, emp_name, emp_dept, emp_salary " + &
         "FROM employee " + &
         "WHERE emp_dept = '技术部' " + &
         "ORDER BY emp_salary DESC"

// 长条件换行
If li_score >= 60 AND &
   li_attendance >= 80 AND &
   ls_status = "正常" Then
    // 处理逻辑
End If
```

---

## 十、综合示例

### 示例1：员工信息处理

```vb
// 定义员工结构体
str_employee
    Integer emp_id
    String emp_name
    String emp_dept
    Decimal emp_salary
    Date emp_hireDate

// 主逻辑
str_employee lstr_emp
Decimal ldc_bonus
String ls_msg

// 赋值
lstr_emp.emp_id = 1001
lstr_emp.emp_name = "张三"
lstr_emp.emp_dept = "技术部"
lstr_emp.emp_salary = 8000.00
lstr_emp.emp_hireDate = 2020-06-01

// 计算奖金
CHOOSE CASE lstr_emp.emp_dept
    CASE "技术部"
        ldc_bonus = lstr_emp.emp_salary * 0.15
    CASE "销售部"
        ldc_bonus = lstr_emp.emp_salary * 0.20
    CASE ELSE
        ldc_bonus = lstr_emp.emp_salary * 0.10
END CHOOSE

// 输出结果
ls_msg = "员工信息：~r~n" + &
         "编号：" + String(lstr_emp.emp_id) + "~r~n" + &
         "姓名：" + lstr_emp.emp_name + "~r~n" + &
         "部门：" + lstr_emp.emp_dept + "~r~n" + &
         "工资：" + String(lstr_emp.emp_salary, "#,##0.00") + "~r~n" + &
         "奖金：" + String(ldc_bonus, "#,##0.00")

MessageBox("员工信息", ls_msg)
```

### 示例2：数组排序

```vb
// 冒泡排序示例
Integer li_numbers[] = {64, 34, 25, 12, 22, 11, 90}
Integer li_i, li_j, li_temp
Integer li_count

li_count = UpperBound(li_numbers)

For li_i = 1 To li_count - 1
    For li_j = 1 To li_count - li_i
        If li_numbers[li_j] > li_numbers[li_j + 1] Then
            // 交换
            li_temp = li_numbers[li_j]
            li_numbers[li_j] = li_numbers[li_j + 1]
            li_numbers[li_j + 1] = li_temp
        End If
    Next
Next

// 输出排序结果
String ls_result = "排序结果："
For li_i = 1 To li_count
    ls_result = ls_result + " " + String(li_numbers[li_i])
Next

MessageBox("排序", ls_result)
```

---

## 小结

通过本篇文章，你应该掌握了 PowerScript 的核心基础：

| 知识点 | 掌握程度 |
|--------|----------|
| 数据类型 | ⭐⭐⭐⭐⭐ |
| 变量与常量 | ⭐⭐⭐⭐⭐ |
| 运算符 | ⭐⭐⭐⭐⭐ |
| 流程控制（If/Choose/For/Do） | ⭐⭐⭐⭐⭐ |
| 数组 | ⭐⭐⭐⭐⭐ |
| 结构体 | ⭐⭐⭐⭐ |
| NULL 处理 | ⭐⭐⭐⭐⭐ |

这些是 PB 开发的基石，务必熟练掌握。下一篇我们将学习 **PB 面向对象编程**，包括对象、继承、多态等高级特性。

本期内容到此结束，希望对你有所帮助。我们下期再见 (●'◡'●)
