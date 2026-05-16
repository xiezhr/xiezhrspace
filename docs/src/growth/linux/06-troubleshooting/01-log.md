---
title: 日志查看技巧
icon: file-lines
---

## 日志查看技巧

> 从日志中快速定位问题。

### 常用命令

| 命令 | 说明 |
|------|------|
| `tail -f app.log` | 实时追踪日志 |
| `grep "ERROR" app.log` | 过滤错误 |
| `grep -C 5 "异常" app.log` | 显示前后 5 行上下文 |

### 实用组合

```bash
# 实时查看错误
tail -f app.log | grep ERROR

# 查看某段时间的日志
sed -n '/2024-01-01 10:00/,/2024-01-01 11:00/p' app.log
```

> 敬请期待...
