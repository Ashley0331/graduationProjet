<template>
    <div id="attraction-info">
        <div class="info-container">
            <div class="info">
            <div class="info-title">
                 <div class="name">
                     {{currentAtrraction.attractionName}}
                 </div>
            </div>
            <div class="info-content">
                <div class="left-img">
                    <img :src="currentAtrraction.attractionPic" alt="" srcset="">
                </div>
                <div class="right-text">
                    <div class="icon">
                        <i class="el-icon-location-information"></i>{{currentAtrraction.attractionProvice}}&nbsp;&nbsp;{{currentAtrraction.attractionCity}}
                        <i class="el-icon-collection-tag"></i>{{currentAtrraction.attractionTheme}}
                    </div>
                    <div class="text">
                        {{currentAtrraction.attractionDes}}
                    </div>
                </div>
            </div>
            </div>
            <div class="info">
                <div class="info-title">
                 <div class="name">
                     相关人物
                 </div>
            </div>
                <div class="person-list">
                    <el-empty 
                    description="暂无数据"
                    v-if="!relatedPerson.length"></el-empty>
                     <div class="person-item"
                     v-for="(item,index) in relatedPerson"
                     :key="index">
                     <h2>{{item.personName}}</h2>
                     <h5>{{item.personAge}}</h5>
                     <h4>{{item.personDes}}</h4>
                     </div>
                 </div>
            </div>
            <div class="info">
                <div class="info-title">
                 <div class="name">
                     相关事件
                 </div>
            </div>
                <div class="event-list">
                    <el-empty 
                    description="暂无数据"
                    v-if="!relatedEvent.length"></el-empty>
                    <div class="event-item"
                    v-for="(item,index) in relatedEvent"
                    :key="index">
                    <h2>{{item.eventName}}</h2>
                     <h5>{{item.time}}</h5>
                     <h4>{{item.eventDes}}</h4>
                    </div>
                </div>
            </div>
            <div class="info">
                <div class="info-title">
                 <div class="name">
                     相关线路
                 </div>
            </div>
                <div class="route-link">
                    <div class="item"
                    v-for="(item,index) in routeList"
                    :key="index"
                    @click="goToRoute(item)">
                    <img :src="item.routePic">
                    <div class="description">
                        {{item.routeName}}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'attraction-info',
    created(){
        let n=this.$route.params["id"];   
        this.initCurrentAttraction(n);  
        this.initRoute(n);
        this.initPerson(n);
        this,this.initEvent(n);
    },
    data(){
        return {
            currentAtrraction:{},
            routeList:[],
            relatedPerson:[],
            relatedEvent:[]
        }
    },
    methods:{
        initCurrentAttraction(id){
            this.$http.get('Attraction/GetInfoById',
                            {params:{
                                attraction_id:id
                            }})
            .then(res=>{
                this.currentAtrraction=res.data;
            })
        },
        initRoute(id){
            this.$http.get("Route/GetRouteByAttractioId",
                            {params:{attraction_id:id}})
                .then(res=>{
                    if(res.data.length>4){
                        for(let i=0;i<4;i++){
                            this.routeList.push(res.data[i]);
                        }
                    }else{
                        this.routeList=res.data;
                    }
                })
        },
        initPerson(id){
            this.$http.get('RelatedInfo/GetPersonByAttractionId',{params:{
                attraction_id:id
            }})
            .then(res=>{
                this.relatedPerson=res.data;
            })
        },
        initEvent(id){
            this.$http.get('RelatedInfo/GetEventByAttractionId',{params:{
                attraction_id:id
            }})
            .then(res=>{
                this.relatedEvent=res.data;
            })
        },
        goToRoute(item){
            this.$router.push('/Route/'+item.routeId);
        }
    }
}
</script>

<style>
#attraction-info{
    width: 100%;
}
#attraction-info .el-empty{
    padding: 0;
}
#attraction-info .info-container{
    width: 1100px;
    margin: 0 auto;
}
#attraction-info .info{
    margin-bottom: 40px;
}
.info-container .info-title{
    width: 100%;
    text-align: center;
    border-bottom: 1px solid black;
    padding: 0;
    margin-bottom: 20px;
}
.info-container .info-title .name{
    display: inline-block;
    font-size: 25px;
    border-bottom: 3px solid rgb(114, 34, 34);
}
.info-container .info-content{
    width: 100%; 
    position: relative;
    display: flex;
    justify-content: left;
}
.info-container .info-content .left-img{
    width: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    border: 1px solid rgb(230, 230, 230);
    margin-right: 0;
}
.info-container .info-content .left-img img{
    width: 100%;
}
.info-container .info-content .right-text{
    flex: 1;
    box-sizing: border-box;
    padding: 0 40px;
    overflow: hidden;
}
.info-container .info-content .right-text .icon{
    margin-bottom: 10px;
}
.info-container .info-content .right-text .icon{
    color: gray;
}
.info-container .info-content .right-text .icon i{
    color: #E6A23C;
}
.info-container .info-content .right-text .icon i+i{
    margin-left: 20px;
}
.info-container .info-content .right-text .text{
    text-indent: 2em;
    line-height: 25px;
    height: 320px;
    overflow: auto;
}

#attraction-info .item{
    display: inline-block;
    width: 24%;
    position: relative;
}
#attraction-info .item:hover{
    cursor: pointer;
}
#attraction-info .item+.item{
    margin-left:14px ;
}

#attraction-info .item img{
    width: 100%;
}
#attraction-info .item .description{
    position: absolute;
    bottom: 4px;
    background-color:rgba(146, 145, 145,0.25);
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: white;
    text-indent: 1em;
}
#attraction-info .info h4{
    color: gray;
    font-weight: 500;
}

</style>