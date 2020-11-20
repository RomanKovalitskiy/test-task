<template>
  <div class="basket">
    <template v-if="value.length">
      <div class="basket__row header">
        <div class="basket__row__name">Наименование товара и описание</div>
        <div class="basket__row__quantity">Количество</div>
        <div class="basket__row__price">Цена</div>
        <div class="basket__row__actions"></div>
      </div>
      <div v-for="product in value" :key="product.id" class="basket__row">
        <div class="basket__row__name">{{ product.name }}</div>
        <div class="basket__row__quantity">
          <div class="wrapper-price">
            <input
              :value="product.order"
              type="number"
              min="1"
              :max="product.quantity"
              @input="setData($event.target.value, product)"
            />шт.
          </div>
          <div v-if="product.quantity <= product.order" class="message">
            Количество ограниченно
          </div>
        </div>
        <div class="basket__row__price">
          <div class="wrapper-price">
            <span class="wrapper-price__score">
              {{ (product.price * dollarRate) | format }} руб.
            </span>
            / шт.
          </div>
        </div>
        <div class="basket__row__actions">
          <button @click="deletProduct(product)">Удалить</button>
        </div>
      </div>
      <div class="total">
        <div class="wrapper-price">
          Общая стоимость:
          <span class="wrapper-price__score">
            {{ totalPrice | format }} руб.
          </span>
        </div>
      </div>
    </template>
    <div v-else class="stub">выберите товары</div>
  </div>
</template>

<script>
export default {
  name: "Basket",
  components: {},
  props: {
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
    return {};
  },
  computed: {
    totalPrice() {
      return this.value.reduce(
        (accumulator, currentValue) =>
          accumulator +
          currentValue.price * currentValue.order * this.dollarRate,
        0
      );
    },
  },
  methods: {
    deletProduct(product) {
      this.$emit(
        "input",
        this.value.filter((productBasket) => productBasket.id !== product.id)
      );
    },
    setData(value, product) {
      const list = this.value.map((el) => {
        if (el.id !== product.id) return el;
        return { ...product, order: value };
      });
      this.$emit("input", list);
    },
  },
};
</script>

<style lang="scss" scoped>
.basket {
  position: absolute;
  top: 35px;
  right: 25px;
  min-width: 800px;
  background-color: #fff;
  z-index: 9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 20px;
  font-weight: 400;
  font-size: 14px;

  &__row {
    display: flex;
    padding: 10px 0;
    border-top: 1px solid #a9a9a9;
    &:first-child {
      border: none;
    }
    &__name {
      flex-grow: 1;
      padding-right: 12px;
    }
    &__quantity {
      flex-shrink: 0;
      flex-basis: 140px;
      padding-right: 12px;
      input {
        width: 40px;
        height: 20px;
        font-size: 14px;
        border: 1px solid #cccccc;
        margin-right: 6px;
      }
    }
    &__price {
      flex-shrink: 0;
      flex-basis: 180px;
      padding-right: 12px;
    }
    &__actions {
      flex-shrink: 0;
      flex-basis: 100px;
      text-align: end;
      button {
        border: none;
        outline: none;
        background-color: #fff;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .header {
    color: #a9a9a9;
  }
  .total {
    display: flex;
    justify-content: flex-end;
    padding: 0 0 10px;
    .wrapper-price__score {
      color: orange;
    }
  }
  .wrapper-price {
    color: #a9a9a9;
    &__score {
      font-weight: 500;
      font-size: 20px;
      color: black;
    }
  }
  .stub {
    height: 100px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .message {
    color: red;
    padding: 5px;
    background-color: rgba(255, 215, 0, 0.3);
    border: 1px dotted red;
    margin-top: 6px;
  }
}
</style>
