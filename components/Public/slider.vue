<template>
  <div class="exchange-block_slider">
    <div class="block_slider_dot">
      <span
        class="dot"
        @click="buydecimals = item"
        :class="{ active: buydecimals >= item }"
        :style="{ left: `${item}%` }"
        v-for="(item, index) in [0, 25, 50, 75, 100]"
        :key="index"
      ></span>
    </div>
    <van-slider v-model="buydecimals" @change="onChange" :step="0.0001" />
    <!-- <el-slider
      @mousedown="isdown=true"
      @mouseup="isdown=false"
      :format-tooltip="formattip"
      tooltip-class="block_slider"
      v-model="buydecimals"
    ></el-slider> -->
  </div>
</template>
<script>
export default {
  name: "verifycode",
  props: {
    dec: {
      type: Number,
      default: 0
    },
    numdecimals: {
      type: Number,
      default: 0
    }
  },
  watch: {
    dec: function(val) {
      if (!val) {
        val = 0;
      }
      const newval = parseInt(val.toFixed(0));
      if (newval == this.copebuydecimals) {
        return;
      }
      this.copebuydecimals = newval;
    },
    numdecimals: function(val) {
      if (!val) {
        val = 0;
      }
      const newval = parseInt(val.toFixed(0));
      if (newval == this.copebuydecimals) {
        return;
      }
      this.copebuydecimals = newval;
    },
    copebuydecimals: function(val) {
      this.buydecimals = parseInt(val);
    },
    buydecimals: function(val) {
      if (this.copebuydecimals == val) {
        return;
      }
      this.$emit("slider:change", val / 100);
    }
  },
  computed: {},
  data() {
    return {
      copebuydecimals: 0,
      buydecimals: this.numdecimals,
      isdown: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$bus.on("ProportionVal", val => {
        this.buydecimals = val;
      });
    });
  },
  methods: {
    formattip(val) {
      return val + "%";
    },
    onChange(value) {
      return value + "%";
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.exchange-block_slider {
  position: relative;
  margin: 15px 4px;
  .block_slider_dot {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2px;
    .dot {
      width: 8px;
      height: 8px;
      border: 0;
      background-color: #5e6573;
      border-radius: 50%;
      display: inline-block;
      position: absolute;
      top: -3px;
      transform: translateX(-4px);
      cursor: pointer;
    }
    .dot.active {
      background-color: #03bf7b;
    }
  }
  .el-slider__runway {
    height: 2px;
    margin: 0;
    background-color: #5e6573;
  }
  .el-slider__bar {
    height: 2px;
    background-color: #03bf7b;
  }
  .el-slider__button-wrapper {
    top: -3px;
    width: initial;
    height: initial;
  }
  .el-slider__button {
    width: 8px;
    height: 8px;
    border: 0;
    background-color: #03bf7b;
  }
  .el-slider__button-wrapper .el-tooltip,
  .el-slider__button-wrapper::after {
    display: block;
  }
}

.block_slider.el-tooltip__popper {
  background-color: #15181f;
  .popper__arrow {
    border-top-color: #15181f;
  }
  .popper__arrow:after {
    border-top-color: #15181f;
  }
}
</style>
