export const strict = false
export const state = () => ({
  // export default () => ({
  varsion: "",//版本号
  locales: ['zh-CN', 'zh-TW', 'en-US'],
  locale: 'zh-CN',
  tabbarState: true,//导航显示状态
  orderTakingState: false,//是否是接单模式，来决定是否显示导航
  token: '',
  env_name: '',
  personalCenter: false, //是否展示个人中心
  pageActive: 0, // wap端页面导航index
  c2cPageActive: 0,// c2c wap端页面导航index
  authUser: null,
  UserInfoArray: [],//多个用户
  UserInfo: {}, // 用户信息
  fromInvitationCode: '', // 邀请码
  FixPirce: '', // 一口价
  CoinInfo: '', // 币种信息
  isMaintain: false, // 是否是维护页面
  sysInitTime: '', // 系统时间
  chatData: [], // 聊天消息数据存储,
  allInfoNum: 0, // 所有消息数量
  loginTimeoutBeforePage: '',
  ATCoinTypeIndex: '', // 集合竞价基准币种索引
  ATCoinTypeBasicIndex: '', // 集合竞价交易对币种索引
  // chatData: [{
  //   orderId: '', //订单id
  //   total: '', //订单消息数量
  // }], //聊天消息数据存储
});
