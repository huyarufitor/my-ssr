// 1.初始化 第一种：创建一个Bus.js ，再创建事件总线并将其导出==也就是引入Vue 并导出一个实例EventBus
import Vue from 'vue'
export const EventBus = new Vue()
// 2.$emit('emit事件名',数据)发送；$on('emit事件名',callback)接受