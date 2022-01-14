<template>
  <div class="relative w-full max-w-2xl">
    <div class="bg-white rounded-lg shadow relative">
      <!-- Modal header -->
      <div class="flex items-start justify-between p-5 border-b rounded-t">
        <h3 class="text-xl font-semibold">Reserve a dance</h3>
        <button
          @click="$emit('toggle')"
          type="button"
          class="
            text-gray-400
            bg-transparent
            hover:bg-gray-200 hover:text-gray-900
            rounded-lg
            text-sm
            p-1.5
            ml-auto
            inline-flex
            items-center
          "
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="submit">
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <transition name="fade" mode="out-in">
            <div v-if="loading == true" key="loading">
              <p>Loading...</p>
            </div>

            <!-- Step 1 -->
            <div
              v-else-if="step === 1 && !loading"
              key="1"
              class="grid grid-cols-6 gap-6"
            >
              <div
                v-for="(hour, index) in hours"
                :key="index"
                class="col-span-6 sm:col-span-3"
              >
                <div class="w-full lg:w-10/12 mx-auto">
                  <button
                    @click="form.hour = index"
                    class="w-full border-2 rounded-full py-1"
                    :class="
                      form.hour === index
                        ? 'bg-green-200 border-green-200'
                        : 'bg-zinc-200 border-zinc-200'
                    "
                    type="button"
                  >
                    {{ hour[0] }}-{{ hour[1] }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div
              v-else-if="step === 2 && !loading"
              key="2"
              class="w-full lg:w-10/12 mx-auto space-y-4"
            >
              <div class="w-full">
                <label for="name" class="text-sm font-medium text-gray-900 mb-2"
                  >Name</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  id="name"
                  class="
                    w-full
                    bg-white
                    shadow-sm
                    border border-gray-300
                    text-gray-900 text-sm
                    rounded-lg
                    p-2.5
                  "
                  placeholder="Esdeath"
                  required
                />
              </div>
              <div class="w-full">
                <label
                  for="email"
                  class="text-sm font-medium text-gray-900 mb-2"
                  >Email</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  id="email"
                  class="
                    w-full
                    bg-white
                    shadow-sm
                    border border-gray-300
                    text-gray-900 text-sm
                    rounded-lg
                    p-2.5
                  "
                  placeholder="death@asimov.cl"
                  required
                />
              </div>
            </div>
          </transition>
        </div>

        <!-- Modal footer -->
        <div
          class="flex items-center p-6 border-t border-gray-200 rounded-b"
          :class="step === 1 ? 'justify-end' : 'justify-between'"
        >
          <transition name="fade" apper>
            <button
              @click="toggleStep"
              v-if="form.hour || form.hour === 0"
              class="
                text-white
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
              "
              type="button"
              :class="step === 1 ? 'bg-green-500' : 'bg-red-500'"
            >
              <span v-if="step === 1">Next</span>
              <span v-else-if="step === 2">Back</span>
            </button>
          </transition>

          <!-- Only Step 2 -->
          <button
            v-if="step != 1"
            class="
              text-white
              bg-green-500
              font-medium
              rounded-lg
              text-sm
              px-5
              py-2.5
              text-center
            "
            type="submit"
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: String,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        hour: null,
      },

      hours: [],

      step: 1,
      loading: true,
    }
  },
  // Get available hours of the date selected
  async fetch() {
    let hours = await this.$axios.$get(`/appointments/${this.date}/hours`)
    this.hours = this.formatHours(hours)

    this.loading = false
  },
  methods: {
    // Create new appointment
    submit() {
      let start = this.date + ' ' + this.hours[this.form.hour][0] + ':00'

      this.loading = true
      this.$axios
        .$post('/appointments', {
          name: this.form.name,
          email: this.form.email,
          start,
        })
        .then((data) => {
          this.$router.push({
            path: '/thanks',
            query: { name: data.name, date: data.start },
          })
        })
        .catch((error) => {
          console.error('Request error:', error)
          this.$emit('toggle', error)
        })
        .finally(() => (this.loading = false))
    },

    // Utils
    toggleStep() {
      this.step = this.step === 1 ? 2 : 1
    },
    formatHours(hours) {
      let aux = []
      hours.forEach((hour) => {
        aux.push([this.formatHour(hour), this.formatHour(this.addHour(hour))])
      })
      return aux
    },
    formatHour(hour) {
      return hour.split(':')[0] + ':00'
    },
    addHour(hour) {
      let aux = parseInt(hour.split(':')[0]) + 1
      aux = aux < 10 ? '0' + aux.toString() : aux.toString()
      return aux + ':00:00'
    },
  },
}
</script>