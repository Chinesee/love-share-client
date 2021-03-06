<template>
  <div class="mt-8">
    <p class="w-full pb-2 text-2xl font-bold">
      注册新用户
    </p>
    <div class="overflow-hidden">
      <vs-select
        autocomplete
        class="mb-1"
        placeholder="请选择您的学校"
        width="100%"
        warning-text="请选择您的学校"
        v-model="school"
        :disabled="schoolList.length === 0"
        :warning="selectWarning"
        @focus="selectWarning = false"
      >
        <vs-select-item
          v-for="(item, i) in schoolList"
          :key="i"
          :value="item._id"
          :text="item.name"
        />
      </vs-select>
    </div>

    <vs-input
      class="w-full pb-1"
      val-icon-warning="report_problem"
      val-icon-danger="clear"
      v-for="(item, i) in signUpInput"
      :key="i"
      :type="item.type"
      :label-placeholder="item.placeholder"
      :description-text="item.description"
      :warning="item.isWarnng"
      :warning-text="item.warningText"
      :danger="item.isError"
      :danger-text="item.errorText"
      v-model.trim="item.value"
      @focus="item.isWarnng = false, item.isError = false"
    />
    <div class="flex items-center mt-2 py-2">
      <vs-input
        class="w-7/12 mr-2"
        placeholder="验证码"
        val-icon-danger="clear"
        v-model.trim="code"
        :danger="codeError"
        :danger-text="codeErrorText"
        @focus="codeError = false"
      />
      <vs-button
        class="w-5/12 text-sm"
        type="border"
        @click="getCode()"
      >{{ codeText }}</vs-button>
    </div>
    <vs-button
      id="signUpBtn"
      class="w-full mt-2 mb-1 m-radius vs-con-loading__container"
      color="rgb(103, 123, 255)"
      gradient-color-secondary="rgb(var(--vs-primary), 1)"
      type="gradient"
      :disabled="signUpDisable"
      @click="onSignUp()"
    >立即注册</vs-button>
    <div class="text-right">
      <span
        class="text-sm text-gray-500 transition cursor-pointer hover:text-blue-600"
        @click="switchToSignIn()"
      >已有账号，立即登录</span>
    </div>
  </div>
</template>

<script>
import { signUp } from '@/request/api/user'
import { getSchoolList, checkNickname, checkPhoneNumber } from '@/request/api/common'

