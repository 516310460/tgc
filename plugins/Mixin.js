import Vue from "vue";
const mixin = {
  methods: {
    //点击导航栏左上角的"<"图标
    Mixin_clickNavLeftBack() {
      //返回path
      let backpath = this.$route.query.backpath || "";
      switch (backpath) {
        case 'home':
          this.$router.replace('/');
          break;
        default:
          this.$router.back();
          break;
      }
    },

    /**
     * 校验密码
     * @return {boolean}
     */
    Mixin_testPassword(psw, str) {
      let test1 = /^(?!\d+$)(?![a-zA-Z]+$)/;
      let test2 = /\s/;
      let test3 = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      if (!psw) {
        let lang = this.$store.state.locale;
        if (lang != 'en-US') {
          this.$Toast(`${str}${this.$t('H5common.passVerify1')}`);
        }
        else {

        }
        return false;
      }
      if (psw.length < 8 || psw.length > 20) {
        let lang = this.$store.state.locale;
        if (lang != 'en-US') {
          this.$Toast(`${this.$t('H5common.passVerify2')}${str}${this.$t('H5common.passVerify3')}`);
        }
        else {

        }
        return false;
      }
      if (!(test1.test(psw))) {

        let lang = this.$store.state.locale;
        if (lang != 'en-US') {
          this.$Toast(`${str}${this.$t('H5common.passVerify4')}`);
        }
        else {

        }
        return false;
      }

      if (test2.test(psw)) {
        let lang = this.$store.state.locale;
        if (lang != 'en-US') {
          this.$Toast(`${str}${this.$t('H5common.passVerify4')}`);
        }
        else {

        }
        return false;
      }
      if (test3.test(psw)) {
        let lang = this.$store.state.locale;
        if (lang != 'en-US') {
          this.$Toast(`${str}${this.$t('H5common.passVerify5')}`);
        }
        else {

        }
        return false;
      }
      return true
    },

    //限制数字的输入..
    limitInputNum(str, before, after, state) {
      let that = this;
      if (str.indexOf(".") >= 0) {
        let attr1 = str.split(".")[0];
        let attr2 = str.split(".")[1];
        that[attr1][attr2] = that.$commonFn.limitInputNum(
          that[attr1][attr2],
          before,
          after,
          state
        );
      }
      else {
        that[str] = that.$commonFn.limitInputNum(
          that[str],
          before,
          after,
          state
        );
      }
    },

    //只能输入数字, 不能输入小数点, 可以是'0'开头 --- 主要应用于: 邮箱验证码,谷歌验证码
    Mixin_onlyInputNum(str) {
      let that = this;
      if (str.indexOf(".") >= 0) {
        let attr1 = str.split(".")[0];
        let attr2 = str.split(".")[1];
        that[attr1][attr2] = that[attr1][attr2].replace(/\D/g, '');
      }
      else {
        that[str] = that[str].replace(/\D/g, '');
      }
    },
  }
};

Vue.mixin(mixin);
