<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex">
        <img src="/img/brand/logo-gamela.png" class="m-auto">
      </div>
      <div class="col">
        <h1 class="sobre-title">Nossa História</h1>
        <p>A história começa com a chegada da matriarca à Brasília. Dona Fátima veio de Catalão, interior de Goiás. Cozinheira de mão cheia, na bagagem trouxe receitas de família daquelas gostosuras que a gente encontra somente em casa de vó.</p>
        <p>Em 1977, com uma coragem bem peculiar, Dona Fátima e os filhos, Cristina e José César, começaram com os quitutes. Como biscoito se faz bem em "Gamela" o nome fluiu na brincadeira e jogos de palavras na cozinha de família. De lá pra cá já passaram 40 anos.</p>
        <p>A tradição continua, mas também tem inovação. A forma artesanal de fazer quitutes dá um gostinho de nostalgia, para quem cresceu comendo a receita da bisavó, que resiste ao tempo até chegar na geração de hoje.</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1 class="sobre-title">Nossos Produtos</h1>
        <p>Milhares de doces, bolos, tortas, mousses, biscoitos, salgados, pães, quiches e mais um monte de gostosuras são produzidos todos os dias aqui mesmo na Gamela. É a dona Fátima e sua filha Cristina que supervisionam e "põem a mão na massa" para garantir que nosso padrão de qualidade e aquele toque especial de receitas da família estejam presentes em todos os nossos produtos.</p>
        <p>Aqui na Gamela você também encontra opções diet, sem glúten (não recomendados para celíacos, pois podem conter traços) e sem lactose.</p>
        <p>Aproveite sua visita para saborear nossos cafés, chocolates-quentes e sucos naturais feitos na hora.</p>
      </div>
      <div class="col d-flex">
        <img src="/img/brand/logo-gamela.png" class="m-auto">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sobre',
    mounted () {
      if (parseInt(process.env.VUE_APP_FB_PIXEL_ENABLED)) {
        this.$analytics.fbq.init(process.env.VUE_APP_FACEBOOK_CODE, {
          em: process.env.VUE_APP_FACEBOOK_EMAIL
        })
        this.$analytics.fbq.event('PageView')
      }
    }
  }
</script>
