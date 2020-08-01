<template>
  <div>
    <section class="first-section d-flex flex-column">
      <b-carousel :interval="4000">
        <b-carousel-slide img-src="https://disciplinanadieta.com/wp-content/uploads/2018/01/dinner-601576_960_720.jpg"/>
        <b-carousel-slide
          img-src="https://static-otelico.com/cache/montmartre_apolonia/hotel_paris_montmartre_resto.jpg"/>
        <b-carousel-slide img-src="https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_960_720.jpg"/>
      </b-carousel>
      <SiteBaseNav/>
      <div class="container h-100 justify-content-center text-center m-auto align-items-center">
        <div class="row">
          <div class="col-lg-12">
            <h2>Bem Vindo ao</h2>
            <h1>Seu restaurante Empório Virtual!</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="second-section m-5">
      <div class="row">
        <div class="col">
          <b-img
            class="img-fluid"
            src="https://mk0tarestaurant7omoy.kinstacdn.com/wp-content/uploads/2018/01/premiumforrestaurants_0.jpg"/>
        </div>
        <div class="col">
          <div class="ml-5 mr-5">
            <h1>Sobre nós</h1>
            <p>Exemplo de texto com um resumo da história da marca, que pode conter fatos importantes:</p>
            <ul class="list-unstyled">
              <li><i class="fas fa-check mr-2"/>Acontecimento 1</li>
              <li><i class="fas fa-check mr-2"/>Acontecimento 2</li>
              <li><i class="fas fa-check mr-2"/>Acontecimento 3</li>
            </ul>
            <p>
              E uma finalização cativante e que desperte um sentimento maravilhoso no cliente, afinal a sua marca é uma
              marca que deve
              tocar não somente o estômago mas também o coração de cada cliente que netra em contato com sua marca.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="third-section p-5">
      <div class="m-5">
        <h1>Porque escolher nosso restaurante</h1>
      </div>
      <div class="row m-5">
        <div class="col">
          <b-card class="shadow">
            <h3>Titulo</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </b-card>
        </div>
        <div class="col">
          <b-card class="shadow">
            <h3>Titulo</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </b-card>
        </div>
        <div class="col">
          <b-card class="shadow">
            <h3>Titulo</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </b-card>
        </div>
      </div>
    </section>

    <section class="fourth-section mb-5">
      <b-carousel
        :interval="3000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide img-src="https://disciplinanadieta.com/wp-content/uploads/2018/01/dinner-601576_960_720.jpg"/>
        <b-carousel-slide
          img-src="https://static-otelico.com/cache/montmartre_apolonia/hotel_paris_montmartre_resto.jpg"/>
        <b-carousel-slide img-src="https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_960_720.jpg"/>
      </b-carousel>
    </section>
  </div>
</template>

<script>
import SiteBaseNav from '@/layout/SiteNavbar/SiteBaseNav'

export default {
  name: 'HomePage',
  components: { SiteBaseNav },
  data () {
    return {
      mainProps: { blank: false, blankColor: '#777', width: 250, height: 250 }
    }
  }
}
</script>

<style lang="scss" scoped>
$title: 'Mawns Serif';
.first-section {
  min-height: 100vh !important;

  /deep/ .carousel {
    z-index: -1;

    .carousel-inner .carousel-item {
      height: 100vh !important;
    }
  }

  &::before {
    content: "";
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }

  .container {
    margin-top: -100vh;
    position: relative;
    text-transform: inherit;
    font-weight: bold;

    .row {
      @media (max-width: 776px) {
        padding-top: 50px;
        padding-bottom: 50px;
      }

      h1 {
        font-family: $title;
        color: aliceblue !important;
        line-height: 7rem;
        font-size: 100px;
        @media (max-width: 776px) {
          font-size: 65px !important;
        }
      }

      h2 {
        font-family: $title;
        color: aliceblue !important;
        line-height: 7rem;
        font-size: 75px;
        @media (max-width: 776px) {
          font-size: 55px !important;
        }
      }
    }
  }
}

.second-section {
  h1 {
    font-family: $title;
  }
}

.third-section {
  h1 {
    font-family: $title;
  }

  background: rgba(238, 238, 238, 0.5);
}

.fourth-section {
  /deep/ .carousel-inner .carousel-item {
    width: 100%;
    height: 480px;
  }
}
</style>
