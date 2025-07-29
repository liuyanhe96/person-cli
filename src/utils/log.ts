
// 功能特点: 提供不同日志级别的彩色符号，包括info、success、warning、error四种状态
// 版本限制: 从v5.0.0开始只支持ESM模块
// 推荐版本: 需要安装v4.1.0版本
import logSymbols from 'log-symbols';

export const log = {
    success: (msg: string) => console.log(`${logSymbols.success} - ${msg}`),
    info: (msg: string) => console.log(`${logSymbols.info} - ${msg}`),
    warning: (msg: string) => console.log(`${logSymbols.warning} - ${msg}`),
    error: (msg: string) => console.log(`${logSymbols.error} - ${msg}`)
}

export default log;
