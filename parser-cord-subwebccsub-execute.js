module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
    const rawObj = yaml.parse(raw)
    var dmmNodes = new Array();
    var twNodes = new Array();
    var usNodes = new Array();
    for (let proxy of rawObj.proxies) {
      if (proxy.server === undefined) continue;
      if (proxy.name.indexOf('🇯🇵') !== -1 || proxy.name.indexOf('日本') !== -1) {
          dmmNodes.push(proxy.name);
      }

      if (proxy.name.indexOf('🇨🇳') !== -1 && proxy.name.indexOf('台湾') !== -1) {
          twNodes.push(proxy.name);
      }

      if (proxy.name.indexOf('🇺🇸') !== -1 || proxy.name.indexOf('美国') !== -1) {
          usNodes.push(proxy.name);
      }
    }

    //splice方法 第一个是位置 length - 1 = 倒数第二个 第二个参数是需要删除的元素数 如果为0 相当于insert
    if(usNodes.length > 0) {
      rawObj['proxy-groups']
          .splice(rawObj['proxy-groups'].length - 1, 0,
          {
            'name': '🇺🇸 美国',
            'type': 'url-test',
            'proxies': usNodes,
            'url': 'https://e-hentai.org',
            'interval': 300 
          });
    }

    if(twNodes.length > 0) {
      rawObj['proxy-groups']
          .splice(rawObj['proxy-groups'].length - 1, 0,
          {
            'name': '🇨🇳 台湾',
            'type': 'url-test',
            'proxies': twNodes,
            'url': 'https://ani.gamer.com.tw',
            'interval': 300 
          });

      //国内媒体添加台湾
      let mediaInLand = rawObj['proxy-groups'][3].proxies;
      mediaInLand.pop();//等同于splice(arr.length - 1,1) 
      mediaInLand.unshift('🇨🇳 台湾','🔰 节点选择');
      
    }

    if (dmmNodes.length > 0) {
          rawObj['proxy-groups']
          .splice(rawObj['proxy-groups'].length - 1, 0,
          {
            'name': '🇯🇵 DMM专用',
            'type': 'url-test',
            'proxies': dmmNodes,
            'url': 'https://www.dmm.co.jp',
            'interval': 300 
          });
      }
      
      const cusRules = [
      'DOMAIN-SUFFIX,gmgard.com,🔰 节点选择',
      'DOMAIN-SUFFIX,iili.io,🔰 节点选择',
      'DOMAIN-SUFFIX,mega.io,🔰 节点选择',
      'DOMAIN-SUFFIX,mega.co.nz,🔰 节点选择',
      'DOMAIN-SUFFIX,bangumi.tv,🔰 节点选择',
      'DOMAIN-SUFFIX,mikanani.me,🔰 节点选择',
      'DOMAIN-SUFFIX,acg.rip,🔰 节点选择',
      'DOMAIN-SUFFIX,bgm.tv,🔰 节点选择',
      'DOMAIN-SUFFIX,hanime1.me,🔰 节点选择',
      'DOMAIN-SUFFIX,sexinsex.net,🔰 节点选择',
      'DOMAIN-SUFFIX,javhd.com,🔰 节点选择',
      'DOMAIN-SUFFIX,imgur.com,🔰 节点选择',
      'DOMAIN-SUFFIX,cloudflare.com,🔰 节点选择',
      'DOMAIN-SUFFIX,onedrive.live.com,🔰 节点选择',
      'DOMAIN-SUFFIX,apkleecher.com,🔰 节点选择',
      'DOMAIN-SUFFIX,prestige-av.com,🔰 节点选择',
      'DOMAIN-SUFFIX,dlsite.com,🔰 节点选择',
      'DOMAIN-SUFFIX,exhentai.org,🔰 节点选择',
      'DOMAIN-SUFFIX,javbus.com,🔰 节点选择',
      'DOMAIN-SUFFIX,javlibrary.com,🔰 节点选择',
      'DOMAIN-SUFFIX,tftactics.gg,🔰 节点选择',
      'DOMAIN-KEYWORD,fanbox,🔰 节点选择',
      'DOMAIN-SUFFIX,railway.app,🔰 节点选择',
      'DOMAIN-SUFFIX,koyeb.com,🔰 节点选择',
      'DOMAIN-SUFFIX,koyeb.app,🔰 节点选择',
      'DOMAIN-SUFFIX,studiofow.com,🔰 节点选择',
      'DOMAIN-SUFFIX,jsdelivr.net,🔰 节点选择',
      'DOMAIN-SUFFIX,patreon.com,🔰 节点选择',
      'DOMAIN-SUFFIX,akiba-online.com,🔰 节点选择',
      'DOMAIN-SUFFIX,wnacg.com,🔰 节点选择',
      'DOMAIN-SUFFIX,jubt.live,🔰 节点选择',
      'DOMAIN-SUFFIX,south-plus.net,🔰 节点选择',
      'DOMAIN-SUFFIX,discord.com,🔰 节点选择',
      'DOMAIN-SUFFIX,discord.gg,🔰 节点选择',
      'DOMAIN-SUFFIX,about.me,🔰 节点选择',
      'DOMAIN-SUFFIX,playno1.com,🔰 节点选择',
      'DOMAIN-SUFFIX,paimon.moe,🔰 节点选择',
      'DOMAIN-SUFFIX,freedl.org,🔰 节点选择',
      'DOMAIN-SUFFIX,repo.maven.apache.org,🔰 节点选择',
      'DOMAIN-SUFFIX,mvnrepository.com,🔰 节点选择',
      'DOMAIN-SUFFIX,npmjs.org,🔰 节点选择',
      'DOMAIN-SUFFIX,sentry-cdn.com,🔰 节点选择',
      'DOMAIN-SUFFIX,githubassets.com,🔰 节点选择',
      'DOMAIN-SUFFIX,btdig.com,🔰 节点选择',
      'DOMAIN-SUFFIX,openai.com,🔰 节点选择',
      'DOMAIN-SUFFIX,freegpt.one,🔰 节点选择',
      'DOMAIN-SUFFIX,kemono.party,🔰 节点选择',
      'DOMAIN-SUFFIX,kemono.su,🔰 节点选择',
      'DOMAIN-SUFFIX,rule34video.com,🔰 节点选择',
      'DOMAIN-SUFFIX,rule34.us,🇺🇸 美国',
      'DOMAIN-SUFFIX,ani.gamer.com.tw,🇨🇳 台湾',
      'DOMAIN-SUFFIX,dmm.co.jp,🇯🇵 DMM专用',
      'DOMAIN-SUFFIX,dmm.com,🇯🇵 DMM专用',
      'DOMAIN-SUFFIX,dmm-extension.com,🇯🇵 DMM专用',
    ]/*.reverse().forEach(rule => {
        rawObj.rules.unshift(rule);
    })*/;
    for (let i = 0; i < rawObj.rules.length; i++) {
      let rule = rawObj.rules[i];
      if (rule.includes(",dmm.co") || rule.includes(",dmm-") 
          || rule.includes("bugly")
        ) {
          rawObj.rules.splice(i, 1);
          i--;
      }
    }

    rawObj.rules.unshift(...cusRules);
    return yaml.stringify(rawObj)
  }