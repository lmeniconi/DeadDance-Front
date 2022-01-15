<template>
  <div>
    <section class="w-full min-h-screen grid grid-cols-2 gap-10 lg:gap-4">
      <div
        class="
          col-span-2
          lg:col-auto
          flex
          items-end
          lg:items-center
          text-center
        "
      >
        <div class="w-full text-white">
          <h1
            class="text-7xl md:text-8xl xl:text-9xl tracking-wider font-cursive"
          >
            Reserve a dance <br />
            with the death
          </h1>
        </div>
      </div>

      <div
        class="
          w-10/12
          lg:w-full
          mx-auto
          col-span-2
          lg:col-auto
          flex
          lg:items-center
        "
      >
        <client-only>
          <v-date-picker
            v-model="auxValue"
            @input="dateSelected"
            mode="date"
            :min-date="new Date()"
            :disabled-dates="{ weekdays: [1, 7] }"
            is-expanded
          />
        </client-only>
      </div>
    </section>

    <ModalLayout v-if="reserveModal" @toggle="toggleReserveModal">
      <ReserveModal :date="date" @toggle="toggleReserveModal" />
    </ModalLayout>

    <ModalLayout v-if="error" @toggle="toggleErrorModal">
      <ErrorModal :error="error" @toggle="toggleErrorModal" />
    </ModalLayout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reserveModal: false,
      date: null,

      error: null,

      auxValue: null,
    }
  },
  methods: {
    toggleReserveModal(error) {
      this.reserveModal = !this.reserveModal
      if (error) {
        this.error = error
      }
    },
    toggleErrorModal() {
      this.error = null
    },
    dateSelected(date) {
      console.log('before', date)
      if (date) {
        date.setHours(0)
        this.date = date.toISOString().split('T')[0]
        console.log('after', this.date)
      }
      this.toggleReserveModal()
    },
  },
}
</script>