<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->
    <div class="adCates">
        <div class="adcate-tools">
            <el-button type="warning" color="#006699" @click="refresh"><el-icon>
                    <Refresh />
                </el-icon>刷新</el-button>
            <el-button type="warning" color="#006699" @click="toAdd" v-if="permission()"><el-icon>
                    <Plus />
                </el-icon>添加</el-button>
            <el-button type="warning" @click="selectById" icon="Search">按ID查询</el-button>
        </div>
        <el-table :data="adCates" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="50" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="adminCount" label="后台用户数量" />
            <el-table-column prop="description" label="描述" />
            <el-table-column prop="sort" label="排序" sortable :default-sort="{ order: 'ascending' }"
                :sort-method="sortHandler" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="status" label="帐号启用状态" />
            <el-table-column fixed="right" label="操作" width="120" v-if="permission()">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)"><el-icon>
                            <Edit />
                        </el-icon>更新</el-button>
                    <el-button link type="danger" size="small" @click="del(scope.row.id)"><el-icon>
                            <Delete />
                        </el-icon>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="角色编辑">
        <el-form :model="adCate">
            <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="adCate.name" autocomplete="off" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="后台用户数量" :label-width="formLabelWidth">
                <el-input v-model="adCate.adminCount" autocomplete="off" placeholder="请输入后台用户数量" />
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
                <el-select v-model="adCate.description">
                    <el-option label="无权限" value="无权限" />
                    <el-option label="只能查看及操作商品" value="只能查看及操作商品" />
                    <el-option label="拥有所有查看和操作功能" value="拥有所有查看和操作功能" />
                </el-select>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="adCate.sort" autocomplete="off" placeholder="请输入排序" />
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <template #label>
                    <span style="color: red">*</span> 状态
                </template>
                <el-select v-model="adCate.status">
                    <el-option label="启用(1)" value="1" />
                    <el-option label="禁用(0)" value="0" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 按id查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="查询">
        <el-form :model="adCate">
            <el-form-item label="请输入ID" :label-width="formLabelWidth">
                <div class="search-input-wrapper">
                    <el-input v-model="searchText" placeholder="按ID查询,请输入ID" autocomplete="off" class="search-input" />
                    <el-button type="primary" icon="Search" @click="getById(searchText)" />
                    <el-button type="danger" icon="Delete" @click="clearSearchInput" class="search-clear-btn" />
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleById = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent ,inject} from "vue"
import { rolePage, roleDelId, roleAdd, roleEdit, roleOne } from "../../http/ums-role";
import { ElMessage, ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    setup() {
    const { permission } = inject('permissions');

    return {
     
        permission
    };
},
    data() {
        return {
            searchText: "",
            coupons: [],
            adCates: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            dialogFormVisibleById: false,
            adCate: {
                "adminCount": 0,
                "createTime": "",
                "description": "",
                "id": 0,
                "name": "",
                "sort": 0,
                "status": 0
            },
            formLabelWidth: 100
        }
    },
    mounted() {
        this.getAdCatesPage(1)
    },
    methods: {
        toEdit(adcate) {
            console.log(adcate);
            this.dialogFormVisible = true;
            this.adCate = cloneDeep(adcate);
        },
        getAdCatesPage(current) {
            const data = {
                current: current,
                size: 6
            }
            rolePage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.adCates = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getAdCatesPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        refresh() {
            this.getAdCatesPage(this.page.current);
            ElMessage({
                message: '刷新成功',
                type: 'success',
            })
        },
        clearSearchInput() {
            this.searchText = ""; // 将输入框的值重置为空字符串
            ElMessage({
                message: '搜索框内容已清空',
                type: 'success',
            })
        },
        sortHandler(a, b) {
            if (!a.sort) return 1; // a为空，排在最后
            if (!b.sort) return -1; // b为空，排在最前
            return a.sort - b.sort; // 按照数值大小排序
        },
        del(id) {
            // 显示确认弹窗
            ElMessageBox.confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 用户点击了确定按钮，执行删除操作
                const params = {
                    id: id,
                };
                ElMessage({
                    message: '删除成功',
                    type: 'success',
                })
                roleDelId(params)
                    .then((res) => {
                        if (res.success) {
                            this.getAdCatesPage(this.page.current);
                        } else {
                            console.log(res.msg);
                            return false;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }).catch(() => {
                // 用户点击了取消按钮，不执行任何操作
                ElMessage({
                    message: '取消删除',
                    type: 'warning',
                })
            });
        },
        toAdd() {
            //到添加的页面
            this.adCate = {
                "adminCount": 0,
                "createTime": "",
                "description": "选择权限",
                "id": 0,
                "name": "",
                "sort": 0,
                "status": "选择状态"
            },
                this.dialogFormVisible = true;
        },

        selectById() {
            this.dialogFormVisibleById = true;
        },
        // 按ID查询
        getById(id) {
            this.coupons = [];//新建一个数组
            const params = {
                id: id
            }
            roleOne(params).then(res => {
                this.dialogFormVisibleById = false;
                this.coupons.push(res.data.help);//在这个新数组里加入查到的信息
                const adCates = this.coupons;//将新数组赋值
                this.adCates = adCates;//显示
                ElMessage({
                    message: '查询成功',
                    type: 'success',
                })
            }).catch(err => {
                ElMessage({
                    message: '查询的ID不存在',
                    type: 'warning',
                })
                console.log(err);
            })
        },
        save() {
            const adcate = this.adCate;
            if (adcate.id == 0) {
                roleAdd(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })
                    }
                    else {
                        ElMessage({
                            message: '添加失败',
                            type: 'error',
                        })
                        return false
                    }
                }).catch(err => {
                    ElMessage({
                        message: '网络错误联系管理员',
                        type: 'error',
                    })
                })
            }
            else {
                roleEdit(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
                        ElMessage({
                            message: '更新成功',
                            type: 'success',
                        })
                    }
                    else {
                        ElMessage({
                            message: '刷新失败',
                            type: 'success',
                        })
                        return false
                    }
                }).catch(err => {
                    ElMessage({
                        message: '网络错误联系管理员',
                        type: 'error',
                    })
                })
            }

        }

    }

});
</script>

<style lang="scss" scoped>
.search-input-container {
    display: flex;
    align-items: center;
}

.search-input-wrapper {
    display: flex;
    align-items: center;
}

.search-input {
    margin-right: 10px;
}
</style>

  

