# 一日一诗

纯静态的每日古诗词推荐网站。无需安装依赖，直接用浏览器打开 `index.html` 即可预览。

## 本地诗词库

`poems-data.js` 内置 995 篇古典作品，覆盖唐诗、宋词、元曲、《诗经》与《楚辞》。原始文本整理自 [chinese-poetry](https://github.com/chinese-poetry/chinese-poetry)（MIT License）；数据随页面发布，访客无需调用第三方接口。

## 部署到中国大陆服务器

建议部署到已备案域名对应的腾讯云、阿里云或华为云服务器（Nginx），将本目录全部文件上传到网站根目录即可。静态页面不需要数据库或后端服务。

本地预览：

```sh
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。
