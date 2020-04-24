<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Abertos" type="gradient-info" sub-title="5" icon="ni ni-active-40"/>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Confirmados" type="gradient-green" sub-title="20" icon="ni ni-check-bold"/>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Enviados" type="gradient-green" sub-title="12" icon="ni ni-delivery-fast"/>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Cancelados" type="gradient-danger" sub-title="3,65%" icon="fas fa-ban"/>
                </div>
            </div>
        </base-header>

      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col">
            <card>
              <h1>Novidades</h1>
              <BaseTimeline>
                <BaseTimelineItem
                  icon="fas fa-bell"
                  title="Novidade 123"
                  datetime="10/05"
                  description="Essa novidade tem muita novidade, quando dalo novidadde é coisa nova. Então quero dizer que nessa novidade Tem muita coisa nova. Enfim, é isso"
                />
                <BaseTimelineItem
                  icon="fas fa-bell"
                  title="Novidade 123"
                  datetime="10/05"
                  description="Essa novidade tem muita novidade, quando dalo novidadde é coisa nova. Então quero dizer que nessa novidade Tem muita coisa nova. Enfim, é isso"
                />
                <BaseTimelineItem
                  icon="fas fa-bell"
                  title="Novidade 123"
                  datetime="10/05"
                  description="Essa novidade tem muita novidade, quando dalo novidadde é coisa nova. Então quero dizer que nessa novidade Tem muita coisa nova. Enfim, é isso"
                />
              </BaseTimeline>
            </card>
          </div>
          <div class="col">
            <card>
              <h1>Em breve</h1>
              <BaseTimeline>
                <BaseTimelineItem
                  icon="fas fa-bell"
                  title="Novidade 123"
                  datetime="10/05"
                  description="Essa novidade tem muita novidade, quando dalo novidadde é coisa nova. Então quero dizer que nessa novidade Tem muita coisa nova. Enfim, é isso"
                />
              </BaseTimeline>
            </card>
          </div>
        </div>
      </div>

    </div>
</template>
<script>
  import BaseTimeline from '@/components/Timeline/BaseTimeline'
  import BaseTimelineItem from '@/components/Timeline/BaseTimelineItem'

  export default {
    components: {BaseTimeline, BaseTimelineItem},
  }
</script>
<style>
</style>
