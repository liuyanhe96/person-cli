// 需要在第一行加入#!/usr/bin/env node，/usr/bin/env就是告诉系统可以在PATH目录中查找，
// #!/usr/bin/env node就是解决了不同的用户node路径不同的问题，可以让系统动态的去查找node来执行你的脚本文件。
#!/usr/bin/env node
require('../dist'); // 执行我们打包好的 dist/index.js 文件
