<template>
  <div>
    <van-popup
      :position="position"
      v-model="show"
      :style="defaultStyle"
    >
      <div class="fs0 PersonalCenter-wrap">
        <div class="pd30 bs wd100 pos-re top-wrap">
          <div class="info-num-wrap">
            <div
              class="pos-re"
              @click="clickItem('PersonalCenter/information', true)"
            >
              <i class="iconfont iconmy_icon_inform fs34 cldce2f2"></i>
              <span
                v-if="parseFloat(countNum) > 0"
                class="fs20 clffffff tc info-num"
              >
                {{ parseFloat(countNum) > 99 ? "99+" : countNum }}
              </span>
            </div>
            <div
              class="pos-re"
              @click="clickItem('PersonalCenter/Set')"
            >
              <i class="iconfont iconmy_icon_setting fs34 cldce2f2"></i>
            </div>
          </div>

          <div
            @click="clickItem('PersonalCenter/PersonalData', true)"
            class="name-wrap"
          >
            <span class="fs48 fb cldce2f2">{{ nickName }}</span>
            <i class="iconfont iconpersonal_icon_enter fs30 cl606d82"></i>
          </div>
          <div class="pd-t-b-14">
            <span class="fs24 cldce2f2">{{ email }}</span>
            <span
              @click="clickItem('PersonalCenter/PersonalData/AmendPhone', true)"
              v-if="!mobile"
              class="fs24 cl4774f9 phone-num"
            >{{ $t("PersonalCenter.index.bindPhone") }}</span>
          </div>
          <div class="pd-t-b-14 pos-re">
            <span class="fs24 cl93a4da">UID:{{ UID }}</span>
            <span
              @click="clickItem('PersonalCenter/PersonalData/AmendPhone', true)"
              v-if="mobile"
              class="fs24 cl4774f9 phone-num"
            >{{ mobile }}</span>

            <div class="security_level">
              <div
                v-if="safeLeavel === 2"
                class="fs20"
              >
                {{ $t("PersonalCenter.index.securityLevel1") }}
              </div>
              <div
                v-if="safeLeavel === 1"
                class="fs20"
              >
                {{ $t("PersonalCenter.index.securityLevel2") }}
              </div>
              <div
                v-if="safeLeavel === 0"
                class="fs20"
              >
                {{ $t("PersonalCenter.index.securityLevel3") }}
              </div>
            </div>
          </div>
        </div>
        <div class="pd30 contact-wrap bs">
          <div
            class="dis-fl mark-wrap"
            @click="clickItem('PersonalCenter/QuickSet', true)"
          >
            <div class="fs22 cl6272a1 mark-text">
              {{ $t("PersonalCenter.index.hintText1") }}
            </div>
            <div>
              <img
                style="width:.918rem"
                src="../../assets/image/home/my_img_tu.png"
              />
            </div>
          </div>
          <ul class="item-wrap">
            <li
              class="ju-sb"
              @click="clickItem(`MyAsset`, true)"
            >
              <div>
                <img
                  src="../../assets/image/PersonalCenter/index/my_icon_finance@2x.png"
                  alt
                />
                <span class="fs30 cldce2f2">{{ $t("H5default.Assets") }}</span>
              </div>
              <span class="fs20 cl17BC95 fr">{{ my_asset ? my_asset.toFixed(8) : 0 }} BTC</span>
            </li>
            <div class="h_line "></div>
            <!-- <li
                    class="ju-sb"
                    @click="clickItem('PersonalCenter/QuickSet', true)"
                    >
                    <div>
                        <img
                        src="../../assets/image/PersonalCenter/index/Per_center_icon_fast.png"
                        alt
                        >
                        <span class="fs30 cldce2f2">{{$t('PersonalCenter.index.quickSet')}}</span>
                    </div>
                    <i class="iconfont iconcommon_icon_disclosure1 fs32 cl606d82"></i>
                    </li> -->
            <li
              class="ju-sb"
              @click="clickItem('PersonalCenter/MyOrder', true)"
            >
              <div>
                <img
                  src="../../assets/image/PersonalCenter/index/my_icon_order@2x.png"
                  alt
                />
                <span class="fs30 cldce2f2">{{
                  $t("PersonalCenter.index.myOrder")
                }}</span>
              </div>
            </li>
            <li
              class="ju-sb"
              @click="clickItem('PersonalCenter/MyAsset/FinancialRecord', true)"
            >
              <div>
                <img
                  src="../../assets/image/PersonalCenter/index/my_icon_detailed@2x.png"
                  alt
                />
                <span class="fs30 cldce2f2">{{
                  $t("PersonalCenter.index.financialCenter")
                }}</span>
              </div>
            </li>
            <!-- <li
                    class="ju-sb"
                    @click="clickItem('PersonalCenter/XBITEarningsRecord', true)"
                    >
                    <div>
                        <img
                        src="../../assets/image/PersonalCenter/index/ic_my_xbitearning.png"
                        alt
                        >
                        <span class="fs30 cldce2f2">XBIT存证收益</span>
                    </div>
                    <i class="iconfont iconcommon_icon_disclosure1 fs32 cl606d82"></i>
                    </li> -->

            <!-- <li
                    class="ju-sb"
                    @click="clickItem('PersonalCenter/Discount', true)"
                    >
                    <div>
                        <img
                        src="../../assets/image/PersonalCenter/index/ic_my_discount.png"
                        alt
                        >
                        <span class="fs30 cldce2f2">{{$t('PersonalCenter.index.discountEvent')}}</span>
                    </div>
                    <i class="iconfont iconcommon_icon_disclosure1 fs32 cl606d82"></i>
                    </li> -->

            <li
              class="ju-sb"
              @click="clickItem('PersonalCenter/PaymentTerm', true)"
            >
              <div>
                <img
                  src="../../assets/image/PersonalCenter/index/my_icon_gathering@2x.png"
                  alt
                />
                <span class="fs30 cldce2f2">{{
                  $t("PersonalCenter.index.ShouKuanFangShi")
                }}</span>
              </div>
            </li>
            <!-- <li
              class="ju-sb"
              @click="
                clickItem('PersonalCenter/Calculate/CalculateApply', true)
              "
            >
              <div>
                <img
                  src="../../assets/image/PersonalCenter/index/my_icon_recharge@2x.png"
                  alt
                />
                <span class="fs30 cldce2f2">{{
                  $t("PersonalCenter.index.SuanLiChongZhi")
                }}</span>
              </div>
            </li> -->
            <div class="h_line"></div>
            <li
              class="ju-sb"
              @click="clickItem('PersonalCenter/SecurityCenter', true)"
            >
              <div>
                <img
                  src="../../assets/image/PersonalCenter/index/my_icon_safety@2x.png"
                  alt
                />
                <span class="fs30 cldce2f2">{{
                  $t("PersonalCenter.index.AnQuanZhongXin")
                }}</span>
              </div>
            </li>
            <!-- <li
                    class="ju-sb"
                    @click="clickItem('PersonalCenter/HelpCenter')"
                    >
                    <div>
                        <img
                        src="../../assets/image/PersonalCenter/index/Per_center_icon_ad.png"
                        alt
                        >
                        <span class="fs30 cldce2f2">{{$t('PersonalCenter.index.BangZhuZhongXin')}}</span>
                    </div>
                    <i class="iconfont iconcommon_icon_disclosure1 fs32 cl606d82"></i>
                    </li> -->
            <!-- <li
                    class="ju-sb"
                    @click="clickItem('PersonalCenter/InviteFriends', true)"
                    >
                    <div>
                        <img
                        src="../../assets/image/PersonalCenter/index/Per_center_icon_invitation.png"
                        alt
                        >
                        <span class="fs30 cldce2f2">{{$t('PersonalCenter.index.YaoQingHaoYou')}}</span>
                    </div>
                    <i class="iconfont iconcommon_icon_disclosure1 fs32 cl606d82"></i>
                    </li> -->

            <li
              class="ju-sb"
              @click="clickItem('PersonalCenter/contactUs')"
            >
              <div>
                <img
                  src="../../assets/image/PersonalCenter/index/my_icon_contacyus@2x.png"
                  alt
                />
                <span class="fs30 cldce2f2">{{
                  $t("PersonalCenter.index.LianXiWoMen")
                }}</span>
              </div>
            </li>
            <li
              class="ju-sb"
              @click="clickItem('PersonalCenter/AboutUs')"
            >
              <div>
                <img
                  src="../../assets/image/PersonalCenter/index/my_icon_about@2x.png"
                  alt
                />
                <span class="fs30 cldce2f2">{{
                  $t("PersonalCenter.index.GuanYuWoMen")
                }}</span>
              </div>
            </li>
            <div class="h_line "></div>
          </ul>
        </div>
        <div class="personal_footer">
          <div @click="clickItem('PersonalCenter/HelpCenter')">
            <span class="fs30 cldce2f2">{{
              $t("PersonalCenter.index.BangZhuZhongXin")
            }}</span>
          </div>
          <div class="s_line">|</div>
          <div @click="clickItem('PersonalCenter/InviteFriends', true)">
            <span class="fs30 cldce2f2">{{
              $t("PersonalCenter.index.YaoQingHaoYou")
            }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      locale: "",
      token: "",
      my_asset: 0,
      nickName: "",
      email: "",
      UID: "",
      mobile: "",
      safeLeavel: "",
      demoVal: "",
      show: false,
      defaultStyle: {
        height: "100%",
        width: "85%",
        "background-color": "#151A36"
      }
    };
  },
  props: {
    visible: { type: Boolean, default: false },
    position: { type: String, default: "left" }
  },
  watch: {
    visible (val) {
      this.show = val;
    },
    show (val) {
      if (!val) {
        this.$emit("update:visible", val);
      }
    }
  },
  computed: {
    countNum: function () {
      return this.$store.state.allInfoNum;
    }
  },
  created () { },
  mounted () {
    this.$nextTick(() => {
      this.locale = this.$store.state.locale;
      this.token = this.$store.state.token;
      this.show = this.$store.state.personalCenter;
      if (this.token) {
        this.getUserInfo();
      }
    });
  },
  methods: {
    /**
     * 获取 所有币种的总额
     */
    getMyIncome () {
      Promise.all([
        this.$api.myAssets.getOTCAssets(),
        this.$api.myAssets.getMatchAssets(false),
        this.$api.myAssets.getPowerAssets(false)
      ]).then(res => {
        let data = res.map(item => {
          if (item.data.code === 200) {
            return item.data.data.btcTotal;
          }
        });
        this.my_asset = data.reduce((a, b) => {
          return this.$Calculation.accAdd(a, b);
        });
      });
    },
    //获取用户信息
    getUserInfo () {
      this.$api.BusinessApplication.getAccountSafe().then(res => {
        if (res.data.code === 200) {
          let data = res.data.data;
          this.nickName = data.name;
          this.email = data.emailStatus ? data.email : "";
          this.mobile = data.mobileStatus ? data.mobile : "";
          this.UID = data.uid ? data.uid : "";
          this.getSafeLeavel(data.secretStatus, data.capitalStatus);
        }
      });
    },

    //获得所有未读消息数量
    getCountNotRead () {
      // this.$api.wsBuy.countNotRead().then(res => {
      //   if (res.data.code === 200) {
      //     this.$store.commit("SET_ALLINFONUM", res.data.data);
      //   }
      // });
    },

    //点击每一项, 跳转
    clickItem (path, isNeedLogin) {
      if (this.$store.state.UserInfo.mobileStatus != 1) {
        this.$router.push({ path: `/${this.locale}/PersonalCenter/QuickSet` });
        return;
      } else if (this.$store.state.UserInfo.capitalStatus != 1) {
        this.$router.push({ path: `/${this.locale}/PersonalCenter/QuickSet` });
        return;
      }
      this.$router.push({ path: `/${this.locale}/${path}` });
    },

    // 获取安全等级
    getSafeLeavel (isBindGoogleState, isBindMoneyState) {
      if (isBindMoneyState === 0 && isBindGoogleState === 0) {
        this.safeLeavel = 0;
      } else if (isBindMoneyState === 1 && isBindGoogleState === 1) {
        this.safeLeavel = 2;
      } else {
        this.safeLeavel = 1;
      }
    }
  }
};
</script>
<style lang="scss">
.personalCenterBox {
  height: '100%';
  width: '85%';
  background-color: '#151A36';
}
.PersonalCenter-wrap {
  overflow-x: hidden;
  .personal_footer {
    width: 100%;
    padding: 0.02rem 0.76rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // position: absolute;
    // bottom:0;
    .s_line {
      display: inline-block;
      height: 0.8rem;
      width: 0.02rem;
      border: 0;
      background-color: #333d63;
    }
  }
  .h_line {
    margin: 0.1rem 0;
    display: inline-block;
    height: 0.02rem;
    width: 100%;
    border: 0;
    background-color: #333d63;
  }
  .line_margin_top_60 {
    margin-top: 0.6rem;
  }
  .security_level {
    position: absolute;
    background-color: #17bc95;
    display: inline-block;
    color: #ffffff;
    padding: 0.1rem 0.21rem;
    right: -0.36rem;
    top: -0.5rem;
    border-radius: 0.2rem 0 0 0.2rem;
  }
  .top-wrap {
    height: 2.8rem;
    position: relative;
    // background-image: url("../../assets/image/PersonalCenter/index/bg_personal_center.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .info-num-wrap {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.42rem;
      .info-num {
        display: inline-block;
        padding: 0 0.07rem;
        border-radius: 0.15rem;
        height: 0.3rem;
        line-height: 0.28rem;
        background: #fe3174;
        position: absolute;
        top: -0.1rem;
        right: -0.1rem;
      }
    }

    .name-wrap {
      width: 80%;
      padding-bottom: 0.1rem;

      i {
        margin-left: 0.2rem;
      }
    }

    .phone-num {
      margin-left: 0.47rem;
      text-decoration: underline;
    }

    .only-name {
      position: absolute;
      bottom: -0.5rem;
      right: 0.3rem;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      border-radius: 50%;
      background: linear-gradient(
        30deg,
        rgba(34, 192, 172, 1),
        rgba(96, 182, 89, 1)
      );
    }
  }

  .contact-wrap {
    box-sizing: border-box;
    .mark-wrap {
      padding: 0.15rem 0.2rem;
      background-color: #1e2643;
      border-radius: 0.12rem;
      & > div:last-child {
        width: 2rem;
        text-align: right;
      }

      .mark-text {
        width: 3.1rem;
        padding-top: 0.2rem;
        line-height: 0.3rem;
        margin-left: 0.3rem;
      }
    }

    .item-wrap {
      padding: 0.2rem 0.1rem;
      box-sizing: border-box;
      li {
        height: 0.94rem;
        line-height: 0.94rem;
      }
      i {
        font-size: 0.5rem;
        margin-right: 0.4rem;
      }
      img {
        width: 0.5rem;
        height: 0.5rem;
        position: relative;
        top: 0.15rem;
        margin-right: 0.4rem;
      }
    }
  }
}
</style>
