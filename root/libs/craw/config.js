/**
 * @name 配置文件
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 * @desc 为了应对反扒，尽量模拟浏览器访问行为
 */
'use strict'
let map = {
  // 延时策略
  timeStamp: 30 * 24 * 3600 * 1000, // 商品数据保鲜时间戳-一个月更新一次
  policy: [5, 8, 5, 60, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  detail: { // 商品详情
    min: 10, // 最小延迟时间
    headers: null
  },
  list: { // 商品列表
    min: 5000,
    defaultUrl: null,
    headers: { // 爬取商品列表接口响应头
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
      'upgrade-insecure-requests': 1,
      'cache-control': 'max-age=0',
      'accept-language': 'zh-CN,zh;q=0.8',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    },
    uri: {
      protocol: 'https',
      hostname: null,
      port: 443,
      query: {
        spm: null,
        suid: null,
        sort: 's',
        p: null,
        page_size: '12',
        from: 'h5',
        shop_id: null,
        ajson: '1',
        _tm_source: 'tmallsearch',
        callback: null
      },
      pathname: '/shop/shop_auction_search.do'
    },
    cookie: { // 默认cookie
      cna: null,
      tk_trace: '1',
      _m_h5_tk: null,
      _m_h5_tk_enc: null,
      isg: null
    }
  },
  shop: { // 店铺
    min: 1 * 1000
  },
  all: { // 批量店铺
    min: 1 * 1000
  }
}
module.exports = map
