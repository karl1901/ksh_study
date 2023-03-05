<template>
  <div>
    <div>
      <el-button @click="toHome">首页</el-button>
    </div>
    <div style="display: flex; justify-content: center">
      {{ title }}
    </div>

    <div class="btns">
      <div>
        <el-button type="primary" @click="openUpload">上传文件</el-button>
      </div>
      <div>
        <el-button type="primary" @click="queryFile">刷新</el-button>
      </div>
    </div>

    <div>
      <el-table :data="fileInfoList" v-loading="queryLoading" height="550">
        <el-table-column prop="fid" label="文件ID"></el-table-column>
        <el-table-column prop="filename" label="文件名"></el-table-column>
        <el-table-column prop="fileinfo" label="文件描述"></el-table-column>
        <el-table-column label="文件大小">
          <template slot-scope="scope">
            {{ scope.row.fileSize | formatFileSize }}
          </template>
        </el-table-column>
        <el-table-column prop="contentType" label="文件类型"></el-table-column>
        <el-table-column label="图片预览">
          <template slot-scope="scope">
            <img
              v-show="checkImg(scope.row.contentType)"
              :src="getImgUrl(scope.row.fid)"
              width="120px"
              height="120px"
            />
            <span v-show="!checkImg(scope.row.contentType)">非图片</span>
          </template>
        </el-table-column>
        <el-table-column label="最后修改时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate }}
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: center; margin: 1rem 0rem">
        <page
          :page="fileInfoPage"
          @page-change="queryFile"
          v-loading="queryLoading"
        ></page>
      </div>
    </div>

    <div>
      <el-dialog
        title="上传文件"
        :visible.sync="showUploadDialog"
        v-loading="uploadLoading"
        @close="closeUploadDialog"
      >
        <div>
          <el-form>
            <el-form-item>
              <el-button type="warning" @click="chooseFile">选择文件</el-button>
              {{ file != null ? file.name : '' }}
            </el-form-item>
            <el-form-item label="文件描述：">
              <el-input
                v-model="uploadFileInfo"
                clearable
                placeholder="请输入文件描述.."
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="upload">上传</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../components/Page.vue';
export default {
  components: { Page },
  name: 'MyFile',
  data() {
    return {
      title: '文件管理',
      queryLoading: false,
      queryFileInfo: {
        filename: '',
        fileinfo: '',
        contentType: ''
      },
      uploadLoading: false,
      showUploadDialog: false,
      file: null,
      uploadFileInfo: '',
      fileInfoList: [],
      fileInfoPage: {
        pageNumber: 1,
        pageSize: 5
      }
    };
  },
  methods: {
    checkImg(type) {
      return type && type.indexOf('image') >= 0 ? true : false;
    },
    getImgUrl(id) {
      return this.$getDownLoadUrl(id);
    },
    closeUploadDialog() {
      this.file = null;
      this.uploadFileInfo = '';
      this.queryFile();
    },
    upload() {
      if (this.file == null) {
        this.$message({
          type: 'warning',
          message: '请选择文件!'
        });
        return;
      }
      if (this.uploadFileInfo == '') {
        this.$message({
          type: 'warning',
          message: '文件描述必须填写!'
        });
        return;
      }
      this.uploadLoading = true;
      this.$upFile(
        '/teach_project_service/user/file/upload',
        this.file,
        {
          fileinfo: this.uploadFileInfo
        },
        (data) => {
          this.uploadLoading = false;
          if (data.success) {
            this.$message({
              type: 'success',
              message: data.message
            });
            this.file = null;
            this.uploadFileInfo = '';
            return;
          }
          this.$message({
            type: 'error',
            message: data.message
          });
        }
      );
    },
    chooseFile() {
      this.$openFile((file) => {
        this.file = file;
      });
    },
    openUpload() {
      this.showUploadDialog = true;
    },
    queryFile() {
      this.queryLoading = true;
      this.$ajax(
        '/teach_project_service/user/file/queryAll',
        {
          filename: this.queryFileInfo.filename,
          fileinfo: this.queryFileInfo.fileinfo,
          contentType: this.queryFileInfo.contentType,
          pageNumber: this.fileInfoPage.pageNumber,
          pageSize: this.fileInfoPage.pageSize
        },
        (data) => {
          this.queryLoading = false;
          if (data.success) {
            this.fileInfoList = data.list;
            this.fileInfoPage = data.page;
            return;
          }
        }
      );
    },
    toHome() {
      this.$router.push('/');
    }
  },
  created() {
    this.queryFile();
  }
};
</script>

<style scoped>
.btns {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0rem;
}

.btns > div {
  margin: 0rem 0.5rem;
}
</style>
