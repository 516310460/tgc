<template>
  <div>
    <!-- 划转 -->
    <van-dialog
      v-if="isShowDialog"
      class="xbitFeeTipsDialog"
      :class="inputFocusState && 'inputFocusState'"
      v-model="isShowDialog"
    >
      <van-row class="TipsDialog">
        <van-col
          class="TipsDialog-Title brBottom-cl324170"
          span="24"
        >
          <!-- 划转头部 -->
          <van-col
            class="tl fs32"
            span="18"
          >
            {{$t('H5default.transfer')}}
          </van-col>
          <van-col span="6">
            <van-icon
              @click="handleClose"
              class="fr fs32"
              name="cross"
            />
          </van-col>
        </van-col>
        <van-col span="24">
          <ul class="dis-fl ju-sb type-wrap">
            <li
              v-for="(item, index) in AccountTypeArr"
              :key="index"
              @click="changeActiveType(index)"
              :class="{'active': activeType === index}"
              class="tc bs fs30 cl606d82"
            >{{item}}
            </li>
          </ul>
        </van-col>
        <van-col
          class="TipsDialog-Content fs28 tl"
          span="24"
        >
          <van-col
            span="24"
            class="TipsDialog-Content-Transfer bk000f18"
          >
            <van-col
              span="20"
              class="TipsDialog-Content-Transfer-Left clffffff"
            >
              <van-col
                span="24"
                class="TipsDialog-Content-Transfer-Left-Top brBottom-cl324170"
              >
                {{$t('common.Transfer.From')}}
                {{coinName}} {{newTypeName1(newTypeName)}}
                <!-- {{currencyTranslationCoin}}
                {{SwitchItemObj.form}} -->

              </van-col>
              <van-col
                span="24"
                class="TipsDialog-Content-Transfer-Left-Bottom"
              >
                {{$t('common.Transfer.to')}}
                {{coinName}}
                {{newTypeName2(newTypeName)}}
                <!-- {{currencyTranslationCoin}} -->
                <!-- {{SwitchItemObj.to}} -->

              </van-col>
            </van-col>
            <van-col
              @click.native="switchChange"
              span="4"
              class="TipsDialog-Content-Transfer-Right tc"
            >
              <i class="AggregatedTransaction-NavBar-RightIcon iconfont iconasset_icon_switch cl606d82 fs48"></i>
            </van-col>
          </van-col>
          <!-- 划转输入框 -->
          <van-col span="24">
            <!-- 划转提示 -->
            <p class="TipsDialog-Content-TransferTitle">{{$t('common.Transfer.transferQuantity')}}</p>
            <section class="TipsDialog-Content-TransferNum common-inputLine-style">
              <van-col span="15">
                <van-cell-group>
                  <van-field
                    type="text"
                    v-model="TransferNum"
                    @focus="inputFocusState = true"
                    @blur="inputFocusState = false"
                    @input="inputTransferNum"
                    class="clffffff"
                  />
                </van-cell-group>
              </van-col>
              <van-col
                span="9"
                class="tr TipsDialog-Content-TransferNum-coinName fs28"
              >
                <span class="value"> {{coinName}}</span>
                <span
                  @click="TransferNumAll"
                  class="cl4774f9 fs24 total"
                >
                  {{$t('common.Transfer.Total')}}
                </span>
              </van-col>
            </section>
            <section class="TipsDialog-Content-autoTransfer">
              <p class="TipsDialog-Content-autoTransfer-Title">
                {{$t('common.Transfer.availableBalance')}}
                {{availableBalanceData(newTypeName)}}
                {{coinName}}
                <!-- {{currentShowBalance}} -->
                <!-- {{currencyTranslationCoin}} -->
              </p>
            </section>
          </van-col>
        </van-col>
        <van-col
          class="TipsDialog-Botton"
          span="24"
        >
          <van-col
            class="tl"
            span="24"
          >
            <section
              @click="handleSure"
              class="TipsDialog-Botton-Submit buttonLinearGradient clffffff"
            >
              <span>{{$t('H5default.transfer')}}</span>
            </section>
          </van-col>
        </van-col>
      </van-row>
    </van-dialog>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
