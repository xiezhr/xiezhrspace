---
title: Docker 入门
icon: docker
---

## Docker 入门

> 一键部署应用环境，告别"在我机器上能跑"。

### 核心概念

| 概念 | 说明 |
|------|------|
| 镜像 (Image) | 打包好的应用环境 |
| 容器 (Container) | 运行中的实例 |
| 仓库 (Registry) | 存储镜像的地方，如 Docker Hub |

### 常用命令

```bash
docker pull nginx
docker run -d -p 80:80 nginx
docker ps
docker stop 容器ID
```

> 敬请期待...
