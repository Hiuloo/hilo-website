# Hilo 官网 · Explore Beyond.

北京希洛探索科技有限公司 / Hilo Exploration Technology 的完整静态品牌官网。

**直接使用：解压 → 双击 `index.html` 预览 → 将项目内的文件上传到 GitHub 仓库根目录 → 开启 Pages。** 不需要购买服务器，不需要安装开发环境，也不需要构建。

## 1. 项目内容与目录

```text
hilo-website/
├── index.html                 # 完整首页及全部业务板块
├── .nojekyll                  # 告诉 GitHub 按静态文件发布
├── README.md                  # 本说明
└── assets/
    ├── css/
    │   └── style.css          # 布局、响应式与动效
    ├── js/
    │   ├── config.js          # 公开联系方式配置
    │   └── main.js            # 导航、滚动、交互、需求摘要
    └── images/
        └── hilo-logo.png      # 用户上传的原始 Logo，原文件保留
```

首页包括 Hero、品牌介绍、AI / Data / Creative / Digital、AI Automation、AI Creative Studio、Solutions、Hilo Lab、About、Contact 与 Footer。业务介绍来自提供的公司定位，不含虚构客户、营业数据、奖项或项目案例；创意工作室的抽象视觉是设计示意。

所有路径均为相对路径，既支持 `https://Hiuloo.github.io/hilo-website/` 这样的项目地址，也支持 GitHub 用户主页地址和自定义域名。上述地址为配置示例，实际是否上线以仓库 Pages 页面为准。

## 2. 先在自己电脑上查看

1. 解压 ZIP，进入 `hilo-website` 文件夹。
2. 双击 `index.html`，使用现代版 Chrome、Edge、Safari 或 Firefox 查看。
3. 缩小窗口看看手机布局，点击导航、展开行业方案，并试用需求摘要下载。
4. 本地直接打开时，浏览器可能限制自动复制；下载摘要仍可使用。线上 HTTPS 环境支持复制，但也受浏览器权限影响。

页面没有外部字体、CDN、第三方 JS、网络图片或后台依赖。支持系统的“减少动态效果”设置；未运行 JS 时正文和原生行业折叠面板仍可阅读。

## 3. 发布前填写真实联系信息

打开 `assets/js/config.js`，在引号内填写：

```javascript
window.HILO_CONFIG = {
  email: "",   // 填写公司真实的公开联系邮箱
  phone: "",   // 填写公司真实的公开联系电话
  wechat: ""   // 填写公司真实的公开微信号
};
```

留空的字段不会显示。只要填入有效邮箱，Contact 中就会出现邮箱和“邮件联系”按钮。该按钮打开访客自己的邮件应用，由访客确认发送。

**Contact 表单不会自动提交。** 它在访客设备上生成 TXT 需求摘要，支持下载和复制；配置邮箱后还可以生成邮件草稿。不收集或存储访客资料，也不展示虚假的发送成功。若以后需要在线接收表单，需另行接入表单服务或后台并调整相关说明。

联系信息未配置时页面显示“联系方式即将更新”。本项目未替你编造邮箱、电话、地址或备案号。发布后请按实际经营信息更新业务文案。

## 4. 从零创建 GitHub 免费网站

### 第一步：注册或登录

