---
title: MySQL 与 Redis 安装
icon: database
---

## MySQL 与 Redis 安装

> 快速安装数据库和缓存服务。

### MySQL

```bash
yum install mysql-server
systemctl start mysqld
```

### Redis

```bash
yum install redis
systemctl start redis
```

### 常见问题

- 远程连接失败 → 检查防火墙 + bind 配置
- 密码忘了 → 跳过权限重置

> 敬请期待...
