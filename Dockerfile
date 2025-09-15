# 阶段 1: 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
# 首先复制依赖定义文件并安装依赖
# 利用 Docker 缓存层，只有当 package.json 或 lock 文件变化时才重新运行 npm ci
COPY package*.json ./
RUN npm ci
# 复制源代码并构建
COPY . .
RUN npm run build

# 阶段 2: 运行阶段
FROM nginx:alpine
# 将构建产物从 builder 阶段复制到 Nginx 的默认静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 将构建产物从 builder 阶段复制到 Nginx 的默认静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 使用 Nginx 运行（基础镜像的默认命令，通常可省略）
CMD ["nginx", "-g", "daemon off;"]