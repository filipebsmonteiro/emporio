<template>
  <div class="container">
    <div class="text-center" style="
                 background-image: url('https://gamelabiscoitos.com.br/imagens/bghome.jpg');
                 background-repeat: no-repeat;
                 background-size: cover;
                 background-position: center;
                 min-height: 40vw;
                 ">
      <p class="welcome gamela-color">Gamela, 42 anos de deliciosos momentos</p>
    </div>

    <div class="w-100 text-center mt-5">
      <h1 class="font-primary-custom gamela-color gamela-title font-weight-light">Nossa Loja</h1>
    </div>
    <b-carousel
      :interval="5000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"/>
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=55"/>
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=56"/>

    </b-carousel>

    <div class="w-100 text-center mt-5">
      <h1 class="font-primary-custom gamela-color gamela-title font-weight-light" style="line-height: 1;">
        Todo momento merece um sabor, principalmente o nosso.
      </h1>
    </div>
    <div class="row">
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos' }" disabled="">
          Nome da Categoria
        </router-link>
      </div>
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos.categoria', params: { id: 1 } }">
          Nome da Categoria
        </router-link>
      </div>
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos.categoria', params: { id: 1 } }">
          Nome da Categoria
        </router-link>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos' }" disabled="">
          Nome da Categoria
        </router-link>
      </div>
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos.categoria', params: { id: 1 } }">
          Nome da Categoria
        </router-link>
      </div>
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos.categoria', params: { id: 1 } }">
          Nome da Categoria
        </router-link>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos' }" disabled="">
          Nome da Categoria
        </router-link>
      </div>
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos.categoria', params: { id: 1 } }">
          Nome da Categoria
        </router-link>
      </div>
      <div class="col-md">
        <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54"/>
        <router-link class="btn btn-white btn-block" :to="{ name: 'produtos.categoria', params: { id: 1 } }">
          Nome da Categoria
        </router-link>
      </div>
    </div>

    <div class="mt-5 text-center">
      <p><a href="/PDF/CARDAPIO_GAMELA.pdf" target="_blank">Visualize nosso Cardápio em PDF !</a></p>
      <p><a href="/PDF/kit_festa_Gamela.pdf" target="_blank">Veja Nossos Kits Festas em PDF !</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomePage'
  }
</script>

<style lang="scss" scoped>
.welcome{
  padding-top: 150px;
  font-family: Damion-regular;
  letter-spacing: 0;
  font-size: 130px;
  text-transform: inherit;
  position: relative;
  line-height: 0.9em;
  font-weight: bold
}
.gamela-color{
  color: #5E3D0B;
}
.gamela-title{
  font-size: 70px;
}
</style>
