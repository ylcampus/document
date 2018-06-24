let axios = require('axios')
// --
module.exports.getMallMsg = () => {
  return axios.get('/api/mall/test')
}
