<template>
 <div>
   <h1>Agendamento</h1>
   <b-card no-body class="mb-1">
     <b-card-header header-tag="header" class="p-1" role="tab">
       <b-button variant="link" block v-b-toggle.accordion-agendamento>Agendar</b-button>
     </b-card-header>
     <b-collapse id="accordion-agendamento" accordion="my-accordion" role="tabpanel" visible="collapseOpen">
       <b-card-body>
         <b-form-datepicker v-model="date" :min="minDate" :date-disabled-fn="dateDisabled"
                            placeholder="Selecione o Dia" class="mb-2" @input="changed" hide-header/>
         <b-form-timepicker v-model="time" :minutes-step="allowed.minutes"
                            placeholder="Escolha o Horário" @input="changed"/>
       </b-card-body>
     </b-collapse>
   </b-card>
 </div>
</template>

<script>
  export default {
    name: 'Agendamento',
    props: {
      collapseOpen: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      allowed () {
        try {
          return {
            weekdays: JSON.parse(process.env.VUE_APP_DIAS_SEMANA_NAO_AGENDAMENTO),
            yeardays: JSON.parse(process.env.VUE_APP_DIAS_ANO_NAO_AGENDAMENTO),
            minutes: parseInt(process.env.VUE_APP_INTERVALO_MINUTOS_AGENDAMENTO)
          }
        } catch (e) {
          return {
            weekdays: [],
            yeardays: [],
            minutes: 10
          }
        }
      }
    },
    data() {
      const minDate = new Date()
      return {
        minDate,
        date: '',
        time: ''
      }
    },
    methods: {
      dateDisabled (ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        // Return `true` if the date should be disabled
        //return weekday === 0 || weekday === 6 || day === 13
        const weekday = date.getDay()
        return this.allowed.weekdays.includes(weekday) || this.allowed.yeardays.includes(ymd)
      },
      changed() {
        if (this.date && this.time){
          this.$emit('change', `${this.date} ${this.time}`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
