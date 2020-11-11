<template>
    <div v-show="isMounted" class="marquee">
        <div class="marquee-wrap">
            <el-tabs
                ref="marqueeTabs"
                v-model="activeTabName"
                :stretch="true"
                @before-leave="
                    () => {
                        // 待修改
                        return !isRunning;
                    }
                "
                @tab-click="moveBufferList"
                @mouseover.native="hoverMarqueeTabs"
            >
                <el-tab-pane
                    v-for="(item, key) in options"
                    :key="key"
                    :disabled="isRunning"
                    :label="item.name"
                    :name="item.name"
                    @mouseover.native="moveBufferList"
                ></el-tab-pane>
            </el-tabs>
            <div class="lists-wrap" @mouseout="handleMouseMove" @mouseover="handleMouseMove">
                <div :class="{ 'animate-list': true, 'is-hidden': isRunning }">
                    <div class="list">
                        <div
                            v-for="(item, key) in getList"
                            :key="key"
                            class="block-a-b-c"
                            :data-index="key % getList.length"
                            :data-type="item.type"
                        >
                            <div class="content">
                                <div class="name">{{ item.title }}</div>
                                <div class="type" :data-type="item.iconName" />
                                <img class="img" :src="item.img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="{ 'buffer-list': true, 'update-index': isRunning }">
                    <div id="move-buffer-list-target" :style="bufferStyle">
                        <div v-for="(item, key) in getBufferList" :key="key" class="block">
                            <div class="content">
                                <div class="name">{{ item.title }}</div>
                                <div class="type" :data-type="item.iconName" />
                                <img class="img" :src="item.img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="m-marquee-wrap">
            <el-tabs
                ref="marqueeTabs"
                v-model="activeTabName"
                :stretch="true"
                @before-leave="
                    () => {
                        // 待修改
                        return !isRunning;
                    }
                "
                @tab-click="moveBufferList"
                @mouseover.native="hoverMarqueeTabs"
            >
                <el-tab-pane
                    v-for="(item, key) in options"
                    :key="key"
                    :disabled="isRunning"
                    :label="item.name"
                    :name="item.name"
                    @mouseover.native="moveBufferList"
                ></el-tab-pane>
            </el-tabs>
            <div class="lists-wrap" @mouseout="handleMouseMove" @mouseover="handleMouseMove">
                <div :class="{ 'animate-list': true, 'is-hidden': isRunning }">
                    <div class="list">
                        <div
                            v-for="(item, key) in getList"
                            :key="key"
                            class="block-a-b-c"
                            :data-index="key % getList.length"
                            :data-type="item.type"
                        >
                            <div class="content">
                                <div class="name">{{ item.title }}</div>
                                <div class="type" :data-type="item.iconName" />
                                <img class="img" :src="item.img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="{ 'buffer-list': true, 'update-index': isRunning }">
                    <div id="move-buffer-list-target" :style="bufferStyle">
                        <div v-for="(item, key) in getBufferList" :key="key" class="block">
                            <div class="content">
                                <div class="name">{{ item.title }}</div>
                                <div class="type" :data-type="item.iconName" />
                                <img class="img" :src="item.img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
@Component({})
export default class Marquee extends Vue {
    @Prop({ default: () => ({}) }) options: any;
    @Prop({ default: 0 }) gap: any;
    @Prop({ default: 0 }) width: any;
    @Prop({ default: 0 }) height: any;
    @Prop({ default: false }) isMounted: any;
    // @Watch('activeTabName', { deep: true, immediate: true })
    // handleActiveTabName(n: any, o: any) {
    //     console.log('o,bn', n, o);
    //     // @ts-ignore
    //     if (this.typesList.indexOf(n) > this.typesList.indexOf(o)) {
    //         this.isReverse = true;
    //     }
    // }
    targetIndex = 0;
    typesList = [];
    isReverse = false;
    animate: any;
    isRunning = false;
    isMobile = false;
    activeTabName = '';
    listWidth = 0;
    timer: any;
    bufferStyle = {
        transform: ``,
        transition: '',
    };
    mBlockW: any;

