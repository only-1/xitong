<template>
    <div>
        <el-dialog :title="dialog.title" :visible.sync="dialog.show"
        close-on-click-modal="false"
        modal-append-to-body="false">
            <el-form :model="formData" ref="form"
             :rules="form_rule"
             label-width="120px"
             style="margin:10px;width:auto;">
              <el-form-item label="收支类型">
                <el-select v-model="formData.type" placeholder="收支类型">
                    <el-option 
                    v-for="(item,index) in format_type_list" 
                    :key="index"
                    :label="item" :value="item">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收支描述" prop="describe">
                <el-input v-model="formData.describle"></el-input>
              </el-form-item>
              <el-form-item label="现金">
                <el-input v-model="formData.income"></el-input>
              </el-form-item>
              <el-form-item label="支出">
                <el-input v-model="formData.expend"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remark"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialog.show = false">取 消</el-button>
              <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'dialog',
    props:{
       dialog:Object,
       formData:Object
    },
    data(){
        return{
            
            format_type_list:[
                "提现","充值","转账","等"
            ],
            form_rule:{
                describe:[
                    {required:true,message:'收支描述不能为空'}
                ]
            }

        }
    },
    methods:{
        onSubmit(form){
            this.$ref[form].validate(valid=>{
                if(valid){
                    const url = this.dialog.option=="add"?"add":`edit/${this.formData.id}`
                   this.$axios.post(`/api/profiles/${url}`,this.formData).then(res=>{
                       this.$message({
                           meassage:'添加成功',
                           type:'success'
                       })
                       //隐藏对话框
                       this.dialog.show = false
                       this.$emit('updata')
                   }) 
                }
            })
        }
    }
}
</script>
<style scoped>

</style>
