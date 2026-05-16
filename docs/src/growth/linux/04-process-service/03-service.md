---
title: 系统服务管理
icon: server
---

## 系统服务管理

> 使用 systemd 管理服务的启动、停止和开机自启。

### 常用命令

| 命令 | 说明 |
|------|------|
| `systemctl start nginx` | 启动服务 |
| `systemctl stop nginx` | 停止服务 |
| `systemctl restart nginx` | 重启服务 |
| `systemctl enable nginx` | 开机自启 |
| `systemctl status nginx` | 查看状态 |

### 常见场景

- 改了 Nginx 配置 → `systemctl restart nginx`
- 服务器重启后 MySQL 没起来 → `systemctl enable mysql`

> 敬请期待...
