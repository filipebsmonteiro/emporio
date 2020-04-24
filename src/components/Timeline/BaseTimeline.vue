<template>
  <div class="timeline timeline-one-side" data-timeline-content="axis" data-timeline-axis-style="dashed">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'BaseTimeline'
  }
</script>

<style lang="scss" scoped>
  .timeline {
    position: relative;
    &:before {
      position: absolute;
      top: 0;
      left: 1rem;
      height: 100%;
      content: '';
      border-right: 2px solid #e9ecef;
      @media (min-width: 992px) {
        margin-left: -2px;
      }
    }
  }

</style>
