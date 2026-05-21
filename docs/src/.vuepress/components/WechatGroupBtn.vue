<template>
  <div class="wx-group-btn">
    <span class="btn-label">
      <i class="fa6-brands:weixin" style="margin-right:6px"></i>加入交流群
    </span>
    <div class="qr-popup">
      <img src="/wechat-group.png" alt="微信群二维码" />
      <p>扫码加入微信交流群</p>
    </div>
  </div>
</template>

<style scoped>
.wx-group-btn {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.btn-label {
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 20px;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  transition: background 0.2s;
  user-select: none;
}

.wx-group-btn:hover .btn-label {
  background: var(--vp-c-brand-dark, #07a15c);
}

.qr-popup {
  display: none;
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.13);
  padding: 12px;
  text-align: center;
  z-index: 100;
  white-space: nowrap;
}

.wx-group-btn:hover .qr-popup {
  display: block;
}

.qr-popup img {
  width: 160px;
  height: 160px;
  display: block;
  margin: 0 auto;
}

.qr-popup p {
  margin: 8px 0 0;
  font-size: 13px;
  color: #555;
}
</style>
