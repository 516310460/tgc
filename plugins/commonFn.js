// import { Notification, Message } from "element-ui"
import {
  Toast,
  Dialog,
  Notify
} from "vant";
import md5 from "js-md5";
import zhCN from "~/locales/zh-CN.js";
import zhTW from "~/locales/zh-TW.js";
import enUS from "~/locales/en-US.js";
import { CountUp } from 'countup.js';

// export default (context, inject) => {
//   context.$Toast = Vant.Toast
//   inject("Toast", Vant.Toast)
// }

// 定义全局的邮箱正则表达式
const emailReg = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+\.){1,63}[a-zA-Z0-9]+$/;
// 定义全局的手机号码正则表达式
const phoneReg = /^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/;
//固定电话正则表达式
const Telephone = /^[0-9][\d]{2,3}-[\d]{7,8}$/;

export default (context, inject) => {
  
  // 公共函数对象..
  const commonFn = {

    //复制成功
    onCopy () {
      Toast("复制成功");
    },

    // 路由跳转
    toUrl(url){
      context.store.commit("SET_TOKEN", "");
      context.app.router.replace({
        path: `/${context.store.state.locale}/${url || ''}`
      }).catch(err => err)
    },

    //k线转换例如：1转换为10 2转换为100
    Transformation(num) {
      let numStr = "1";
      for (var i = 0; i < num; i++) {
        numStr += "0";
      }
      return numStr;
    },

    getOs() {
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        return "MSIE";
      }
      if (navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
      }
      if (navigator.userAgent.indexOf("Safari") > 0) {
        return "Safari";
      }
      if (navigator.userAgent.indexOf("Camino") > 0) {
        return "Camino";
      }
      if (navigator.userAgent.indexOf("Gecko/") > 0) {
        return "Gecko";
      }
    },

    // 全局的错误码提示
    globalErrorCodeHint(response) {
      if (
        Object.keys(zhCN.Plugins.ResponseErrMsg).includes(
          `msg${response.data.code}`
        ) ||
        Object.keys(zhTW.Plugins.ResponseErrMsg).includes(
          `msg${response.data.code}`
        ) ||
        Object.keys(enUS.Plugins.ResponseErrMsg).includes(
          `msg${response.data.code}`
        )
      ) {
        // 如果提示包含就按照对应的翻译提示
        context.$ResponseErrMsg.ErrCodeMsg(response.data.code);
      } else {
        // 否则就直接提示500
        context.$ResponseErrMsg.ErrCodeMsg(500);
      }
    },

    // 当前的语言..
    currentLanguage(locale) {
      let currentLanguage = "";
      switch (locale) {
        case "zh-CN":
          currentLanguage = zhCN;
          break;
        case "zh-TW":
          currentLanguage = zhTW;
          break;
        case "en-US":
          currentLanguage = enUS;
          break;
      }
      return currentLanguage;
    },

    // 消息提示
    TipsMessage(
      Msg = "",
      Type = "warning",
      Time = 3000,
      IsCenter = true,
      IsHTML = false
    ) {
      Message({
        type: Type,
        center: IsCenter,
        duration: Time,
        dangerouslyUseHTMLString: IsHTML,
        message: Msg
      });
    },

    // 消息通知
    TipsNotification(locale, msg) {
      console.log(locale, msg);
      let Language = commonFn.currentLanguage(locale);
      let NotificationMSG = Language.Plugins.commonFn.TipsNotification;
      Notification.success({
        title: NotificationMSG.title,
        position: "bottom-right",
        dangerouslyUseHTMLString: true,
        offset: 40,
        message: msg
      });
    },

    // 根据币种id , 渲染币种文本..
    renderCurrencyText: id => {
      let str = "";
      let NumberID = Number(id);
      switch (NumberID) {
        case 1:
          str = "BTC";
          break;
        case 2:
          str = "EOS";
          break;
        case 3:
          str = "BCH";
          break;
        case 4:
          str = "ETH";
          break;
        case 5:
          str = "ETC";
          break;
        case 6:
          str = "XBIT";
          break;
      }
      return str;
    },

    // 过滤非数字的字符串, 只保留数字.
    filterStrRetainNumber: (obj, dataAttr) => {
      if (dataAttr.indexOf(".") >= 0) {
        let arr = dataAttr.split(".");
        let val = obj[arr[0]][arr[1]].replace(/[^\d]/g, "");
        obj[arr[0]][arr[1]] = val;
      } else {
        let val = obj[dataAttr].replace(/[^\d]/g, "");
        obj[dataAttr] = val;
      }
    },

    // 返回时间格式 '2018-06-06 15:00:00'
    getCurrentTime: () => {
      let time = new Date();
      let year = time.getFullYear();
      let mouth =
        time.getMonth() + 1 < 10 ?
        "0" + (time.getMonth() + 1) :
        time.getMonth() + 1;
      let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
      let hours =
        time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
      let minutes =
        time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      let seconds =
        time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();

      return (
        year +
        "-" +
        mouth +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },

    // 限制输入的数字..
    limitInputNum(value, before, after, state = true) {
      // input框的类型必须是text...
      // value,输入框传输的值..
      // before,指定小数点前面的位数..
      // after, 指定小数点后面的位数..
      // state, 是否可以输入小数点, 默认为true,可以输入小数点..false, 不能输入小数点.
      value = value.toString().replace("。", ".");
      let newBefore = parseFloat(before);
      let newAfter = parseFloat(after);
      value = value.replace(/[^ \d.]|\s|^\./g, "");
      value = value.replace(/^0{2,}/g, "0");
      if (state) {
        value = value.replace(/\.{2,}/g, ".");
      } else {
        value = value.replace(/\./g, "");
      }
      value = value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      if (value.indexOf(".") >= 0) {
        value =
          value.split(".")[0].slice(0, newBefore) +
          "." +
          value.split(".")[1].slice(0, newAfter);
        return value;
      } else {
        value = value.slice(0, newBefore);
        return parseFloat(value) || value;
      }
    },

    // 消息中心状态，返回文本..
    MessageBroadcasting(data, TextState = false, userId, userName, locale) {
      let orderMsg = "";
      let toData = "";
      let url = "";
      let state = "";
      let OrderNumber = data.extendData;
      let Language = commonFn.currentLanguage(locale);
      let Broadcasting = Language.Plugins.commonFn.MessageBroadcasting;
      if (userId === data.from.id) {
        toData = data.msgCenterExtendData.fromData;
        url = toData.fromUrl;
        state = toData.code;
      } else {
        toData = data.msgCenterExtendData.toData;
        url = toData.toUrl;
        state = toData.code;
      }
      let ToName = data.to.name === userName ? data.from.name : data.to.name;
      switch (state) {
        // OTC
        case "msg_otc_001":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_001_1}${toData.adId}${Broadcasting.msg_otc_001_2}<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_001_3}${OrderNumber}${Broadcasting.msg_otc_001_4}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_001_1}${toData.adId}${Broadcasting.msg_otc_001_2}<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_001_3}${OrderNumber}${Broadcasting.msg_otc_001_4}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_002":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_002_1}<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_002_2}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_002_1}<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_002_2}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_003":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_003_1}${OrderNumber}${Broadcasting.msg_otc_003_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_003_1}${OrderNumber}${Broadcasting.msg_otc_003_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_004":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_004_1}${OrderNumber}${Broadcasting.msg_otc_004_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_004_1}${OrderNumber}${Broadcasting.msg_otc_004_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_005":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_005_1}${OrderNumber}${Broadcasting.msg_otc_005_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_005_1}${OrderNumber}${Broadcasting.msg_otc_005_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_006":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_006_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_006_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_007":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_007_1}${OrderNumber}${Broadcasting.msg_otc_007_2}<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_007_3}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_007_1}${OrderNumber}${Broadcasting.msg_otc_007_2}<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_007_3}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_008":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_008_1}${OrderNumber}${Broadcasting.msg_otc_008_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_008_1}${OrderNumber}${Broadcasting.msg_otc_008_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_009":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_009_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_009_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_010":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_010_1}${OrderNumber}${Broadcasting.msg_otc_010_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_otc_010_1}${OrderNumber}${Broadcasting.msg_otc_010_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_011":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_011_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_011_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_otc_012":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_otc_012_1}${OrderNumber}${Broadcasting.msg_otc_012_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_otc_012_1}${OrderNumber}${Broadcasting.msg_otc_012_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
          // 一口价
        case "msg_fixprice_001":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_001_1}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_001_1}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `${orderMsg}`);
          }
          break;
        case "msg_fixprice_002":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_002_1}${OrderNumber}${Broadcasting.msg_fixprice_002_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_002_1}${OrderNumber}${Broadcasting.msg_fixprice_002_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_003":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_003_1}${OrderNumber}${Broadcasting.msg_fixprice_003_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_003_1}${OrderNumber}${Broadcasting.msg_fixprice_003_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_004":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_004_1}${OrderNumber}${Broadcasting.msg_fixprice_004_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_004_1}${OrderNumber}${Broadcasting.msg_fixprice_004_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_005":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_005_1}${OrderNumber}${Broadcasting.msg_fixprice_005_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_005_1}${OrderNumber}${Broadcasting.msg_fixprice_005_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_006":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_006_1}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_006_1}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_007":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_007_1}${OrderNumber}${Broadcasting.msg_fixprice_007_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_007_1}${OrderNumber}${Broadcasting.msg_fixprice_007_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_008":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_009":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_009_1}${OrderNumber}${Broadcasting.msg_fixprice_009_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_009_1}${OrderNumber}${Broadcasting.msg_fixprice_009_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_010":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_010_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_010_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_011":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_011_1}${OrderNumber}${Broadcasting.msg_fixprice_011_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_011_1}${OrderNumber}${Broadcasting.msg_fixprice_011_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_012":
          if (TextState) {
            if (data.msgCenterExtendData.isFixPrice) {
              // 是一口价
              orderMsg = `${Broadcasting.msg_fixprice_012_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            } else {
              // 是广告
              orderMsg = `${Broadcasting.msg_fixprice_014_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            }
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_012_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_013":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_013_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_013_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_014":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_014_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_014_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_015":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_015_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_015_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_fixprice_016":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_016_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_016_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
          // 集合竞价
        case "mgs_callAuction_001":
          if (TextState) {
            orderMsg = `${Broadcasting.mgs_callAuction_001_1}${toData.tnum}${Broadcasting.mgs_callAuction_001_2}${toData.amount} ${toData.launchCoin}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.mgs_callAuction_001_1}${toData.tnum}${Broadcasting.mgs_callAuction_001_2}${toData.amount} ${toData.launchCoin}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `${orderMsg}`);
          }
          break;
        case "mgs_callAuction_002":
          if (TextState) {
            if (locale == "en-US") {
              orderMsg = `${Broadcasting.mgs_callAuction_002_1}${toData.amount} ${toData.launchCoin} in ${toData.tnum}${Broadcasting.mgs_callAuction_002_4}${toData.surplus} ${toData.launchCoin}${Broadcasting.msg_Symbol_001}`;
            } else {
              orderMsg = `${Broadcasting.mgs_callAuction_002_1}${toData.tnum}${Broadcasting.mgs_callAuction_002_2}${toData.amount}${Broadcasting.mgs_callAuction_002_3}${toData.launchCoin}${Broadcasting.mgs_callAuction_002_4}${toData.surplus}${toData.launchCoin}${Broadcasting.msg_Symbol_001}`;
            }
          } else {
            if (locale == "en-US") {
              orderMsg = `${Broadcasting.mgs_callAuction_002_1}${toData.amount} ${toData.launchCoin} in ${toData.tnum}${Broadcasting.mgs_callAuction_002_4}${toData.surplus} ${toData.launchCoin}${Broadcasting.msg_Symbol_001}`;
            } else {
              orderMsg = `${Broadcasting.mgs_callAuction_002_1}${toData.tnum}${Broadcasting.mgs_callAuction_002_2}${toData.amount}${Broadcasting.mgs_callAuction_002_3}${toData.launchCoin}${Broadcasting.mgs_callAuction_002_4}${toData.surplus}${toData.launchCoin}${Broadcasting.msg_Symbol_001}`;
            }
            this.TipsNotification(locale, `${orderMsg}`);
          }
          break;
        case "mgs_callAuction_003":
          if (TextState) {
            if (locale == "en-US") {
              orderMsg = `${Broadcasting.mgs_callAuction_003_1}${toData.tnum}${Broadcasting.mgs_callAuction_003_2}${toData.orderId}${Broadcasting.mgs_callAuction_003_3}${Broadcasting.msg_Symbol_001}`;
            } else {
              orderMsg = `${Broadcasting.mgs_callAuction_003_1}${toData.tnum}${Broadcasting.mgs_callAuction_003_2}${toData.orderId}${Broadcasting.mgs_callAuction_003_3}${Broadcasting.msg_Symbol_001}`;
            }
          } else {
            if (locale == "en-US") {
              orderMsg = `${Broadcasting.mgs_callAuction_003_1}${toData.tnum}${Broadcasting.mgs_callAuction_003_2}${toData.orderId}${Broadcasting.mgs_callAuction_003_3}${Broadcasting.msg_Symbol_001}`;
            } else {
              orderMsg = `${Broadcasting.mgs_callAuction_003_1}${toData.tnum}${Broadcasting.mgs_callAuction_003_2}${toData.orderId}${Broadcasting.mgs_callAuction_003_3}${Broadcasting.msg_Symbol_001}`;
            }
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "mgs_callAuction_004":
          if (TextState) {
            orderMsg = `${Broadcasting.mgs_callAuction_004_1}${OrderNumber}${Broadcasting.mgs_callAuction_004_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.mgs_callAuction_004_1}${OrderNumber}${Broadcasting.mgs_callAuction_004_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "mgs_callAuction_005":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.mgs_callAuction_005_1}${OrderNumber}${Broadcasting.mgs_callAuction_005_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.mgs_callAuction_005_1}${OrderNumber}${Broadcasting.mgs_callAuction_005_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "mgs_callAuction_006":
          if (TextState) {
            orderMsg = `${Broadcasting.mgs_callAuction_006_1}${OrderNumber}${Broadcasting.mgs_callAuction_006_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.mgs_callAuction_006_1}${OrderNumber}${Broadcasting.mgs_callAuction_006_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "mgs_callAuction_007":
          if (TextState) {
            orderMsg = `${Broadcasting.mgs_callAuction_007_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.mgs_callAuction_007_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "mgs_callAuction_008":
          if (TextState) {
            orderMsg = `${Broadcasting.mgs_callAuction_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.mgs_callAuction_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "mgs_callAuction_009":
          if (TextState) {
            orderMsg = `${Broadcasting.mgs_callAuction_009_1}${OrderNumber}${Broadcasting.mgs_callAuction_009_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.mgs_callAuction_009_1}${OrderNumber}${Broadcasting.mgs_callAuction_009_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `${orderMsg}`);
          }
          break;
        case "mgs_callAuction_010":
          if (TextState) {
            if (locale == "en-US") {
              orderMsg = `${Broadcasting.mgs_callAuction_010_1}${toData.tnum}${Broadcasting.mgs_callAuction_010_2}${toData.launchCoin}${Broadcasting.mgs_callAuction_010_3}${toData.amount}${Broadcasting.mgs_callAuction_010_4}`;
            } else {
              orderMsg = `${Broadcasting.mgs_callAuction_010_1}${toData.tnum}${Broadcasting.mgs_callAuction_010_2}${toData.launchCoin}${Broadcasting.mgs_callAuction_010_3}${toData.amount}${Broadcasting.mgs_callAuction_010_4}`;
            }
          } else {
            if (locale == "en-US") {
              orderMsg = `${Broadcasting.mgs_callAuction_010_1}${toData.tnum}${Broadcasting.mgs_callAuction_010_2}${toData.launchCoin}${Broadcasting.mgs_callAuction_010_3}${toData.amount}${Broadcasting.mgs_callAuction_010_4}`;
              this.TipsNotification(locale, `${orderMsg}`);
            } else {
              orderMsg = `${Broadcasting.mgs_callAuction_010_1}${toData.tnum}${Broadcasting.mgs_callAuction_010_2}${toData.launchCoin}${Broadcasting.mgs_callAuction_010_3}${toData.amount}${Broadcasting.mgs_callAuction_010_4}`;
              this.TipsNotification(locale, `${orderMsg}`);
            }
          }
          break;
          // 币同城
        case "msg_coinCity_001":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_001_1}${OrderNumber}${Broadcasting.msg_coinCity_001_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_001_1}${OrderNumber}${Broadcasting.msg_coinCity_001_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_002":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_002_1}${OrderNumber}${Broadcasting.msg_coinCity_002_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_002_1}${OrderNumber}${Broadcasting.msg_coinCity_002_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_003":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_coinCity_003_1}${OrderNumber}${Broadcasting.msg_coinCity_003_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_coinCity_003_1}${OrderNumber}${Broadcasting.msg_coinCity_003_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_004":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_004_1}${OrderNumber}${Broadcasting.msg_coinCity_004_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_004_1}${OrderNumber}${Broadcasting.msg_coinCity_004_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_005":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_005}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_005}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_006":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_coinCity_006_1}${OrderNumber}${Broadcasting.msg_coinCity_006_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_coinCity_006_1}${OrderNumber}${Broadcasting.msg_coinCity_006_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_007":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_007}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_007}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_008":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_008_1}${OrderNumber}${Broadcasting.msg_coinCity_008_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_008_1}${OrderNumber}${Broadcasting.msg_coinCity_008_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_009":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_009}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_009}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_010":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_010_1}${OrderNumber}${Broadcasting.msg_coinCity_010_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_010_1}${OrderNumber}${Broadcasting.msg_coinCity_010_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_011":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_011}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_011}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_coinCity_012":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_coinCity_012}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_coinCity_012}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
          // 秒杀活动
        case "msg_activities_001":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_001_1}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_001_1}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `${orderMsg}`);
          }
          break;
        case "msg_activities_002":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_002_1}${OrderNumber}${Broadcasting.msg_fixprice_002_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_002_1}${OrderNumber}${Broadcasting.msg_fixprice_002_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_003":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_003_1}${OrderNumber}${Broadcasting.msg_fixprice_003_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_003_1}${OrderNumber}${Broadcasting.msg_fixprice_003_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_004":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_004_1}${OrderNumber}${Broadcasting.msg_fixprice_004_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_004_1}${OrderNumber}${Broadcasting.msg_fixprice_004_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_005":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_005_1}${OrderNumber}${Broadcasting.msg_fixprice_005_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_005_1}${OrderNumber}${Broadcasting.msg_fixprice_005_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_006":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_006_1}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_006_1}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_007":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_007_1}${OrderNumber}${Broadcasting.msg_fixprice_007_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_007_1}${OrderNumber}${Broadcasting.msg_fixprice_007_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_008":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_009":
          if (TextState) {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_009_1}${OrderNumber}${Broadcasting.msg_fixprice_009_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `<span style='color:#02AD8F'>${ToName}</span>${Broadcasting.msg_fixprice_009_1}${OrderNumber}${Broadcasting.msg_fixprice_009_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_010":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_010_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_010_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_011":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_011_1}${OrderNumber}${Broadcasting.msg_fixprice_011_2}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_011_1}${OrderNumber}${Broadcasting.msg_fixprice_011_2}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_012":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_012_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_012_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_013":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_013_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_013_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_014":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_014_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_014_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_015":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_015_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_015_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        case "msg_activities_016":
          if (TextState) {
            orderMsg = `${Broadcasting.msg_fixprice_016_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
          } else {
            orderMsg = `${Broadcasting.msg_fixprice_016_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`;
            this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`);
          }
          break;
        default:
          return;
      }
      return orderMsg;
    },

    // 根据集合竞价信息状态，返回文本..
    AggregateOrderMsg: (state, role, locale) => {
      let orderMsg = "";
      let Language = commonFn.currentLanguage(locale);
      let OrderMsg = Language.Plugins.commonFn.AggregateOrderMsg;
      switch (state) {
        case 0:
          orderMsg = OrderMsg.state0;
          break;
        case 1:
          if (role) {
            orderMsg = OrderMsg.state1_1;
          } else {
            orderMsg = OrderMsg.state1_2;
          }
          console.log(orderMsg);
          break;
        case 2:
          if (role) {
            orderMsg = OrderMsg.state2_1;
          } else {
            orderMsg = OrderMsg.state2_2;
          }
          break;
        case 3:
          orderMsg = OrderMsg.state3;
          break;
        default:
          orderMsg = OrderMsg.error;
      }
      return orderMsg;
    },

    // 根据币同城担保订单信息状态, 返回文本..
    initCoinCityOrderMsg: (state, role, text, currency, locale, itemName) => {
      let orderMsg = "";
      let Language = commonFn.currentLanguage(locale);
      let OrderMsg = Language.Plugins.commonFn.initCoinCityOrderMsg;
      switch (state) {
        case 0:
          if (role === 1) {
            orderMsg = itemName + OrderMsg.state0_2;
          } else {
            orderMsg = OrderMsg.state0_1;
          }
          break;
        case 1:
          if (role === 1) {
            orderMsg = OrderMsg.state1_2;
          } else {
            orderMsg = OrderMsg.state1_1;
          }
          break;
        case 2:
          if (role === 1) {
            orderMsg = OrderMsg.state2_2;
          } else {
            orderMsg = OrderMsg.state2_1;
          }
          break;
        case 3:
          if (role === 1) {
            orderMsg = OrderMsg.state3_2;
          } else {
            orderMsg = OrderMsg.state3_1;
          }
          break;
        case 4:
          orderMsg = OrderMsg.state4;
          break;
        case 8:
          orderMsg = OrderMsg.state8;
          break;
        case 9:
          orderMsg = OrderMsg.state9;
          break;
        case 10:
          orderMsg = OrderMsg.state10;
          break;
        default:
          orderMsg = OrderMsg.error;
      }
      return orderMsg;
    },

    // // 根据订单信息状态, 返回文本..
    // initOrderMsg: (
    //   item,
    //   state,
    //   role,
    //   text,
    //   currency,
    //   locale,
    //   IsBusiness,
    //   currencyUserId,
    //   currencyNum,
    //   XBITNum
    // ) => {
    //   let orderMsg = ""
    //   let Language = commonFn.currentLanguage(locale)
    //   let OrderMsg = Language.Plugins.commonFn.initOrderMsg
    //   let MessageBroadcasting = Language.Plugins.commonFn.MessageBroadcasting
    //   let payTypeObjInfo = Language.OTC.BuyAndSellFixedPrice
    //   let OthersName =
    //     item.from.id == currencyUserId ? item.to.name : item.from.name; //对方名称
    //   let MyName =
    //     item.from.id == currencyUserId ? item.from.name : item.to.name; //我的名称
    //   let payTypeObj = {}
    //   let str = ""; //字符串拼接
    //   switch (state) {
    //     case 1:
    //       if (IsBusiness) {
    //         if (role !== "buy") {
    //           orderMsg = `${OthersName}${
    //             OrderMsg.stateBusiness1_1_1
    //           }${currency}${OrderMsg.stateBusiness1_1_2}`
    //         } else {
    //           orderMsg = `${OthersName}${
    //             OrderMsg.stateBusiness1_2_1
    //           }${currency}${OrderMsg.stateBusiness1_2_2}`
    //         }
    //       } else {
    //         if (role === "buy") {
    //           orderMsg = OrderMsg.stateUser1_1
    //         } else {
    //           orderMsg = OrderMsg.stateUser1_2
    //         }
    //       }
    //       break
    //     case 2:
    //       if (IsBusiness) {
    //         if (role !== "buy") {
    //           //判断消息是否存在 存在进行json对象解释
    //           if (text) {
    //             // 昵称: nickName 支付类型: payWay 支付卡号: payAccount 是否商家: BusinessCoinNameState
    //             payTypeObj = JSON.parse(text)
    //           }
    //           //判断类型
    //           if (payTypeObj.payType === 1) {
    //             str +=
    //               payTypeObjInfo.bankName +
    //               payTypeObj.payName +
    //               payTypeObjInfo.bankCarNum +
    //               payTypeObj.payAccount
    //           } else if (payTypeObj.payType === 2) {
    //             str += payTypeObjInfo.alipayAccount + payTypeObj.payAccount
    //           } else if (payTypeObj.payType === 3) {
    //             str += payTypeObjInfo.wechatAccount + payTypeObj.payAccount
    //           }
    //           //是否是商家
    //           if (payTypeObj.BusinessCoinNameState) {
    //             str = `${payTypeObjInfo.Business}${
    //               payTypeObjInfo.infoText1
    //             }（${str}）`
    //           } else {
    //             str = `${payTypeObj.nickName}${
    //               payTypeObjInfo.infoText1
    //             }（${str}）`
    //           }
    //           orderMsg = str + OrderMsg.stateBusiness2_1
    //         } else {
    //           orderMsg = OrderMsg.stateBusiness2_2
    //         }
    //       } else {
    //         if (role === "buy") {
    //           orderMsg = OrderMsg.stateUser2_1
    //         } else {
    //           //判断消息是否存在 存在进行json对象解释
    //           if (text) {
    //             payTypeObj = JSON.parse(text)
    //           }
    //           //判断类型
    //           if (payTypeObj.payType === 1) {
    //             str +=
    //               payTypeObjInfo.bankName +
    //               payTypeObj.payName +
    //               payTypeObjInfo.bankCarNum +
    //               payTypeObj.payAccount
    //           } else if (payTypeObj.payType === 2) {
    //             str += payTypeObjInfo.alipayAccount + payTypeObj.payAccount
    //           } else if (payTypeObj.payType === 3) {
    //             str += payTypeObjInfo.wechatAccount + payTypeObj.payAccount
    //           }
    //           //是否是商家
    //           if (payTypeObj.BusinessCoinNameState) {
    //             str = `${payTypeObjInfo.Business}${
    //               payTypeObjInfo.infoText1
    //             }（${str}）`
    //           } else {
    //             str = `${payTypeObj.nickName}${
    //               payTypeObjInfo.infoText1
    //             }（${str}）`
    //           }
    //           orderMsg = str + OrderMsg.stateUser2_2
    //         }
    //       }
    //       break
    //     case 6:
    //       if (IsBusiness) {
    //         if (role !== "buy") {
    //           if (currency == "XBIT") {
    //             orderMsg =
    //               OrderMsg.stateBusiness6_1_1 +
    //               currency +
    //               OrderMsg.stateBusiness6_1_2
    //           } else {
    //             if (XBITNum) {
    //               // 判断非USDT
    //               orderMsg =
    //                 OrderMsg.stateBusiness6_2_1 +
    //                 currency +
    //                 OrderMsg.stateBusiness6_2_2 +
    //                 currency +
    //                 OrderMsg.stateBusiness6_2_3 +
    //                 XBITNum +
    //                 OrderMsg.stateBusiness6_2_4
    //             } else {
    //               // 判断USDT
    //               orderMsg =
    //                 OrderMsg.stateBusiness6_2_1 +
    //                 currency +
    //                 OrderMsg.stateBusiness6_2_2_1 +
    //                 currency
    //             }
    //           }
    //         } else {
    //           if (currency == "XBIT") {
    //             orderMsg =
    //               OrderMsg.stateBusiness6_3_1 +
    //               XBITNum +
    //               OrderMsg.stateBusiness6_3_2
    //           } else {
    //             if (XBITNum) {
    //               // 判断非USDT
    //               orderMsg =
    //                 OrderMsg.stateBusiness6_4_1 +
    //                 XBITNum +
    //                 OrderMsg.stateBusiness6_4_2
    //             } else {
    //               // 判断USDT
    //               orderMsg =
    //                 OrderMsg.stateBusiness6_3_1 +
    //                 currencyNum +
    //                 MessageBroadcasting.mgs_callAuction_002_3 +
    //                 currency
    //             }
    //           }
    //         }
    //       } else {
    //         if (role === "buy") {
    //           orderMsg =
    //             OrderMsg.stateUser6_1_1 + currency + OrderMsg.stateUser6_1_2
    //         } else {
    //           orderMsg =
    //             OrderMsg.stateUser6_2_1 +
    //             currency +
    //             OrderMsg.stateUser6_2_2 +
    //             currency
    //         }
    //       }
    //       break
    //     case 7:
    //       orderMsg = OrderMsg.state7_1
    //       break
    //     case 8:
    //       orderMsg = OrderMsg.state8_1
    //       break
    //     case 9:
    //       orderMsg = OrderMsg.state9_1
    //       break
    //     case 10:
    //       orderMsg = OrderMsg.state10_1
    //       break
    //     default:
    //       orderMsg = OrderMsg.error
    //   }
    //   return orderMsg
    // }
    // 根据订单信息状态, 返回文本..
    initOrderMsg: (
      item,
      state,
      role,
      text,
      currency,
      locale,
      IsBusiness,
      currencyUserId,
      currencyNum,
      BUSDNum
    ) => {
      let orderMsg = "";
      let Language = commonFn.currentLanguage(locale);
      let OrderMsg = Language.Plugins.commonFn.initOrderMsg;
      let MessageBroadcasting = Language.Plugins.commonFn.MessageBroadcasting;
      let payTypeObjInfo = Language.OTC.BuyAndSellFixedPrice;
      let OthersName =
        item.from.id == currencyUserId ? item.to.name : item.from.name; // 对方名称
      let MyName =
        item.from.id == currencyUserId ? item.from.name : item.to.name; // 我的名称
      let payTypeObj = {};
      let str = ""; // 字符串拼接
      switch (state) {
        case 1:
          if (IsBusiness) {
            if (role !== "buy") {
              orderMsg = `${OthersName}${OrderMsg.stateBusiness1_1_1}${currency}${OrderMsg.stateBusiness1_1_2}`;
            } else {
              orderMsg = `${OthersName}${OrderMsg.stateBusiness1_2_1}${currency}${OrderMsg.stateBusiness1_2_2}`;
            }
          } else {
            if (role === "buy") {
              orderMsg = OrderMsg.stateUser1_1;
            } else {
              orderMsg = OrderMsg.stateUser1_2;
            }
          }
          break;
        case 2:
          if (IsBusiness) {
            if (role !== "buy") {
              // 判断消息是否存在 存在进行json对象解释
              if (text) {
                // 昵称: nickName 支付类型: payWay 支付卡号: payAccount 是否商家: BusinessCoinNameState
                payTypeObj = JSON.parse(text);
              }
              // 判断类型
              if (payTypeObj.payType === 1) {
                str +=
                  payTypeObjInfo.bankName +
                  payTypeObj.payName +
                  " " +
                  payTypeObjInfo.bankCarNum +
                  payTypeObj.payAccount;
              } else if (payTypeObj.payType === 2) {
                str += payTypeObjInfo.alipayAccount + payTypeObj.payAccount;
              } else if (payTypeObj.payType === 3) {
                str += payTypeObjInfo.wechatAccount + payTypeObj.payAccount;
              }
              // 是否是商家
              if (payTypeObj.BusinessCoinNameState) {
                str = `${payTypeObjInfo.Business}${payTypeObjInfo.infoText1}（${str}）`;
              } else {
                str = `${payTypeObj.nickName}${payTypeObjInfo.infoText1}（${str}）`;
              }
              orderMsg = str + OrderMsg.stateBusiness2_1;
            } else {
              orderMsg = OrderMsg.stateBusiness2_2;
            }
          } else {
            if (role === "buy") {
              orderMsg = OrderMsg.stateUser2_1;
            } else {
              // 判断消息是否存在 存在进行json对象解释
              if (text) {
                payTypeObj = JSON.parse(text);
              }
              // 判断类型
              if (payTypeObj.payType === 1) {
                str +=
                  payTypeObjInfo.bankName +
                  payTypeObj.payName +
                  payTypeObjInfo.bankCarNum +
                  payTypeObj.payAccount;
              } else if (payTypeObj.payType === 2) {
                str += payTypeObjInfo.alipayAccount + payTypeObj.payAccount;
              } else if (payTypeObj.payType === 3) {
                str += payTypeObjInfo.wechatAccount + payTypeObj.payAccount;
              }
              // 是否是商家
              if (payTypeObj.BusinessCoinNameState) {
                str = `${payTypeObjInfo.Business}${payTypeObjInfo.infoText1}（${str}）`;
              } else {
                str = `${payTypeObj.nickName}${payTypeObjInfo.infoText1}（${str}）`;
              }
              orderMsg = str + OrderMsg.stateUser2_2;
            }
          }
          break;
        case 6:
          if (IsBusiness) {
            if (role !== "buy") {
              if (currency == "BUSD") {
                orderMsg =
                  OrderMsg.stateBusiness6_1_1 +
                  currency +
                  OrderMsg.stateBusiness6_1_2;
              } else {
                if (BUSDNum) {
                  // 判断非USDT
                  orderMsg =
                    OrderMsg.stateBusiness6_2_1 +
                    currency +
                    OrderMsg.stateBusiness6_2_2 +
                    currency;
                  // OrderMsg.stateBusiness6_2_3 +
                  // BUSDNum +
                  // OrderMsg.stateBusiness6_2_4
                } else {
                  // 判断USDT
                  if (locale == "en-US") {
                    orderMsg =
                      OrderMsg.stateBusiness6_2_1 +
                      currency +
                      OrderMsg.stateBusiness6_2_2_1 +
                      currency +
                      OrderMsg.stateBusiness6_2_2_2;
                  } else {
                    orderMsg =
                      OrderMsg.stateBusiness6_2_1 +
                      currency +
                      OrderMsg.stateBusiness6_2_2_1 +
                      currency;
                  }
                }
              }
            } else {
              if (currency == "BUSD") {
                orderMsg =
                  OrderMsg.stateBusiness6_3_1 +
                  BUSDNum +
                  OrderMsg.stateBusiness6_3_2;
              } else {
                if (BUSDNum) {
                  // 判断非USDT
                  if (locale == "en-US") {
                    orderMsg =
                      OrderMsg.stateBusiness6_4_1 +
                      // BUSDNum +
                      currencyNum +
                      currency +
                      OrderMsg.stateBusiness6_4_2;
                  } else {
                    orderMsg =
                      OrderMsg.stateBusiness6_4_1 +
                      // BUSDNum +
                      currencyNum +
                      OrderMsg.stateBusiness6_4_2 +
                      currency;
                  }
                } else {
                  // 判断USDT
                  if (locale == "en-US") {
                    orderMsg =
                      OrderMsg.stateBusiness6_3_1 +
                      currencyNum +
                      MessageBroadcasting.mgs_callAuction_002_3 +
                      currency +
                      MessageBroadcasting.mgs_callAuction_002_3_1;
                  } else {
                    orderMsg =
                      OrderMsg.stateBusiness6_3_1 +
                      currencyNum +
                      MessageBroadcasting.mgs_callAuction_002_3 +
                      currency;
                  }
                }
              }
            }
          } else {
            if (role === "buy") {
              orderMsg =
                OrderMsg.stateUser6_1_1 + currency + OrderMsg.stateUser6_1_2;
            } else {
              if (locale == "en-US") {
                orderMsg =
                  OrderMsg.stateUser6_2_1 +
                  currency +
                  OrderMsg.stateUser6_2_2 +
                  currency +
                  OrderMsg.stateUser6_2_3;
              } else {
                orderMsg =
                  OrderMsg.stateUser6_2_1 +
                  currency +
                  OrderMsg.stateUser6_2_2 +
                  currency;
              }
            }
          }
          break;
        case 7:
          orderMsg = OrderMsg.state7_1;
          break;
        case 8:
          orderMsg = OrderMsg.state8_1;
          break;
        case 9:
          orderMsg = OrderMsg.state9_1;
          break;
        case 10:
          orderMsg = OrderMsg.state10_1;
          break;
        default:
          orderMsg = OrderMsg.error;
      }
      return orderMsg;
    }
  };
  const newVant = {
    Notify(message) {
      Notify({
        message: message,
        duration: 1000
      });
    },
    Toast(message, state, IsSuccess, duration) {
      // 如果存在就是加载中倒计时显示
      if (state) {
        Toast.loading({
          mask: true, // 是否显示背景遮罩层
          message: message,
          duration: duration, // 倒计时时常
          className: "durationLoading"
        });
        // const timer = setInterval(() => {
        //   duration -= 1000;
        //   if (duration) {
        //     // toast.message = `倒计时 ${duration} 秒`
        //   } else {
        //     clearInterval(timer)
        //     Toast.fail({
        //       mask: true, // 是否显示背景遮罩层
        //       message: '请检查网络',
        //     })
        //   }
        // }, 1000)
      } else {
        // 轻提示
        Toast({
          duration: 800, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: "spinner",
          position: "bottom", //提示信息位置
          message: message
        });
      }
    }
  };
  context.$md5 = md5;
  inject("md5", md5);
  context.$Toast = newVant.Toast;
  inject("Toast", newVant.Toast);
  context.$Notify = newVant.Notify;
  inject("Notify", newVant.Notify);
  context.$Dialog = Dialog;
  inject("Dialog", Dialog);
  context.$commonFn = commonFn;
  inject("commonFn", commonFn);
  // 添加正则
  context.$emailReg = emailReg;
  inject("emailReg", emailReg);
  context.$phoneReg = phoneReg;
  inject("phoneReg", phoneReg);
  context.$Telephone = Telephone;
  inject("Telephone", Telephone);


  // 数字滚动
  context.$CountUp = CountUp;
  inject("CountUp", CountUp);
};
