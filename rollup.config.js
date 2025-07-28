
import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve'; // nodeResolve(): 处理Node.js模块
import commonjs from '@rollup/plugin-commonjs'; // commonjs(): 转换CommonJS模块
import externals from "rollup-plugin-node-externals"; // externals(): 排除外部依赖
import json from "@rollup/plugin-json";  // json(): 处理JSON文件
import terser from "@rollup/plugin-terser"; // terser(): 代码压缩
import typescript from 'rollup-plugin-typescript2'; // typescript(): 处理TypeScript文件

export default defineConfig([
    {
        input: {
            index: 'src/index.ts', // 打包入口文件
        },
        output: [
            {
                dir: 'dist', // 输出目标文件夹
                format: 'cjs', // 输出 commonjs 文件
            }
        ],
        plugins: [
            nodeResolve(),
            externals({
                devDeps: false, // 可以识别我们 package.json 中的依赖当作外部依赖处理 不会直接将其中引用的方法打包出来
            }),
            typescript(),
            json(),
            commonjs(),
            terser(),
        ],
    },
]);
