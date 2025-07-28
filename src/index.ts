
// export function add (a: number, b: number) {
//     return a + b
// }

import { Command } from 'commander'; // 解决warning： tsconfig.json 中 打开设置 "moduleResolution": "node"
import { version } from '../package.json'; // 解决warning： tsconfig.json 中 打开设置 是否可以直接引入json "resolveJsonModule": true,

// 这里我们用 lyh 当作我的指令名称
// 命令行中使用 lyh xxx 即可触发
const program = new Command('lyh');
// .version 表示可以使用 -v --version 参数查看当前SDK版本
// 我们直接使用 package.json 中的 version 即可
// 调用 version 的参数可以自定义
// .version(version, '-v --version')
program.version(version, '-v, --version');

// parse 会解析 process.argv 中的内容
// 也就是我们输入的指令
program.parse();

// build后执行
// (base) ➜  auto-cli git:(master) ✗ node ./dist/index.js lyh -v
// 1.0.0
