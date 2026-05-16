---
title: JDK 环境配置
icon: java
---

## JDK 环境配置

> 在 Linux 上安装和配置 Java 开发环境。

### 安装方式

| 方式 | 命令 |
|------|------|
| yum 安装 | `yum install java-11-openjdk` |
| 手动解压 | 下载 tar.gz 解压到 /usr/local |

### 配置环境变量

```bash
export JAVA_HOME=/usr/local/jdk
export PATH=$JAVA_HOME/bin:$PATH
```

> 敬请期待...
