<template>
    <div>
        <div class="content">
            <!-- 页面组件的占位 iframe -->
            <RouterView key="key"></RouterView>
        </div>
        <div v-if="showMenu" class="container">
            <!-- 菜单栏 -->
            <el-aside width="200px" class="menu">
                <el-menu default-active="/ums-admin" router class="el-menu-vertical-demo" @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item>
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>权限管理平台</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/ums-admin">
                        <el-icon>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                        </el-icon>
                        <span>管理员管理</span>
                    </el-menu-item>
                    <el-menu-item index="/ums-role">
                        <el-icon>
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                        </el-icon>
                        <span>角色管理</span>
                    </el-menu-item>
                    <el-menu-item index="/ums-permission">
                        <el-icon>
                            <el-icon>
                                <Management />
                            </el-icon>
                        </el-icon>
                        <span>权限管理</span>
                    </el-menu-item>
                    <el-menu-item index="/ums-resource">
                        <el-icon>
                            <el-icon>
                                <Grid />
                            </el-icon>
                        </el-icon>
                        <span>资源管理</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon></el-icon>
                        <span>404页面</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>公告</span>
                    </el-menu-item>
                    <el-menu-item index="4" disabled>
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>设置</span>
                    </el-menu-item>
                    <el-menu-item>
                        <el-icon>
                            <el-icon-back />
                        </el-icon>
                        <span @click="handleLogout">退出登录</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
        </div>
    </div>
</template>
  
<script>
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            showMenu: false
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            // 处理菜单打开事件
        },
        handleClose(key, keyPath) {
            // 处理菜单关闭事件
        },
        handleLogout() {
            // 清除用户登录状态
            localStorage.removeItem('token'); // 清除存储在 localStorage 中的 token
            // 跳转到登录页面
            this.$router.push({ name: "login" });
        }

    },
    mounted() {
        // 监听路由变化，判断是否为登录页面
        this.$router.beforeEach((to, from, next) => {
            if (to.name === "login") {
                // 是登录页面，不显示菜单栏
                this.showMenu = false;
            } else {
                // 非登录页面，显示菜单栏
                this.showMenu = true;
            }
            next();
        });
    }
});
</script>
  
<style lang="scss" scoped>
.container {
    display: flex;
}

.menu {
    width: 200px;
    background-color: #f2f2f2;
    position: fixed;
    top: 0;
    bottom: 0;
}

.content {
    flex: 1;
    padding: 20px;
    margin-left: 220px;
    /* 左边菜单的宽度 + 20px 间距 */
}
</style>
  