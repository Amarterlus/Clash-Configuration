// ==UserScript==
// @name         新标签页打开论坛链接
// @namespace    http://tampermonkey.net/
// @version      2024-11-22
// @description  Open Forum Page In New Tab
// @author       A.M.T
// @run-at       document-end
// @match       *://bbs.pcbeta.com/*
// @match       *://*.chiphell.com/*
// @match       *://*.south-plus.net/*
// @match       *://*.saraba1st.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  function isForumPage() {
    // 检查URL中是否包含论坛相关的关键词
    const urlKeywords = ["forum", "thread", "post", "topic", "board"];
    const currentUrl = window.location.href.toLowerCase();
    for (const keyword of urlKeywords) {
      if (currentUrl.includes(keyword)) {
        console.log("路径特征命中");
        return true;
      }
    }

    // 检查页面标题是否包含论坛相关的关键词
    const titleKeywords = ["论坛", "社区", "讨论区", "board", "forum"];
    const pageTitle = document.title.toLowerCase();
    for (const keyword of titleKeywords) {
      if (pageTitle.includes(keyword)) {
        console.log("标题特征命中");
        return true;
      }
    }

    // 检查meta标签中的关键词
    const metas = document.getElementsByTagName("meta");
    for (const meta of metas) {
      if (
        (meta.getAttribute("name") === "description" ||
          meta.getAttribute("property") === "og:description") &&
        (meta.content.toLowerCase().includes("forum") ||
          meta.content.toLowerCase().includes("discussion"))
      ) {
        console.log("meta内容命中");
        return true;
      }
    }

    console.log("非论坛~脚本不执行");
    return false;
  }

  function judgeOpenLink(link){
    return link.includes('thread-') || link.includes('tid-')
  }

  // 在页面加载完成后执行检查
  window.onload = () => {
    const isForum = isForumPage(); // 调用函数并获取返回值

    // 根据返回值执行不同的操作
    if (isForum) {
      console.log("论坛页面，将符合特征的链接A标签设为新标签页打开");
      document.addEventListener("click", function (event) {
        const target = event.target;
        if (target.tagName === "A" && judgeOpenLink(target.href)) {
          target.setAttribute("target", "_blank");
        }
      });
    }
  };
})();
