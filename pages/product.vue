<template>
    <div class="main-wrapper">
        <div>
            事件总线发信息
        </div>
        <div>
            <button @click="sendMsg()"> 点我</button>
        </div>
        <productM :list="Flist">子组件</productM>
    </div>
</template>
<script>
import {EventBus} from '../event-bus.js';
import productM from '../components/productM.vue';
export default {
    components:{productM},
    data(){
        return{
            Flist:['实时音视频','实时音频']
        }
    },
    methods:{
        sendMsg(){
            console.log('我要给prod发消息了');
            EventBus.$emit(
                
                'aMsg','来自product组件的消息');
        }
    }
}
</script>