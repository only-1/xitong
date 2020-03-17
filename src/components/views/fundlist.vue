<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data">
                <el-form-item label="按照时间筛选">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker>
                    <el-date-picker
                        v-model="search_data.endTime"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"
                    icon="search" @click="handleSearch()"
                    >筛选</el-button>
                </el-form-item>
            <el-form-item class="btnright">
                <el-button type="primary" 
                icon="view" 
                size="small"
                v-if="user.identity =='manager'"
                @click="handleAdd()">添加</el-button>
            </el-form-item>
            </el-form>
        </div>
        <el-table
        v-if="tableData.length>0"
            :data="tableData"
            style="width:100%">
             <el-table-column
                label="序号"
                prop="1"
                width="250">
            </el-table-column>
            <el-table-column
                label="创建时间"
                prop="data"
                width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column> 
            <el-table-column
                label="收支类型"
                prop="type"
                width="150">
            </el-table-column>
            <el-table-column
                label="收支描述"
                prop="describe"
                width="180">
            </el-table-column>
            <el-table-column
                label="收入"
                prop="income"
                width="180">
                <template slot-scope="scope">
                <span style="color:#333;">{{ scope.row.income}}</span>
      </template>
            </el-table-column>
            <el-table-column
                label="支出"
                prop="expend"
                width="170">
                <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="color:red;">{{ scope.row.expend}}</span>
      </template>
            </el-table-column>
            <el-table-column
                label="庄户现金"
                prop="cash"
                width="170">
                <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="color:red;">{{ scope.row.cash}}</span>
      </template>
            </el-table-column>
            <el-table-column
                label="备注"
                prop="remark"
                width="220">
            </el-table-column>
            <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="small"
          icon="edit"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          icon="delete"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
        </el-table>
         <!--分页-->
         <el-row>
             <el-col :span="24">
                <div class="pagination">
                    <el-pagination
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="paginations.page_index"
                     :page-sizes="paginations.page_sizes"
                     :page-size="paginations.page_size"
                     :layout="paginations.layout"
                     :total="paginations.total">
                </el-pagination>
                </div>
             </el-col>
         </el-row>
        <Dia-log :dialog="dialog" :formData="formData"
         @updata="getProfile"></Dia-log>
    </div>
</template>
<script>
import Dialog from '../../components/dialog.vue'
export default {
    name:'fundlist',
    components: {
      Dialog
    },
    data(){
        return{
            filterTableDate:[],
            search_data:{
                startTime:'',
                endTime:''
            },
            paginations:{
               page_index:1, //当前位于哪页
               total:0, //总共多少条数据
               page_size:5, //一页显示多少条
               page_sizes:[5,10,15] ,//每页显示多少条
               layout:"total,size,prev,pager,next,jumper" //翻页属性


            },
            tableData:[],
            alltableData:[],
            dialog:{
                show:false,
                title:'',
                option:'edit'
            },
            formData:{
                type:'',
                describe:'',
                income:'',
                expend:'',
                cash:'',
                remark:'',
                id:''
            }
        }
    },
    computed: {
        user(){
            return this.$store.getters.user;
        }
    },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){
            this.$axios.get("/api/profiles").then(res=>{
                this.alltableData = res.data
                this.filterTableDate = res.data
                //设置分页数据
                this.setPaginations();
            })
        },
        setPaginations(){
          //分页属性设置
          this.paginations.total = this.alltableData.length;
          this.paginations.page_index =1;
          this.paginations.page_size = 5;
          //设置默认的分页数据
          this.tableData = this.alltableData.filter((item,index)=>{
              return index < this.paginations.page_size
          })


        },
        handleEdit(index,row){
           //编辑
           this.dialg={
               show:true,
               title:'修改资金信息',
               option:'edit'
           },
           this.formData = {
               type:row.type,
               describe:row. describe,
               income:row.income,
               expend:row.expend,
               cash:row.cash,
               remark:row.remark,
               id:row.id
           }

        },
        handleDelete(index,row){
           this.$axios.delete(`/api/profiles/delete/${row.id}`).then(res=>{
               this.$message("删除成功");
               this.getProfile();

           })
        },
        handleAdd(){
          this.dialog= {
              show:true,
               title:'添加资金信息',
               option:'add'
          },
            this.formData={
                type:'',
                describe:'',
                income:'',
                expend:'',
                cash:'',
                remark:'',
                id:''
            }
        },
        handleSizeChange(page_size){
               //切换size
               this.paginations.page_index = 1
               this.paginations.page_size = page_size
        this.tableData =this.alltableData.filter((item,index)=>{
            return index < page_size
        })
        
        },
        handleCurrentChange(page){
          //获取当前页
          let index = this.paginations.page_size*(page-1);
          //数据总数
          let nums = this.paginations.page_size*page
        //容器
        let tables=[];
        for(let i = index;i<nums;i++){
            if(this.alltableData[i]){
                tables.push(this.alltableData[i])
            }
            this.tableData = tables
        }

        },
        handSearch(){
            //筛选
            if(!this.search_data.startTime||!this.search_data.endTime){
                this.$message({
                    type:'waring',
                    message:'请选择时间区间'
                })
                this.getProfile()
                return;
            }
            const sTime = this.search_data.startTime.getTime();
            const eTime = this.search_data.endTime.getTime();
            this.alltableData = this.filterTableDate.filter((item,index)=>{
                let date = new Date(item.date)
               let time = date.getTime()
               return time >=sTime&&time<=eTime;
               //分页数据
                this.setPaginations()

            })
        }
    }
}
</script>
<style scoped>

</style>