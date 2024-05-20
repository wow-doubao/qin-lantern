import{au as s,m as i,l as a,aT as t}from"./chunks/framework.Cphjm3J-.js";const g=JSON.parse('{"title":"Test 校验","description":"","frontmatter":{},"headers":[],"relativePath":"util/Test 校验.md","filePath":"util/Test 校验.md"}'),e={name:"util/Test 校验.md"},l=t('<h1 id="test-校验" tabindex="-1">Test 校验 <a class="header-anchor" href="#test-校验" aria-label="Permalink to &quot;Test 校验&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { test } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;qin-lantern/util&#39;</span></span></code></pre></div><h2 id="是否邮箱号" tabindex="-1">是否邮箱号 <a class="header-anchor" href="#是否邮箱号" aria-label="Permalink to &quot;是否邮箱号&quot;">​</a></h2><ul><li>@param {String} value - 处理的值</li><li>@return {Boolean} 是否为邮箱</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">email</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;123@qq.com&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="是否手机号" tabindex="-1">是否手机号 <a class="header-anchor" href="#是否手机号" aria-label="Permalink to &quot;是否手机号&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@return {Boolean} 是否为手机</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mobile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1888&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// false</span></span></code></pre></div><h2 id="是否身份证号" tabindex="-1">是否身份证号 <a class="header-anchor" href="#是否身份证号" aria-label="Permalink to &quot;是否身份证号&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@return {Boolean} 是否为身份证号码</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">idCard</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;6301&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// false</span></span></code></pre></div><h2 id="是否车牌号" tabindex="-1">是否车牌号 <a class="header-anchor" href="#是否车牌号" aria-label="Permalink to &quot;是否车牌号&quot;">​</a></h2><ul><li>@param {String} value - 处理的值</li><li>@return {Boolean} 是否为是否车牌号</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">carNo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;京A88888&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="是否金额" tabindex="-1">是否金额 <a class="header-anchor" href="#是否金额" aria-label="Permalink to &quot;是否金额&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@return {Boolean} 是否为只有2位小数的值</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">amount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;666.66&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="只能是字母或者数字" tabindex="-1">只能是字母或者数字 <a class="header-anchor" href="#只能是字母或者数字" aria-label="Permalink to &quot;只能是字母或者数字&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@return {Boolean} 是否为字母或者数字</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">enOrNum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;abc&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="只能是数字或小数" tabindex="-1">只能是数字或小数 <a class="header-anchor" href="#只能是数字或小数" aria-label="Permalink to &quot;只能是数字或小数&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@return {Boolean} 是否为数字或小数</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">floatOrNum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;123.45&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="验证一个值范围" tabindex="-1">验证一个值范围 <a class="header-anchor" href="#验证一个值范围" aria-label="Permalink to &quot;验证一个值范围&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@param {[Number, Number]} param - 范围数组 [min, max]</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="验证一个长度范围" tabindex="-1">验证一个长度范围 <a class="header-anchor" href="#验证一个长度范围" aria-label="Permalink to &quot;验证一个长度范围&quot;">​</a></h2><ul><li>@param {Number|String} value - 处理的值</li><li>@param {[Number, Number]} param - 范围数组 [min, max]</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rangeLength</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">11111</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// false</span></span></code></pre></div><h2 id="是否为空" tabindex="-1">是否为空 <a class="header-anchor" href="#是否为空" aria-label="Permalink to &quot;是否为空&quot;">​</a></h2><p>这里指的“空”，包含如下几种情况：</p><ul><li>值为undefined(一种类型)，非字符串&quot;undefined&quot;</li><li>字符串长度为0，也即空字符串</li><li>值为false(布尔类型)，非字符串&quot;false&quot;</li><li>值为数值0(非字符串&quot;0&quot;)，或者NaN</li><li>值为null，空对象{}，或者长度为0的数组</li></ul><ul><li>@param {any} value - 处理的值</li><li>@return {Boolean} 判断是否为空</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">empty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({}) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="是否数组" tabindex="-1">是否数组 <a class="header-anchor" href="#是否数组" aria-label="Permalink to &quot;是否数组&quot;">​</a></h2><ul><li>@param {any} value - 处理的值</li><li>@return {Boolean} 仅对纯JavaScript数组返回true</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([]) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="是否对象" tabindex="-1">是否对象 <a class="header-anchor" href="#是否对象" aria-label="Permalink to &quot;是否对象&quot;">​</a></h2><ul><li>@param {any} value - 处理的值</li><li>@return {Boolean} 仅对纯JavaScript对象返回true</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({}) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="是否为移动端设备" tabindex="-1">是否为移动端设备 <a class="header-anchor" href="#是否为移动端设备" aria-label="Permalink to &quot;是否为移动端设备&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isMobileDevice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div>',42),h=[l];function n(p,k,r,d,o,u){return a(),i("div",null,h)}const E=s(e,[["render",n]]);export{g as __pageData,E as default};
