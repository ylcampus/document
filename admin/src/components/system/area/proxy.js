// let axios = require('axios')
// 获取会员列表
module.exports.getMemberList = (data) => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        total: 100,
        rows: [{
          id: '24fa4366-1ce0-4b36-a204-1500799dfb3d',
          account: 'xinghuo@2018',
          telephone: '10205185737',
          status: 1,
          sex: 1,
          province: '江苏省',
          provinceId: '1000',
          city: '南京市',
          cityId: '1000',
          college: '南京大学',
          collegeId: '1000',
          campus: '鼓楼校区',
          campusId: '1000',
          name: '董纪国',
          createAt: '2018-05-11T17:14:06.435Z',
          updateAt: '2018-05-11T17:14:06.435Z'
        }, {
          id: '24fa4366-1ce0-4b36-a204-1500799dfb3d',
          account: 'hanlei@2018',
          telephone: '10205185737',
          status: 1,
          sex: 1,
          province: '江苏省',
          provinceId: '1000',
          city: '南京市',
          cityId: '1000',
          college: '南京大学',
          collegeId: '1000',
          campus: '鼓楼校区',
          campusId: '1000',
          name: '韩磊',
          createAt: '2018-05-11T17:14:06.435Z',
          updateAt: '2018-05-11T17:14:06.435Z'
        }]
      },
      message: null,
      success: true
    })
  })
}
