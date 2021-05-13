<template>
    <div class="prod-b-wrapper">
        <div>
            事件总线接收信息
        </div>
        <div>
            接收消息：{{Msg}}
        </div>
    </div>
</template>
<script>
import { EventBus } from '../event-bus.js';
export default {
    data(){
        return {
            Msg:''
        }
    },
    beforeMount(){
        EventBus.$on('aMsg',(Msg)=>{
            this.Msg = Msg;
        });
    }
}
</script>