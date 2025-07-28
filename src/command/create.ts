import { input, select } from '@inquirer/prompts';
import { clone } from '../utils/clone';
import * as path from 'path';
import fs from 'fs-extra';

// 然后我们就需要让用户选择我们的预设模板，在src/command/create.ts中添加模板信息，定义成map的形式是方便我们根据key获取项目的信息。
// 下载模板的方式有很多种，可以将模板文件保存在 SDK 中，使用 cjs 或者其他方法动态选择生成，使用 fs 模块写入，或者存放在 git 仓库中进行 clone，我们这里把代码放到gitee中的代码仓库中
// 这里我定义了 TemplateInfo 类型，可以根据自己的需求自行定义，需要存储项目名称，下载地址，描述，代码分支。
// 定义 那些项目/依赖需要从远端拉下 的目录
export interface TemplateInfo {
    name: string; // 项目名称
    downloadUrl: string; // 下载地址
    description: string; // 项目描述
    branch: string; // 项目分支
}

// 这里保存了我写好了咱们的之前开发的模板
export const templates: Map<string, TemplateInfo> = new Map(
    [
        ["Vite4-Vue3-Typescript-template", {
            name: "admin-template",
            downloadUrl: 'https://gitee.com/sohucw/admin-pro.git',
            description: 'Vue3技术栈开发模板',
            branch: 'dev6'
        }],
        ["Vite4-temp", {
            name: "admin-template",
            downloadUrl: 'https://gitee.com/sohucw/admin-pro.git',
            description: 'Vue3技术栈开发模板',
            branch: 'dev10'
        }]
    ]
)

export const isOverWrite =  (projectName: string) => {
    console.warn(`目标目录${projectName}已存在`)
    return  select({
        message: '项目已存在，是否覆盖？',
        choices: [
            {
                name: '覆盖',
                value: true
            },
            {
                name: '取消',
                value: false
            }
        ]
    })
}

export async function create(projectName: string) {
    // 初始化模版列表
    const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
        const [name, info] = item
        return {
            name,
            value: name,
            description: info.description
        }
    })

    // 输入处理：
    // input()方法显示"请输入项目名称"提示
    // 返回值赋给projectName变量
    // 模板选择：
    // select()显示"请选择模板"提示
    // choices参数传入转换后的templateList
    if(!projectName) {
        // 使用@inquirer/prompts库实现终端交互
        projectName = await input({
            message: '请输入项目名称',
        })
    }

    // 如果文件夹存在，提示是否覆盖
    const filePath = path.resolve(process.cwd(), projectName)
    if (fs.existsSync(filePath)) { // 判断目标文件夹是否已存在
        const run = await isOverWrite(projectName)
        if (run) {
            await fs.remove(filePath)
        } else {
            return; // 不覆盖直接返回
        }

    }

    const templateName = await select({
        message: '请选择模板',
        choices: templateList
    })

    // 映射查询：
    // 通过templates.get(templateName)获取完整模板信息
    // 可以打印info对象进行调试
    // 执行验证：
    // 使用npm rebuild重新构建
    // 通过node ./dist create测试功能
    const templateInfo = templates.get(templateName)
    console.log(templateInfo)

    templateInfo && clone(templateInfo.downloadUrl, projectName, ['-b', templateInfo.branch])

    console.log('项目名称： ', projectName);

}
