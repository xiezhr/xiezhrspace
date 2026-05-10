---
date: 2024-06-12 07:00:00
title: 19制作一个图片按钮
icon: note
---
### 写在前面

这是PB案例学习笔记系列文章的第19篇，该系列文章适合具有一定PB基础的读者。

通过一个个由浅入深的编程实战案例学习，提高编程技巧，以保证小伙伴们能应付公司的各种开发需求。

文章中设计到的源码，小凡都上传到了gitee代码仓库[https://gitee.com/xiezhr/pb-project-example.git](https://gitee.com/xiezhr/pb-project-example.git)

![gitee代码仓库](https://i-blog.csdnimg.cn/blog_migrate/223d26857449d2afc05950ab2fd9a5bc.png)



需要源代码的小伙伴们可以自行下载查看，后续文章涉及到的案例代码也都会提交到这个仓库【**[pb-project-example](https://gitee.com/xiezhr/pb-project-example)**】

如果对小伙伴有所帮助，希望能给一个小星星⭐支持一下小凡。

### 一、小目标

在本案例中我们将制作一个窗口的图片按钮。

程序运行后，在弹出的“图片按钮”窗口中有三张图片，每当鼠标移动到一个图片时，图片就会显示按钮形状，同时画面也会改变。

具体功能如下图所示。单击第一张图片，即“开关”时，中间的图片标题会在`On`和`Off` 之间变换，相应的图片也会随之改变。

单击最后一张图片时，会弹出一个说明窗口

![图片按钮](https://i-blog.csdnimg.cn/blog_migrate/c535e1168eb5b8defc539e8f7e054ce6.gif)

有小伙伴可能会问，这样的案例在实际中有什么用呢？

实际开发中，我们只需要在这个案例上进行改良，就可以制作出一个权限导航栏窗口。

根据登录用户所具有的权限，导航栏中显示不通过模块，通过点击某个模块“图片按钮”进入到不通的模块。

![权限导航栏](https://i-blog.csdnimg.cn/blog_migrate/8dbc881687a8d55b886e1fd66d722078.png)



### 二、创作思路

>  在本次案例中，我们会用到**可视化用户对象**。我们只需制作一个图片按钮，就可以重复使用。
>
>  避免应用程序编写相同活相近的代码的麻烦，提高了应用程序的可维护性。

① 什么是可视化用户对象呢？

这个我们在上一个案例中用到过，它是一个可重用控件或一组完成一定功能的控件。

当这个用户对象定义之后，在应用程序需要这种用户对象的地方就可以反复使用它，并且修改一次，

就可以把修改的结果反应到所有使用该用户对象的地方。

就像本案例中的图片按钮，

② 可视化用户对象分类

- 标准可视化用户对象（`Standard Visual User Object`）
- 定制可视化用户对象（`Custom Visual User Object`）
- 外部可视化用户对象（`External Visual User Object`）

③ 怎么使用？

 本案例中我们使用**定制可视化用户对象** 来制作图片按钮，定制可视化用户对象将多个控件及用户对象组合成一个整体，

完成一定功能和操作。放置在窗口上的可视化对象作为一个整体来使用，其类型为`UserObject!`。 就像放置在窗口上的其他控件一样

应用程序通过窗口的属性数字`Control[]`来访问定制可视化用户对象

### 三、创建程序基本框架

有了基本思路之后，我们就动起来开始写程序了

① 新建`examplework` 工作区

② 新建`exampleapp`应用

③ 新建`w_main`窗口，并将其`Title`设置为"图片按钮"

由于文章篇幅的原因，以上步骤就不再赘述，如果忘记的小伙伴可以翻一翻该系列第一篇文章复习一下

### 四、创建定制可视用户对象

① 新建定制可视化用户对象

单击工具栏上的`File-->New` 命令，在弹出的`New`对话框`PB Object`选项卡中选择`Custom Visual` 图标

单击【OK】按钮，完成可视化对象创建

![创建可视化用户对象](https://i-blog.csdnimg.cn/blog_migrate/fea91b9d4cd480714436bf6905a715a2.png)

② 在可视化用户对象中添加控件

在新建的用户对象中添加如下控件

- 2个`StaticText`控件，并命名为`st_back`、`st_pic`
- 1个`Picture` 控件,并命名为`p_pic`
- 4个`Line`控件，并命名为`ln_1`、`ln_2`、`ln_3`、`ln_4`

③ 设置各个控件的属性

- `st_back`控件的`BorderStyle`值设置为`StyleRaised!`,`Enable`值为`True`
- `st_pic`控件的`Alignment`值设置成`Center!`,`Enable`值为`False`
- `p_pic`控件的`PictureName`值设置成`bmp\bbgrow.bmp`,`Enable`值为`False`
- `ln_1`和`ln_2`的`LineColor`值设置为`Black`
- `ln_3`和`ln_4`的`LineColor`值设置为`White`

④ 设置各个控件的大小位置

| 属性   | st_back | st_pic | p_pic |
| ------ | ------- | ------ | ----- |
| X      | 5       | 5      | 14    |
| Y      | 4       | 140    | 8     |
| Width  | 160     | 160    | 146   |
| Height | 192     | 56     | 128   |

| 属性   | ln_1 | ln_2 | ln_3 | ln_4 |
| ------ | ---- | ---- | ---- | ---- |
| BeginX | 0    | 0    | 169  | 0    |
| BeginY | 0    | 0    | 0    | 196  |
| EndX   | 0    | 169  | 169  | 169  |
| EndY   | 196  | 0    | 196  | 196  |

最终建立好之后如下图所示

![可视化对象布局](https://i-blog.csdnimg.cn/blog_migrate/71d886151244f32d881a52a0e3bb21ed.png)

⑤ 保存用户定制化对象为`uo_pic`

### 五、编写定制化对象代码

① 定义`uo_pic`对象实例变量

![定义实例变量](https://i-blog.csdnimg.cn/blog_migrate/dce8c728f2105e75d0bfaae22f933728.png)

```java
string cmd="文字"
string pic1="BMP文件名"
string pic2="BMP文件名"
boolean getcur=false
```

② 在`uo_pic`对象中添加`uf_line(boolean bshow) return (none)` 函数，代码如下

```java
int xi
int yi

xi=PixelsToUnits(1, XPixelsToUnits!)
yi=PixelsToUnits(1, YPixelsToUnits!)

ln_1.visible=bshow
ln_2.visible=bshow
ln_3.visible=bshow
ln_4.visible=bshow

ln_1.beginx=xi
ln_1.beginy=yi
ln_1.endx=this.width - xi
ln_1.endy=yi
ln_2.beginx=xi
ln_2.beginy=yi
ln_2.endx=xi
ln_2.endy=this.height - yi
ln_3.beginx=this.width - xi
ln_3.beginy=yi
ln_3.endx=this.width - xi
ln_3.endy=this.height -yi
ln_4.beginx=xi
ln_4.beginy=this.height - yi
ln_4.endx=this.width -xi
ln_4.endy=this.height - yi

```

③ 在`uo_pic`对象中添加`uf_lostcur() reurn (none)` 函数，代码如下

```java
if getcur=true then
	p_pic.picturename=pic1
	if ( p_pic.y + p_pic.height ) > (st_back.y + st_back.height - st_pic.height) then p_pic.height = st_back.y + st_back.height - st_pic.height - p_pic.y
	if p_pic.width > st_back.width then p_pic.width = st_back.width
	uf_line(false)
	getcur=false
end if
```

④ 在`uo_pic`对象中添加`uf_lower() reurn (none)` 函数，代码如下

```java
ln_1.linecolor=0
ln_2.linecolor=0
ln_3.linecolor=16777215
ln_4.linecolor=16777215
```

⑤  在`uo_pic`对象中添加`uf_raise() reurn (none)` 函数，代码如下

```java
ln_1.linecolor=16777215
ln_2.linecolor=16777215
ln_3.linecolor=0
ln_4.linecolor=0
```

⑥ 在`uo_pic`对象中添加`uf_set(boolean bp) reurn (none)` 函数，代码如下

```java
int xi,yi,yi1

xi=PixelsToUnits(2, XPixelsToUnits!)
yi=PixelsToUnits(2, YPixelsToUnits!)
yi1=PixelsToUnits(1, YPixelsToUnits!)

st_back.width=this.width - xi*2
st_back.height=this.height - yi*2
st_back.x=xi
st_back.y=yi

if bp then
	p_pic.picturename=pic1
	if pic1="" then
		p_pic.visible=false
	else
		p_pic.visible=true
	end if
else
	p_pic.picturename=pic2
	if pic2="" then
		p_pic.visible=false
	else
		p_pic.visible=true
	end if
end if	

if p_pic.width > st_back.width then p_pic.width = st_back.width
if p_pic.height > st_back.height then p_pic.height = st_back.height
p_pic.x=st_back.x + (st_back.width - p_pic.width ) / 2
if cmd="" then
	st_pic.visible=false
	p_pic.y=(st_back.height - p_pic.height ) /2
else
	st_pic.text=cmd
	st_pic.x=xi
	st_pic.width=st_back.width
	st_pic.y=this.height - st_pic.height - yi
	p_pic.y=st_pic.y - p_pic.height - yi1
end if
if p_pic.y < yi then p_pic.y=yi
if ( p_pic.y + p_pic.height ) > (st_back.y + st_back.height - st_pic.height) then p_pic.height = st_back.y + st_back.height - st_pic.height - p_pic.y
```

⑦ 在`uo_pic`对象中添加`uf_setpic(string picf1,string picf2) return (none)`函数，代码如下

```java
pic1=picf1
pic2=picf2
uf_upper()
uf_line(false)
uf_set(true)
```

⑧ 在`uo_pic`对象中添加`uf_upper() return (none)`函数，代码如下

```java
ln_1.linecolor=16777215
ln_2.linecolor=16777215
ln_3.linecolor=0
ln_4.linecolor=0
```

⑨在`uo_pic`对象的`Constructor`事件中添加如下代码

```java
st_back.border=false
st_pic.border=false
this.border=false
uf_setpic(pic1,pic2)
```

⑩ 在`uo_pic`对象中添加`lostcur() returns(none)`事件，代码如下

```java
parent.triggerevent("mousemove")
```

⑪在`uo_pic`对象中添加`setpic(string picf1,string picf2) returns(none)`事件，代码如下

```java
pic1=picf1
pic2=picf2
uf_setpic(pic1,pic2)
```

⑫ 在`uo_pic`对象中添加无脚本的`clicked() returns long[pbm_bnclicked]` 事件

⑬ 在`uo_pic`对象中添加无脚本的`Mousemove(unsignedlong flags,integer xpos,integer ypos) returns long[pbm_mousemove]` 事件

⑭在`uo_pic`对象的`st_back`控件的`Clicked`事件中添加如下代码

```java
long li
uf_lower()
uf_set(true)
li=cpu()
do
	yield()
loop while cpu() < (li + 250)
uf_upper()
uf_set(false)
parent.triggerevent("clicked")
```

⑮  在`uo_pic`对象的`st_back`控件的`Mousemove`事件中添加如下代码

```java
if getcur=false then
	parent.triggerevent("lostcur")
	uf_upper()
	uf_line(true)
	uf_set(false)
	parent.triggerevent("mousemove")
	getcur=true
end if

```

⑯  在`st_back`控件添加无脚本的`loscur() returns(none)`事件

### 六、w_main窗口中添加控件

① 添加定制可视用户对象

单击菜单栏`Insert-->Control`命令，在列表框中选择`User Object`命令。

然后再弹出的`Select Object`对话框中选择`uo_pic`对象，单击【ok】按钮，在窗口中单击鼠标，添加`uo_pic`对象。

使用相同的方法，在窗口中添加3个`uo_pic`对象，名称分别为`uo_1`、`uo_2`、`uo_3`

②设置可视用户对象。

- `uo_1`控件的`cmd`属性设置为“开关”

- `uo_2`控件的`cmd`属性设置为“ON”

- `uo_3`控件的`cmd`属性设置为"About"

③ 想窗口中添加一个`CommandButton`控件，其`Text`值设置为"退出"，调整控件位置为下图所示

![控件布局](https://i-blog.csdnimg.cn/blog_migrate/757771724560bf45194dcd6d03328ccb.png)

④ 保存`w_main`窗口

### 七、编写窗口`w_main`事件代码

① 在`w_main`窗口中添加实例变量

```java
string f1pic[3]
string f2pic[3]
string f3pic[3]
```

② 在`w_main`窗口中设置`Local External Function` 局部扩展函数

```java
 FUNCTION long ShellExecuteA( long hWnd, REF String ls_Operation, REF String ls_File, REF String ls_Parameters, REF String ls_Directory, INT nShowCmd ) library 'shell32'
```

③ 在`w_main`窗口的`Open`事件中添加如下代码

```java
f1pic[1]="1-1.bmp"
f2pic[1]="1-2.bmp"
f3pic[1]="1-3.bmp"
f1pic[2]="10-1.bmp"
f2pic[2]="10-2.bmp"
f3pic[2]="10-3.bmp"
f1pic[3]="12-1.bmp"
f2pic[3]="12-2.bmp"
f3pic[3]="12-3.bmp"
```

④ 在`w_main`的`Activate`事件中添加如下代码

```java
uo_1.uf_setpic(f3pic[1],f1pic[1])
uo_2.uf_setpic(f3pic[3],f1pic[3])
uo_3.uf_setpic(f3pic[2],f1pic[2])
```

⑤ 在`w_main`的`Mousemove`事件中添加如下代码

```java
uo_1.uf_lostcur()
uo_2.uf_lostcur()
uo_3.uf_lostcur()

```

⑥ 在`uo_1`的`clicked`事件中添加如下代码

```java
if uo_2.enabled=true then
	uo_2.uf_setpic(f2pic[3],f2pic[3])
	uo_2.st_pic.text="OFF"
	uo_2.enabled=false
else
	uo_2.uf_setpic(f3pic[3],f1pic[3])
	uo_2.st_pic.text="ON"
	uo_2.enabled=true
end if
```

⑦ 在`uo_3`的`Clicked`事件中添加如下代码

```java
MessageBox("说明","本例演示了PowerBuilder中使用图片按钮的方法",Information!,OK!)
```

⑧ 在`cb_1`按钮的`Clicked`事件中添加如下代码

```java
close(w_main)
```

⑨在开发界面左边的`System Tree`窗口中双击`exampleapp` 应用对象，并在其`Open`事件中添加如下代码

```java
open(w_main)
```

### 八、运行程序

这个案例的代码真多，终于写完了。来看看效果如何

![图片按钮](https://i-blog.csdnimg.cn/blog_migrate/c535e1168eb5b8defc539e8f7e054ce6.gif)
本期内容到这儿就结束了 *★,°*:.☆(￣▽￣)/$:*.°★* 。
希望文章能帮助到您，我们下期再见 ヾ(•ω•`)o (●'◡'●)