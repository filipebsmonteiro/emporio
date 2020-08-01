<template>
  <footer class="footer footer-site px-4 mt-5">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="mt-3 mb-5 text-center">
          <span class="h1 text-white">Assine para receber as novidades mais quentinhas e gostosas</span>
          <b-input class="mb-2" placeholder="Digite seu melhor e-mail"/>
          <b-btn variant="outline-white" block>Assine Já</b-btn>
        </div>
        <div class="mt-5 mb-2">
          <div class="row">
            <div class="col d-flex">
              <!--img src="/img/brand/gamela-logo.png" class="float-lg-right m-md-auto"-->
            </div>
            <div class="col text-center">
              <p class="text-white">Siga a gente:</p>
              <a class="btn btn-link text-white" style="border-radius: 50%;"
                 target="_blank" href="#">
                <i class="fab fa-facebook-f"/>
              </a>
              <a class="btn btn-link text-white" style="border-radius: 50%;"
                 target="_blank" href="#">
                <i class="fab fa-tripadvisor"/>
              </a>
              <a class="btn btn-link text-white" style="border-radius: 50%;"
                 target="_blank" href="#">
                <i class="fab fa-instagram"/>
              </a>
            </div>
            <div class="col d-flex">
              <!--img src="/img/brand/advisor.png" style="max-height: 97px;" class="m-md-auto"-->
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
