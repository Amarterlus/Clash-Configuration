module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
    const rawObj = yaml.parse(raw)
    var dmmNodes = new Array();
    for (let proxy of rawObj.proxies) {
      if (proxy.server === undefined) continue;
      if (proxy.name.indexOf('🇯🇵') !== -1 || proxy.name.indexOf('日本') !== -1) {
          dmmNodes.push(proxy.name);
      }
    }
    if (dmmNodes.length > 0) {
        rawObj['proxy-groups'].push({
          'name': '🇯🇵 DMM专用',
          'type': 'url-test',
          'proxies': dmmNodes,
          'url': 'https://www.dmm.co.jp',
          'interval': 300
        });
      }
      
      const cusRules = [
      'DOMAIN-SUFFIX,gmgard.com,🔰 节点选择',
      'DOMAIN-SUFFIX,mega.io,🔰 节点选择',
      'DOMAIN-SUFFIX,mega.co.nz,🔰 节点选择',
      'DOMAIN-SUFFIX,pximg.net,🔰 节点选择',
      'DOMAIN-SUFFIX,bangumi.tv,🔰 节点选择',
      'DOMAIN-SUFFIX,bgm.tv,🔰 节点选择',
      'DOMAIN-SUFFIX,hanime1.me,🔰 节点选择',
      'DOMAIN-SUFFIX,sexinsex.net,🔰 节点选择',
      'DOMAIN-SUFFIX,javhd.com,🔰 节点选择',
      'DOMAIN-SUFFIX,imgur.com,🔰 节点选择',
      'DOMAIN-SUFFIX,cloudflare.com,🔰 节点选择',
      'DOMAIN-SUFFIX,onedrive.live.com,🔰 节点选择',
      'DOMAIN-SUFFIX,prestige-av.com,🔰 节点选择',
      'DOMAIN-SUFFIX,dlsite.com,🔰 节点选择',
      'DOMAIN-SUFFIX,wnacg.com,🔰 节点选择',
      'DOMAIN-SUFFIX,exhentai.org,🔰 节点选择',
      'DOMAIN-SUFFIX,javbus.com,🔰 节点选择',
      'DOMAIN-SUFFIX,javlibrary.com,🔰 节点选择',
      'DOMAIN-SUFFIX,e-hentai.org,🔰 节点选择',
      'DOMAIN-SUFFIX,tftactics.gg,🔰 节点选择',
      'DOMAIN-SUFFIX,studiofow.com,🔰 节点选择',
      'DOMAIN-SUFFIX,jsdelivr.net,🔰 节点选择',
      'DOMAIN-SUFFIX,patreon.com,🔰 节点选择',
      'DOMAIN-SUFFIX,akiba-online.com,🔰 节点选择',
      'DOMAIN-SUFFIX,jubt.live,🔰 节点选择',
      'DOMAIN-SUFFIX,south-plus.net,🔰 节点选择',
      'DOMAIN-SUFFIX,about.me,🔰 节点选择',
      'DOMAIN-SUFFIX,playno1.com,🔰 节点选择',
      'DOMAIN-SUFFIX,paimon.moe,🔰 节点选择',
      'DOMAIN-SUFFIX,freedl.org,🔰 节点选择',
      'DOMAIN-SUFFIX,repo.maven.apache.org,🔰 节点选择',
      'DOMAIN-SUFFIX,npmjs.org,🔰 节点选择',
      'DOMAIN-SUFFIX,sentry-cdn.com,🔰 节点选择',
      'DOMAIN-SUFFIX,githubassets.com,🔰 节点选择',
      'DOMAIN-SUFFIX,btdig.com,🔰 节点选择',
      'DOMAIN-SUFFIX,openai.com,🔰 节点选择',
      'DOMAIN-SUFFIX,dmm.co.jp,🇯🇵 DMM专用',
      'DOMAIN-SUFFIX,dmm.com,🇯🇵 DMM专用',
      'DOMAIN-SUFFIX,dmm-extension.com,🇯🇵 DMM专用',
    ]/*.reverse().forEach(rule => {
        rawObj.rules.unshift(rule);
    })*/;
    rawObj.rules.unshift(...cusRules);
    rawObj.rules.splice(9107,3)
    return yaml.stringify(rawObj)
  }