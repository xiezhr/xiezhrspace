---
date: 2024-07-04
title: 28制作一个右键菜单
icon: note
---
### 写在前面

这是PB案例学习笔记系列文章的第28篇，该系列文章适合具有一定PB基础的读者。

通过一个个由浅入深的编程实战案例学习，提高编程技巧，以保证小伙伴们能应付公司的各种开发需求。

文章中设计到的源码，小凡都上传到了gitee代码仓库[https://gitee.com/xiezhr/pb-project-example.git](https://gitee.com/xiezhr/pb-project-example.git)

![gitee代码仓库](https://i-blog.csdnimg.cn/blog_migrate/f3fcc4dfae716113b0c0a7b062a5b196.png)



需要源代码的小伙伴们可以自行下载查看，后续文章涉及到的案例代码也都会提交到这个仓库【**[pb-project-example](https://gitee.com/xiezhr/pb-project-example)**】

如果对小伙伴有所帮助，希望能给一个小星星⭐支持一下小凡。

### 一、小目标

基本上所有的应用程序在点击鼠标右键之后都会弹出一个菜单，本案例我们将使用PB实现这个功能。通过鼠标右键，弹出一个命令菜单，

菜单上包含“剪切”、“复制”、“粘贴”、“加粗”等操作标识。这在日常开发中是一个非常常见的功能，一定要学会哈。

最终效果如下所示

![右键菜单](https://i-blog.csdnimg.cn/blog_migrate/4117e1abddd4980f34148a78c42eeaf5.gif)

### 二、实现思路

我们将通过引用`user32.dll`中的`GetMenu`、`GetSubMenu`、`TrackPopupMenu`、`GetSystemMetrics`等窗体操作函数和`LoadImageA`、

`SetMenuItemBitmaps`等图形显示函数来实现相关功能。具体函数功能如下

① `GetMenu`函数

> 用于获取与特定窗口关联的菜单句柄

**函数原型：**

```java
HMENU GetMenu(HWND hWnd);
```

**参数说明:**

 `hWnd`: 一个窗口句柄，指定了要查询其菜单的窗口。

**返回值:**

 成功时，返回窗口的菜单句柄(`HMENU`)。如果没有菜单关联到该窗口，则返回NULL。

 ② `GetSubMenu`函数

> 用于从主菜单中获取指定位置的子菜单

**函数原型：**

```java
HMENU GetSubMenu(HMENU hMenu, int nPos);
```

 **参数说明:**

- `hMenu`: 主菜单的句柄，即之前通过`GetMenu`或其他方式获得的菜单句柄。
- `nPos`: 一个整数，表示要获取的子菜单在其父菜单中的位置索引，其中0通常是第一个子菜单（顶级菜单项）。

 **返回值**

成功时，返回指定位置的子菜单句柄(`HMENU`)。如果索引无效或没有子菜单，则返回NULL。

 ③ `TrackPopupMenu`函数

> 用于在一个指定的位置显示一个弹出式菜单，并跟踪用户的选择。

**函数原型:**

```java
BOOL TrackPopupMenu(
  HMENU hMenu,
  UINT uFlags,
  int x,
  int y,
  int nReserved,
  HWND hWnd,
  CONST RECT* prcRect
);
```

**参数说明：**

- `hMenu`: 要显示的弹出菜单的句柄。
- `uFlags`: 控制菜单显示方式的标志，如`TPM_LEFTALIGN`、`TPM_RIGHTBUTTON`等。
- `x`, `y`: 菜单左上角的屏幕坐标，相对于屏幕原点或指定窗口客户区。
- `nReserved`: 在旧版本中保留，应设为0。
- `hWnd`: 与菜单显示相关的窗口句柄，用于消息处理。
- `prcRect`（旧版）/`lptpm`（新版，包含`x`, `y`, `flags`, `rect`等更详细信息的结构体）: 用于指定额外的显示参数或限制区域。

**返回值：**

如果用户选择了菜单项并成功处理，返回非零值；否则，返回0。通常需要检查`GetLastError`来确定失败原因。

 ④ `GetSystemMetrics`函数

> 用于获取有关当前系统的各种度量信息和配置设置。这些信息涵盖了显示器分辨率、颜色深度、鼠标和键盘状态、操作系统版本特性等多个方面。

 **函数原型:**

```java
int GetSystemMetrics(int nIndex);
```

**参数说明：**

`nIndex`: 一个整型参数，作为索引值，指定了想要获取的系统度量信息类型。不同的索引值对应不同的系统配置或状态信息。

**返回值：**

函数根据`nIndex`所指定的索引值，返回相应的系统度量信息值。返回值类型通常是整数。

⑤ `LoadImageA`函数

> 用于加载光标、图标、位图或图元文件资源。

**函数原型：**

```java
HANDLE LoadImageA(
  HINSTANCE hinst,
  LPCSTR lpszName,
  UINT uType,
  int cxDesired,
  int cyDesired,
  UINT fuLoad
);
```

**参数说明：**

- `hinst`: 一个模块实例句柄，通常为NULL以加载系统资源，或指定的DLL句柄来加载该DLL中的资源。
- `lpszName`: 指向资源名称（文件名或资源ID，如图标ID）的指针，可以是字符串或整数资源ID（需要转换为LPCTSTR）。
- `uType`: 指定要加载的图像类型，可以是`IMAGE_BITMAP`, `IMAGE_ICON`, `IMAGE_CURSOR`, 或 `IMAGE_ENHMETAFILE`。
- `cxDesired`, `cyDesired`: 指定希望加载图像的宽度和高度（以像素为单位）。如果为0，则使用图像的实际大小。
- `fuLoad`: 加载标志，如`LR_CREATEDIBSECTION`, `LR_LOADFROMFILE`, `LR_DEFAULTSIZE`等，用于控制加载行为。

**返回值：**

成功时返回图像句柄（`HBITMAP`, `HCURSOR`, `HICON`, 或 `HENHMETAFILE`），失败则返回NULL。

⑥ `SetMenuItemBitmaps`函数

> 用于设置菜单项的位图图像的API，可以为菜单项的正常状态和选中（或按下）状态指定不同的位图

**函数原型：**

```java
BOOL SetMenuItemBitmaps(
  HMENU hMenu,
  UINT uPosition,
  UINT uFlags,
  HBITMAP hBitmapUnchecked,
  HBITMAP hBitmapChecked
);
```

**参数说明：**

- `hMenu`: 要修改的菜单的句柄。
- `uPosition`: 要设置位图的菜单项的位置索引，从0开始计数。
- `uFlags`: 指定要设置哪一组位图的标志，可以是`MF_BYCOMMAND`（基于菜单项的ID查找）或`MF_BYPOSITION`（直接使用位置索引）。
- `hBitmapUnchecked`: 未选中状态下菜单项的位图句柄。
- `hBitmapChecked`: 选中或按下状态下菜单项的位图句柄。

**返回值：**

函数执行成功返回非零值，失败返回0。可以通过`GetLastError`获取详细的错误信息

### 三、创建程序基本框架

① 新建`examplework`工作区

② 新建`exampleapp`应用

③ 新建`w_main`窗口，将其`Title`设置为"右键菜单"

由于文章篇幅原因，以上步骤不再赘述，如果忘记了的小伙伴可以翻一翻该系列第一篇文章复习一下

④ 新建`w_popmenu`窗口

⑤ 在`w_mian`窗口中布局控件

新建一个`MultiLineEdit`控件和一个`CommandButton`控件，名称分别为`mle_1`和`cb_1`,调整控件布局，

并将`cb_1`的`Text`设置为"关闭"

![控件布局](https://i-blog.csdnimg.cn/blog_migrate/d87dc93a8e016d13c39d5acf995f92d8.png)

⑥ 设置`w_popmenu`窗口属性

将`w_popmenu`窗口缩小成一个小方块，并在`MenuName`属性栏中添加菜单`m_popmenu`

⑦ 保存`w_popmenu`窗口

![w_popmenu窗口](https://i-blog.csdnimg.cn/blog_migrate/c3c38585b70d6e5abbbe01d5f70c3028.png)

⑧ 新建`m_popmenu`菜单如下图所示

![新建菜单](https://i-blog.csdnimg.cn/blog_migrate/35f90cedad1f4b6074222701e6a42f44.png)

### 四、编写代码

① 在`w_main`窗口中定义实例变量，代码如下

```java
ulong il_popmenu_window_hwnd
```

② 在`w_main`窗口中定义外部函数

```java
FUNCTION ulong GetMenu(ulong hwnd) LIBRARY "user32.dll"

FUNCTION ulong GetSubMenu(ulong hMenu,ulong nPos) LIBRARY "user32.dll"

FUNCTION ulong TrackPopupMenu(ulong hMenu,ulong wFlags,ulong x,ulong y,ulong nReserved,ulong hwnd,ref Rect lprc) LIBRARY "user32.dll"
```

③ 在`w_main`窗口的`Open`中添加如下代码

```java
open(w_popmenu)

il_popmenu_window_hwnd = handle(w_popmenu)
```

④ 在`w_main`窗口的`close`事件中添加如下代码

```java
close(w_popmenu)
```

⑤ 在`mle_1`控件的`rbuttondown`事件中输入如下代码

```java
ulong hmenu,hsubmenu,hwnd
integer li_x,li_y

RECT l_rect
l_rect.left = 0
l_rect.top = 0
l_rect.right = 0
l_rect.bottom = 0

hmenu = getmenu(il_popmenu_window_hwnd)
hsubmenu = getsubmenu(hmenu, 0)

li_x = (xpos + parent.x) / 5
li_y = (ypos + parent.y) / 5

TrackPopupMenu(hsubMenu, 2, li_x, li_y, 0, il_popmenu_window_hwnd, l_rect)
```

⑥ 在`cb_1`按钮的`clicked`中添加如下代码

```java
close(parent)

return 0
```

⑦ 在`w_popmenu`窗口中定义实例变量

```java
//Win32
CONSTANT Integer IMAGE_BITMAP	   = 0
CONSTANT Integer LR_LOADFROMFILE = 16
CONSTANT Integer SM_CXMENUCHECK  = 71
CONSTANT Integer SM_CYMENUCHECK	= 72
CONSTANT Integer MF_BITMAP			= 4
CONSTANT Integer MF_BYPOSITION	= 1024

```

⑧ 在`w_popmenu`窗口中定义外部函数

```java
FUNCTION ulong LoadImageA(ulong hintance, string filename,uint utype,int x,int y,uint fload)  LIBRARY "USER32.DLL"

FUNCTION boolean SetMenuItemBitmaps(ulong hmenu,uint upos,uint flags,ulong handle_bm1,ulong handle_bm2)  LIBRARY "USER32.DLL"

FUNCTION int GetSystemMetrics(  int nIndex ) LIBRARY "USER32.DLL"

FUNCTION int GetSubMenu(ulong hMenu,int pos) LIBRARY "USER32.DLL"

FUNCTION ulong GetMenu(ulong hWindow) LIBRARY "USER32.DLL"

```

⑨ 在`w_popmenu`窗口的`open`事件中添加如下代码并准备图片

![准备图片](https://i-blog.csdnimg.cn/blog_migrate/cb7935cb0f2a4c32f958ae839ae232e4.png)

**注：**图片资源会一起推送到gitee仓库，需要图片资源的小伙伴克隆仓库即可获取

```java
long		ll_MainHandle
long		ll_SubMenuHandle
long		ll_X
long		ll_Y
long		ll_Bitmapcut
long		ll_Bitmapcopy
long		ll_Bitmappaste
long		ll_Bitmapitl
long 		ll_bitmapcnt
long		ll_bitmapunderline

this.visible = false


ll_MainHandle = GetMenu(Handle(this))


ll_SubMenuHandle = GetSubMenu(ll_MainHandle,0)


ll_x = GetSystemMetrics(SM_CXMENUCHECK) 
ll_y = GetSystemMetrics(SM_CYMENUCHECK) 


ll_Bitmapcut = LoadImageA(0,'cut.bmp',  IMAGE_BITMAP ,ll_x,ll_y,LR_LOADFROMFILE)
ll_Bitmapcopy = LoadImageA(0,'copy.bmp',  IMAGE_BITMAP ,ll_x,ll_y,LR_LOADFROMFILE)
ll_Bitmappaste = LoadImageA(0,'paste.bmp',  IMAGE_BITMAP ,ll_x,ll_y,LR_LOADFROMFILE)
ll_Bitmapitl = LoadImageA(0,'itl.bmp',  IMAGE_BITMAP ,ll_x,ll_y,LR_LOADFROMFILE)
ll_Bitmapcnt = LoadImageA(0,'big.bmp',  IMAGE_BITMAP ,ll_x,ll_y,LR_LOADFROMFILE)
ll_bitmapunderline = LoadImageA(0,'ul.bmp',  IMAGE_BITMAP ,ll_x,ll_y,LR_LOADFROMFILE)

SetMenuItemBitmaps(ll_SubMenuHandle,0,MF_BYPOSITION,ll_Bitmapcut,ll_Bitmapcut)
SetMenuItemBitmaps(ll_SubMenuHandle,1,MF_BYPOSITION,ll_Bitmapcopy,ll_Bitmapcopy)
SetMenuItemBitmaps(ll_SubMenuHandle,2,MF_BYPOSITION,ll_Bitmappaste,ll_Bitmappaste)
SetMenuItemBitmaps(ll_SubMenuHandle,4,MF_BYPOSITION,ll_Bitmapitl,ll_Bitmapitl)
SetMenuItemBitmaps(ll_SubMenuHandle,5,MF_BYPOSITION,ll_Bitmapcnt,ll_Bitmapcnt)
SetMenuItemBitmaps(ll_SubMenuHandle,6,MF_BYPOSITION,ll_Bitmapunderline,ll_Bitmapunderline)
```

⑩ 在开发界面左边的`SystemTree`窗口中双击`exampleapp`应用对象，并在其`open`事件中添加如下代码

```java
open(w_main)
```

### 五、运行程序

经过一波代码编写之后，我们来验证下结果

![右键菜单](https://i-blog.csdnimg.cn/blog_migrate/4117e1abddd4980f34148a78c42eeaf5.gif)



本期内容到这儿就结束了*★,°*:.☆(￣▽￣)/$:*.°★* 。 希望对您有所帮助

我们下期再见 ヾ(•ω•`)o (●'◡'●)