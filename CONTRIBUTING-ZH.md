### Polymer 中文文档翻译必读指南
#### 相关资源
1. Polymer 中文社区官方网址 [http://polymerchina.org/](http://polymerchina.org/)
2. Polymer 中文文档 [http://docs.polymerchina.org](http://docs.polymerchina.org)
3. 文档翻译 repo [https://github.com/unbug/docs/tree/ZH](https://github.com/unbug/docs/tree/ZH)
4. Polymer 微博 [@Polymer中文社区](http://weibo.com/u/3631834213?from=profile&wvr=5&loc=infdomain)；QQ群：208264834
5. 组织者 unbug 的微博 [@听奏](http://weibo.com/unbug)

#### 开始前须知
1. 在你开始前请确保你已经阅读了以下已有的 Polymer 中文文档：[首页](http://docs.polymerchina.org/)，[FQA](http://docs.polymerchina.org/resources/faq.html)，[入门教程](http://docs.polymerchina.org/docs/start/tutorial/intro.html)
2. 在你准备翻译某个部分前，**请先确保你已经实践过了，写过DEMO之后你的翻译质量更加有保证**，如果你遇到困难请加QQ群：208264834 与大家探讨。拒绝一切机器翻译。
3. 对于一些常用前端名词的翻译，请参看[W3C 词汇中英对照表](http://w3c-html-ig-zh.github.io/w3c-glossary/)。对于 Polymer 常用关键词，请保留原词语：Web components,Custom Elements,Shadow DOM,HTML Imports,Web Animations,Polyfill,Core Elements,Paper Elements,Material design等。

#### 基础翻译
> [Core Elements](http://docs.polymerchina.org/docs/elements/core-elements.html#core-ajax),[Paper elements](http://docs.polymerchina.org/docs/elements/paper-elements.html#paper-button)的翻译无论是对你进行进阶翻译或者学习Polymer都非常有帮助，但这些Elements的文档并不在Docs项目里，你可以按以下步骤进行翻译

1. 在[Polymer官方Github](http://polymerchina.org/)里搜索对应的 Element 并 Fork 一份，打出一个翻译的 branch
2. Element 的翻译就是对应其注释的翻译,如果```core-ajax```,你只需要翻译[core-ajax.html](https://github.com/Polymer/core-ajax/blob/master/core-ajax.html)对应的注释就可以了。
3. 预览你的翻译结果，你需要在自己的本地简单的[搭建一个简单的 Polymer 工程](http://docs.polymerchina.org/docs/start/tutorial/intro.html)，然后在工程中[安装你所翻译的Element](http://docs.polymerchina.org/docs/start/getting-the-code.html)。要快速创建 Polymer 工程推荐使用 [Chrome Dev Editor](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg?hl=en)。你访问对应 Element 目录下的```index.html```即可预览。如```core-ajax/index.html```
4. 你可以将你翻译好的 Element 以 issues 的形式提交到[中文文档的repo](https://github.com/unbug/docs/tree/ZH)，会有人 review 并更新到[http://docs.polymerchina.org](http://docs.polymerchina.org)上的。

#### 进阶翻译
> 如果你已经完成以上两个部分，并且有自信对除了 [Core Elements](http://docs.polymerchina.org/docs/elements/core-elements.html#core-ajax),[Paper elements](http://docs.polymerchina.org/docs/elements/paper-elements.html#paper-button) 外，官网上没有翻译的部分进行有质量保证的翻译，我们非常的欢迎。那么请按以下步骤进行翻译

1. Fork [中文文档的 repo](https://github.com/unbug/docs/tree/ZH),并打好自己的翻译的 branch。
2. 按 [README](https://github.com/unbug/docs/blob/ZH/README.md) 所写的指南 clone 你刚刚 fork 的 repo 并将 docs 项目部署到你的本地，如你能正常在的本地预览那你就可以进行翻译了，如果你遇到麻烦请加QQ群：208264834 与大家探讨
3. 当你翻译好并且在本地预览过结果后，你需要将你的翻译 push 到你 Github 的 repo 上并给[中文文档的repo](https://github.com/unbug/docs/tree/ZH)发一个 pull request。会有人 review 后 merge 并更新到[http://docs.polymerchina.org](http://docs.polymerchina.org)上的。


**代表所有 Polymer 爱好者感谢你的贡献 ;)**
