<template>
  <transition name="fade" appear>
    <div
      @click.self="$emit('toggle')"
      class="
        h-full
        flex
        justify-center
        items-center
        overflow-x-hidden overflow-y-auto
        fixed
        top-0
        left-0
        right-0
        md:inset-0
        bg-black bg-opacity-40
        z-50
        p-4
      "
    >
      <slot />
    </div>
  </transition>
</template>