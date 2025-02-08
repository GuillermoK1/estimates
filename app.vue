<template>
  <div class="app-container">
    <video class="background-video" autoplay loop muted playsinline>
      <source src="/240968.mp4" type="video/mp4">
    </video>
    <UContainer>
      <HeaderComponent/>
        <NuxtPage/>
      <FooterComponent/>
    </UContainer>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.background-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  object-fit: cover;
}
</style>
