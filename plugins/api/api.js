// https://www.npmjs.com/package/nuxt-swaggerjsonapi
export default client => ({
  order: {
    // 用户撤单
    cancelOrder (params) {
      return client.post('/api/order/cancelOrder', 
        params
      )
    },
    // 订单深度数据
    orderDepth (params) {
      return client.post('/api/order/orderDepth', 
        params
      )
    },
    // 用户订单详情
    orderDetail (params) {
      return client.post('/api/order/orderDetail', 
        params
      )
    },
    // 用户订单记录
    orderList (params) {
      return client.post('/api/order/orderList', 
        params
      )
    },
    // 用户下单
    placeOrder (params) {
      return client.post('/api/order/placeOrder', 
        params
      )
    },
  },
  node: {
    /* 
    ** Interface name: 节点认购
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"nodeId","in":"query","description":"节点Id","required":true,"type":"integer","format":"int64"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        nodeSubscription(){ 
          let params = { 
            "token": "",// "token"
            "nodeId": "",// "节点Id"
          } 
          this.$api.Node.nodeSubscription(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        nodeSubscriptionParams: { 
          "token": "",// "token"
          "nodeId": "",// "节点Id"
        } 
    */ 
    nodeSubscription (params) {
      return client.post('/api/Node/nodeSubscription', 
        params
      )
    },
    // 用户认购节点
    nodeListByUser (params) {
      return client.post('/api/Node/nodeListByUser', 
        params
      )
    },
    // 节点列表
    nodeList (params) {
      return client.post('/api/Node/nodeList', 
        params
      )
    },
  },
  flowRecord: {
    // 根据类型查询
    flowRecorList (params) {
      return client.post('/api/flowRecord/flowRecorList', 
        params
      )
    },
  },
  game: {
    /* 
    ** Interface name: 游戏闯关
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"gameId","in":"query","description":"游戏id","required":true,"type":"integer","format":"int64"}
    **    {"name":"quantity","in":"query","description":"参与数量","required":true,"type":"number"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        myPlayGame(){ 
          let params = { 
            "token": "",// "token"
            "gameId": "",// "游戏id"
            "quantity": "",// "参与数量"
          } 
          this.$api.game.playGame(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        playGameParams: { 
          "token": "",// "token"
          "gameId": "",// "游戏id"
          "quantity": "",// "参与数量"
        } 
    */ 
    playGame (params) {
      return client.post('/api/game/playGame', 
        params
      )
    },
    // 我的闯关
    myPlayGame (params) {
      return client.post('/api/game/myPlayGame', 
        params
      )
    },
    // 游戏社区统计
    gameTj (params) {
      return client.post('/api/game/gameTj', 
        params
      )
    },
  },
  main: {
    /* 
    ** Interface name: banner查询
    ** Parameter structure: 
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
    ** data(Vue use): 
    */ 
    bannnerInfo (params) {
      return client.post('/api/main/bannnerInfo', 
        params
      )
    },
    // 获取当前汇率
    exchangeRate (params) {
      return client.post('/api/main/exchangeRate', 
        params
      )
    },
    // 矿工社区
    minnerTj (params) {
      return client.post('/api/main/minnerTj', 
        params
      )
    },
    // 获取系统配置信息
    getSysInfo (params) {
      return client.post('/api/main/getSysInfo', 
        params
      )
    },
    /* 
    ** Interface name: 消息查询
    ** Parameter structure: 
    **    {"name":"roomId","in":"query","description":"roomId","required":false,"type":"integer","format":"int64"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        games(){ 
          let params = { 
            "roomId": "",// "roomId"
          } 
          this.$api.main.games(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        gamesParams: { 
          "roomId": "",// "roomId"
        } 
    */ 
    games (params) {
      return client.post('/api/main/games', 
        params
      )
    },
    /* 
    ** Interface name: 矿机查询
    ** Parameter structure: 
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
    ** data(Vue use): 
    */ 
    miner (params) {
      return client.post('/api/main/miner', 
        params
      )
    },
    // 消息详情
    newInfo (params) {
      return client.post('/api/main/newInfo', 
        params
      )
    },
    /* 
    ** Interface name: 消息查询
    ** Parameter structure: 
    **    {"name":"typeId","in":"query","description":"typeId","required":false,"type":"integer","format":"int32"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        news(){ 
          let params = { 
            "typeId": "",// "typeId"
          } 
          this.$api.main.news(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        newsParams: { 
          "typeId": "",// "typeId"
        } 
    */ 
    news (params) {
      return client.post('/api/main/news', 
        params
      )
    },
    /* 
    ** Interface name: 大厅闯关查询
    ** Parameter structure: 
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
    ** data(Vue use): 
    */ 
    rooms (params) {
      return client.post('/api/main/rooms', 
        params
      )
    },
    /* 
    ** Interface name: 购买记录
    ** Parameter structure: 
    **    {"name":"userId","in":"query","description":"userId","required":false,"type":"integer","format":"int64"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        userMiner(){ 
          let params = { 
            "userId": "",// "userId"
          } 
          this.$api.main.userMiner(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        userMinerParams: { 
          "userId": "",// "userId"
        } 
    */ 
    userMiner (params) {
      return client.post('/api/main/userMiner', 
        params
      )
    },
  },
  miner: {
    /* 
    ** Interface name: 抢购矿机
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"minerId","in":"query","description":"矿机id","required":true,"type":"integer","format":"int64"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        purchaseMiner(){ 
          let params = { 
            "token": "",// "token"
            "minerId": "",// "矿机id"
          } 
          this.$api.miner.purchaseMiner(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        purchaseMinerParams: { 
          "token": "",// "token"
          "minerId": "",// "矿机id"
        } 
    */ 
    purchaseMiner (params) {
      return client.post('/api/miner/purchaseMiner', 
        params
      )
    },
    // 算力统计
    powerStatistics (params) {
      return client.post('/api/miner/powerStatistics', 
        params
      )
    },
  },
  trade: {
    /* 
    ** Interface name: 闪兑
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"type","in":"query","description":"交易类型","required":true,"type":"integer","format":"int32"}
    **    {"name":"amount","in":"query","description":"交易数量","required":true,"type":"number"}
    **    {"name":"price","in":"query","description":"交易价格：默认1：1","required":true,"type":"number"}
    **    {"name":"totalPrice","in":"query","description":"总价","required":true,"type":"number"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        trade(){ 
          let params = { 
            "token": "",// "token"
            "type": "",// "交易类型"
            "amount": "",// "交易数量"
            "price": "",// "交易价格：默认1：1"
            "totalPrice": "",// "总价"
          } 
          this.$api.trade.trade(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        tradeParams: { 
          "token": "",// "token"
          "type": "",// "交易类型"
          "amount": "",// "交易数量"
          "price": "",// "交易价格：默认1：1"
          "totalPrice": "",// "总价"
        } 
    */ 
    trade (params) {
      return client.post('/api/trade/trade', 
        params
      )
    },
    // 兑换记录
    tradeListByUser (params) {
      return client.post('/api/trade/tradeListByUser', 
        params
      )
    },
  },
  user: {
    /* 
    ** Interface name: 修改密码
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"password","in":"query","description":"原始密码","required":true,"type":"string"}
    **    {"name":"newpassword","in":"query","description":"新密码","required":true,"type":"string"}
    **    {"name":"qpassword","in":"query","description":"确认密码","required":true,"type":"string"}
    **    {"name":"type","in":"query","description":"类型(取值：1|2):1=修改登录密码 2=修改支付密码","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        changePwd(){ 
          let params = { 
            "token": "",// "token"
            "password": "",// "原始密码"
            "newpassword": "",// "新密码"
            "qpassword": "",// "确认密码"
            "type": "",// "类型(取值：1|2):1=修改登录密码 2=修改支付密码"
          } 
          this.$api.user.changePwd(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        changePwdParams: { 
          "token": "",// "token"
          "password": "",// "原始密码"
          "newpassword": "",// "新密码"
          "qpassword": "",// "确认密码"
          "type": "",// "类型(取值：1|2):1=修改登录密码 2=修改支付密码"
        } 
    */ 
    changePwd (params) {
      return client.post('/api/user/changePwd', 
        params
      )
    },
    // 忘记登录密码
    forgetLoginPwd (params) {
      return client.post('/api/user/forgetLoginPwd', 
        params
      )
    },
    // 忘记支付密码
    forgetPayPwd (params) {
      return client.post('/api/user/forgetPayPwd', 
        params
      )
    },
    // 设置自动闯关
    setAutoGames (params) {
      return client.post('/api/user/setAutoGames', 
        params
      )
    },
    // 获取用户信息
    getUserInfo (params) {
      return client.post('/api/user/getUserInfo', 
        params
      )
    },
    /* 
    ** Interface name: 忘记密码
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"newpassword","in":"query","description":"新密码","required":true,"type":"string"}
    **    {"name":"qpassword","in":"query","description":"确认密码","required":true,"type":"string"}
    **    {"name":"type","in":"query","description":"类型3代表忘记支付密码 4代表忘记登录密码","required":true,"type":"string"}
    **    {"name":"mnemonic","in":"query","description":"助记词","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        forgetPwd(){ 
          let params = { 
            "token": "",// "token"
            "newpassword": "",// "新密码"
            "qpassword": "",// "确认密码"
            "type": "",// "类型3代表忘记支付密码 4代表忘记登录密码"
            "mnemonic": "",// "助记词"
          } 
          this.$api.user.forgetPwd(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        forgetPwdParams: { 
          "token": "",// "token"
          "newpassword": "",// "新密码"
          "qpassword": "",// "确认密码"
          "type": "",// "类型3代表忘记支付密码 4代表忘记登录密码"
          "mnemonic": "",// "助记词"
        } 
    */ 
    forgetPwd (params) {
      return client.post('/api/user/forgetPwd', 
        params
      )
    },
    /* 
    ** Interface name: 获取助记词
    ** Parameter structure: 
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
    ** data(Vue use): 
    */ 
    getMnemonic (params) {
      return client.post('/api/user/getMnemonic', 
        params
      )
    },
    /* 
    ** Interface name: 获取乱序助记词
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        getoldMnemonic(){ 
          let params = { 
            "token": "",// "token"
          } 
          this.$api.user.getoldMnemonic(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        getoldMnemonicParams: { 
          "token": "",// "token"
        } 
    */ 
    getoldMnemonic (params) {
      return client.post('/api/user/getoldMnemonic', 
        params
      )
    },
    // 忘记登录密码获取助记词
    forgetLogin (params) {
      return client.post('/api/user/getoldMnemonic/forgetLogin', 
        params
      )
    },
    // 修改昵称
    updateNickName (params) {
      return client.post('/api/user/updateNickName', 
        params
      )
    },
    /* 
    ** Interface name: 注销登录
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        logOut(){ 
          let params = { 
            "token": "",// "token"
          } 
          this.$api.user.logOut(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        logOutParams: { 
          "token": "",// "token"
        } 
    */ 
    logOut (params) {
      return client.post('/api/user/logOut', 
        params
      )
    },
    /* 
    ** Interface name: 用户登录
    ** Parameter structure: 
    **    {"name":"username","in":"query","description":"用户名","required":true,"type":"string"}
    **    {"name":"password","in":"query","description":"登录密码","required":true,"type":"string"}
    **    {"name":"type","in":"query","description":"登录方式：IOS、ANDROID","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        login(){ 
          let params = { 
            "username": "",// "用户名"
            "password": "",// "登录密码"
            "type": "",// "登录方式：IOS、ANDROID"
          } 
          this.$api.user.login(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        loginParams: { 
          "username": "",// "用户名"
          "password": "",// "登录密码"
          "type": "",// "登录方式：IOS、ANDROID"
        } 
    */ 
    login (params) {
      return client.post('/api/user/login', 
        params
      )
    },
    /* 
    ** Interface name: 用户注册
    ** Parameter structure: 
    **    {"name":"username","in":"query","description":"用户名","required":true,"type":"string"}
    **    {"name":"password","in":"query","description":"登录密码","required":true,"type":"string"}
    **    {"name":"mnemonic","in":"query","description":"助记词","required":true,"type":"string"}
    **    {"name":"referralCode","in":"query","description":"邀请码","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        reg(){ 
          let params = { 
            "username": "",// "用户名"
            "password": "",// "登录密码"
            "mnemonic": "",// "助记词"
            "referralCode": "",// "邀请码"
          } 
          this.$api.user.reg(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        regParams: { 
          "username": "",// "用户名"
          "password": "",// "登录密码"
          "mnemonic": "",// "助记词"
          "referralCode": "",// "邀请码"
        } 
    */ 
    reg (params) {
      return client.post('/api/user/reg', 
        params
      )
    },
  },
  userAccount: {
    /* 
    ** Interface name: 个人资产
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        balance(){ 
          let params = { 
            "token": "",// "token"
          } 
          this.$api.userAccount.balance(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        balanceParams: { 
          "token": "",// "token"
        } 
    */ 
    balance (params) {
      return client.post('/api/userAccount/balance', 
        params
      )
    },
    // 获取已开启提币的币种列表
    enableCoins (params) {
      return client.post('/api/userAccount/enableCoins', 
        params
      )
    },
    // 获取提币记录
    myWithDraw (params) {
      return client.post('/api/userAccount/myWithDraw', 
        params
      )
    },
    // 获取资产详情
    balanceDetail (params) {
      return client.post('/api/userAccount/balanceDetail', 
        params
      )
    },
    /* 
    ** Interface name: 获取用户充值地址
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        getAddress(){ 
          let params = { 
            "token": "",// "token"
          } 
          this.$api.userAccount.getAddress(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        getAddressParams: { 
          "token": "",// "token"
        } 
    */ 
    getAddress (params) {
      return client.post('/api/userAccount/getAddress', 
        params
      )
    },
    /* 
    ** Interface name: 用户提币
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"coinName","in":"query","description":"币种名称","required":true,"type":"string"}
    **    {"name":"mainNet","in":"query","description":"所属主网","required":true,"type":"string"}
    **    {"name":"address","in":"query","description":"收款地址","required":true,"type":"string"}
    **    {"name":"balance","in":"query","description":"提币金额","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        withdraw(){ 
          let params = { 
            "token": "",// "token"
            "coinName": "",// "币种名称"
            "mainNet": "",// "所属主网"
            "address": "",// "收款地址"
            "balance": "",// "提币金额"
          } 
          this.$api.userAccount.withdraw(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        withdrawParams: { 
          "token": "",// "token"
          "coinName": "",// "币种名称"
          "mainNet": "",// "所属主网"
          "address": "",// "收款地址"
          "balance": "",// "提币金额"
        } 
    */ 
    withdraw (params) {
      return client.post('/api/userAccount/withdraw', 
        params
      )
    },
    // 转账
    transfer (params) {
      return client.post('/api/userAccount/transfer', 
        params
      )
    },
  },
})