<template>
  <button
    v-if="visible"
    class="sidebar-toggle-btn"
    :class="{ collapsed }"
    :title="collapsed ? '展开目录' : '折叠目录'"
    @click="toggle"
  >
    <span class="sidebar-toggle-arrow"></span>
    <span class="sidebar-toggle-label">{{ collapsed ? '展开' : '折叠' }}</span>
    <span class="sidebar-toggle-arrow"></span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const collapsed = ref(false);
const visible = ref(false);

const STORAGE_KEY = "sidebar-collapsed";

const checkVisible = (): void => {
  const container = document.querySelector(".theme-container");
  visible.value = !!container && !container.classList.contains("no-sidebar");
};

const applyCollapsed = (val: boolean): void => {
  collapsed.value = val;
  const sidebar = document.querySelector(".vp-sidebar") as HTMLElement | null;
  const page = document.querySelector(".vp-page") as HTMLElement | null;

  if (sidebar) {
    sidebar.style.transform = val ? "translateX(-100%)" : "";
    sidebar.style.boxShadow = val ? "none" : "";
  }
  if (page) {
    page.style.paddingInlineStart = val ? "0" : "";
  }
};

const toggle = (): void => {
  applyCollapsed(!collapsed.value);
  localStorage.setItem(STORAGE_KEY, collapsed.value ? "1" : "0");
};

const restore = (): void => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "1") {
    applyCollapsed(true);
  }
};

let observer: MutationObserver | null = null;

onMounted(() => {
  restore();
  checkVisible();

  // 监听 .theme-container class 变化（路由变化时 VuePress 会切换 no-sidebar）
  observer = new MutationObserver(() => {
    checkVisible();
    // 路由切换后重新应用收起状态
    if (collapsed.value) {
      setTimeout(() => applyCollapsed(true), 50);
    }
  });
  const container = document.querySelector(".theme-container");
  if (container) {
    observer.observe(container, { attributes: true, attributeFilter: ["class"] });
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>
