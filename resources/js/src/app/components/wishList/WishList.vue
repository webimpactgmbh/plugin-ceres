<template>
  <div>
    <transition-group
      name="list-transition"
      tag="div"
    >
      <wish-list-item
        v-for="wishListItem in wishListItems"
        :key="wishListItem.id"
        :wish-list-item-raw="wishListItem"
        :item-details-data="itemDetailsData"
      />
    </transition-group>

    <p
      v-if="!isLoading && !wishListItems[0]"
      class="h4 text-muted text-center my-5"
    >
      {{ $translate("Ceres::Template.wishListNoItems") }}
    </p>

    <div :class="{'loading': isLoading}">
      <slot name="loading-animation" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WishListItem from "./WishListItem.vue";

export default {

    name: "WishList",

    components:
    {
        WishListItem
    },

    props:
    {
        itemDetailsData:
        {
            type: Array,
            default: () => ["wishListItem.variation.availability"]
        }
    },

    computed: mapState({
        wishListItems: state => state.wishList.wishListItems,
        isLoading: state => state.wishList.isLoading
    }),

    created()
    {
        this.initWishListItems();
    },

    methods:
    {
        ...mapActions([
            "initWishListItems"
        ])
    }
}
</script>