    get getList() {
        // console.log(this.options);
        // options 是数组（列表）的话进入循环
        if (Array.isArray(this.options)) {
            // childrens是保存拼接后所有项的列表
            let childrens: any = [];
            this.options.forEach((item: any) => {
                // @ts-ignore
                this.typesList.push(item.name);
                item.children.forEach((child: any) => {
                    // 同一个tab下子孙child 的type 是itemTab 的name
                    child.type = item.name;
                });
                // debugger;
                childrens = childrens.concat(item.children);
            });
            // @ts-ignore
            // if (process.browser) {
            //     if (this.isMobile) {
            //         const rootFontSize = (100 / 750) * window.innerWidth;
            //         this.mBlockW = rootFontSize * 3.96;
            //         this.listWidth = childrens.length * this.mBlockW;
            //         childrens = childrens.concat(childrens);
            //         childrens.forEach((item: any, index: any) => {
            //             item.offsetX = index * this.mBlockW;
            //         });
            //     } else {
            this.listWidth = childrens.length * 333;
            // 拼接两份list  现在的childrens是两份相同的列表，长度52
            childrens = childrens.concat(childrens);
            // 无用代码
            // childrens.forEach((item: any, index: any) => {
            //     // console.log(index);
            //     item.offsetX = index * 333;
            // });
            // return childrens;
            // this.options 是6个tab 对应每个children下面的
        } else {
            return this.options;
        }
    }

    get getBufferList() {
        const list = this.getList;
        if (Array.isArray(list)) {
            const tmp = list.slice(0, list.length / 2);
            // @ts-ignore
            return [].concat(tmp, tmp, tmp);
        } else {
            return [];
        }
    }

    get getCustomBlockStyle() {
        if (!this.width || !this.height) {
            return {};
        } else {
            return { height: this.height, width: this.width };
        }
    }

