import simpleGit, { SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from 'chalk';
import log from './log';

const figlet = require('figlet'); // 在控制台打印ASCII艺术字

// 定义克隆方法
// 方法参数:
// url: Git仓库地址
// projectName: 项目名称
// options: 选项数组(如分支参数)
// 核心功能:
// 使用simpleGit()初始化Git实例
// 调用clone()方法拉取代码

// 配置项说明
// 关键配置:
// baseDir: 当前工作目录
// binary: 指定git二进制路径
// maxConcurrentProcesses: 最大并发进程数(默认6)
const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(), // 根目录
    binary: 'git',
    maxConcurrentProcesses: 6, // 最大并发进程数
};

// interval: 动画间隔时间(默认100ms)
// frames: 动画帧序列(使用chalk添加颜色)
// estimate: 预估下载时间(毫秒)
const logger = createLogger({ // 初始化进度条
    spinner: {
        interval: 100, // 变换时间 ms
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=> chalk.blue(item)) // 设置加载动画 chalk库添加颜色
    }
})

const goodPrinter = async (msg?: string) => {
    const data = await figlet(msg || 'yanhe-cli')
    console.log(chalk.rgb(40, 156, 193).visible(data))
}

export const clone = async (url: string, projectName: string, options: string[]): Promise<any>  => {
    const git = simpleGit(gitOptions)

    // 开始下载 拉取
    try {
        // 使用progress-estimator库 预估并显示git clone的进度 通过spinner显示动态效果
        await logger(git.clone(url, projectName, options), '代码拉取中...', {
            estimate: 7000, // 预估时间
        })
        console.log() // 相当于换行空格
        console.log(chalk.green('代码拉取完成!'))
        console.log(chalk.blueBright('============================================================'))
        console.log(chalk.blueBright('=======================欢迎使用 auto-cli====================='))
        console.log(chalk.blueBright('============================================================'))
        console.log()

        goodPrinter()

        log.success(`项目创建成功 ${chalk.blueBright(projectName)}`);
        log.success(`执行以下命令启动项目: `);
        log.info(`cd ${chalk.blueBright(projectName)}`);
        log.info(`${chalk.yellow('pnpm')} install`);
        log.info(`${chalk.yellow('pnpm')} run dev`);

    } catch (error) {
        log.error(chalk.red('代码拉取失败'))
    }
}

// Partial类型转换
// 类型作用:
// 将类型T的所有属性变为可选
// 示例：Partial<User>使User接口所有属性可选
// 使用场景:
// 当不需要传递全部配置项时使用
// 避免因缺少非必填属性导致的类型错误


// 版本管理与发布
//
// 版本号组成:
//     主版本号(第一个数字): 重大变更，API不兼容
// 次版本号(中间数字): 新增功能，向下兼容
// 修订号(最后数字): bug修复，小改动
// 版本更新命令:
// npm version patch: 修订号+1(如0.0.1→0.0.2)
// npm version minor: 次版本号+1(如0.0.1→0.1.0)
// npm version major: 主版本号+1(如0.0.1→1.0.0)
// 发布流程:
//     更新版本号
// 执行npm publish重新发布
// 卸载旧版本npm uninstall -g dawei-cli
// 重新安装新版本npm install -g dawei-cli

