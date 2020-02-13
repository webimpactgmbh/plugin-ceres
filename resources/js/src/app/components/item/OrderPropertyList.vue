<template>
  <div class="order-property-slider mb-3">
    <div
      class="order-property-slider-inner"
      :style="{transform: 'translateX(-' + (activeSlide * 100) + '%)'}"
    >
      <div
        v-for="(propertyGroup, index) in sortedGroupedProperties"
        :key="index"
        :class="{'active': index === activeSlide}"
      >
        <order-property-list-group
          :key="propertyGroup.id"
          :padding-classes="paddingClasses"
          :padding-inline-styles="paddingInlineStyles"
          :property-group="propertyGroup"
        />
      </div>
    </div>

    <div
      v-if="sortedGroupedProperties.length > 1"
      class="order-property-slider-controls"
      :class="paddingClasses"
      :style="paddingInlineStyles"
    >
      <div
        class="btn"
        :class="{'btn-primary': activeSlide > 0, 'btn-secondary disabled': activeSlide === 0}"
        tabindex="0"
        @click="slideTo(activeSlide - 1)"
      >
        <span class="fa fa-chevron-left" />
      </div>

      <div class="slider-nav">
        <span
          v-for="(propertyGroup, index) in sortedGroupedProperties"
          :key="index"
          v-tooltip
          :class="{ 'active': index === activeSlide, 'highlight': !touchedSlides[index], 'error': propertyGroup.hasError }"
          data-toggle="tooltip"
          data-placement="top"
          :title="propertyGroup.group ? propertyGroup.group.names.name : $translate('Ceres::Template.singleItemPropertiesWithoutGroup')"
          @click="slideTo(index)"
        />
      </div>

      <div
        class="btn float-right"
        :class="{'btn-primary': activeSlide < sortedGroupedProperties.length - 1, 'btn-secondary disabled': activeSlide >= sortedGroupedProperties.length - 1 }"
        tabindex="0"
        @click="slideTo(activeSlide + 1)"
      >
        <span class="fa fa-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrderPropertyListGroup from "./OrderPropertyListGroup.vue";

export default {

    components:
    {
        "order-property-list-group": OrderPropertyListGroup
    },

    props:
    {
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        }
    },

    data()
    {
        return {
            activeSlide: 0,
            touchedSlides: { 0: true }
        };
    },

    computed:
    {
        sortedGroupedProperties()
        {
            const groupedProperties = JSON.parse(JSON.stringify(this.variationGroupedProperties));

            for (const group of groupedProperties)
            {
                this.sortGroupProperties(group);
            }

            return this.getSortedGroups(groupedProperties);
        },

        missingPropertyGroupIds()
        {
            if (this.variationMarkInvalidProperties)
            {
                return [...new Set(this.variationMissingProperties.map(property => property.group && property.group.id))];
            }

            return [];
        },

        ...mapState({
            variationMarkInvalidProperties: state => state.item.variationMarkInvalidProperties
        }),

        ...mapGetters([
            "variationGroupedProperties",
            "variationMissingProperties"
        ])
    },

    methods:
    {
        sortGroupProperties(group)
        {
            return group.properties.sort((prev, current) =>
            {
                if (prev.position > current.position)
                {
                    return 1;
                }
                if (prev.position < current.position)
                {
                    return -1;
                }

                return 0;
            });
        },

        getSortedGroups(groups)
        {
            for (const group of groups)
            {
                const lowestPosition = group.properties.reduce((prev, current) => (prev.position < current.position) ? prev : current);

                group.lowestPosition = lowestPosition.position;

                const groupId = group.group ? group.group.id : null;

                if (this.variationMarkInvalidProperties && this.missingPropertyGroupIds.includes(groupId))
                {
                    group.hasError = true;
                }
            }

            return groups.sort((prev, current) =>
            {
                if (prev.lowestPosition > current.lowestPosition)
                {
                    return 1;
                }
                if (prev.lowestPosition < current.lowestPosition)
                {
                    return -1;
                }

                return 0;
            });
        },

        slideTo(position)
        {
            if (position >= 0 && position < this.sortedGroupedProperties.length)
            {
                this.activeSlide = position;
                this.touchedSlides[this.activeSlide] = true;
            }
        }
    }
}
</script>