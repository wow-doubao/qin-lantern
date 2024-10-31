import{av as i,m as a,aU as e,l}from"./chunks/framework.BYd8s4Ro.js";const u=JSON.parse('{"title":"Format 格式化","description":"","frontmatter":{},"headers":[],"relativePath":"util/Format 格式化.md","filePath":"util/Format 格式化.md"}'),n={name:"util/Format 格式化.md"};function t(r,s,h,p,k,d){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="format-格式化" tabindex="-1">Format 格式化 <a class="header-anchor" href="#format-格式化" aria-label="Permalink to &quot;Format 格式化&quot;">​</a></h1><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { format } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;qin-lantern/util&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="金融小数数字格式化" tabindex="-1">金融小数数字格式化 <a class="header-anchor" href="#金融小数数字格式化" aria-label="Permalink to &quot;金融小数数字格式化&quot;">​</a></h2><ul><li>@param {String|number} s - 需要格式化得值</li><li>@param {Number} n - 保留小数位数，默认2</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">format.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123456789.123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 123,456,789.12</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="数字保留n位小数" tabindex="-1">数字保留n位小数 <a class="header-anchor" href="#数字保留n位小数" aria-label="Permalink to &quot;数字保留n位小数&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@param {Number} n - 保留位数</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">format.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fixde</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123456789.123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 123456789.1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="字符串变星号-默认隐藏中间四位-显示前3后4" tabindex="-1">字符串变星号 默认隐藏中间四位 显示前3后4 <a class="header-anchor" href="#字符串变星号-默认隐藏中间四位-显示前3后4" aria-label="Permalink to &quot;字符串变星号 默认隐藏中间四位 显示前3后4&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@param {Number} frontLen - 前面需要保留几位，默认3</li><li>@param {Number} endLen - 后面需要保留几位，默认4</li><li>@param {String} star - 隐藏的符号，默认*</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">format.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hidden</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18888888888</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 188****8888</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="去除空格" tabindex="-1">去除空格 <a class="header-anchor" href="#去除空格" aria-label="Permalink to &quot;去除空格&quot;">​</a></h2><ul><li>@param {String} str - 处理的值</li><li>@param {String} pos - 默认both：去除两端空格；left：左侧空格；right：右侧空格；all：全部空格；</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">format.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39; Hello World &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;Hello World&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="数据显示处理" tabindex="-1">数据显示处理 <a class="header-anchor" href="#数据显示处理" aria-label="Permalink to &quot;数据显示处理&quot;">​</a></h2><ul><li>@param {Number|String} value - 数据</li><li>@param {String} before - 数据前缀</li><li>@param {String} after - 数据后缀</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">format.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dispose</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;-&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">format.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dispose</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;%&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;123%&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,17)]))}const m=i(n,[["render",t]]);export{u as __pageData,m as default};
