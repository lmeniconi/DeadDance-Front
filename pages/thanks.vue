<template>
  <div class="w-full h-screen flex justify-center items-center text-center">
    <transition name="fade">
      <div v-if="show" class="space-y-16 text-white">
        <h1
          class="text-6xl md:text-8xl xl:text-9xl tracking-wider font-cursive"
        >
          Thanks {{ $route.query.name }}
        </h1>
        <p class="text-lg md:text-xl">
          The death is waiting for you <br />
          {{ $route.query.date }}
        </p>
        <div>
          <NuxtLink to="/" class="text-sm tracking-wide hover:underline"
            >Return to Home</NuxtLink
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    this.show = true
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>