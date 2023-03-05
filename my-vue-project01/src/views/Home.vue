<template>
  <div>
    {{ title }}

    <hr />

    <div>
      <div>
        <el-input v-model="loginInfo.username" placeholder="用户名"></el-input>
      </div>
      <div>
        <el-input
          v-model="loginInfo.pass"
          placeholder="密码"
          show-password
        ></el-input>
      </div>
      <div>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>

    <div>
      <div>
        <el-input v-model="reginfo.username" placeholder="用户名"></el-input>
      </div>
      <div>
        <el-input
          v-model="reginfo.password"
          placeholder="密码"
          show-password
        ></el-input>
      </div>
      <div>
        <el-input v-model="reginfo.nickname" placeholder="昵称"></el-input>
      </div>
      <div>
        <el-button type="primary" @click="reg">注册</el-button>
      </div>
    </div>

    <div v-loading="loading">
      {{ userInfo != null ? '欢迎：' + userInfo.nickname : '请登录' }}
      <el-button
        type="warning"
        v-show="userInfo != null"
        size="medium"
        @click="loginout"
        >安全退出</el-button
      >
    </div>

    <div>
      <el-button @click="toFile">文件管理</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      title: '多功能测试页面',
      loginInfo: {
        username: '',
        pass: ''
      },
      reginfo: {
        username: '',
        password: '',
        nickname: ''
      },
      loading: false,
      userInfo: null
    };
  },
  computed: {},
  methods: {
    login() {
      if (this.loginInfo.username == '') {
        this.$message({
          type: 'warning',
          message: '用户名不能为空!'
        });
        return;
      }
      if (this.loginInfo.pass == '') {
        this.$message({
          type: 'warning',
          message: '密码不能为空!'
        });
        return;
      }

      let pwd = this.$md5(this.loginInfo.pass);

      this.$ajax(
        '/teach_project_service/user/auth/login',
        {
          username: this.loginInfo.username,
          password: pwd
        },
        (data) => {
          if (data.success) {
            this.$message({
              type: 'success',
              message: data.message
            });
            this.queryUserInfo();
            return;
          }
          this.$message({
            type: 'error',
            message: data.message
          });
        }
      );
    },
    reg() {
      if (this.reginfo.username == '') {
        this.$message({
          type: 'warning',
          message: '用户名不能为空!'
        });
        return;
      }
      if (this.reginfo.password == '') {
        this.$message({
          type: 'warning',
          message: '密码不能为空!'
        });
        return;
      }
      if (this.reginfo.nickname == '') {
        this.$message({
          type: 'warning',
          message: '昵称必须填写!'
        });
        return;
      }

      let pwd = this.$md5(this.reginfo.password);

      this.$ajax(
        '/teach_project_service/user/auth/reg',
        {
          username: this.reginfo.username,
          password: pwd,
          nickname: this.reginfo.nickname
        },
        (data) => {
          if (data.success) {
            this.$message({
              type: 'success',
              message: data.message
            });
            return;
          }
          this.$message({
            type: 'error',
            message: data.message
          });
        }
      );
    },
    queryUserInfo() {
      this.loading = true;
      this.$ajax('/teach_project_service/user/auth/getUserInfo', {}, (data) => {
        this.loading = false;
        if (data.success) {
          this.userInfo = data.tbUser;
          return;
        }
        this.$message({
          type: 'error',
          message: data.message != '' ? data.message : '请登录'
        });
      });
    },
    loginout() {
      this.loading = true;
      this.$ajax('/teach_project_service/user/auth/logout', {}, (data) => {
        this.loading = false;
        if (data.success) {
          this.$message({
            type: 'success',
            message: data.message
          });
          this.userInfo = null;
          return;
        }
        this.$message({
          type: 'error',
          message: data.message
        });
      });
    },
    toFile() {
      this.$router.push('/myfile');
    }
  },
  created() {
    this.queryUserInfo();
  }
};
</script>
