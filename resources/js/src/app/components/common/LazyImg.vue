<template>
  <img
    v-if="!isBackgroundImage"
    :data-src="imageUrl"
  >
  <div
    v-else
    :data-background-image="imageUrl"
  >
    <slot />
  </div>
</template>

<script>
import lozad from "lozad";

export default {
    props: {
        imageUrl: String,
        isBackgroundImage: Boolean
    },

    watch:
    {
        imageUrl()
        {
            this.$nextTick(() =>
            {
                this.$el.setAttribute("data-loaded", false);
                lozad(this.$el).triggerLoad(this.$el);
            });
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            lozad(this.$el).observe();
        });
    }
}
</script>
