<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
           <el-col :span="6">
              <div class="user">
                  <img :src="user.avatar" class="avatar">
              </div>
           </el-col>
           <el-col :span="16">
                <div class="userinfo">
                    <div class="user-item">
                        <i class="fa fa-user"></i>
                        <span>{{user.name}}</span>
                    </div>
                     <div class="user-item">
                        <i class="fa fa-cog"></i>
                        <span>{{user.identity=="manager" ? "管理员":"员工"}}</span>
                    </div>
                </div>
           </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'infoshow',
   computed:{
       user:function(){
          return this.$store.getters.user 
       }
   }
}
</script>
<style>

</style>