    created() {
        // console.log('this.options[0].name', this.options[0].name);
        // 直播
        // 创建阶段，activeTab在“直播”
        this.activeTabName = this.options[0].name || '';
    }
    mounted() {
        // @ts-ignore
        this.isMobile = (global as any).isMobile;
        this.initAnimate();
    }
    initMobileAnimate() {}
    initAnimate() {
        // debugger;
        const _this = this;
        const translateXList: any[] = [];
        // @ts-ignore
        window.anime.set('.block-a-b-c', {
            translateX: function(el: any, index: any) {
                translateXList[index] = {
                    x: index * (_this.isMobile ? _this.mBlockW : 333),
                    type: el.dataset.type,
                };
                return index * (_this.isMobile ? _this.mBlockW : 333);
            },
        });
        console.log('translaXlist', translateXList);
        // @ts-ignore
        _this.animate = window.anime({
            targets: translateXList,
            duration: 200000,
            easing: 'linear',
            x: `-=${_this.listWidth}`,
            loop: true,
            update: function(ani: any) {
                ani.set('.block-a-b-c', {
                    translateX: function(el: any, index: any) {
                        return translateXList[index].x % (_this.listWidth * 2);
                    },
                });
            },
            change: function(a: any) {
                // 测试每一个滑块所需要的时间差 -> 会有10毫秒左右的误差 几乎不影响，从这里获取到到[0]-[1]差值用于seek到倍数参
                // if (a.animations[0].currentValue >= -5 && a.animations[0].currentValue < 5) {
                //     console.log('[0]', a.currentTime);
                // }
                // if (a.animations[1].currentValue >= -5 && a.animations[1].currentValue < 5) {
                //     console.log('[0]', a.currentTime);
                // }
                // tab 跟列表联动
                if (this.isMobile) {
                    for (const ani of a.animations) {
                        if (ani.currentValue < 0 && ani.currentValue > -_this.mBlockW) {
                            if (!_this.isRunning) {
                                _this.activeTabName = ani.animatable.target.type;
                            }
                        }
                    }
                } else {
                    for (const ani of a.animations) {
                        if (ani.currentValue < 0 && ani.currentValue > -666) {
                            if (!_this.isRunning) {
                                _this.activeTabName = ani.animatable.target.type;
                            }
                        }
                    }
                }
            },
        });

        // this.animate.pause();
        // @ts-ignore
        window.animate = _this.animate;
    }
    resetBufferListOffsetX() {
        this.animate.pause();
        const $blockList = document.querySelectorAll('.block-a-b-c');
        let firstDom;
        let firstIndex = 1;
        let translateX = 0;
        let offset = 0;
        // 获取到窗口内，左边第一个block
        for (let i = 0; i < $blockList.length; i++) {
            const style = $blockList[i].getAttribute('style');
            // @ts-ignore
            translateX = style.match(/\d+\.\d+/) * 1 || 0;
            if (this.isMobile) {
                if (translateX <= this.mBlockW && translateX > 0) {
                    firstDom = $blockList[i];
                    // @ts-ignore
                    firstIndex = firstDom.dataset.index * 1 + 1;
                    break;
                }
            } else if (translateX <= 333 && translateX > 0) {
                firstDom = $blockList[i];
                // @ts-ignore
                firstIndex = firstDom.dataset.index * 1 + 1;
                break;
            }
        }
        if (this.isMobile) {
            offset = -this.listWidth + (firstIndex - 1) * -this.mBlockW + -translateX;
        } else {
            offset = -this.listWidth + (firstIndex - 1) * -333 + -translateX;
        }
        this.bufferStyle.transform = `translateX(${offset}px)`;
    }
    // 切换tab的时候移动BufferList
    moveBufferList() {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        // 重置第二个列表的 鼠标指针位置相对于触发事件的对象的 x 坐标。
        this.resetBufferListOffsetX();
        // 获取dom元素给bufferChildrenList
        const bufferChildrenList = document.querySelector('#move-buffer-list-target');
        setTimeout(() => {
            // time tab切换的时候的时间
            const time = 3;
            for (let i = 0; i < this.getList.length; i++) {
                if (this.getList[i].type === this.activeTabName) {
                    // debugger;
                    this.targetIndex = i;
                    // time = (targetIndex || 1 * 333) / 1;
                    break;
                }
            }
            if (bufferChildrenList) {
                if (this.isMobile) {
                    this.bufferStyle.transform = `translateX(${-this.listWidth + this.targetIndex * -this.mBlockW}px)`;
                } else {
                    this.bufferStyle.transform = `translateX(${-this.listWidth + this.targetIndex * -333}px)`;
                }
                this.bufferStyle.transition = `transform ${time}s linear`;
                setTimeout(() => {
                    // 利用change来测试出的ducation来使用， 不用v/s公式 animate.change中的打印的平均值左右就是该值
                    if (this.isMobile) {
                    } else {
                        this.animate.seek(7693 * this.targetIndex || 0);
                    }
                    this.isRunning = false;
                    // setTimeout(() => {
                    // if (this.isReverse) {
                    this.animate.reverse();
                    // }
                    this.animate.play();
                    this.$nextTick(() => {
                        this.bufferStyle.transform = `translateX(-${this.listWidth}px)`;
                        this.bufferStyle.transition = '';
                        this.isReverse = false;
                    });
                    // 280
                    // }, 1);
                    // 平滑过渡
                }, time * 1000 + 300);
            }
        }, 3);
    }
    handleMouseMove(event: any) {
        const type = event.type;
        const match = event.target.className.match(/content|img|block-a-b-c/);
        if (match && type === 'mouseover') {
            this.animate.pause();
        } else if (match && type === 'mouseout') {
            this.animate.play();
        }
    }
    // 鼠标移入tab
    hoverMarqueeTabs(event: any) {
        console.log('event', event);
        // const match = event.target.className.match(/el-tabs__item|el-tabs__active-bar/);
        // if (match && !this.isRunning) {
        //     event.target.click();
        // }
    }
}
</script>

<style scoped lang="scss">
$bW: 333px !default;
$bH: 412px !default;
$contentW: 280px !default;
$contentH: 330px !default;
$listW: $bW * 26 !default;
$doubleListW: $listW * 2 !default;
$bufferW: $listW * 3 !default;

$mBW: 3.96rem !default;
$mBH: 4.94rem !default;
$mContentW: 3.46rem !default;
$mContentH: 3.96rem !default;
$mListW: $mBW * 26 !default;
$mDoubleListW: $mListW * 2 !default;
$mBufferW: $mListW * 3 !default;

