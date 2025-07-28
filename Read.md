> 1. 手把手搭建集成的脚手架配置
>> 1.1. 初始化项目
> - 创建目录: 使用命令mkdir auto-cli创建项目目录
> - 初始化npm: 进入目录后执行npm init -y快速初始化项目
> - TS初始化: 执行npx tsc --init创建TypeScript配置文件

>> 2. 项目文件结构创建
> - 核心目录:
   > - src/: 存放项目源代码
   >- src/index.ts: 项目入口文件
   > - src/command/: 存放命令逻辑
   > - src/utils/: 存放公共方法

>> 3. 构建工具选择:
> - 使用Rollup而非Webpack，更适合npm包打包
    > - 核心依赖:
  > - @rollup/plugin-node-resolve: 支持Node.js模块打包
> - @rollup/plugin-commonjs: 支持CommonJS模块打包
> - rollup-plugin-typescript2: 支持TypeScript打包
 > -  @rollup/plugin-terser: 代码压缩
