<template>
 <div>
   <h1>Agendamento</h1>
   <b-card no-body class="mb-1">
     <b-card-header header-tag="header" class="p-1" role="tab">
       <b-button variant="link" block v-b-toggle.accordion-agendamento>Agendar</b-button>
     </b-card-header>
     <b-collapse id="accordion-agendamento" accordion="my-accordion" role="tabpanel">
       <b-card-body>
         <b-form-datepicker v-model="date" :date-disabled-fn="dateDisabled" class="mb-2" />
         <b-form-timepicker v-model="time" placeholder="Escolha o Horário" locale="en" />
       </b-card-body>
     </b-collapse>
   </b-card>
 </div>
</template>

<script>
  export default {
    name: 'Agendamento',
    data() {
      return {
        date: '',
        time: ''
      }
    },
    methods: {
      dateDisabled (ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6 || day === 13
      }
    }
  }
</script>

<style scoped>

</style>
