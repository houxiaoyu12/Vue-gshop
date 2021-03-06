
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUser,
  reqLogout,
  reqGoods,
  reqInfo,
  reqRatings
} from '../api'

import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

export default {
  //异步获取addres
  async getAddress ({commit,state}) {
    //发送ajax请求
    const {latitude,longitude} = state;
    const result = await reqAddress(latitude+','+longitude)
    if(result.code===0){
      const address = result.data
      //commit给mutationpl
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  //异步获取categorys
  async getCategorys ({commit}) {
    //发送ajax请求
    const result = await reqFoodCategorys()
    if(result.code===0){
      const categorys = result.data
      //commit给mutationpl
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  //异步获取shops
  async getShops ({commit,state}) {
    //发送ajax请求
    const {latitude,longitude} = state;
    const result = await reqShops(longitude,latitude)
    if(result.code===0){
      const shops = result.data
      //commit给mutationpl
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //同步保存用户的action
  saveUser ({commit},user) {
    commit(RECEIVE_USER,{user})
  },
  //异步获取action
  async getUser ({commit}) {
    const result = await reqUser()
    if(result.code===0){
      const user = result.data
      commit(RECEIVE_USER,{user})
    }
  },
  //异步退出登录
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code===0){
      commit(RESET_USER)
    }
  },

  //异步获取goods数据
  async getGoods ({commit},cb) {
    const result = await reqGoods()
    if(result.code===0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      typeof cb ==='function' && cb()
    }
  },
  //异步获取ratings数据
  async getRatings ({commit},cb) {
    const result = await reqRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      //在更新状态后立即调用
      typeof cb ==='function' && cb()
    }
  },
  //异步获取info数据
  async getInfo ({commit},cb) {
    const result = await reqInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
      //在更新状态后立即调用
      typeof cb ==='function' && cb()
    }
  },

  //更新food数量
  updateFoodCount ({commit},{isAdd,food}) {
    if(isAdd){//加
      commit(INCREMENT_FOOD_COUNT,{food})
    } else {//减
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  //更新购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }

}
