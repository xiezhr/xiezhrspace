---
title: Nginx 基础配置
icon: globe
---

## Nginx 基础配置

> 反向代理、静态资源、解决跨域。

### 安装

```bash
yum install nginx
systemctl start nginx
```

### 常用配置

| 场景 | 配置 |
|------|------|
| 反向代理 | `proxy_pass http://localhost:8080` |
| 静态资源 | `root /var/www/html` |
| 跨域 | 添加 Access-Control-Allow-Origin |

> 敬请期待...
