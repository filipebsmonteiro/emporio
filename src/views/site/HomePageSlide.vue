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

    <section class="fourth-section m-5">
      <div class="row">
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
        <div class="col">
          <b-img
            class="img-fluid"
            src="https://mk0tarestaurant7omoy.kinstacdn.com/wp-content/uploads/2018/01/premiumforrestaurants_0.jpg"/>
        </div>
      </div>
    </section>

    <section class="fifth-section p-5">
      <div class="m-5">
        <h1>Conheça nosso restaurante</h1>
      </div>
      <div class="row m-5">
        <div class="col">
          <b-card
            title="Titulo"
            img-src="https://disciplinanadieta.com/wp-content/uploads/2018/01/dinner-601576_960_720.jpg"
            img-top
            tag="article"
            class="shadow">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </b-card>
        </div>
        <div class="col">
          <b-card
            title="Titulo"
            img-src="https://static-otelico.com/cache/montmartre_apolonia/hotel_paris_montmartre_resto.jpg"
            img-top
            tag="article"
            class="shadow">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </b-card>
        </div>
        <div class="col">
          <b-card
            title="Titulo"
            img-src="https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_960_720.jpg"
            img-top
            tag="article"
            class="shadow">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </b-card>
        </div>
      </div>
    </section>

    <section class="sixth-section mb-5">
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

    <section class="seventh-section mb-5">
      <div class="container border-bottom">
        <h1>Depoimentos</h1>
      </div>
      <div class="background-image d-flex">
        <b-carousel
          :interval="3000"
          controls
          indicators
          img-width="1024"
          img-height="300"
          style="text-shadow: 1px 1px 2px #333;"
          class="w-50"
        >
          <b-carousel-slide caption="Jhon Mackleine" img-blank>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>
          <b-carousel-slide caption="Laurie August" img-blank>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>
          <b-carousel-slide caption="Mary kay" img-blank>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </section>

    <Footer/>
  </div>
</template>

<script>
import SiteBaseNav from '@/layout/SiteNavbar/SiteBaseNav'
import Footer from '@/layout/Footer'

export default {
  name: 'HomePage',
  components: { Footer, SiteBaseNav },
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

  /deep/ #navbar-main {
    nav {
      border-bottom-color: #fff !important;

      .nav-link {
        color: #fff !important;
      }
    }
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
  h1 {
    font-family: $title;
  }
}

.fifth-section {
  h1 {
    font-family: $title;
  }

  .card-body {
    padding: 1rem;

    .card-title {
      font-family: $title;
      font-size: 40px;
      margin: 0px;
    }
  }
}

.sixth-section {
  /deep/ .carousel-inner .carousel-item {
    width: 100%;
    height: 480px;
  }
}

.seventh-section {
  h1 {
    font-family: $title;
  }

  .background-image {
    background: url("http://opa.themicspk.com/assets/img/hero-bg.jpg") top center;
    background-size: cover;

    /deep/ .carousel {
      border-radius: 20px;
      background: rgba(100, 100, 100, 0.6);
      margin: 1rem auto;

      h3 {
        color: #f4f5f7;
        font-size: 30px;
      }
    }
  }
}
</style>
