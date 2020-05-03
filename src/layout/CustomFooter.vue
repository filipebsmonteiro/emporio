<template>
  <footer class="footer px-4 bg-custom mt-5">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="mt-3 mb-5">
          <b-input class="mb-2"/>
          <b-btn variant="white" block>Assine Já</b-btn>
        </div>
        <div class="mt-5 mb-2">
          <div class="row">
            <div class="col">
              <img src="/img/theme/sketch.jpg" class="float-md-right">
            </div>
            <div class="col text-center">
              <p class="text-white">Siga a gente:</p>
              <a class="btn btn-link text-white" style="border-radius: 50%;"
                 target="_blank" href="https://www.facebook.com/230451693800177">
                <i class="fas fa-facebook-f"/>
              </a>
              <a class="btn btn-link text-white" style="border-radius: 50%;"
                 target="_blank" href="https://www.tripadvisor.com.br/8188664">
                <i class="fas fa-tripadvisor"/>
              </a>
              <a class="btn btn-link text-white" style="border-radius: 50%;"
                 target="_blank" href="https://www.instagram.com/gamelabiscoitoscaseiros">
                <i class="fas fa-instagram"/>
              </a>
            </div>
            <div class="col">
              <img src="/img/theme/sketch.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="mt-4 text-center">
          <p>© Copyright 2017 - {{ moment().format('YYYY') }}</p>
          <p><a href="https://www.bratech.info" class="font-weight-bold ml-1" target="_blank">Bratech</a></p>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </footer>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'CustomFooter',
    computed: {
      moment() {
        return moment
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
