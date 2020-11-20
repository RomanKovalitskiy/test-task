<template>
  <div id="app">
    <div class="wrapper">
      <div class="header">
        <div>
          Курс доллара <span :class="classRate">{{ dollarRate }}</span>
        </div>
        <div class="bascket">
          <img src="@/svg/basket.svg" @click="isShowBasket = !isShowBasket" />
          <div v-if="basket.length" class="totalProducts">
            {{ basket.length }}
          </div>
          <Basket
            v-if="isShowBasket"
            v-model="basket"
            v-on-clickaway="clickOutsideBasket"
            :dollar-rate="dollarRate"
          />
        </div>
      </div>
      <Group
        v-for="group in listGroups"
        :key="group.id"
        v-model="basket"
        :group="group"
        :dollar-rate="dollarRate"
      />
    </div>
  </div>
</template>

<script>
import data from "@/json/data.json";
import groups from "@/json/names.json";
import Group from "@/components/Group";
import Basket from "@/components/Basket";
import { directive as onClickaway } from "vue-clickaway";

export default {
  name: "App",
  components: { Group, Basket },
  directives: {
    onClickaway,
  },
  data() {
    return {
      listProducts: data.Value.Goods,
      listGroups: [],
      basket: [],
      dollarRate: null,
      interval: null,
      classRate: "neutral",
      isShowBasket: false,
    };
  },
  computed: {},
  watch: {
    dollarRate(newValue, oldValue) {
      if (newValue === oldValue || !oldValue) {
        this.classRate = "neutral";
      } else if (newValue > oldValue) {
        this.classRate = "more";
      } else if (newValue < oldValue) {
        this.classRate = "less";
      }
    },
  },
  created() {
    this.getData();
    this.interval = setInterval(this.getData, 15000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    clickOutsideBasket() {
      this.isShowBasket = false;
    },
    getData() {
      this.dollarRate = this.getDollarRate(20, 80);
      const listGroups = [];
      data.Value.Goods.forEach((product) => {
        const groupIndex = listGroups.findIndex(
          (group) => group.id === product.G
        );
        if (groupIndex > -1) {
          listGroups[groupIndex].products.push(this.getProduct(product));
        } else {
          listGroups.push({
            id: product.G,
            title: groups[product.G].G,
            products: [this.getProduct(product)],
          });
        }
        this.listGroups = listGroups;
      });
    },
    getProduct(product) {
      return {
        id: product.T,
        idCategory: product.G,
        name: groups[product.G].B[product.T].N,
        price: product.C,
        quantity: product.P,
        order: 1,
      };
    },
    getDollarRate(min, max) {
      const rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .wrapper {
    max-width: 1260px;
    margin: 0 auto;
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin: 30px 0 15px;
    font-size: 25px;
    font-weight: bold;

    .bascket {
      margin-right: 25px;
      position: relative;

      img {
        width: 40px;
        cursor: pointer;
      }
      .totalProducts {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        background-color: red;
        color: white;
        font-size: 14px;
        border-radius: 50%;
      }
    }
  }
}
.neutral {
  color: grey;
}
.more {
  color: green;
}
.less {
  color: red;
}
</style>
