module.exports = {
  // 资源类校验规则
  resourceRules: {
    name: [ // 资源名称
      {required: true, message: '请输入资源名称', trigger: 'blur'},
      {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
    ],
    type: [ // 资源类型 1：api接口资源；2：模块资源
      {required: true, message: '请选择资源类型', trigger: 'change'}
    ],
    path: [ // 资源路径 适用于api接口类资源
      {required: true, message: '请输入资源路径', trigger: 'change'},
      {min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
    ],
    group: [ // 资源组 适用于api接口类资源
      {required: true, message: '请选择分组', trigger: 'change'}
    ],
    code: [ // code码 适用于模块类资源
      {required: true, message: '请输入code码', trigger: 'blur'},
      {
        validator: (rule, value, callback) => {
          if (!/^[0-9]*[1-9][0-9]*$/.test(value) || value < 100 || value > 999) {
            callback(new Error('请输入100到999的整数'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    platform: [ // 所属平台 1：官方；2商家 适用于模块类资源
      {required: true, message: '请选择所属平台', trigger: 'change'}
    ],
    desc: [ // 描述
      {min: 0, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur'}
    ]
  },
  // 用户类校验规则
  userRules: {
    roleId: [
      { required: true, message: '请选择角色', trigger: 'change' }
    ],
    account: [
      { required: true, message: '请输入用户账号', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (!/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
            callback(new Error('最短3个字符最长不超过16个字符'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    telephone: [
      {
        validator: (rule, value, callback) => {
          if (value === '' || value === null || value === 'null') {
            callback()
          } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确的电话号码'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    email: [{
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === 'null') {
          callback()
        } else if (!/^[a-zA-Z0-9._%+-]+@(?!.*\.\..*)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
          callback(new Error('请输入正确的电子邮件地址'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }],
    name: [
      { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
    ],
    desc: [
      { min: 0, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
    ]
  },
  // 角色校验规则
  roleRules: {
    name: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
    ],
    desc: [
      { min: 0, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
    ]
  },
  // 店铺校验规则
  shopRules: {
    name: [ // 店铺名称
      { required: true, message: '请输入店铺名称', trigger: 'blur' },
      { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
    ],
    hostName: [ // 主机名称（官方域名）
      { required: true, message: '请输入官方域名名称', trigger: 'blur' },
      { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
    ],
    shopId: [ // 店铺Id
      { required: true, message: '请输入店铺Id', trigger: 'blur' },
      { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
    ],
    suid: [ // suid
      { required: true, message: '请输入suid', trigger: 'blur' },
      { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
    ],
    desc: [ // 描述信息
      { min: 0, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
    ]
  },
  // 登录
  loginRules: { // 临时处理
    account: [
      { required: true, message: '请输入用户账号', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (!/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
            callback(new Error('最短3个字符最长不超过16个字符'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    pwd: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  },
  forgetSrep1Rules: { // 忘记密码步骤1校验规则 - 临时
    account: [
      { required: true, message: '请输入用户账号', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (!/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
            callback(new Error('最短3个字符最长不超过16个字符'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    vCode: [
      { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
  },
  forgetSrep2Rules: { // 忘记密码步骤2校验规则 - 临时
    tCode: [ // 验证码
      { required: true, message: '请输入验证码', trigger: 'blur' }
    ],
    newPwd: [ // 新密码
      { required: true, message: '请输入新密码', trigger: 'blur' }
    ],
    confirmPwd: [ // 确认密码
      { required: true, message: '请输入确认密码', trigger: 'blur' }
    ]
  }
}
