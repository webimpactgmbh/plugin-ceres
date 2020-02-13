<template>
  <div v-if="isLoaded">
    <slot />
  </div>
</template>

<script>
export default {

    name: "LazyLoad",

    props: {
        component: String
    },

    computed: {
        isLoaded()
        {
            return !!this.$store.state.lazyComponent.components[this.component];
        }
    }
}
</script>
