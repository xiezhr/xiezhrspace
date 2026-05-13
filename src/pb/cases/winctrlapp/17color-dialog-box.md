---
date: 2024-06-06 07:00:00
title: 17制作一个颜色对话框
icon: note
---
### 写在前面

这是PB案例学习笔记系列文章的第17篇，该系列文章适合具有一定PB基础的读者。

通过一个个由浅入深的编程实战案例学习，提高编程技巧，以保证小伙伴们能应付公司的各种开发需求。

文章中设计到的源码，小凡都上传到了gitee代码仓库[https://gitee.com/xiezhr/pb-project-example.git](https://gitee.com/xiezhr/pb-project-example.git)

![gitee代码仓库](https://i-blog.csdnimg.cn/blog_migrate/5b5302ef7de7580aa2e934d8fa790d40.png)



需要源代码的小伙伴们可以自行下载查看，后续文章涉及到的案例代码也都会提交到这个仓库【**[pb-project-example](https://gitee.com/xiezhr/pb-project-example)**】

如果对小伙伴有所帮助，希望能给一个小星星⭐支持一下小凡。

### 一、小目标

本次案例我们将制作一个颜色对话框。

运行程序后点击相应按钮会弹出一个**颜色选择对话框**，通过鼠标选择好颜色之后，单击确定可以修改控件相关颜色。

最终效果如下所示

![颜色选择框](https://i-blog.csdnimg.cn/blog_migrate/f6eede4d817683113f52ccd335323a9b.gif)

通过案例我们需要学会使用`comdlg32.dll`动态库中的`ChooseColorA`函数来实现颜色对话框

### 二、创建程序基本框架

① 新建`examplework` 工作区

② 新建`exampleapp`应用

以上步骤忘记怎么操作的小伙伴可以翻一翻该系列文章的第一篇回忆一下



### 三、创建`nvo_choosecolor`类用户对象

① 添加`Custom Class`类用户对象，勾选`General`选项上的`AutoInstatiate`复选框

![创建类用户对象](https://i-blog.csdnimg.cn/blog_migrate/d48a42c99f0f4ada58ef21a7fef20627.png)

![勾选AutoInstatiate复选框](https://i-blog.csdnimg.cn/blog_migrate/ea40e65660f1d8a58cf0e77fe15867be.png)

② 单击菜单栏上的`Insert-->Structure`命令，并根据下面表格建立结构`os_choosecolor`

| 变量类型       | 变量名称         |
| -------------- | ---------------- |
| `Long`         | `Istructsize`    |
| `Unsignedlong` | `Hwndowner`      |
| `Unsignedlong` | `Hinstance`      |
| `Long`         | `Regresult`      |
| `Long`         | `Lpcustcolors`   |
| `Long`         | `Flags`          |
| `Long`         | `Lcustdata`      |
| `Long`         | `Lpfnhook`       |
| `Long`         | `Lptemplatename` |

![建立结构`os_choosecolor`](https://i-blog.csdnimg.cn/blog_migrate/0f2a4e9b9064e437e78ade57d2419820.png)



③ 在类用户对象`Declare Instance Variables`选项卡中定义如下实例变量

```java
Private:
os_ChooseColor  istr_ChooseColor  
long il_CustomInitColors[16]
blob{64} ibl_CustomColors
```

![添加实例变量](https://i-blog.csdnimg.cn/blog_migrate/27882938bd6acc82582fadfa4566da5e.png)

④ 添加外部动态库引用

在`Declare Local External Functions` 选项卡中添加如下函数定义

```java
 function boolean ChooseColorA( REF os_ChooseColor lpcc ) library "comdlg32.dll"
```

![添加外部动态库函数定义](https://i-blog.csdnimg.cn/blog_migrate/752cc1a700b668bf81340f2ff6cdd3a5.png)

⑤ 添加`of_choosecolor(ref long al_rgbreslut) return boolean` 函数

```java
// 定义一个布尔型变量lb_ok用于存储选择颜色对话框的返回结果
boolean lb_ok

// 将istr_ChooseColor结构体中的rgbresult字段赋值给al_rgbresult
istr_ChooseColor.rgbresult = al_rgbresult

// 调用ChooseColorA函数打开颜色选择对话框，istr_choosecolor为传入的参数
lb_ok = ChooseColorA(istr_choosecolor)

// 将用户选择的颜色存储到al_rgbresult中
al_rgbresult = istr_ChooseColor.rgbresult

// 返回选择颜色对话框的结果
return lb_ok

```



⑥ 将类用户对象保存为`nvo_choosecolor`

![保存类用户对象](https://i-blog.csdnimg.cn/blog_migrate/97fff3a28722d3529d814597089eb168.png)

### 四、新建`w_main`窗口

① 新建`w_main`窗口

将窗口`Title`设置为通过颜色对话框设置颜色

② 创建控件

在`w_main`窗口中增加3个`CommandButton`按钮控件、1个`SingleLineEdit` 1个`StaticText`

- `cb_1`,设置其`Text`值为：设置窗口背景颜色

- `cb_2`,设置其`Text`值为：设置输入框背景颜色
- `cb_3`,设置其`Text`值为：设置输入框内文字颜色
- `cb_4`,设置其`Text`值为：设置静态文本字体颜色
- `sle_1`,设置其`Text`值为:个人博客：www.xiezhrspace.cn
- `st_1`,设置其`Text`值为：公众号：XiezhrSpace

![控件布局](https://i-blog.csdnimg.cn/blog_migrate/f1efada0221309b2d7c0e5e421fcd21b.png)

③ 保存窗口为`w_main`

### 五、编写事件代码

① 在按钮`cb_1`的`Clicked`事件中添加如下代码

```java
nvo_choosecolor  luo_choosecolor
long ll_color
boolean lb_rc

IF luo_choosecolor.of_choosecolor(ll_color) THEN
	parent.BackColor = ll_color
ELSE
	messagebox("提示","取消操作")
END IF

```

② 在按钮`cb_2`的`Clicked`事件中添加如下代码

```java
nvo_choosecolor  luo_choosecolor
long ll_color
boolean lb_rc

IF luo_choosecolor.of_choosecolor(ll_color) THEN
	parent.sle_1.backcolor = ll_color
ELSE
	messagebox("提示","取消操作")
END IF

```

③ 在按钮`cb_3`的`Clicked`事件中添加如下代码

```java
nvo_choosecolor  luo_choosecolor
long ll_color
boolean lb_rc

IF luo_choosecolor.of_choosecolor(ll_color) THEN
	parent.sle_1.textcolor = ll_color

ELSE
	messagebox("提示","取消操作")
END IF

```

④在按钮`cb_4`的`Clicked`事件中添加如下代码

```java
nvo_choosecolor  luo_choosecolor
long ll_color
boolean lb_rc

IF luo_choosecolor.of_choosecolor(ll_color) THEN
	parent.st_1.textcolor = ll_color
ELSE
	messagebox("提示","取消操作")
END IF

```

⑤ 双击开发界面左边的`System Tree`中的`exampleapp`应用对象，在其`Open`事件中添加如下代码

```java
open(w_main)
```

### 六、运行程序

上面代码都敲完之后，我们来检验下我们的劳动成果

![颜色选择框](https://i-blog.csdnimg.cn/blog_migrate/f6eede4d817683113f52ccd335323a9b.gif)



本期内容到这儿就结束了，希望对您有所帮助。*★,°*:.☆(￣▽￣)/$:*.°★* 。

我们下期再见 ヾ(•ω•`)o (●'◡'●)