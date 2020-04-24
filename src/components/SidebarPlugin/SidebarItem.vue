<template>
    <li class="nav-item">
      <slot>
        <router-link
                :to="link.path ? link.path : {name: link.name}"
                @click.native="linkClick"
                class="nav-link"
                :target="link.target"
                :href="link.path">
            <template>
                <i :class="link.icon"></i>
                <span class="nav-link-text">{{ link.text }}</span>
            </template>
        </router-link>
      </slot>
    </li>
</template>
<script>
  export default {
    name: 'sidebar-item',
    props: {
      link: {
        type: Object,
        default: () => {
          return {
            text: '',
            name: 'dashboard',
            path: null,
            children: []
          };
        },
        description:
          'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
      }
    },
    inject: {
      autoClose: {
        default: true
      }
    },
    data() {
      return {
        children: [],
        collapsed: true
      };
    },
    methods: {
      linkClick() {
        if (
          this.autoClose &&
          this.$sidebar &&
          this.$sidebar.showSidebar === true
        ) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
