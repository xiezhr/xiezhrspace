---
date: 2024-06-14
title: 21大小写金额转换
icon: note
---
### 写在前面  

这是PB案例学习笔记系列文章的第21篇，该系列文章适合具有一定PB基础的读者。

通过一个个由浅入深的编程实战案例学习，提高编程技巧，以保证小伙伴们能应付公司的各种开发需求。

文章中设计到的源码，小凡都上传到了gitee代码仓库[https://gitee.com/xiezhr/pb-project-example.git](https://gitee.com/xiezhr/pb-project-example.git)

![gitee代码仓库](https://i-blog.csdnimg.cn/blog_migrate/714451058fdd16d09c265e0d5028b448.png)



需要源代码的小伙伴们可以自行下载查看，后续文章涉及到的案例代码也都会提交到这个仓库【**[pb-project-example](https://gitee.com/xiezhr/pb-project-example)**】

如果对小伙伴有所帮助，希望能给一个小星星⭐支持一下小凡。

### 一、小目标

在日常开发中，我们经常会需要将小写的金额转换成大写的金额显示。比如说在做收费系统时，完成一笔费用结算，往往需要在

发票上显示费用大写金额。最终实现效果如下

![小大写金额转换](https://i-blog.csdnimg.cn/blog_migrate/333f4fea07a589c44daf9bb302ac7608.gif)

在本案例中，小大写转换属于通用功能，所以我们需要学会全局函数的封装

### 二、全局函数简介

自定义全局函数不封装在其他对象内，而是作为独立的对象存储。自定义全局函数常用于处理一些通用功能，例如数字计算、字符串处理等等通用功能。通过自定义全局函数，有利于在程序的各个地方很方便的调用。同时也方便将函数移植到其他程序



### 三、创建程序基本框架

① 新建`examplework` 工作区

② 新建`exampleapp`应用

③ 新建`w_main`窗口，并将其`Title`设置为"自定义函数之小大写金额转换"

④ 控件布局

在窗口`w_main`上添加1个`EditMask`控件，1个`SingleLineEdit` 控件和一个`CommandButton`控件

依次命名为`em_1`、`sle_1`、`cb_1`,布局如下

- ` em_1`: 用于输入小写金额
- `sle_1`:用于显示大写金额
- `cb_1`: 转换功能按钮，小大写转换功能写在此按钮事件中

![image-20240612222757816](https://i-blog.csdnimg.cn/blog_migrate/4df71b50e459bf6ed2ecd1d05844c65d.png)

### 四、建立自定义全局函数

① 建立函数对象

在菜单栏中单击`File-->New` 命令，然后在`PB Object`选项卡中选择`Function`图标，然后单击【ok】按钮，然后进入函数定义面板

![函数对象选择](https://i-blog.csdnimg.cn/blog_migrate/d2ce752d5e3bdd755f6cde9c5272322f.png)

![创建函数](https://i-blog.csdnimg.cn/blog_migrate/ff639cf6af692137194dad54c8a0e0c1.png)



② 编写函数代码

```java
 
string dx_sz,dx_dw,str_int,str_dec,dx_str,fu,a,b,b2,c,d,result
long num_int,num_dec,len_int,i,a_int,pp

dx_sz = "零壹贰叁肆伍陆柒捌玖" 
dx_dw = "万仟佰拾亿仟佰拾万仟佰拾元" 

  //处理小于零情况
if xjje<0 then
   xjje = xjje*(-1) 
   fu = "负" 
else 
	fu = "" 
end if 

  //取得整数及整数串
dx_str = string(xjje)
if (xjje>0) and (xjje<1) then dx_str = "0"+dx_str 
pp = pos(dx_str,".") 
if pp>0 then 
	 str_int = mid(dx_str,1,pos(dx_str,".")-1)
else
	str_int = dx_str 
end if 
num_int = long(str_int) 

  //取得小数及小数串
if (xjje>0) and (xjje<1) then 
	num_dec = xjje * 100
else
	num_dec = (xjje - num_int) * 100 
end if 
str_dec = string(num_dec) 
len_int = len(str_int) 
dx_str = "" 

  //转换整整部分
for i = 1 to len_int 
    //a为小写数字字符，b为对应的大写字符，c为对应大写单位，d为当前大写字符串的最后一个汉字
   a= mid(str_int,i,1) 
   a_int = long(a) 
   b = mid(dx_sz,(a_int*2)+1,2) 
   c = mid(dx_dw,((13 - len_int +i - 1)*2+1),2) 
   if dx_str<>"" then
      d=mid(dx_str,len(dx_str)-1,2)
   else
		d= "" 
	end if 
	
   if (b="零") and ((d="零") or (b=b2) or (c="元") or (c="万") or (c="亿")) then  b = "" 
   if (a="0") and (c<>"元") and (c<>"万") and (c<>"亿") then c="" 
   if ((c="元") or (c="万") or (c="亿")) and (d="零") and (a="0") then
      dx_str = mid(dx_str,1,len(dx_str)-2) 
      d=mid(dx_str,len(dx_str)-1,2) 
      if ((c="元") and (d="万")) or ((c="万") and (d="亿")) then c = "" 
    end if 
    dx_str = dx_str + b+ c 
    b2 = b 
next

  //处理金额小于1的情况
  if len(dx_str) <= 2 then dx_str= "" 
  //转换小数部分
  if (num_dec<10) and (xjje>0) then
    a_int = long(str_dec) 
    b = mid(dx_sz,(a_int*2+1),2) 
    if num_dec = 0 then dx_str = dx_str + "整" 
    if num_dec > 0 then dx_str = dx_str +"零"+b+"分" 
  end if
  
  if num_dec >= 10 then
    a_int = long(mid(str_dec,1,1)) 
    a = mid(dx_sz,(a_int*2+1),2) 
    a_int = long(mid(str_dec,2,1)) 
    b = mid(dx_sz,(a_int*2+1),2) 
    if a<>"零" then a = a+"角" 
    if b <> "零" then
		b = b+"分"
    else 
		b= "" 
    end if
    dx_str = dx_str + a + b 
  end if
  if xjje= 0 then dx_str = "零元整" 
  dx_str = fu+dx_str 
  
  result = dx_str 

return result
```

③ 保存函数

### 五、编写程序代码

① 给按钮`cb_1`的`Clicked`事件添加如下代码

```java
dec ld_xjje

ld_xjje = dec(em_1.text)

sle_1.text = gf_lowercase_trans(ld_xjje)
```

② 双击代码编辑框左边的`System Tree`中的`exampleapp`应用，在其`Open`事件中添加如下代码

```java
open(w_main)
```

### 六、运行程序

经过一波代码输出后，来检验下成果。

![小大写金额转换](https://i-blog.csdnimg.cn/blog_migrate/333f4fea07a589c44daf9bb302ac7608.gif)

本期内容到这儿就结束了，*★,°*:.☆(￣▽￣)/$:*.°★* 。  希望对您有所帮助

我们下期再见 ヾ(•ω•`)o (●'◡'●)