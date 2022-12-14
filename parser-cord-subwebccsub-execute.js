module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
    const rawObj = yaml.parse(raw)
    var dmmNodes = new Array();
    for (let proxy of rawObj.proxies) {
      if (proxy.server === undefined) continue;
      if (proxy.name.indexOf('π―π΅') !== -1 || proxy.name.indexOf('ζ₯ζ¬') !== -1) {
          dmmNodes.push(proxy.name);
      }
    }
    if (dmmNodes.length > 0) {
        rawObj['proxy-groups'].push({
          'name': 'π―π΅ DMMδΈη¨',
          'type': 'url-test',
          'proxies': dmmNodes,
          'url': 'https://www.dmm.co.jp',
          'interval': 300
        });
      }
      
      const cusRules = [
      'DOMAIN-SUFFIX,gmgard.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,mega.io,π° θηΉιζ©',
      'DOMAIN-SUFFIX,mega.co.nz,π° θηΉιζ©',
      'DOMAIN-SUFFIX,pximg.net,π° θηΉιζ©',
      'DOMAIN-SUFFIX,bangumi.tv,π° θηΉιζ©',
      'DOMAIN-SUFFIX,bgm.tv,π° θηΉιζ©',
      'DOMAIN-SUFFIX,hanime1.me,π° θηΉιζ©',
      'DOMAIN-SUFFIX,sexinsex.net,π° θηΉιζ©',
      'DOMAIN-SUFFIX,javhd.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,imgur.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,cloudflare.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,onedrive.live.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,prestige-av.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,dlsite.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,wnacg.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,exhentai.org,π° θηΉιζ©',
      'DOMAIN-SUFFIX,javbus.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,javlibrary.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,kemono.party,π° θηΉιζ©',
      'DOMAIN-SUFFIX,e-hentai.org,π° θηΉιζ©',
      'DOMAIN-SUFFIX,tftactics.gg,π° θηΉιζ©',
      'DOMAIN-SUFFIX,studiofow.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,jsdelivr.net,π° θηΉιζ©',
      'DOMAIN-SUFFIX,patreon.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,akiba-online.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,jubt.live,π° θηΉιζ©',
      'DOMAIN-SUFFIX,south-plus.net,π° θηΉιζ©',
      'DOMAIN-SUFFIX,about.me,π° θηΉιζ©',
      'DOMAIN-SUFFIX,playno1.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,paimon.moe,π° θηΉιζ©',
      'DOMAIN-SUFFIX,freedl.org,π° θηΉιζ©',
      'DOMAIN-SUFFIX,repo.maven.apache.org,π° θηΉιζ©',
      'DOMAIN-SUFFIX,npmjs.org,π° θηΉιζ©',
      'DOMAIN-SUFFIX,sentry-cdn.com,π° θηΉιζ©',
      'DOMAIN-SUFFIX,dmm.co.jp,π―π΅ DMMδΈη¨',
      'DOMAIN-SUFFIX,dmm.com,π―π΅ DMMδΈη¨',
      'DOMAIN-SUFFIX,dmm-extension.com,π―π΅ DMMδΈη¨',
    ]/*.reverse().forEach(rule => {
        rawObj.rules.unshift(rule);
    })*/;
    rawObj.rules.unshift(...cusRules);
    rawObj.rules.splice(9105,3)
    return yaml.stringify(rawObj)
  }