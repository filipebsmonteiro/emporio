<template>
  <div class="timeline-block">
    <span class="timeline-step badge-success">
      <i :class="icon" />
    </span>
    <div class="timeline-content">
      <small class="text-muted font-weight-bold">{{ datetime }}</small>
      <h5 class="mt-3 mb-0">{{ title }}</h5>
      <p class=" text-sm mt-1 mb-0">{{ description }}</p>
      <div v-if="$slots.badges" class="mt-3">
        <slot name="badges" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseTimelineItem',
    props:{
      icon: String,
      datetime: String,
      title: String,
      description: String,
    }
  }
</script>

<style lang="scss" scoped>
  .timeline-block {
    position: relative;
    margin: 2em 0;
    &:after {
      display: table;
      clear: both;
      content: '';
    }
    &:first-child {
      margin-top: 0;
    }
  }
  .timeline-one-side .timeline-step {
    left: 1rem;
  }
  .timeline-step {
    font-size: 1rem;
    font-weight: 600;
    position: absolute;
    z-index: 1;
    left: 0;
    display: inline-flex;
    width: 33px;
    height: 33px;
    transform: translateX(-50%);
    text-align: center;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    @media (min-width: 992px) {
      left: 50%;
    }
  }
  .timeline-content {
    position: relative;
    top: -6px;
    margin-left: 60px;
    padding-top: .5rem;
    &:after {
      display: table;
      clear: both;
      content: '';
    }
    @media (min-width: 992px){
      width: 38%;
    }
  }
  @media (min-width: 992px){
    .timeline-one-side .timeline-content {
      max-width: 30rem;
    }
  }
  .timeline-one-side .timeline-content {
    width: auto;
  }
</style>