const signUpInput = [
  {
    placeholder: '真实姓名',
    value: '',
    type: 'text',
    description: '',
    reg: /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/,
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    noneEmptyText: '请输入您的真实姓名',
    noneCheckText: '姓名不合规范，请重新填写',
  },
  {
    placeholder: '昵称',
    value: '',
    type: 'text',
    description: '只能是中文、字母、数字',
    reg: /^[\d\w\u4e00-\u9fa5,.;:"'?!-]{2,8}$/,
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    noneEmptyText: '请输入您的昵称',
    noneCheckText: '昵称不合规范，请重新填写',
  },
  {
    placeholder: '密码',
    value: '',
    type: 'password',
    description: '6-16个字符，只能是字母、数字和下划线',
    reg: /^[\w]{6,16}$/,
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    noneEmptyText: '请输入您的密码',
    noneCheckText: '密码不合规范，请重新填写',
  },
  {
    placeholder: '确认密码',
    value: '',
    type: 'password',
    description: '',
    reg: /^[\w]{6,16}$/,
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    noneEmptyText: '请输入二次确认密码',
    noneCheckText: '密码不合规范，请重新填写',
  },
  {
    placeholder: '手机号码',
    value: '',
    type: 'text',
    description: '',
    reg: /^[1]([3-9])[0-9]{9}$/,
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    noneEmptyText: '手机号不能为空哦',
    noneCheckText: '手机号格式不正确',
  },
]

export default {
  name: 'SignIn',
  data: () => ({
    signUpInput,
    signUpDisable: false,
    selectWarning: false,
    school: '',
    schoolList: [],
    codeError: false,
    code: '', // 验证码
    codeText: '获取验证码',
    codeErrorText: '',
    timer: null,
  }),

  created() {
    this.getSchoolList()
  },

  methods: {
    onSignUp() {
      if (this.validate() && this.check()) {
        if (this.code.length <= 0) {
          this.codeError = true
          this.codeErrorText = '请填入验证码'
          return
        }

        this.$loading(
          async () => {
            this.signUpDisable = true

            const { code } = await signUp({
              school: this.school,
              real_name: this.signUpInput[0].value,
              nickname: this.signUpInput[1].value,
              password: this.signUpInput[2].value,
              phone: this.signUpInput[4].value,
            })
            if (code === 2000) {
              const status = await this.$store.dispatch('user/signIn', {
                account: this.signUpInput[4].value,
                password: this.signUpInput[2].value,
              })
              if (status === 2000) {
                await this.$store.dispatch('user/getUserInfo')
                this.$router.replace('/')
              }
            } else if (code === 4002) {
              this.signUpInput[4].isError = true
              this.signUpInput[4].errorText = '手机号已被注册'
            } else if (code === 4003) {
              this.signUpInput[1].isError = true
              this.signUpInput[1].errorText = '昵称已被使用'
            }
          },
          {
            background: 'primary',
            color: '#fff',
            container: '#signUpBtn',
            scale: 0.45,
          },
          () => { this.signUpDisable = false },
        )
      }
    },

    // 输入框非空验证
    validate() {
      return this.signUpInput.every((input) => {
        if (this.school.length <= 0) {
          this.selectWarning = true
          return false
        }
        if (input.value.length <= 0) {
          input.isWarnng = true
          input.warningText = input.noneEmptyText
          return false
        }
        return true
      })
    },

    // 检查输入的数据格式
    async check() {
      const flags = this.signUpInput.map((input) => {
        if (input.reg.test(input.value)) {
          return true
        }
        input.isError = true
        input.errorText = input.noneCheckText
        return false
      })

      if (this.signUpInput[2].value !== this.signUpInput[3].value) {
        this.signUpInput[3].isError = true
        this.signUpInput[3].errorText = '与前一次不相同，请确保两次密码输入已知'
        return false
      }

      const [{ code: code1 }, { code: code2 }] = await Promise.all([
        checkNickname({ nickname: this.signUpInput[1].value }),
        checkPhoneNumber({ phone: this.signUpInput[4].value }),
      ])
      if (code1 === 4003) {
        this.signUpInput[1].isError = true
        this.signUpInput[1].errorText = '该昵称已被使用'
      }
      if (code2 === 4003) {
        this.signUpInput[4].isError = true
        this.signUpInput[4].errorText = '手机号已被注册'
      }
      if (code1 === 4003 || code2 === 4003) {
        return false
      }

      const flag = flags.every(Boolean)
      return flag
    },

    // 获取验证码
    async getCode() {
      if (this.validate() && await this.check()) {
        if (!this.timer) {
          this.getVerificationCode()
          let count = 60
          this.codeText = `${count}s`
          this.timer = setInterval(() => {
            if (count > 0) {
              count -= 1
              this.codeText = `${count}s`
            } else {
              clearInterval(this.timer)
              this.timer = null
              count = 60
              this.codeText = '重新发送'
            }
          }, 1000)
        }
      }
    },

    // 生成伪验证码
    async getVerificationCode() {
      this.code = Math
        .random()
        .toFixed(6)
        .toString()
        .slice(-6)
    },

    // 获取选择学校列表
    async getSchoolList() {
      const { code, data } = await getSchoolList()
      if (code === 2000) {
        this.schoolList = data.school_list
      }
    },

    switchToSignIn() {
      this.$emit('switchComponent', 'SignIn')
      document.title = '登录 - 乐享校园'
    },
  },
}
</script>

<style lang="scss" scoped>
.con-select:not(.input-select-validate-warning) {
  &::v-deep .vs-select--input {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>
