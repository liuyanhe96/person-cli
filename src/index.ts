
// export function add (a: number, b: number) {
//     return a + b
// }

import { Command } from 'commander'; // 解决warning： tsconfig.json 中 打开设置 "moduleResolution": "node"
import { version } from '../package.json'; // 解决warning： tsconfig.json 中 打开设置 是否可以直接引入json "resolveJsonModule": true,
import { create } from './command/create';
import { update } from './command/update';

// 这里我们用 lyh 当作我的指令名称
// 命令行中使用 lyh xxx 即可触发
const program = new Command('yanhe');
// .version 表示可以使用 -v --version 参数查看当前SDK版本
// 我们直接使用 package.json 中的 version 即可
// 调用 version 的参数可以自定义
// .version(version, '-v --version')
program.version(version, '-v, --version');


program
    .command('update')
    .description('更新 yanhe 至最新版本')
    .action(async () => {
        console.log('update command')
        await update()
    });


// command 为我们需要的命令名称。
// description 为命令添加描述。
// action 为指令触发执行的回调 dirName当前目录。
// argument 为我们命令需要的参数，[]包裹代表可选，<>包裹代表必填。
program.command('create').description('创建项目').argument('[name]', '项目名称').action(async (dirName) => {
    // if(dirName) console.log(`create ${dirName}`)
    // else console.log(`create command`)
    create(dirName)
})

// parse 会解析 process.argv 中的内容
// 也就是我们输入的指令
program.parse();

// build后执行
// (base) ➜  auto-cli git:(master) ✗ node ./dist/index.js lyh -v
// 1.0.0
