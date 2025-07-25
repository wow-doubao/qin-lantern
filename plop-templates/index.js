/** @param {import('plop').NodePlopAPI} plop */
export default function (plop) {
  plop.setGenerator('component', {
    description: '组件模板生成器',
    prompts: [{
      type: 'input',
      name: 'name',
      message: '请输入组件名'
    }],
    actions: [
      {
        type: 'addMany',
        destination: '../packages/components/{{camelCase name}}',
        templateFiles: './component'
      },
      // 修改../packages/index.ts文件
      {
        type: 'modify',
        path: '../packages/index.ts',
        pattern: /^\s*\/\/ \$addComponent/m, // $addComponent组件文件导入
        template: 'import { Ql{{pascalCase name}} } from \'./components/{{camelCase name}}\'\n// $addComponent'
      },
      {
        type: 'modify',
        path: '../packages/index.ts',
        pattern: /^\s*\/\/ \$addAllComponent/m, // $addAllComponent组件文件导出
        template: 'export * from \'./components/{{camelCase name}}\'\n// $addAllComponent'
      },
      {
        type: 'modify',
        path: '../packages/index.ts',
        pattern: /^\s*\/\/ \$useComponent/m, // $useComponent组件使用
        template: '    app.use(Ql{{pascalCase name}})\n    // $useComponent'
      }
    ]
  })
}
