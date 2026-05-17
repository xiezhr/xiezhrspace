<template>
  <div class="wechat-float">
    <!-- 微信群按钮 -->
    <div class="float-btn" @click="toggleGroup" title="微信群">
      <i class="fa6-solid:users"></i>
    </div>
    <!-- 公众号按钮 -->
    <div class="float-btn" @click="toggleOfficial" title="公众号">
      <i class="fa6-solid:qrcode"></i>
    </div>

    <!-- 微信群二维码弹窗 -->
    <transition name="fade">
      <div v-if="showGroup" class="qr-popup">
        <img src="/wechat-group.png" alt="微信群" />
      </div>
    </transition>

    <!-- 公众号二维码弹窗 -->
    <transition name="fade">
      <div v-if="showOfficial" class="qr-popup">
        <img src="/wechat-official.png" alt="公众号" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showGroup = ref(false);
const showOfficial = ref(false);

const toggleGroup = () => {
  showGroup.value = !showGroup.value;
  showOfficial.value = false;
};

const toggleOfficial = () => {
  showOfficial.value = !showOfficial.value;
  showGroup.value = false;
};
</script>