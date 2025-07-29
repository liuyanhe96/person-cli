import chalk from 'chalk';
import ora from 'ora';
import process from 'child_process'; // 子进程

// ora库作用：提供控制台loading动画效果
// 动画配置：通过text属性设置提示文本（如"yanhe-cli正在更新"）
// 颜色设置：可修改spinner颜色为蓝色，保持与项目风格一致
const spinner = ora({
    text: chalk.blue('yanhe-cli正在更新......'),
    spinner: {
        interval: 100, // 变换时间 ms
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=> chalk.blue(item)) // 设置加载动画 chalk库添加颜色
    }
});

export const update = () => {
    spinner.start(); // 启动loading动画

    process.exec('npm install yanhe-cli@latest -g', (err, stdout, stderr) => {
        spinner.stop(); // 停止loading动画
        if (!err) {
            console.log(chalk.green('yanhe-cli更新成功!'))
        } else {
            console.log(chalk.red('yanhe-cli更新失败!'))
        }
    })
}
