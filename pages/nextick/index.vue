<template>
    <div class="app">
        <div ref="msgDiv">{{msg}}</div>
        <div v-if="msg1">msg出$nextTick: {{msg1}}</div>
        <div v-if="msg2">msg进$nextTick: {{msg2}}</div>
        <div v-if="msg3">msg出$nextTick: {{msg3}}</div>
        <button @click="changeMsg">
            Change the Message
        </button>
        <div class="letf">
            <div>操作dom</div>
            <span>{{list}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'我是DOM前数据',
            msg1:'',
            msg2:'',
            msg3:'',
            list:2,

        }
    },
    methods:{
        changeMsg(){
            this.msg = '我是DOM更新后数据',
            this.msg1 = this.$refs.msgDiv.innerHTML,
            this.$nextTick(()=>{
                this.msg2= this.$refs.msgDiv.innerHTML
            })
            this.msg3 = this.$refs.msgDiv.innerHTML
        }
    },
    created(){
        // this.list ='test number'+this.list;
        this.$nextTick(()=>{
                this.list = 'adfa'+this.list;
            })
    },
    mounted(){
           console.log('结束DOM渲染');
    }
}
</script>