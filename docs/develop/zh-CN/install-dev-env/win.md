# 在 Window 系统中采用 WSL 进行项目开发

## 环境要求

- 操作系统 Window 10 19H1 或更高版本

### 开启 Window 中的 liunx 子系统功能

1. 在控制面板-> 程序和功能中开启-子系统功能

![image](https://user-images.githubusercontent.com/24241052/60166687-349df800-9834-11e9-86f9-d33ddc976505.png)

2. 在 Window 商城中下载对应的 liunx 镜像 - (我这边直接使用的 Debian 进行开发)

![image](https://user-images.githubusercontent.com/24241052/60166884-8777af80-9834-11e9-8139-87b79abcb6ca.png)

### 安装环境

git 安装命令

```
sudo apt-get install git
```

nodejs 安装

```
# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs
```

- https://github.com/nodesource/distributions/blob/master/README.md

### 下载源码&运行

> 以上默认已经安装好运行环境

```sh
# /mnt/d/ 表示是window下的d盘

cd  /mnt/d/dev/code/github
git clone https://github.com/ascoders/gaea-editor.git
cd gaea-editor
npm install # 等待下载完成
npm run docs  # window浏览器会自动打开http://127.0.0.1:8000/地址提供预览
```

> 用 vscode 或者其他编辑器打开 d 盘的 gaea-editor 目录下的文件进行编辑保存即可