.xbitFeeTipsDialog {
  &.inputFocusState {
    top: 35% !important;
  }
  /deep/ .TipsDialog {
    .TipsDialog-Content {
      .TipsDialog-Content-TransferTitle {
        padding: 0 0.22rem;
        margin-bottom: 0.2rem;
      }

      .TipsDialog-Content-Transfer {
        margin-bottom: 0.2rem;
        padding: 0 0.22rem;
        border-radius: 0.12rem;
        height: 1.6rem;

        .TipsDialog-Content-Transfer-Left {
          height: 100%;

          .TipsDialog-Content-Transfer-Left-Top {
            height: 0.8rem;
            line-height: 0.8rem;

            &:before {
              content: '';
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 100%;
              background: $co5fe9ce;
              display: inline-block;
              vertical-align: middle;
              margin: 0 0.1rem;
            }
          }

          .TipsDialog-Content-Transfer-Left-Bottom {
            height: 0.8rem;
            line-height: 0.8rem;

            &:before {
              content: '';
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 100%;
              background: $co0084ff;
              display: inline-block;
              vertical-align: middle;
              margin: 0 0.1rem;
            }
          }
        }

        .TipsDialog-Content-Transfer-Right {
          height: 1.6rem;
          line-height: 1.6rem;
        }
      }

      .TipsDialog-Content-TransferNum {
        position: relative;
        overflow: hidden;

        .van-cell-group {
          background: transparent;

          .van-cell {
            padding: 0;
            background: transparent;

            .van-cell__value {
              color: $codbe4fe !important;
              .van-field__body {
                color: $codbe4fe !important;
                input {
                  font-size: 0.32rem;
                  color: $codbe4fe !important;
                }
              }
            }
          }
        }

        .TipsDialog-Content-TransferNum-coinName {
          padding-top: 0.01rem;

          span.value {
            position: relative;
            top: 0.02rem;
          }

          span.total {
            display: inline-block;
            padding-left: 5px;
            border-left: 1px solid #6272a1;
          }
        }

        .TipsDialog-Content-TransferNum-btnAll {
          position: relative;
          top: 0.07rem;
          border-left: 1px solid $co6272a1;
        }
      }

      .TipsDialog-Content-autoTransfer {
        margin-top: 0.2rem;

        .TipsDialog-Content-autoTransfer-Content {
          padding: 0.2rem 0;

          .van-switch {
            .van-switch__node {
              background: $co93a4da;
            }
          }
        }
      }
    }
  }
}
</style>
<script>
export default {
  props: {
    typeName: {
      type: Number,
      default: 1
    },
    coinName: {
      type: String,
      default: ''
    },
    //法币是否能划转
    isOtcCanTranslation: Boolean,
    //币币是否能划转
    isMatchTradeCanTranslation: Boolean,
    //算力是否能划转
    isPowerTradeCanTranslation: Boolean,
    titleData: {
      type: Object,
      default: ''
    },
    // //是否反转币种划转
    // isReversal: {
    //   type: Boolean,
    //   default: ''
    // }
  },
  data () {
    return {
      isShowDialog: true,
      TransferData: {
        From: {
          coinId: 1,//币种id
          name: 'USDT',//币种名称
          availableBalance: 0,//可用余额
        },
        Reach: {
          coinId: 1,//币种id
          name: 'BUSD',//币种名称
          availableBalance: 0,//可用余额
        }
      },
      TransferNum: '',//划转数量
      TransferNumTipsState: 0,//划转数量状态 1.划转不能为空或0 2.划转不能大雨可用余额
      autoTransfer: false,//自动划转状态
      Token: '',
      TransferCoinList: [],//加载支持划转到BUsd的币种
      locale: '',
      value: '',
      /*
      * start 2019-06-06
      * */
      newTypeName: this.typeName,//0为法币 1.为币币账户 2.为算力账户
      coinNameIndex: 1,//USDT 选择索引
      isCoinNameChange: false,//false为初始状态没有切换 true为切换过了
      OTCBalance: 0,//法币资产
      CoinBalance: 0,//币币资产
      HashRateBalance: 0,//算力资产
      AccountTypeArr: [],
      currencyTranslationCoin: [],
      SwitchItemArr: [],
      //选中的类型
      activeType: 0,
      //切换的对象
      SwitchItemObj: {
        form: '',
        to: '',
      },
      //当前显示的余额
      currentShowBalance: '',
      TransferNum: '',//划转数量
      inputFocusState: false,//是否获取焦点
    }
  },
  mounted () {
    this.$nextTick(() => {

      this.init();
      // 注销登录
      this.$bus.on("user-logout", () => {
        this.init();
      });
      // 登录成功
      this.$bus.on("Login-Success", () => {
        this.init();
      });
    });
  },
  methods: {
    async init () {
      this.locale = this.$store.state.locale;
      this.Token = this.$store.state.token;
      this.AccountTypeArr = this.titleData.AccountTypeArr;
      // this.currencyTranslationCoin = this.titleData.assetTypeName;
      this.TransferState = true;
      this.TransferNum = '';
      this.SwitchItemArr = this.titleData.SwitchItemArr;
      this.SwitchItemObj = this.titleData.SwitchItemArr[this.activeType];
      if (this.typeName == 0) {
        //法币
        if (this.isMatchTradeCanTranslation) {
          this.coinNameIndex = 1
        } else {
          this.coinNameIndex = 2
        }
      } else if (this.typeName == 1) {
        //币币
        if (this.isOtcCanTranslation) {
          this.coinNameIndex = 1
        } else {
          this.coinNameIndex = 2
        }
      } else if (this.typeName == 2) {
        //算力
        if (this.isOtcCanTranslation) {
          this.coinNameIndex = 1
        } else {
          this.coinNameIndex = 2
        }
      }
      if (this.Token) {
        await this.getBalance();
        await this.getByAssetName();
        await this.getHashRateByAssetName();
      }
    },
    //改变账户类型
    changeActiveType (i) {
      this.activeType = i;
      this.coinNameIndex = i + 1;
      this.SwitchItemObj = this.SwitchItemArr[this.activeType];
      // this.isCoinNameChange = true;
      // this.getCurrentShowBalance();
    },
    //划转里点击'切换'图标
    switchChange () {
      // [this.SwitchItemObj.form, this.SwitchItemObj.to] = [this.SwitchItemObj.to, this.SwitchItemObj.form];
      this.isCoinNameChange = !this.isCoinNameChange;
      this.TransferNum = '';
      this.TransferNumTipsState = 0;
      // this.getCurrentShowBalance();
    },
    //显示当前可用余额
    getCurrentShowBalance () {
      this.TransferNum = '';
      if (this.SwitchItemObj.form === '法币账户') {
        this.currentShowBalance = this.OTCBalance;
      }
      else if (this.SwitchItemObj.form === '币币账户') {
        this.currentShowBalance = this.CoinBalance;
      }
      else if (this.SwitchItemObj.form === '算力账户') {
        this.currentShowBalance = this.HashRateBalance;
      }
    },
    //划转数量
    inputTransferNum () {
      this.TransferNum = this.$commonFn.limitInputNum(this.TransferNum, 9, 6);
    },
    //取消或关闭
    handleClose () {
      // this.isShowDialog = false;
      this.$bus.emit('TransferState', 'update-Balance')
    },
    //确认划转
    async handleSure () {
      // if (!Number(this.TransferNum) || this.TransferNumTipsState != 0) {
      //   return
      // }
      await this.chackTransferNum();
      if (!Number(this.TransferNum) || this.TransferNumTipsState == 1) {
        return this.$Toast(this.$t('common.Transfer.transferTips1'))
      }
      if (this.TransferNumTipsState == 2) {
        return this.$Toast(this.$t('common.Transfer.transferTips2'))
      }
      if (this.TransferNumTipsState == 0) {
        this.transfer();
      }
    },
    //校验划转数量
    chackTransferNum () {
      if (!this.TransferNum) {
        //划转数量为空判断
        this.TransferNumTipsState = 1;
      } else if (Number(this.TransferNum) > this.availableBalanceData(this.newTypeName)) {
        //划转数量不能大于可用余额
        this.TransferNumTipsState = 2;
      } else {
        this.TransferNumTipsState = 0;
      }
    },
    //点击全部
    TransferNumAll () {
      this.TransferNum = this.availableBalanceData(this.newTypeName);
      this.chackTransferNum();
    },
    limitInputNum () {
      this.TransferNum = this.$commonFn.limitInputNum(
        this.TransferNum,
        9,
        6
      );
      this.chackTransferNum();
    },
    //获取用户某个币种资产 （获取币币账户资产）
    getByAssetName () {
      this.$api.Trade.getByAssetName(this.coinName).then(res => {
        if (res && res.data.code == 200) {
          //判断当前属于什么账户类型区 //0为法币 1.为币币账户 2.为算力账户
          this.CoinBalance = res.data.data.availableBalance;//币币资产
        }
      })
    },
    // 查询用户多个币种余额 （获取法币账户资产）
    getBalance () {
      let obj = {
        assetTypeName: this.coinName
      };
      this.$api.FixedPrice.getBalance(obj).then(res => {
        if (res && res.data.code === 200) {
          if (res.data.data) {
            //判断当前属于什么账户类型区 //0为法币 1.为币币账户 2.为算力账户
            this.OTCBalance = res.data.data[0].availableBalance;//法币资产
          }
        }
      });
    },
    // 获取用户某个币种资产（算力）
    getHashRateByAssetName () {
      this.$api.HashRate.getByAssetName(this.coinName).then(res => {
        if (res && res.data.code === 200) {
          if (res.data.data) {
            //判断当前属于什么账户类型区 //0为法币 1.为币币账户 2.为算力账户
            this.HashRateBalance = res.data.data.availableBalance;//算力资产
          }
        }
      });
    },
    availableBalanceData (index) {
      let str = ''
      // this.CoinBalance;//币币资产
      // this.OTCBalance;//法币资产
      // this.HashRateBalance;//算力资产
      switch (index) {
        case 0:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.CoinBalance : this.OTCBalance
          } else {
            str = this.isCoinNameChange ? this.HashRateBalance : this.OTCBalance
          }
          break;
        case 1:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.OTCBalance : this.CoinBalance
          } else {
            str = this.isCoinNameChange ? this.HashRateBalance : this.CoinBalance
          }
          break;
        case 2:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.OTCBalance : this.HashRateBalance
          } else {
            str = this.isCoinNameChange ? this.CoinBalance : this.HashRateBalance
          }
          break;
      }
      return str
    },
    //OTC-币币
    translationToMatchTrade () {
      let obj = {
        "assetName": this.coinName,//资产名称
        "operationNum": this.TransferNum,//OTC-币币的数量
      }
      this.$api.myAssets.translationToMatchTrade(obj).then(res => {
        if (res && res.data.code === 200) {
          this.$Toast(
            this.$t('common.Transfer.transferredSuccessfully')
          );
          this.handleClose();
        }
        //  else {
        //   this.$Toast(
        //     this.$t('common.Transfer.transferredError')
        //   );
        // }
      })
    },
    //币币-OTC
    translationToOTC () {
      let obj = {
        "assetName": this.coinName,//资产名称
        "operationNum": this.TransferNum,//币币-OTC的数量
      }
      this.$api.myAssets.translationToOTC(obj).then(res => {
        if (res && res.data.code === 200) {
          this.$Toast(
            this.$t('common.Transfer.transferredSuccessfully')
          );
          this.handleClose();
        }
        // else {
        //   this.$Toast(
        //     this.$t('common.Transfer.transferredError')
        //   );
        // }
      })
    },
    //算力-OTC
    HashRateTranslationToOTC () {
      let obj = {
        assetName: this.coinName,//资产名称
        operationNum: this.TransferNum,//算力-OTC的数量
      }
      this.$api.myAssets.HashRateTranslationToOTC(obj).then(res => {
        if (res && res.data.code === 200) {
          this.$Toast(
            this.$t('common.Transfer.transferredSuccessfully')
          );
          this.handleClose();
        }
        // else {
        //   this.$Toast(
        //     this.$t('common.Transfer.transferredError')
        //   );
        // }
      })
    },
    //币币-算力资产
    coinTranslationToPowerTrade () {
      let obj = {
        assetName: this.coinName,//资产名称
        operationNum: this.TransferNum,//币币-算力资产的数量
      }
      this.$api.myAssets.coinTranslationToPowerTrade(obj).then(res => {
        if (res && res.data.code === 200) {
          this.$Toast(
            this.$t('common.Transfer.transferredSuccessfully')
          );
          this.handleClose();
        }
        // else {
        //   this.$Toast(
        //     this.$t('common.Transfer.transferredError')
        //   );
        // }
      })
    },
    //算力-币币资产
    HashRateTranslationToMatchTrade () {
      let obj = {
        assetName: this.coinName,//资产名称
        operationNum: this.TransferNum,//算力-币币资产的数量
      }
      this.$api.myAssets.HashRateTranslationToMatchTrade(obj).then(res => {
        if (res && res.data.code === 200) {
          this.$Toast(
            this.$t('common.Transfer.transferredSuccessfully')
          );
          this.handleClose();
        }
        // else {
        //   this.$Toast(
        //     this.$t('common.Transfer.transferredError')
        //   );
        // }
      })
    },
    // OTC资产划转至算力
    translationToPowerTrade () {
      let obj = {
        assetName: this.coinName,//资产名称
        operationNum: this.TransferNum,//OTC-算力资产的数量
      }
      this.$api.myAssets.translationToPowerTrade(obj).then(res => {
        if (res && res.data.code === 200) {
          this.$Toast(
            this.$t('common.Transfer.transferredSuccessfully')
          );
          this.handleClose();
        }
        // else {
        //   this.$Toast(
        //     this.$t('common.Transfer.transferredError')
        //   );
        // }
      })
    },
    //手动将币种余额划转
    transfer () {
      //判断当前属于什么账户类型区 //0为法币 1.为币币账户 2.为算力账户
      if (this.newTypeName == 0) {
        if (this.coinNameIndex == 1) {
          //OTC划转币币 or 币币划转OTC
          if (this.newTypeName1(this.newTypeName) == this.$t('common.AssetsDetail.title1')) {
            //OTC-币币
            this.translationToMatchTrade();
          } else {
            //币币-OTC
            this.translationToOTC();
          }
        } else {
          //OTC划转算力 or 算力划转OTC
          if (this.newTypeName1(this.newTypeName) == this.$t('common.AssetsDetail.title1')) {
            //OTC-算力
            this.translationToPowerTrade();
          } else {
            //算力-OTC
            this.HashRateTranslationToOTC();
          }
        }
      } else if (this.newTypeName == 1) {
        if (this.coinNameIndex == 1) {
          //OTC划转币币 or 币币划转OTC
          if (this.newTypeName1(this.newTypeName) == this.$t('common.AssetsDetail.title2')) {
            //币币-OTC
            this.translationToOTC();
          } else {
            //OTC-币币
            this.translationToMatchTrade();
          }
        } else {
          //币币至算力 or 算力划转币币
          if (this.newTypeName1(this.newTypeName) == this.$t('common.AssetsDetail.title2')) {
            //币币-算力资产
            this.coinTranslationToPowerTrade()
          } else {
            //算力-币币资产
            this.HashRateTranslationToMatchTrade();
          }
        }
      } else if (this.newTypeName == 2) {
        if (this.coinNameIndex == 1) {
          if (this.newTypeName1(this.newTypeName) == this.$t('common.AssetsDetail.title3')) {
            //算力-OTC
            this.HashRateTranslationToOTC();
          } else {
            //OTC-算力
            this.translationToPowerTrade();
          }
        } else {
          if (this.newTypeName1(this.newTypeName) == this.$t('common.AssetsDetail.title3')) {
            //算力-币币
            this.HashRateTranslationToMatchTrade();
          } else {
            //币币-算力
            this.coinTranslationToPowerTrade()
          }
        }
      }
    },
    //获取当前所属法币 币币 算力选项
    newTypeNameSelect1 (index) {
      let str = ''
      //在法币时 显示币币账户和算力账户， 在币币时 显示法币账户和算力账户， 在算力时 显示币币账户和法币账户
      switch (index) {
        case 0:
          str = this.$t('common.AssetsDetail.title2')
          break;
        case 1:
          str = this.$t('common.AssetsDetail.title1')
          break;
        case 2:
          str = this.$t('common.AssetsDetail.title1')
          break;
      }
      return str
    },
    //获取当前所属法币 币币 算力选项
    newTypeNameSelect2 (index) {
      let str = ''
      //在法币时 显示币币账户和算力账户， 在币币时 显示法币账户和算力账户， 在算力时 显示币币账户和法币账户
      switch (index) {
        case 0:
          str = this.$t('common.AssetsDetail.title3')
          break;
        case 1:
          str = this.$t('common.AssetsDetail.title3')
          break;
        case 2:
          str = this.$t('common.AssetsDetail.title2')
          break;
      }
      return str
    },
    //筛选当前的列表所属名称
    newTypeName1 (index) {
      let str = ''
      switch (index) {
        case 0:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title2') : this.$t('common.AssetsDetail.title1')
          } else {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title3') : this.$t('common.AssetsDetail.title1')
          }
          break;
        case 1:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title1') : this.$t('common.AssetsDetail.title2')
          } else {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title3') : this.$t('common.AssetsDetail.title2')
          }
          break;
        case 2:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title1') : this.$t('common.AssetsDetail.title3')
          } else {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title2') : this.$t('common.AssetsDetail.title3')
          }
          break;
      }
      return str
    },
    //筛选当前的列表所属名称
    newTypeName2 (index) {
      let str = ''
      switch (index) {
        case 0:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title1') : this.$t('common.AssetsDetail.title2')
          } else {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title1') : this.$t('common.AssetsDetail.title3')
          }
          break;
        case 1:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title2') : this.$t('common.AssetsDetail.title1')
          } else {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title2') : this.$t('common.AssetsDetail.title3')
          }
          break;
        case 2:
          if (this.coinNameIndex == 1) {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title3') : this.$t('common.AssetsDetail.title1')
          } else {
            str = this.isCoinNameChange ? this.$t('common.AssetsDetail.title3') : this.$t('common.AssetsDetail.title2')
          }
          break;
      }
      return str
    }
  },
}
</script>
<style lang="scss" scoped>
.type-wrap {
  li {
    width: 50%;
    padding: 0.3rem 0 0.2rem;
    border-bottom: 1px solid transparent;
  }

  li.active {
    color: #17bc95 !important;
    border-bottom: 1px solid currentColor;
  }
}
</style>