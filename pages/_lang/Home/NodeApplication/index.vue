<template>
  <div class="NodeApplication">
    <van-nav-bar
      class="bk191D24-05 clffffff h092 fixed top-0 w-full z-10"
      left-arrow
    >
      <template #left>
        <van-icon
          @click="$router.back()"
          class="clffffff fs32"
          name="arrow-left"
        />
      </template>
      <template #title>
        <span class="fs32 font-bold clffffff">节点申请</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="t-092 relative ContentHeight overflow-y-auto"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <!-- 加载提示 -->
      <template #loading>
        <div class="fs22 flex items-center justify-center">
          <van-loading color="#02AD8F" />
          <span class="ml-1">加载中...</span>
        </div>
      </template>

      <div class="px-1 pb-1 cl3A53B8 fs24">
        <img
          src="~/assets/img/Home/nodeApplication.png"
          alt=""
        >
        <div class="py-1">
          <p>Tongtian Tower DYX 巨资打造闯关1.0去中心化链上交易平台，闯关交易平台Defei去中心化金融生态+Dapp链上交易</p>
        </div>

        <div class="py-1">
          <span class="p-01 rounded-full bk02AD8F fs24 clffffff font-semibold">01</span>
          <span class="cl02AD8F fs26">节点申请</span>
        </div>
        <div class="py-1">
          <p>《第一阶段：创世合伙人社区129万枚》</p>
          <p>1、创世合伙人100名；</p>
        </div>

        <div class="py-1">
          <span class="p-01 rounded-full bk02AD8F fs24 clffffff font-semibold">02</span>
          <span class="cl02AD8F fs26">考核标准</span>
        </div>
        <div class="py-1">
          <p>1、直推有效投票用户15人（有效用户：参与投票大于等于100USDT）</p>
          <p>2、团队有效投票用户200人；</p>
          <p class="mt-1">考核期限：</p>
          <p>1、考核期限为90天，每天考核一次，考核合格以后自动发放收益。</p>
          <p>2、连续90天考核不合格退回申请质押的USDT,并取消相应的活动；</p>
          <p class="mt-1">节点权益：</p>
          <p>1、获得1.5倍的平台币认购权；</p>
          <p>2、立即享受矿机S2白银级别6%的新增业绩奖励；</p>
          <p>3、立即享受众筹团队V4等级2.0%新增业绩奖励；</p>
        </div>

        <div class="py-1">
          <span class="p-01 rounded-full bk02AD8F fs24 clffffff font-semibold">03</span>
          <span class="cl02AD8F fs26">节点认购期</span>
        </div>

        <table class="min-w-full divide-y divide-3A53B8 border bc-3A53B8 text-center clffffff">
          <thead class="bk1c3385">
            <tr class="grid grid-cols-6 divide-x divide-3A53B8">
              <th class="py-1">
                期数
              </th>
              <th class="py-1">
                认购数量
              </th>
              <th class="py-1">
                认购价格
              </th>
              <th class="py-1">
                收益倍数
              </th>
              <th class="py-1">
                名额
              </th>
              <th class="py-1">
                认购时间
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-3A53B8">
            <tr class="grid grid-cols-6 divide-x divide-3A53B8">
              <td class="py-1">
                第一期
              </td>
              <td class="py-1">
                10000枚
              </td>
              <td class="py-1">
                0.40USDT
              </td>
              <td class="py-1">
                1.5倍
              </td>
              <td class="py-1">
                50名
              </td>
              <td class="py-1">
                抢完为止
              </td>
            </tr>
            <tr class="grid grid-cols-6 divide-x divide-3A53B8">
              <td class="py-1">
                第二期
              </td>
              <td class="py-1">
                8000枚
              </td>
              <td class="py-1">
                0.40USDT
              </td>
              <td class="py-1">
                1.5倍
              </td>
              <td class="py-1">
                30名
              </td>
              <td class="py-1">
                抢完为止
              </td>
            </tr>
            <tr class="grid grid-cols-6 divide-x divide-3A53B8">
              <td class="py-1">
                第三期
              </td>
              <td class="py-1">
                6000枚
              </td>
              <td class="py-1">
                0.40USDT
              </td>
              <td class="py-1">
                1.5倍
              </td>
              <td class="py-1">
                20名
              </td>
              <td class="py-1">
                抢完为止
              </td>
            </tr>
          </tbody>
        </table>

        <p class="py-1">第一期为10000枚GSCC份额，认购价0.40USDT=1枚GSC（认购完成按照1.5倍）名额50位，抢购时间第二期为8000GSC份额，认购价0.45USDT=1枚GSCC（认购完成按照1.5倍）额30位，抢购时间：第三期为6000GSCC份额，认购价0.50USDT=1枚GSCC（认购完成按照1.5倍）名额20位，.......上期未满，加到下一期认购，认购完为止注：每日收益按天发放</p>

        <nuxt-link :to="`/${locale}/Home/NodeApplication/RAndWRecord`">
          <div class="button button-2xl fs30 bk02AD8F clffffff mt-6">
            立即认购
          </div>
        </nuxt-link>
      </div>

    </van-pull-refresh>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 下拉刷新
      isLoading: false,
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  },
}
</script>