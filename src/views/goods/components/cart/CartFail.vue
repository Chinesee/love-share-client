<template>
  <div class="p-4">
    <div class="p-10 flex flex-col items-center justify-center base-shadow bg-white radius">
      <i
        class="el-icon-error text-danger"
        style="font-size: 80px;"
      ></i>
      <p class="mt-2 text-2xl">订单创建失败</p>
      <p class="mb-6 text-gray-600">服务器发生错误</p>
      <div>
        <vs-button
          size="small"
          color="#a0aec0"
          type="border"
          @click="$router.replace('/')"
        >返回首页</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartSuccess',
  data: () => ({
    orderId: '',
  }),

  mounted() {
    this.orderId = this.$store.state.cart.orderId
  },
}
</script>