.marquee {
    .marquee-wrap {
        height: 100%;
        display: flex;
        flex-direction: column;
        /deep/ .el-tabs {
            align-self: center;
            height: auto;
            .el-tabs__header {
                margin-bottom: 0px;
                .el-tabs__nav-wrap {
                    .el-tabs__nav-scroll {
                        padding: 0 20px;
                        &:after {
                            display: none;
                        }
                    }
                    .el-tabs__active-bar {
                        width: 70px !important;
                        height: 40px;
                        background: #085ea9;
                        border-radius: 2px;
                        left: -16px !important;
                    }
                    .el-tabs__item {
                        width: 70px;
                        height: 40px;
                        position: relative;
                        z-index: 5;
                        color: #333333;
                        cursor: pointer;
                        &.is-active {
                            color: #f9fafc;
                        }
                    }
                    &::after {
                        display: none;
                    }
                }
            }
            .el-tabs__content {
                display: none;
            }
        }
        .lists-wrap {
            width: 100vw;
            height: $bH;
            overflow: hidden;
            .animate-list {
                width: 100vw;
                height: $bH;
                padding: 41px 0px;
                position: relative;
                overflow: hidden;
                z-index: 233;
                .list {
                    position: relative;
                    // animation: loop-marqueue 10s infinite linear;
                    .block-a-b-c {
                        width: $bW;
                        height: $bH;
                        position: absolute;
                        line-height: $bH;
                        .content {
                            cursor: pointer;
                            width: $contentW;
                            height: $contentH;
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 233;
                            // box-shadow: 9px 10px 41px 0px rgba(57, 70, 95, 0.1);
                            box-shadow: 9px 10px 41px 0px rgba(57, 70, 95, 0.1);
                            border-radius: 2px;
                            background: white;
                            .name {
                                // position: absolute;
                                // top: 15px;
                                // left: 27px;
                                margin: 15px 0px 0px 27px;
                                font-size: 16px;
                                font-weight: 400;
                                color: #333333;
                                line-height: 22px;
                                height: 22px;
                            }
                            .type {
                                background: url(./images/title_business_nofield_2x.png);
                                background-size: 100% 100%;
                                width: 70px;
                                height: 32px;
                                position: absolute;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                right: -7px;
                                top: 14px;
                                &::after {
                                    content: attr(data-type);
                                    display: inline-flex;
                                    color: #085ea9;
                                    margin-top: -4px;
                                    font-size: 12px;
                                }
                            }
                            .img {
                                width: 100%;
                                height: 288px;
                                position: absolute;
                                bottom: 0;
                                left: 0;
                            }
                        }
                    }
                }
                &.is-hidden {
                    visibility: hidden;
                    opacity: 0;
                }
            }
            .buffer-list {
                width: 100vw;
                height: $bH;
                position: relative;
                overflow: hidden;
                z-index: 223;
                #move-buffer-list-target {
                    width: $bufferW;
                    height: $bH;
                    padding: 41px 0px;
                    position: relative;
                    transform: translateX(-$listW);
                    .block {
                        width: $bW;
                        height: $contentH;
                        display: inline-block;
                        line-height: $bH;
                        float: left;
                        .content {
                            cursor: pointer;
                            width: $contentW;
                            height: $contentH;
                            // box-shadow: 9px 10px 41px 0px rgba(57, 70, 95, 0.5);
                            box-shadow: 9px 10px 41px 0px rgba(57, 70, 95, 0.1);
                            border-radius: 2px;
                            color: white;
                            background: white;
                            position: absolute;
                            .name {
                                margin: 15px 0px 0px 27px;
                                font-size: 16px;
                                font-weight: 400;
                                color: #333333;
                                line-height: 22px;
                                height: 22px;
                            }
                            .type {
                                background: url(./images/title_business_nofield_2x.png);
                                background-size: 100% 100%;
                                width: 70px;
                                height: 32px;
                                position: absolute;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                right: -7px;
                                top: 14px;
                                &::after {
                                    content: attr(data-type);
                                    display: inline-flex;
                                    color: #085ea9;
                                    margin-top: -4px;
                                    font-size: 12px;
                                }
                            }
                            .img {
                                width: 100%;
                                height: 288px;
                                position: absolute;
                                bottom: 0;
                                left: 0;
                            }
                        }
                    }
                }
                &.update-index {
                    z-index: 250 !important;
                    width: 100vw;
                    height: $bH;
                    position: relative;
                    overflow: hidden;
                    z-index: 223;
                    top: -$bH;
                }
            }
        }
    }
    .m-marquee-wrap {
        display: none;
    }
}
@media screen and (max-width: 1200px) {
}

