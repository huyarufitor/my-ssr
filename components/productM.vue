<template>
    <div>
        <div>
            接收数据:{{sonList}}
        </div>
        <div >
            <button @click="changgeName()">改变数据</button>
        </div>
        <div>
            ：{{sonList}}
        </div>
    </div>
</template>
<script>
export default {
    props:['list'],
    data(){
        return{
            sonList:this.list
        }
    },
    watch:{
        myList(newVal){
            this.sonList = newVal
        }
    },
    methods:{
        changgeName(){
            this.sonList = ['roomkit','whiteboard']
        }
    }
}
</script>
