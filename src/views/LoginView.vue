<template>
    <div class="container">
        <div class="content">
            <div style="text-align:center;margin-bottom: 30px;">用户登录</div>
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
                >
                <a-form-item
                    label="用户名"
                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                    <a-input v-model:value="formState.username" />
                </a-form-item>
            
                <a-form-item
                    label="密码"
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
<!--             
                <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
                </a-form-item> -->
            
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">登录</a-button>
                </a-form-item>
                </a-form>
        </div>
    </div>    
</template>
  <script setup>

    import axios from 'axios';
    import { defineComponent, reactive  } from 'vue';
    // 导入路由器对象
    import {useRouter} from 'vue-router'
    let $router = useRouter()

      const formState = reactive({
        username: '',
        password: '',
        // remember: true,
      });
  
      const onFinish = values => {
        console.log('Success:', values);
        var that = this

        // let that = this
        var url = "/api/admin/login"
        var params={
                username: formState.username,
                password: formState.password
              }
        console.log({params})
        axios.get(url,{params}).then(function(result){
          if(result.data.state == true){
            console.log("数据："+result.data.token)
            // that.onClose();
            // that.getData();

            console.log(result.data.token)

        localStorage.setItem("token",result.data.token)
        // console.log(localStorage.getItem("存储token"+token))
        $router.push("/");
       }else{
        alert("用户名或密码错误")
       }

        }).catch(function (reason) {
            console.log(reason)
        })
      

        
      };
  
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
 



//  export default {
//      name: "login",
//         data () {
//             return {
//                 loginForm: {
//                     userName: '',
//                     password: ''
//                 }
//             }
//         },
//       methods: {  
//          login(){
//             var vm = this
//             vm.axios.get('http://localhost:8001/admin/login',{
//               params:{
//                 username:this.username,
//                 password:this.password
//               }
//             }).then(function (response) {
//               if(response.data.statue == true){
//                 console.log(response.data.msg)
//                 //将token和user保存到localStorage中
//                 vm.$store.commit('setToken',response.data.token)
//                 vm.$store.commit('setUser',response.data.user)
//                 //跳转到登录成功后的页面
//                 vm.$router.push({path:'/'})})
//             // else{
//             //     alert(response.data.msg)
//             //   }
//             // }).catch(function (e) {
//             //   console.log(e)
//             // })
//           }
//      }
//  };
  
   
  </script>
  <style>

    .container{
        height:100vh;
        width:100vw;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background:#A9AEB1;
    }

    .content{
       border:1px solid gray;
       padding: 30px 20px;
       background:#fff;
    }

  </style>