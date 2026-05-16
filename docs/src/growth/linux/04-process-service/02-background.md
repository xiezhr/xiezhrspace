---
title: 后台运行程序
icon: window-maximize
---

## 后台运行程序

> 关闭终端后程序继续运行。

### 常用方式

| 方式 | 说明 |
|------|------|
| `nohup 命令 &` | 最常用，输出到 nohup.out |
| `Ctrl+Z` + `bg` | 将前台任务放到后台 |

### 示例

```bash
nohup java -jar app.jar &
```

> 敬请期待...
