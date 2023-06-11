<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->
    <div class="adMins">
        <div class="admin-tools">
            <el-button type="warning" color="#006699" @click="refresh"><el-icon>
                    <Refresh />
                </el-icon>刷新</el-button>
            <el-button type="warning" color="#006699" @click="toAdd"><el-icon>
                    <Plus />
                </el-icon>添加</el-button>
            <el-button type="warning" @click="selectById" icon="Search">按ID查询</el-button>
        </div>
        <el-table :data="adMins" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="50" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="icon" label="头像">
                <template #default="{ row }">
                    <img v-if="row.icon" :src="row.icon" style="width: 50px; height: 50px;">
                    <span v-else>无头像</span>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="nickName" label="昵称" />
            <el-table-column prop="note" label="备注信息" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="loginTime" label="最后登录时间" />
            <el-table-column prop="status" label="帐号启用状态" />
            <el-table-column fixed="right" label="操作" width="120">
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
    <el-dialog v-model="dialogFormVisible" title="admin编辑">
        <el-form :model="adMin">
            <el-form-item label="用户名" prop="username" :rules="rules.username" :label-width="formLabelWidth">
                <el-input v-model="adMin.username" autocomplete="off" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="rules.password" :label-width="formLabelWidth">
                <el-input v-model="adMin.password" type="text" autocomplete="off" placeholder="请输入密码"
                    :show-password="true" />
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth">
                <el-input v-model="adMin.icon" autocomplete="off" placeholder="请输入头像网页http链接" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email" :rules="rules.email" :label-width="formLabelWidth">
                <el-input v-model="adMin.email" autocomplete="off" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="adMin.nickName" autocomplete="off" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="备注信息" :label-width="formLabelWidth">
                <el-input v-model="adMin.note" autocomplete="off" placeholder="请输入备注信息" />
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-select v-model="adMin.status" placeholder="please select your zone">
                    <el-option label="启用(1)" value="1" />
                    <el-option label="禁用(0)" value="0" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save"><el-icon>
                        <Check />
                    </el-icon>保存</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 按id查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="查询">
        <el-form :model="adMin">
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
import { defineComponent } from "vue"
import { adminPage, adminDelId, adminAdd, adminEdit, adminOne } from "../../http/ums-admin";
import { ElMessage, ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            searchText: "",
            coupons: [],
            adMins: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            dialogFormVisibleById: false,
            adMin: {
                "createTime": "",
                "email": "",
                "icon": "",
                "id": 0,
                "loginTime": "",
                "nickName": "",
                "note": "",
                "password": "",
                "status": 0,
                "username": ""
            },
            formLabelWidth: 100,
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' },
                    { min: 8, message: '账号长度不能少于8个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 8, message: '密码长度不能少于8个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.getAdMinsPage(1)
    },
    methods: {
        toEdit(admin) {
            console.log(admin);
            this.dialogFormVisible = true;
            this.adMin = cloneDeep(admin);
        },
        getAdMinsPage(current) {
            const data = {
                current: current,
                size: 3
            }
            adminPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.adMins = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getAdMinsPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        refresh() {
            this.getAdMinsPage(this.page.current);
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
                adminDelId(params)
                    .then((res) => {
                        if (res.success) {
                            this.getAdMinsPage(this.page.current);
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
            this.adMin = {
                "createTime": "",
                "email": "",
                "icon": "",
                "id": 0,
                "loginTime": "",
                "nickName": "",
                "note": "",
                "password": "",
                "status": 0,
                "username": ""
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
            adminOne(params).then(res => {
                this.dialogFormVisibleById = false;
                this.coupons.push(res.data.help);//在这个新数组里加入查到的信息
                const adMins = this.coupons;//将新数组赋值
                this.adMins = adMins;//显示
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
            const admin = this.adMin;
            if (admin.id == 0) {
                adminAdd(admin).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdMinsPage(this.page.current)
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
                        message: '请查看输入内容或格式是否有误！',
                        type: 'error',
                    })
                })
            }
            else {
                adminEdit(admin).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdMinsPage(this.page.current)
                        ElMessage({
                            message: '更新成功',
                            type: 'success',
                        })
                    }
                    else {
                        ElMessage({
                            message: '更新失败',
                            type: 'error',
                        })
                        return false
                    }
                }).catch(err => {
                    ElMessage({
                        message: '请查看输入内容或格式是否有误！',
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