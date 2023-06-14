<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <img src="/src/assets/logo.png"/>
            </div>
            <el-form :model="formData" @submit.prevent="login" class="login-form" label-width="55">
                <el-form-item label="用户名">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="formData.password"></el-input>
                </el-form-item>
                <div class="login-header">
                    <el-form-item>
                        <el-button type="primary" native-type="submit">登录</el-button>
                        <el-button type="primary" @click="resetForm">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { adminLogin,adminRoleOne } from "../../http/ums-admin"; // Replace with the actual API file location

export default {
    setup() {
        const formData = ref({
            username: '414090297',
            password: '12345678',
        });
        const router = useRouter();

        const resetForm = () => {
            formData.value = {
                username: '',
                password: '',
            };
        };

        const login = async () => {
            if (!formData.value.username || !formData.value.password) {
                ElMessage.error('账号和密码不能为空');
                return;
            }
            try {
                const response = await adminLogin(formData.value);
                localStorage.setItem('token', response.token);
                localStorage.setItem('adminId',response.data.admin.id)
                const result = await adminRoleOne(response.data.admin)
                if(result.data&&result.data.help){
                    localStorage.setItem('roleId', result.data.help.roleId);
                }
                // Handle successful login, e.g., store token in local storage
                // Redirect to the desired page, e.g., home page
                router.push('/ums-admin');
            } catch (error) {
                // Handle login error, e.g., display error message
                console.error(error);
                ElMessage({
                    message: '登录失败!请检查账号密码是否有误',
                    type: 'error',
                })
            }
        };

        return {
            formData,
            resetForm,
            login,
        };
    },
};
</script>
  
<style scoped>
.login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.login-box {
    max-width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-form .el-form-item {
    margin-bottom: 20px;
}

.login-header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>
  