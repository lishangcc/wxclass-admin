<template>
    
    <a-button type="primary" @click="showDrawer" style="display:flex;justify-content: flex-start;">
      <template #icon><PlusOutlined /></template>
      添加章节
    </a-button>
   
    <a-table :columns="columns" :pagination="false" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            章节名称
          </span>
        </template>
      </template>
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'info'">
          <a>
            {{ record.info }}
          </a>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a-divider type="vertical" />
            <a class="edit" @click="onEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="deleteItem(record)">刪除</a>
          </span>
        </template>
      </template>
    </a-table>
    <a-pagination 
      v-model:current="pageIndex" 
      :pageSize="pageSize" 
      :total="count" 
      @change="changePageIndex" 
      show-less-items  
      style="text-align:right;margin-top:10px;"
      />


      <!-- 添加抽屉 -->
 
      <a-drawer
        title="添加课程"
        :width="400"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }"
        @close="onClose"
      >
        <a-form :model="form" :rules="rules" layout="vertical">
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="章节名称" name="name">
                <a-input v-model:value="form.name" placeholder="请输入章节名称" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
          <a-col :span="24">
              <a-form-item label="章节内容" name="info">
                <a-input v-model:value="form.info" placeholder="请输入章节内容" />
              </a-form-item>
            </a-col>
          
          </a-row>
         
         
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="视频" name="file">
                
                <a-upload
                  v-model:file-list="fileList"
                  name="file"
                  action="/api/chapter/upload"
                  :beforeUpload="beforeUpload"
                  :headers="headers"
                  @change="handleChange"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    上传视频
                  </a-button>
                </a-upload>
                
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <template #extra>
          <a-space>
            <a-button @click="onClose">关闭</a-button>
            <a-button type="primary" @click="onSaveData">提交</a-button>
          </a-space>
        </template>
      </a-drawer>

  </template>
  <script>
    import axios from 'axios';
    import { message } from 'ant-design-vue';
    import { UploadOutlined,PlusOutlined } from '@ant-design/icons-vue';
    import { defineComponent,reactive, ref } from 'vue';
    export default ({
        data() {
            return {
                fileList:[],
                teachers:["张老师","黄老师","李老师"],
                form:{
                  name: '',
                  teacherId: '',
                  attribute: '',
                  ks: '',
                  faceImg: ''
                },
                visible:false,
                data:null,
                pageIndex:1,
                count:2,
                pageSize:2,
                courseId:9,
                columns:[{
                    title: '章节名称',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '章节内容',
                    dataIndex: 'info',
                    key: 'info',
               
                }, {
                    title: '操作',
                    key: 'action',
                }]
            };
        },
        
        mounted:function(){
            this.getData()
        },
        methods:{

            getData(){
                // `this` 在方法里指向当前 Vue 实例
                
                let id =this.$route.query.id
                 console.log(id+"这里是chapter")
                var that = this
                var url = "/api/chapter/getPage?pageIndex="+that.pageIndex+"&pageSize="+that.pageSize+"&courseId="+id
                
                var params = "pageIndex=1&pageSize=2"
                axios.get(url).then(function(result){
                    console.log(result.data)
                    that.data = result.data.data
                    that.pageIndex = result.data.pageIndex
                    that.info = result.data.info
                    that.count = result.data.totalRecord
                    console.log(that.count,that.pageIndex,"-------------------------");
                }).catch(function (reason) {
                    console.log(reason)
                })
    
            },

            changePageIndex(){
              this.getData()
            },
            //显示抽屉
           showDrawer(){
              this.visible = true;
            },
            //隐藏抽屉
            onClose(){
              this.visible = false;
            },
            //当点击保存数据时
            onSaveData(){
              let id =this.$route.query.id
              let that = this;
              console.log(this.form);
              var url = "/api/chapter/add?name="
              +this.form.name+"&courseId="+id
              +"&info="+this.form.info+"&video="+this.form.file
              

              console.log(url);
            
              var params = this.form
              axios.get(url,params).then(function(result){
                    console.log(result.data)
                    that.onClose();
                    that.getData();
                }).catch(function (reason) {
                    console.log(reason)
                })
            },
            beforeUpload(file){
              const sizeOk = file.size <1024*1024*1024*1024*300;  
              if (!sizeOk) {
                message.error('照片大小超过300K！');
              }
              
              
              return sizeOk ;
            },
            // 上传文件
            handleChange(info) {
             
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }

              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                console.log('上传文件', info.file.response.data)
                this.form.file = info.file.response.data;

                console.log(this.form);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },

            //编辑
            onEdit(record){
              console.log(record.id);

              this.form = record;
              this.showDrawer();
            },
            //删除
            deleteItem(record){
              
              let that = this;
              console.log(this.form);
              var url = "/api/chapter/delete?id="+record.id
              console.log(url);
            
            
              axios.get(url).then(function(result){
                    console.log(result.data)
                  
                    that.getData();
                }).catch(function (reason) {
                    console.log(reason)
                })
            }

          }

    });
  </script>