1. 打开 [GitHub](https://github.com/)。已有账号点击 **Sign in**；没有账号点击 **Sign up** 并完成邮箱验证。
2. 本项目按你的用户名 `Hiuloo` 编写示例。如果最终使用其他账号，把示例中的用户名换成实际值。

### 第二步：新建仓库

1. 登录后打开 [新建仓库](https://github.com/new)。
2. **Owner** 选择你自己的账号 `Hiuloo`。
3. **Repository name** 填写 `hilo-website`。
4. **Description** 可以填写 `Hilo Exploration Technology — Explore Beyond.`。
5. 选择 **Public**，这样可使用 GitHub Free 的 Pages。网站代码和上传的文件将公开可见。
6. 勾选 **Add a README file**，方便初始化 `main` 分支；后面上传项目 README 时会替换该初始文件。
7. 点击 **Create repository**。

如果更喜欢不含项目后缀的网址，也可以将仓库命名为 `Hiuloo.github.io`。用户主页仓库必须使用“实际用户名.github.io”格式，其网址为 `https://Hiuloo.github.io/`。同一账号只能有一个这样的用户主页仓库。

### 第三步：上传网站文件

1. 进入仓库 **Code** 页面，点击 **Add file → Upload files**。
2. 打开解压后的 `hilo-website` 文件夹，将**里面的文件和整个 `assets` 文件夹**拖到 GitHub 上传区。
3. 不要上传 ZIP 本身，也不要把外层 `hilo-website` 文件夹整体再套一层。发布后仓库最顶层应该直接出现 `index.html`。
4. 输入提交说明，例如 `Add Hilo website`，选择直接提交到 `main`，点击 **Commit changes**。
5. 检查仓库根目录中存在 `index.html`、`README.md`、`assets/` 和 `.nojekyll`。

Windows 可能隐藏 `.nojekyll`。在资源管理器中打开“查看 → 显示 → 隐藏的项目”；如果网页上传漏掉它，在仓库中点 **Add file → Create new file**，文件名填 `.nojekyll`，内容留空或写一行说明，提交到 `main` 即可。

### 第四步：开启 GitHub Pages

1. 点击仓库上方 **Settings**。
2. 左侧找到 **Pages**。
3. 在 **Build and deployment** 中，**Source** 选择 **Deploy from a branch**。
4. **Branch** 选择 **main**。
5. 旁边的目录选择 **/ (root)**。
6. 点击 **Save**。
7. 等待部署完成；刷新该页面，看到网站地址后点击 **Visit site**。可在仓库 **Actions** 页面查看部署是否成功。

示例访问地址：

- 普通项目仓库：`https://Hiuloo.github.io/hilo-website/`
- 用户主页仓库：`https://Hiuloo.github.io/`

以上流程采用 GitHub 官方的 [从分支发布 Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) 配置。域名、可用性和使用限制由 GitHub 的服务规则决定。

### 第五步：以后如何更新

修改本地文件后，在仓库中再次选择 **Add file → Upload files**，上传同路径的更新文件并提交。也可以打开某个文件点击铅笔图标进行编辑。提交到 `main` 后，Pages 会重新发布；完成后刷新网站即可。若浏览器仍显示旧样式，尝试 `Ctrl + F5` 或无痕窗口。

## 5. 绑定自定义域名

GitHub 提供 `github.io` 网站地址；自定义域名需要你向域名注册商购买。本节使用 `example.com` 演示，请替换为你自己拥有的域名，不要直接填示例域名。

### A. 先在 GitHub 设置域名

1. 建议先按 [GitHub 域名验证说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) 在个人账号的 Pages 设置中验证域名所有权。
2. 进入网站仓库 **Settings → Pages**。
3. 在 **Custom domain** 填写想使用的域名，例如 `www.example.com`，点击 **Save**。
4. 再去域名管理平台设置 DNS。使用本项目的分支发布方式时，GitHub 会在仓库根目录创建 `CNAME` 文件；以后更新网站时保留它。本项目没有预置示例 CNAME，避免影响默认网址。

### B. 如果使用 www 子域名

在域名注册商的 DNS 管理页添加：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| CNAME | www | Hiuloo.github.io |

记录值只填主机名，不写 `https://`，不写 `/hilo-website/`，末尾也不必加 `/`。

### C. 如果同时使用根域名

如果需要让 `example.com` 也指向网站，在 DNS 管理页按 GitHub 官方目前列出的地址添加以下记录：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

若平台支持，也可以采用 GitHub 官方说明中的 ALIAS 或 ANAME 配置。检查同一主机记录是否存在冲突的默认记录。不要添加覆盖全部子域名的通配记录。只绑定 www 时按 B 配置即可；同时绑定根域名与 www 时结合 B、C 配置，并以 GitHub 中选择的 Custom domain 为主地址。

DNS 生效可能需要较长时间。回到 **Settings → Pages** 查看 DNS 检查和证书状态；当选项可用时勾选 **Enforce HTTPS**。更换域名或 DNS 后，以 GitHub 当前的 [自定义域名官方说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) 为准。本文配置核对日期：2026-10-06。

## 6. 常见问题

| 现象 | 检查方法 |
| --- | --- |
| 网站 404 | 检查 Pages 是否已部署完成，地址是否含正确仓库名，`index.html` 是否位于根目录。 |
| Pages 无法选择 main | 先上传文件完成提交，确认分支已创建；不要选择空仓库。 |
| 只有 README，没有官网 | 一般是 `index.html` 没有上传到发布目录。检查是否多套了一层文件夹。 |
| 样式、Logo 不显示 | 确认完整上传 `assets`，文件大小写与代码一致，没有修改目录结构。 |
| 修改后未更新 | 在 Actions 中查看发布结果，再尝试强制刷新；确认改的是所选分支。 |
| 复制摘要不可用 | 使用 HTTPS 网站、允许剪贴板权限，或直接下载 TXT。 |
| 邮件没有直接发送 | 本站只打开邮件草稿，访客仍需在自己的邮件应用中发送。 |
| 自定义域名检查失败 | 检查 CNAME 主机名、根域名 A 记录、冲突记录及 DNS 生效状态。 |

## 7. 调整设计和文案

- 页面文字、导航、业务介绍：编辑 `index.html`。
- 联系方式：编辑 `assets/js/config.js`。
- 配色：编辑 `style.css` 顶部的 `--purple`、`--lavender`、`--ink`、`--paper`。
- Logo：原始上传文件完整保存在 `assets/images/hilo-logo.png`。导航通过 CSS 取图中品牌符号，About 使用完整 Logo；没有重绘或改变原始品牌图。
- 动效：桌面首屏停驻，随滚动放大标题、展开轨道与球体；轨道光点持续缓慢运动；球体、分层轨道与球面高光随鼠标平滑跟随，离开首屏后归位；正文滚动 reveal；能力图随滚动产生视差；桌面指针让能力图、创意卡片与 Lab 轻微倾斜；品牌宣言随阅读位置逐行点亮；导航底部显示阅读进度；桌面自动化流程随滚动点亮。移动端简化停驻与倾斜，系统开启“减少动态效果”时停止动画。
- 分享预览：部署后可把 `og:image` 改成网站的完整 HTTPS 图片网址，并按实际网址补充 `og:url`，便于分享平台抓取。当前未填写猜测的正式域名。

如需命令行本地预览，可在本文件夹运行 `python -m http.server 8000`，然后打开 `http://localhost:8000/`。这只是可选方式，正常上传部署不需要 Python。
