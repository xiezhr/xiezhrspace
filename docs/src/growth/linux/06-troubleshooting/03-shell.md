---
title: Shell 脚本入门
icon: terminal
---

## Shell 脚本入门

> 用脚本自动化日常操作。

### 第一个脚本

```bash
#!/bin/bash
echo "Hello Linux"
```

### 实用场景

| 场景 | 示例 |
|------|------|
| 自动部署 | 拉代码 → 编译 → 重启服务 |
| 批量操作 | 批量修改文件名 |
| 定时备份 | 打包日志、备份数据库 |

### 常用语法

```bash
# 变量
NAME="world"
echo "Hello $NAME"

# 条件
if [ -f "app.jar" ]; then
    echo "文件存在"
fi

# 循环
for f in *.log; do
    echo $f
done
```

> 敬请期待...
