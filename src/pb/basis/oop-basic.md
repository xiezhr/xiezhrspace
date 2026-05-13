---
date: 2025-05-07
title: 面向对象编程
icon: note
---

## 面向对象编程

> PB 支持面向对象编程（OOP），掌握类、继承、多态等概念，能让你的代码更优雅、更易维护。

---

## 一、面向对象基础概念

### 1.1 什么是面向对象

面向对象编程（Object-Oriented Programming，OOP）是一种程序设计思想，它将数据和操作数据的方法封装在一起，形成"对象"。

| 概念 | 说明 | 生活中的例子 |
|------|------|-------------|
| 类（Class） | 对象的模板，定义了对象的属性和方法 | 汽车设计图纸 |
| 对象（Object） | 类的实例，是具体的个体 | 一辆具体的汽车 |
| 属性（Property） | 对象的状态特征 | 汽车的颜色、品牌 |
| 方法（Method） | 对象的行为功能 | 汽车启动、刹车 |
| 继承（Inheritance） | 子类继承父类的特性 | 轿车继承汽车的特性 |
| 封装（Encapsulation） | 隐藏内部细节，暴露接口 | 汽车引擎内部复杂，但驾驶操作简单 |
| 多态（Polymorphism） | 同一操作作用于不同对象有不同行为 | 按喇叭，不同车声音不同 |

### 1.2 PB 中的面向对象

PB 中的面向对象主要通过以下方式实现：

- **窗口（Window）**：可视对象
- **用户对象（User Object）**：自定义对象
- **数据窗口（DataWindow）**：数据操作对象
- **菜单（Menu）**：命令对象
- **应用（Application）**：程序入口对象

---

## 二、用户对象（User Object）

用户对象是 PB 中实现面向对象编程的核心，分为三种类型：

| 类型 | 英文 | 说明 | 使用场景 |
|------|------|------|----------|
| 标准可视化 | Standard Visual | 继承自 PB 内置可视化控件 | 增强现有控件功能 |
| 自定义可视化 | Custom Visual | 多个控件组合成的复合控件 | 创建可复用的界面组件 |
| 自定义类 | Custom Class | 不可见的逻辑对象 | 封装业务逻辑 |

### 2.1 创建标准可视化用户对象

**场景：** 创建一个增强版的单行编辑框，只能输入数字，且自动格式化。

**步骤：**

1. 选择菜单 **File → New → PB Object → User Object**
2. 选择 **Standard Visual** 类型
3. 在 **Select Standard Visual Type** 对话框中选择 `SingleLineEdit`
4. 点击 **OK**

