<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">米修在线后台管理系统</span>
                <el-form :model="loginUser"  :rules="rules" ref="loginForm" label-width="80px" class="registerForm">
            
                     <el-form-item label="邮箱" prop="email">
                       <el-input  v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                     </el-form-item>
                     <el-form-item label="密码" prop="password">
                       <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                     </el-form-item>
                     <div class="tiparea">还没有账号?现在<router-link to="/">注册</router-link></div>
                      <!-- <button type="button" @click="submitForm('loginForm')">登录</button> -->
                     <el-form-item>
                       <el-button type="button" @click="submitForm('loginForm')">登录</el-button>
                     </el-form-item>

                </el-form>
                
            </div>
        </section>
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'login',
    data(){
    
        return{
            loginUser:{

                email:"",
                password:""
            },
            rules:{
               
                email:[
                    {
                         required:true,
                         type:'email',
                         trigger:'blur',
                         message:'邮箱不能为空'
                    }
                ],
                password:[{
                    required:true,
                    message:'密码不能为空',
                    trigger:'blur'
                },{
                    min:6,
                    max:30,
                    trigger:'blur',
                    message:'长度在6到30之间'
                }]
            }
        }
    },
    methods:{
        submitForm(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                   this.$axios.post('/api/users/login,this.loginUser').then(res=>{
                       //登录成功
                       console.log(res)
                    //获取后台返回的token  
                       const {token} = res.data;
                       //存token 
                       localStorage.setItem("eleToken",token)
                        //解析token将信息可以显示页面
                        const decoded = jwt_decode(token)
                        console.log(decoded)
                        //token存到vuex中
                        this.$store.dispatch('setAuthenticated',decoded),
                        this.$store.dispatch('setUser',decoded)
                   })
                   this.$router.push('/index')
                }
            })
        }
    }
}
</script>
<style scoped>
.register{
    position: relative;
    width:100%;
    height:100%;
    background-size: 100% 100%;
    background:url('../../assets/bg.jpg') no-repeat center center;
}
.form_container{
    width:370px;
    height:210px;
    position:absolute;
    top:10%;
    left:34%;
    padding:25px;
    border-radius:5px;
    text-align: center;
}
.form_container .manage_tip .title{
    font-weight:bold;
    font-size:26px;
    color:red;
}
.registerForm{
margin-top:20px;
background:#fff;
padding:20px 40px 20px 20px;
border-radius: 5px;
box-shadow: 0 5px 10px #ccc;
}
.submit_btn{
    width:100%;
}
.tiparea{
    text-align:right;
    font-size:12px;
    color:#333;
}
</style>