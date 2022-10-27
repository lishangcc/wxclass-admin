<template>

    <a-button type="primary" @click="showDrawer" style="display:flex;justify-content: flex-start;">
      <template #icon><PlusOutlined /></template>
      添加课程
    </a-button>

    <a-table :columns="columns" :pagination="false" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            课程名称
          </span>
        </template>
      </template>
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'faceImg'">
          <span>
            <img :src="'/api'+record.faceImg" style="width: 80px; height:80px;"/>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
           <a>进入章节</a>
            <a-divider type="vertical" />
            <a class="edit" @click="onEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a>刪除</a>
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
              <a-form-item label="课程名称" name="name">
                <a-input v-model:value="form.name" placeholder="请输入课程名称" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="主讲老师" name="teachers">
                <a-select v-model:value="teachers" placeholder="请选择主讲老师">
                </a-select>
              </a-form-item>
            </a-col>
          
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="课程类型" name="attribute">
                <a-select v-model:value="form.attribute" placeholder="请选择课程类型">
                  <a-select-option value="1">公开课</a-select-option>
                  <a-select-option value="2">标准课</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="课时长度" name="ks">
                <a-input v-model:value="form.ks" placeholder="请输入课时长度" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="封面" name="faceImg">
                
                <a-upload
                  v-model:file-list="fileList"
                  name="faceImg"
                  action="/api/course/upload"
                  :headers="headers"
                  @change="handleChange"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    上传封面
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
                columns:[{
                    title: '课程名称',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '讲师',
                    dataIndex: 'teacherName',
                    key: 'teacherName',
                }, {
                    title: '类别',
                    dataIndex: 'attribute',
                    key: 'attribute',
                }, {
                    title: '封面',
                    key: 'faceImg',
                    dataIndex: 'faceImg',
                }, {
                    title: '课时',
                    key: 'ks',
                    dataIndex: 'ks',
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
                var that = this
                var url = "/api/course/getPage?pageIndex="+that.pageIndex+"&pageSize="+that.pageSize
                //var params = "pageIndex="+that.pageIndex+"&pageSize="+that.pageSize
                var params = "pageIndex=1&pageSize=2"
                axios.get(url).then(function(result){
                    console.log(result.data)
                    that.data = result.data.data
                    that.pageIndex = result.data.pageIndex
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
              let that = this;
              console.log(this.form);
              var url = "/api/course/add?name="
              +this.form.name+"&teacherId="+this.form.teacherId
              +"&attribute="+this.form.attribute+"&ks="+this.form.ks
              +"&faceImg="+this.form.faceImg

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
            // 上传文件
            handleChange(info) {
             
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }

              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                console.log('上传文件', info.file.response.data)
                this.form.faceImg = info.file.response.data;

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
            }

          }

    });
  </script>