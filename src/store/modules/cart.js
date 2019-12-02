import { getCartList, addCartItem, removeCartItem } from '@/request/api/goods'

const state = {
  cartList: [],
}

const mutations = {
  SET_CART_LIST(state, carts) {
    state.cartList = carts
  },

  ADD_CART_ITEM(state, item) {
    state.cartList.push(item)
  },

  REMOVE_CART_ITEM(state, id) {
    state.cartList.forEach((el, i, _) => {
      if (el.goods_id === id) {
        _.splice(i, 1)
      }
    })
  },
}

const actions = {
  async getCartList({ commit }) {
    const { code, data } = await getCartList()
    if (code === 2000) {
      commit('SET_CART_LIST', data.cart_list)
    }
  },

  async addCartItem({ commit }, item) {
    const { code } = await addCartItem(item.goods_id)
    if (code === 2000) {
      commit('ADD_CART_ITEM', item)
    }
  },

  async removeCartItem({ commit }, id) {
    const { code } = await removeCartItem(id)
    if (code === 2000) {
      commit('REMOVE_CART_ITEM', id)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    cartAmount: state => state.cartList.length,
    deliveryCharges: (state) => {
      const charge = state.cartList.reduce((acc, curr) => acc + curr.delivery_charge, 0)
      if (charge === 0) {
        return '免费'
      }
      return Number(charge).toFixed(2)
    },
    amountPayable: (state) => {
      const amount = state.cartList.reduce((acc, curr) => acc + curr.price, 0)
      return Number(amount).toFixed(2)
    },
    isInCart: state => id => state.cartList.some(item => item._id === id),
  },
}