![创建标准可视化用户对象](https://blog.xiezhrspace.cn/blog-img/pb-cases/uo-standard-visual.png)

**编写代码：**

```vb
// 用户对象 uo_number_edit 的代码

// 实例变量（Instance Variables）
Integer ii_decimalPlaces = 2  // 默认小数位数
Boolean ib_allowNegative = True  // 是否允许负数

// 修改事件（Modified Event）
// 验证输入是否为有效数字
String ls_text
Decimal ldc_value

ls_text = This.Text

// 空值检查
If Trim(ls_text) = "" Then Return

// 尝试转换为数字
If IsNumber(ls_text) Then
    ldc_value = Dec(ls_text)
    
    // 检查是否允许负数
    If Not ib_allowNegative And ldc_value < 0 Then
        MessageBox("提示", "不允许输入负数")
        This.Text = "0"
        Return
    End If
    
    // 格式化显示
    This.Text = String(ldc_value, "#,##0." + Fill("0", ii_decimalPlaces))
Else
    MessageBox("提示", "请输入有效的数字")
    This.Text = "0"
End If
```

**使用用户对象：**

```vb
// 在窗口中放置 uo_number_edit
// 可以直接像普通 SingleLineEdit 一样使用

// 获取值
Decimal ldc_price
ldc_price = Dec(uo_1.Text)

// 设置属性（如果定义了自定义属性）
uo_1.ii_decimalPlaces = 4  // 设置4位小数
uo_1.ib_allowNegative = False  // 不允许负数
```

### 2.2 创建自定义可视化用户对象

**场景：** 创建一个"员工信息卡片"组件，包含姓名、部门、工资等信息的显示和编辑。

**步骤：**

1. 选择菜单 **File → New → PB Object → User Object**
2. 选择 **Custom Visual** 类型
3. 在用户对象画板中设计界面

**设计界面：**

放置以下控件：
- `StaticText`：标签（姓名、部门、工资）
- `SingleLineEdit`：姓名输入框（`sle_name`）
- `DropDownListBox`：部门选择框（`ddlb_dept`）
- `SingleLineEdit`：工资输入框（`sle_salary`）
- `CommandButton`：保存按钮（`cb_save`）

![自定义可视化用户对象](https://blog.xiezhrspace.cn/blog-img/pb-cases/uo-custom-visual.png)

**编写代码：**

```vb
// 用户对象 uo_employee_card

// 实例变量
Long il_empId  // 员工ID

// 函数：设置员工信息
// uf_setEmployee(Long al_empId, String as_name, String as_dept, Decimal adc_salary)
Integer li_index

il_empId = al_empId
sle_name.Text = as_name

// 设置部门
li_index = ddlb_dept.FindItem(as_dept, 0)
If li_index > 0 Then
    ddlb_dept.SelectItem(li_index)
End If

sle_salary.Text = String(adc_salary, "#,##0.00")

Return 1

// 函数：获取员工信息
// uf_getEmployee(ref Long al_empId, ref String as_name, ref String as_dept, ref Decimal adc_salary)
al_empId = il_empId
as_name = sle_name.Text
as_dept = ddlb_dept.Text
adc_salary = Dec(sle_salary.Text)

Return 1

// 保存按钮 Clicked 事件
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

If ldc_salary <= 0 Then
    MessageBox("提示", "工资必须大于0")
    Return
End If

// 触发保存事件（让使用这个用户对象的窗口来处理保存逻辑）
Parent.TriggerEvent("ue_save")
```

**使用用户对象：**

```vb
// 在窗口中放置 uo_employee_card

// 设置员工信息
uo_1.uf_setEmployee(1001, "张三", "技术部", 8000.00)

// 获取员工信息
Long ll_id
String ls_name, ls_dept
Decimal ldc_salary

uo_1.uf_getEmployee(ll_id, ls_name, ls_dept, ldc_salary)
```

### 2.3 创建自定义类用户对象

**场景：** 创建一个"计算器"类，封装各种数学运算。

**步骤：**

1. 选择菜单 **File → New → PB Object → User Object**
2. 选择 **Custom Class** 类型

**编写代码：**

```vb
// 用户对象 uo_calculator（Custom Class 类型）

// 函数：加法
// uf_add(Decimal adc_a, Decimal adc_b) RETURNS Decimal
Return adc_a + adc_b

// 函数：减法
// uf_subtract(Decimal adc_a, Decimal adc_b) RETURNS Decimal
Return adc_a - adc_b

// 函数：乘法
// uf_multiply(Decimal adc_a, Decimal adc_b) RETURNS Decimal
Return adc_a * adc_b

// 函数：除法
// uf_divide(Decimal adc_a, Decimal adc_b) RETURNS Decimal
If adc_b = 0 Then
    MessageBox("错误", "除数不能为0")
    Return 0
End If

Return adc_a / adc_b

// 函数：计算折扣价
// uf_discountPrice(Decimal adc_price, Decimal adc_discountRate) RETURNS Decimal
// adc_discountRate: 折扣率，如 0.85 表示85折
If adc_discountRate <= 0 Or adc_discountRate > 1 Then
    MessageBox("错误", "折扣率必须在0-1之间")
    Return adc_price
End If

Return adc_price * adc_discountRate

// 函数：计算含税价
// uf_taxPrice(Decimal adc_price, Decimal adc_taxRate) RETURNS Decimal
// adc_taxRate: 税率，如 0.13 表示13%
Return adc_price * (1 + adc_taxRate)
```

**使用自定义类：**

```vb
// 声明并创建对象
uo_calculator luo_calc
luo_calc = CREATE uo_calculator

// 使用对象的方法
Decimal ldc_result, ldc_price, ldc_discountPrice

ldc_result = luo_calc.uf_add(100, 200)        // 结果：300
ldc_result = luo_calc.uf_multiply(10, 5)      // 结果：50
ldc_result = luo_calc.uf_divide(100, 4)       // 结果：25

ldc_price = 1000
ldc_discountPrice = luo_calc.uf_discountPrice(ldc_price, 0.85)  // 结果：850

// 销毁对象
DESTROY luo_calc
```

---

## 三、继承（Inheritance）

### 3.1 什么是继承

继承允许你基于现有的用户对象创建新的用户对象，新对象自动拥有父对象的所有属性和方法，还可以添加自己的特性。

### 3.2 创建继承的用户对象

**场景：** 基于 `uo_number_edit` 创建一个只能输入整数的编辑框。

**步骤：**

1. 选择菜单 **File → Inherit**
2. 选择 **User Objects** 类型
3. 选择 `uo_number_edit`
4. 点击 **OK**

![继承用户对象](https://blog.xiezhrspace.cn/blog-img/pb-cases/uo-inherit.png)

**编写代码：**

```vb
// 用户对象 uo_integer_edit（继承自 uo_number_edit）

// 重写 Modified 事件
// 先调用父类的代码（可选）
// ancestor::modified  // 调用父类的 modified 事件

String ls_text
Long ll_value

ls_text = This.Text

// 空值检查
If Trim(ls_text) = "" Then Return

// 检查是否为整数（不能有小数点）
If Pos(ls_text, ".") > 0 Then
    MessageBox("提示", "只能输入整数")
    This.Text = "0"
    Return
End If

// 调用父类的验证逻辑
// 由于 PB 中可以直接使用父类的代码，这里只需要添加额外的验证
```

### 3.3 继承的优势

```vb
// 父类：uo_base_button（自定义按钮基类）
// 功能：统一按钮样式、点击效果

// 子类1：uo_save_button（保存按钮）
// 继承基类，添加保存图标和保存逻辑

// 子类2：uo_delete_button（删除按钮）
// 继承基类，添加删除图标和确认对话框

// 子类3：uo_print_button（打印按钮）
// 继承基类，添加打印图标和打印逻辑
```

---

## 四、封装（Encapsulation）

### 4.1 什么是封装

封装是将数据（属性）和操作数据的方法绑定在一起，并隐藏内部实现细节，只暴露必要的接口。

### 4.2 PB 中的封装实现

```vb
// 用户对象 uo_bank_account（银行账户类）

// 私有实例变量（通过命名约定实现，PB 没有真正的 private）
Decimal idc_balance      // 余额（私有）
String is_accountNo      // 账号（私有）
String is_ownerName      // 户主名（私有）

// 公有函数：存款
// uf_deposit(Decimal adc_amount) RETURNS Integer
If adc_amount <= 0 Then
    MessageBox("提示", "存款金额必须大于0")
    Return -1
End If

idc_balance = idc_balance + adc_amount
Return 1

// 公有函数：取款
// uf_withdraw(Decimal adc_amount) RETURNS Integer
If adc_amount <= 0 Then
    MessageBox("提示", "取款金额必须大于0")
    Return -1
End If

If adc_amount > idc_balance Then
    MessageBox("提示", "余额不足")
    Return -1
End If

idc_balance = idc_balance - adc_amount
Return 1

// 公有函数：查询余额
// uf_getBalance() RETURNS Decimal
Return idc_balance

// 公有函数：获取账号
// uf_getAccountNo() RETURNS String
Return is_accountNo

// 公有函数：初始化账户
// uf_init(String as_accountNo, String as_ownerName, Decimal adc_initialBalance)
is_accountNo = as_accountNo
is_ownerName = as_ownerName
idc_balance = adc_initialBalance

Return 1
```

**使用封装后的对象：**

```vb
uo_bank_account luo_account
luo_account = CREATE uo_bank_account

// 初始化账户
luo_account.uf_init("622202123456789", "张三", 10000.00)

// 存款
luo_account.uf_deposit(5000.00)

// 取款
luo_account.uf_withdraw(3000.00)

// 查询余额（不能直接访问 idc_balance）
Decimal ldc_balance
ldc_balance = luo_account.uf_getBalance()
MessageBox("余额", "当前余额：" + String(ldc_balance, "#,##0.00"))

// 不能直接修改余额（封装保护）
// luo_account.idc_balance = 999999  // 错误！无法访问

DESTROY luo_account
```

---

## 五、多态（Polymorphism）

### 5.1 什么是多态

多态是指同一个接口，使用不同的实例可以有不同的实现。

### 5.2 PB 中的多态实现

PB 通过 **动态调用** 和 **函数重载** 实现多态。

```vb
// 父类：uo_payment（支付方式基类）
// 函数：uf_pay(Decimal adc_amount) RETURNS Integer
// 虚方法，子类需要重写
MessageBox("提示", "基类支付方法，请使用子类")
Return -1

// 子类1：uo_cash_payment（现金支付）
// 重写 uf_pay 函数
MessageBox("提示", "现金支付：" + String(adc_amount, "#,##0.00") + " 元")
Return 1

// 子类2：uo_card_payment（刷卡支付）
// 重写 uf_pay 函数
MessageBox("提示", "刷卡支付：" + String(adc_amount, "#,##0.00") + " 元")
// 调用银行接口...
Return 1

// 子类3：uo_wechat_payment（微信支付）
// 重写 uf_pay 函数
MessageBox("提示", "微信支付：" + String(adc_amount, "#,##0.00") + " 元")
// 调用微信支付接口...
Return 1
```

**使用多态：**

```vb
// 根据用户选择创建不同的支付对象
uo_payment luo_payment
String ls_payType

ls_payType = ddlb_payType.Text

Choose Case ls_payType
    Case "现金"
        luo_payment = CREATE uo_cash_payment
    Case "刷卡"
        luo_payment = CREATE uo_card_payment
    Case "微信"
        luo_payment = CREATE uo_wechat_payment
    Case Else
        MessageBox("提示", "不支持的支付方式")
        Return
End Choose

// 统一调用支付方法（多态）
luo_payment.uf_pay(ldc_amount)

DESTROY luo_payment
```

---

## 六、综合示例：权限管理系统

### 6.1 设计思路

使用面向对象思想设计一个简单的权限管理系统：

- **uo_user**：用户类
- **uo_role**：角色类
- **uo_permission**：权限类
- **uo_auth_manager**：权限管理器类

### 6.2 用户类（uo_user）

```vb
// 实例变量
Long il_userId
String is_userName
String is_password
String is_realName
String is_status  // 状态：正常/禁用

// 函数：初始化
// uf_init(Long al_userId, String as_userName, String as_realName)
il_userId = al_userId
is_userName = as_userName
is_realName = as_realName
is_status = "正常"
Return 1

// 函数：验证密码
// uf_verifyPassword(String as_inputPassword) RETURNS Boolean
Return (as_inputPassword = is_password)

// 函数：禁用用户
// uf_disable()
is_status = "禁用"
Return 1

// 函数：启用用户
// uf_enable()
is_status = "正常"
Return 1

// 函数：获取用户信息
// uf_getInfo(ref Long al_userId, ref String as_userName, ref String as_realName, ref String as_status)
al_userId = il_userId
as_userName = is_userName
as_realName = is_realName
as_status = is_status
Return 1
```

### 6.3 权限管理器类（uo_auth_manager）

```vb
// 实例变量
uo_user iuo_users[]      // 用户数组
uo_role iuo_roles[]      // 角色数组

// 函数：添加用户
// uf_addUser(uo_user auo_user) RETURNS Integer
Long ll_index
ll_index = UpperBound(iuo_users) + 1
iuo_users[ll_index] = auo_user
Return 1

// 函数：用户登录
// uf_login(String as_userName, String as_password) RETURNS uo_user
Integer li_i
String ls_name, ls_realName, ls_status
Long ll_id

For li_i = 1 To UpperBound(iuo_users)
    iuo_users[li_i].uf_getInfo(ll_id, ls_name, ls_realName, ls_status)
    
    If ls_name = as_userName Then
        If ls_status = "禁用" Then
            MessageBox("提示", "用户已被禁用")
            Return iuo_users[li_i]
        End If
        
        If iuo_users[li_i].uf_verifyPassword(as_password) Then
            MessageBox("提示", "登录成功，欢迎 " + ls_realName)
            Return iuo_users[li_i]
        Else
            MessageBox("提示", "密码错误")
            Return iuo_users[li_i]
        End If
    End If
Next

MessageBox("提示", "用户不存在")
Return iuo_users[li_i]  // 返回空对象
```

### 6.4 使用示例

```vb
// 创建权限管理器
uo_auth_manager luo_auth
luo_auth = CREATE uo_auth_manager

// 创建用户
uo_user luo_user1, luo_user2
luo_user1 = CREATE uo_user
luo_user2 = CREATE uo_user

luo_user1.uf_init(1, "admin", "管理员")
luo_user2.uf_init(2, "zhangsan", "张三")

// 添加到管理器
luo_auth.uf_addUser(luo_user1)
luo_auth.uf_addUser(luo_user2)

// 登录测试
uo_user luo_currentUser
luo_currentUser = luo_auth.uf_login("admin", "admin123")

// 清理
DESTROY luo_user1
DESTROY luo_user2
DESTROY luo_auth
```

---

## 七、小结

通过本篇文章，我们学习了 PB 中的面向对象编程：

| 知识点 | 掌握要点 |
|--------|----------|
| 用户对象类型 | 标准可视化、自定义可视化、自定义类 |
| 继承 | 基于现有对象创建新对象，复用代码 |
| 封装 | 隐藏内部细节，暴露接口 |
| 多态 | 同一接口，不同实现 |
| 实际应用 | 权限管理系统示例 |

### 面向对象编程的好处

1. **代码复用**：通过继承减少重复代码
2. **易于维护**：封装隐藏实现，修改不影响外部
3. **扩展性强**：新增功能只需添加新类
4. **逻辑清晰**：将数据和操作封装在一起

### 学习建议

- 从简单的用户对象开始练习
- 先掌握自定义类（不可见对象），再学习可视化对象
- 在实际项目中多用继承和封装
- 不要过度设计，简单场景不需要复杂的继承层次

面向对象编程是 PB 高级开发的必备技能，掌握它能让你的代码质量提升一个档次。下一篇我们将学习 **调试技巧**，帮助你快速定位和解决程序中的问题。

以上就是本期内容的全部 *★,°*:.☆(￣▽￣)/$:*.°★* 。 希望对您有所帮助

我们下期再见 ヾ(•ω•`)o   (●'◡'●)
