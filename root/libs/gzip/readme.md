#目的
#定时保存网站商品数据防止系统由于天猫网站反扒策略的升级等问题而引起的爬取不到商品信息的情况
#使用方法
let zip = require('./root/libs/gzip')
let gzip = zip.create()
let imgArr = ['//img.alicdn.com/imgextra/i2/725677994/TB2Wlv9nXGWBuNjy0FbXXb4sXXa_!!725677994-0-sm.jpg_430x430q90.jpg',
  '//img.alicd3333333333n.com/imgextra/i3/725677994/TB2WAOmnFuWBuNjSspnXXX1NVXa_!!725677994.jpg_430x430q90.jpg',
  '//img.alic4444444444dn.com/imgextra/i4/725677994/TB2WqkndeOSBuNjy0FdXXbDnVXa_!!725677994.jpg_430x430q90.jpg',
  '//img.alicdn.com/imgextra/i3/725677994/TB2zA3pdhWYBuNjy1zkXXXGGpXa_!!725677994.jpg_430x430q90.jpg',
  '//img.alicdn.com/imgextra/i3/725677994/TB27ktdaIj_B1NjSZFHXXaDWpXa_!!725677994.jpg_430x430q90.jpg',
  '//img.alicdn.com/imgextra/i4/2265017762/TB1qb.SfFOWBuNjy0FiXXXFxVXa_!!0-item_pic.jpg_430x430q90.jpg',
  '//img.alicdn.com/imgextra/i4/2265017762/TB21hk_fL5TBuNjSspmXXaDRVXa_!!2265017762.jpg_430x430q90.jpg',
  '//img.alicdn.com/imgextra/i1/2265017762/TB28GXqf4GYBuNjy0FnXXX5lpXa_!!2265017762.jpg_430x430q90.jpg',
  '//img.alicdn.com/imgextra/i2/2265017762/TB29yMGfL9TBuNjy0FcXXbeiFXa_!!2265017762.jpg_430x430q90.jpg',
  '//img.alicdn.com/imgextra/i2/2265017762/TB2qwA4fH5YBuNjSspoXXbeNFXa_!!2265017762.jpg_430x430q90.jpg']
gzip.addFiles(imgArr) // gzip.append()
gzip.save('static/temp/2018年6月商品数据.zip').then((res) => {
  console.log(res)
})
