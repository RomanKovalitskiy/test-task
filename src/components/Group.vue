<template>
  <div class="group">
    <div class="group__title" @click="isShowList = !isShowList">
      <img
        src="@/svg/up-arrow.svg"
        :class="['img-arrow', { 'down-arrow': !isShowList }]"
      />
      {{ group.title }}
    </div>
    <div v-if="isShowList" class="group__list">
      <div
        v-for="product in group.products"
        :key="product.id"
        :class="[
          'group__list__item',
          { 'direction-column': group.products.length % 2 },
          {
            'is-select': checkIsSelect(product),
          },
        ]"
        @click="clickProduct(product)"
      >
        <div class="group__list__item-name">
          {{ product.name }} ({{ product.quantity }})
        </div>
        <div class="group__list__item-price">
          {{ (product.price * dollarRate) | format }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Group",
  props: {
    group: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Array,
      default: () => [],
    },
    dollarRate: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isShowList: true,
      isSelect: false,
    };
  },
  methods: {
    clickProduct(product) {
      const isSelectProduct = this.value.find(
        (productBasket) => productBasket.id === product.id
      );
      if (isSelectProduct) {
        this.$emit(
          "input",
          this.value.filter((productBasket) => productBasket.id !== product.id)
        );
      } else {
        this.$emit("input", [...this.value, product]);
      }
    },
    checkIsSelect(product) {
      return this.value.find(
        (productBasket) => productBasket.id === product.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  user-select: none;

  &__title {
    background-color: #bcd9e3;
    padding: 5px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    .img-arrow {
      max-width: 14px;
      transition: transform 0.2s;
    }
    .down-arrow {
      transform: rotate(180deg);
    }
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    &__item {
      display: flex;
      flex-basis: 50%;
      border-top: 1px solid #ccc;
      cursor: pointer;

      &-name {
        flex-grow: 1;
        padding: 5px;
      }
      &-price {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        font-weight: bold;
        background: #f2f2f2;
        mix-blend-mode: multiply;
        flex-shrink: 0;
      }
    }
    .is-select {
      background-color: rgba(237, 190, 33, 0.5);
    }
    .direction-column {
      flex-basis: 100%;
    }
  }
}
</style>
