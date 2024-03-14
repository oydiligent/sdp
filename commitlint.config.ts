// TODO
// git commit -m 'feat(xxx模块): 增加 xxx 功能'
// git commit -m 'fix(xxx模块/xxx文件): 修复 xxx 功能'

module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"bug", // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
				"feat", // 新功能（feature）
				"fix", // 修补bug
				"docs", // 文档（documentation）
				"style", // 格式（不影响代码运行的变动）
				"refactor", // 重构（即不是新增功能，也不是修改bug的代码变动）
				"test", // 增加测试
				"chore", // 构建过程或辅助工具的变动
				"build", // 改变了build工具 如 grunt换成了 npm'
				"revert", // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
				"merge", // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
			],
		],
	},
};
