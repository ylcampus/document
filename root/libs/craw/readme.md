let craw = require('./root/libs/craw')
let shops = [{
  hostname: 'mizuno.m.tmall.com',
  shopId: '62193774',
  suid: '451024527'
}, {
  hostname: 'asics.m.tmall.com',
  shopId: '64474411',
  suid: '661559176'
}]

craw.crawAllData(shops).then((res) => {
  console.log(res)
})
