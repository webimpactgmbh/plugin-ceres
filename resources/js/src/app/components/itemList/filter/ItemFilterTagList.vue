<template>
  <div class="selected-filters clearfix">
    <span
      v-for="tag in tagList"
      :key="tag.id"
      :class="'text-appearance selected-filter filter-' + tag.id + ' ' + marginClasses"
      :style="marginInlineStyles"
      @click="removeTag(tag)"
    >
      <i
        class="fa fa-times"
        aria-hidden="true"
      /> {{ tag.name }}
    </span>

    <span
      v-if="tagList.length >= 2"
      :class="'bg-appearance selected-filter reset-all' + ' '+ marginClasses"
      :style="marginInlineStyles"
      @click="resetAllTags()"
    >
      {{ $translate("Ceres::Template.itemFilterReset") }}
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
    props: {
        marginClasses:
        {
            type: String,
            default: null
        },
        marginInlineStyles:
        {
            type: String,
            default: null
        }
    },

    computed: mapState({
        tagList: state => state.itemList.selectedFacets
    }),

    methods:
    {
        removeTag(tag)
        {
            this.selectFacet({ facetValue: tag });
            this.loadItemList();
        },

        resetAllTags()
        {
            this.resetAllSelectedFacets();
            this.loadItemList();
        },

        ...mapMutations([
            "resetAllSelectedFacets"
        ]),

        ...mapActions([
            "selectFacet",
            "loadItemList"
        ])
    }
}
</script>
