ǰ�ԣ�
1.Ϊ�˷������أ���ɾ��node_modules����ȡ�������Ҫ��npm install
2.��Ŀ�������ӣ����Ǽ�ʳ��

���ü���װ��ʽ��
1.� react �� npx create-react-app my-app ��my-app �Լ�����ļ��������һֱ��װʧ�ܣ�������һ�»��棺npm cache clean --force��
1.1�� npm i react-router-dom  ������·�ɣ�
1.2�� npm install --save redux react-redux redux-thunk ����װRedux��

2.����moment.js�� npm install moment

3.����eCharts�� npm install echarts

4.����Antd�� npm install antd --save ��--save,ԭָ��ģ��д�뵽 packages.json�������Ѿ������ò��������ö���д�ˣ�

5.��װless��npm install -g less  �����ߣ�npm install less less-loader --save������û�ɹ����е��鷳������Ҫ����webpack.config.js��

6.����webpack.config.js�ļ�

6.1 ����������Ҫ���� npm run eject ����¶webpack�������ļ�����ᷢ�ֶ���configΪ�����ļ��С�������ⲽ����û��ϵ��
ʵ����ֻ��Ҫ��֮ǰ����?git add . ���Ȼ��������??git commit -m "init" ����Ϳ��Խ������

6.2 �����������Ҫ�ֶ���webpack.config.js������less��
// ��module���������޸�?
// ��һ�����ҵ�:
const sassRegex = /\.(scss|sass)$/;      �ĳ�=>   const sassRegex = /\.(scss|sass|less)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;       �ĳ�=>  const sassModuleRegex = /\.module\.(scss|sass|less)$/;
// �ڶ������ҵ�������sass-loader�����ɡ�less-loader��

6.3 ���ó��õ�·��
module.exports = function(webpackEnv) {
  return {
    resolve: {
      alias: {
        // react ·������ import��Ϊ����·��, ����һֱ ../../
        "components": path.resolve(__dirname, "../src/components"),
        "pages": path.resolve(__dirname, "../src/pages"),
        "router": path.resolve(__dirname, "../src/router"),
        "assets": path.resolve(__dirname, "../src/assets"),
        "store": path.resolve(__dirname, "../src/store"),
      },
    },
  };
};