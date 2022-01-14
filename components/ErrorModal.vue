<template>
  <div class="relative w-full max-w-2xl px-4 h-full md:h-auto">
    <div class="bg-white rounded-lg shadow relative">
      <!-- Modal body -->
      <div class="p-6 space-y-8 text-center">
        <h3 class="text-4xl font-semibold">
          Whoops! <br />
          An error has occurred
        </h3>
        <p class="text-xl">{{ errorMsg }}</p>
        <button
          @click="$emit('toggle')"
          class="
            text-white
            bg-red-500
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
          "
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: Error,
  },
  computed: {
    errorMsg: function () {
      return this.error.response.data.message
        ? this.error.response.data.message
        : this.error.message
    },
  },
}
</script>