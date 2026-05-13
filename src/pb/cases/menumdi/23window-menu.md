---
date: 2024-06-20 07:00:00
title: 23创建一个窗口菜单
icon: note
---

### 写在前面

这是PB案例学习笔记系列文章的第23篇，该系列文章适合具有一定PB基础的读者。

通过一个个由浅入深的编程实战案例学习，提高编程技巧，以保证小伙伴们能应付公司的各种开发需求。

文章中设计到的源码，小凡都上传到了gitee代码仓库[https://gitee.com/xiezhr/pb-project-example.git](https://gitee.com/xiezhr/pb-project-example.git)

![gitee代码仓库](https://i-blog.csdnimg.cn/blog_migrate/d42d9d1e97f8c57638bb6ec2a154b705.png)



需要源代码的小伙伴们可以自行下载查看，后续文章涉及到的案例代码也都会提交到这个仓库【**[pb-project-example](https://gitee.com/xiezhr/pb-project-example)**】

如果对小伙伴有所帮助，希望能给一个小星星⭐支持一下小凡。

### 一、小目标

这个案例中我们将制作一个带有菜单的`MDI`窗口。制作过程中，我们将引入之前没使用过的`Menu`对象。

最终效果如下

![菜单窗口](https://i-blog.csdnimg.cn/blog_migrate/f1410a5e35fe86808f6d07daa3533901.gif)



### 二、创建程序基本框架

① 新建`examplework`工作区

② 新建`exampleapp`应用

③ 新建窗口,并将窗口保存为`w_mdi`

由于文章篇幅原因，以上步骤不再赘述，如果忘记了的小伙伴，可以翻一翻该系列的第一篇文章

④ 新建Menu菜单

单击工具栏上的`File--->New`命令，在弹出的对话框中选择`PB Object`选项卡，在该选项卡中选择`Menu`图标

，单击【OK】按钮，单击工具栏上的`File-->Save AS`命令，将菜单对象保存为`m_menu`

![新建菜单](https://i-blog.csdnimg.cn/blog_migrate/81368bfb8526341e996788871464a71f.png)

### 三、设置菜单属性

① 插入菜单并命名。

单击菜单栏上的`Insert-->Submenu Item`命令，菜单对象名下出现如下图所示的空白文本框，在空白文本框中输入文件，

按回车键确认



![Submenu Item](https://i-blog.csdnimg.cn/blog_migrate/39198b129207bdd4f79aeaa53a9daf0e.png)

![文件菜单](https://i-blog.csdnimg.cn/blog_migrate/0ec9e6b7fbac54e3961ff5bcf6d6af0a.png)

② 添加下拉菜单

鼠标右键需要添加下拉菜单的菜单项，在弹出的命令框中单击`Insert Submenu Item`命名，在需要添加下拉菜单的菜单项下面

出现一个空白文本框，输入需要添加的菜单，按回车键确认

![添加下拉菜单](https://i-blog.csdnimg.cn/blog_migrate/b26f5a1f788e4c9832b15f1110b7be43.png)

③ 设置快捷键

在显示菜单时可以通过按快捷键`Alt +Key`来进行选择，在菜单名中加"&"符号，"&"符号后面的字母就是该菜单快捷键中的`Key`,

并在底部显示下划线。也可以在菜单项的`General`属性设置页中设置`Shortcut Key`复选框来指定菜单项的快捷键

设置完后如下图所示

![设置快捷键](https://i-blog.csdnimg.cn/blog_migrate/f08fc258e308107e6dcab8257b79bb0b.png)

④ 插入分隔符

要在菜单上划分成不同功能区，就需要设置分隔符，分割符在菜单条上呈现一条灰色的横线。

要插入分隔符，在需要在需要添加的地方插入一个菜单项，并将该菜单项的名称设置为“-”，按回车确定即可

![插入分隔符](https://i-blog.csdnimg.cn/blog_migrate/96f0c573cc181b2cc0f1e552704ada89.png)

### 四、设置MDI窗口

① 在窗口中添加菜单对象

在窗口`w_MDI`的`General`属性设置页中单击`MenuName`复选框后的...按钮，在弹出的`Select Object`对话框中输入菜单对象名称

`m_menu`

![选择菜单](https://i-blog.csdnimg.cn/blog_migrate/72a0b2d7734c001795bd92222ad73a21.png)

② 设置窗口类型

要建立MDI窗口，因此在窗口的`General`属性页面中将`WindwoType`复选框中选中mdi或者mdihelp

![设置窗口类型](https://i-blog.csdnimg.cn/blog_migrate/77946d6d012efd312b16bbe82fc4d207.png)

③ 设置窗口大小

在窗口的`General`属性页面中，将`WindowState`设置为`maximized!`,使窗口运行时最大化

![设置窗口大小](https://i-blog.csdnimg.cn/blog_migrate/936daf8b4348360fddc4c49511f7b8f2.png)

### 五、添加窗口打开脚本

在开发界面左边的`System Tree`窗口中双击`exampleapp`应用，并在其`Open`事件中添加如下代码

```java
open(w_mdi)
```

### 六、运行程序

以上步骤干得差不多了，接下来验证下劳动成果

![菜单窗口](https://i-blog.csdnimg.cn/blog_migrate/f1410a5e35fe86808f6d07daa3533901.gif)



本期内容到这儿就结束了*★,°*:.☆(￣▽￣)/$:*.°★* 。 希望对您有所帮助

我们下期再见 ヾ(•ω•`)o (●'◡'●)