@media screen and (max-width: 750px) {
    .marquee {
        .marquee-wrap {
            display: none;
        }
        .m-marquee-wrap {
            height: 100%;
            display: flex;
            // 电脑太卡 暂不处理
            display: none;
            flex-direction: column;
            /deep/ .el-tabs {
                align-self: center;
                height: auto;
                .el-tabs__header {
                    margin-bottom: 0px;
                    .el-tabs__nav-wrap {
                        .el-tabs__nav-scroll {
                            // padding: 0 20px;
                            padding: 0;
                            &:after {
                                display: none;
                            }
                        }
                        .el-tabs__active-bar {
                            width: 1.04rem !important;
                            height: 0.54rem;
                            background: #085ea9;
                            border-radius: 0.03rem;
                            left: 0 !important;
                        }
                        .el-tabs__item {
                            width: 1.04rem;
                            height: 0.54rem;
                            line-height: 0.54rem;
                            position: relative;
                            padding: 0;
                            z-index: 5;
                            color: #666;
                            cursor: pointer;
                            &.is-active {
                                color: #fff;
                            }
                        }
                        &::after {
                            display: none;
                        }
                    }
                }
                .el-tabs__content {
                    display: none;
                }
            }
            .lists-wrap {
                width: 100vw;
                height: $mBH;
                overflow: hidden;
                .animate-list {
                    width: 100vw;
                    height: $mBH;
                    padding: 0.49rem 0px;
                    position: relative;
                    overflow: hidden;
                    z-index: 233;
                    .list {
                        position: relative;
                        .block-a-b-c {
                            width: $mBW;
                            height: $mBH;
                            position: absolute;
                            line-height: $mBH;
                            .content {
                                cursor: pointer;
                                width: $mContentW;
                                height: $mContentH;
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 233;
                                box-shadow: 0.11rem 0.12rem 0.49rem 0rem rgba(57, 70, 95, 0.1);
                                border-radius: 0.03rem;
                                background: white;
                                .name {
                                    margin: 0.2rem 0px 0px 0.2rem;
                                    font-size: 0.24rem;
                                    font-weight: 400;
                                    color: #333333;
                                    line-height: 0.33rem;
                                    height: 0.33rem;
                                }
                                .type {
                                    background: url(./images/title_business_nofield_2x.png);
                                    background-size: 100% 100%;
                                    width: 0.9rem;
                                    height: 0.42rem;
                                    position: absolute;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    right: -0.11rem;
                                    top: 0.2rem;
                                    &::after {
                                        content: attr(data-type);
                                        display: inline-flex;
                                        color: #085ea9;
                                        margin-top: -0.04rem;
                                        font-size: 0.2rem;
                                    }
                                }
                                .img {
                                    width: 100%;
                                    height: 3.46rem;
                                    position: absolute;
                                    bottom: 0;
                                    left: 0;
                                }
                            }
                        }
                    }
                    &.is-hidden {
                        visibility: hidden;
                        opacity: 0;
                    }
                }
                .buffer-list {
                    width: 100vw;
                    height: $bH;
                    position: relative;
                    overflow: hidden;
                    z-index: 223;
                    #move-buffer-list-target {
                        width: $mBufferW;
                        height: $mBH;
                        padding: 0.49rem 0px;
                        position: relative;
                        transform: translateX(-$mListW);
                        .block {
                            width: $mBW;
                            height: $mContentH;
                            display: inline-block;
                            line-height: $mBH;
                            float: left;
                            .content {
                                cursor: pointer;
                                width: $mContentW;
                                height: $mContentH;
                                // box-shadow: 9px 10px 41px 0px rgba(57, 70, 95, 0.5);
                                box-shadow: 0.11rem 0.12rem 0.49rem 0rem rgba(57, 70, 95, 0.1);
                                border-radius: 0.03rem;
                                color: white;
                                background: white;
                                position: absolute;
                                .name {
                                    margin: 0.2rem 0px 0px 0.2rem;
                                    font-size: 0.24rem;
                                    font-weight: 400;
                                    color: #333333;
                                    line-height: 0.33rem;
                                    height: 0.33rem;
                                }
                                .type {
                                    background: url(./images/title_business_nofield_2x.png);
                                    background-size: 100% 100%;
                                    width: 0.9rem;
                                    height: 0.42rem;
                                    position: absolute;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    right: -0.11rem;
                                    top: 0.2rem;
                                    &::after {
                                        content: attr(data-type);
                                        display: inline-flex;
                                        color: #085ea9;
                                        margin-top: -0.04rem;
                                        font-size: 0.2rem;
                                    }
                                }
                                .img {
                                    width: 100%;
                                    height: 3.46rem;
                                    position: absolute;
                                    bottom: 0;
                                    left: 0;
                                }
                            }
                        }
                    }
                    &.update-index {
                        z-index: 250 !important;
                        width: 100vw;
                        height: $mBH;
                        position: relative;
                        overflow: hidden;
                        z-index: 223;
                        top: -$mBH;
                    }
                }
            }
        }
    }
}
</style>
