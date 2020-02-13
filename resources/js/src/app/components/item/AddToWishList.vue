<template>
  <a
    ref="addToWishList"
    class="btn btn-link btn-sm text-muted"
    data-toggle="tooltip"
    data-placement="top"
    title=""
    @click.prevent="switchState()"
  >
    <icon
      icon="heart"
      class="default-float"
      :class="{'text-appearance text-danger': isVariationInWishList}"
      :loading="isLoading"
    />
    {{ $translate("Ceres::Template.singleItemWishList") }}
  </a>
</template>

<script>
import { isNullOrUndefined } from "../../helper/utils";
import { mapState } from "vuex";

const NotificationService = require("../../services/NotificationService");

export default {
    props: {
        variationId: Number
    },

    data()
    {
        return {
            isLoading: false
        };
    },

    computed:
    {
        isVariationInWishList()
        {
            return this.wishListIds.includes(this.currentVariationId);
        },

        currentVariationId()
        {
            return !isNullOrUndefined(this.variationId) ? this.variationId : this.currentVariationVariationId;
        },

        ...mapState({
            currentVariationVariationId(state)
            {
                const currentVariation = state.item.variation && state.item.variation.documents && state.item.variation.documents[0].data;

                if (isNullOrUndefined(currentVariation))
                {
                    return null;
                }

                return currentVariation && currentVariation.variation && currentVariation.variation.id;
            },
            wishListIds: state => state.wishList.wishListIds
        })
    },

    watch:
    {
        isVariationInWishList()
        {
            this.changeTooltipText();
        }
    },

    methods:
    {
        switchState()
        {
            if (this.isVariationInWishList)
            {
                this.removeFromWishList();
            }
            else
            {
                this.addToWishList();
            }
        },

        addToWishList()
        {
            if (!this.isLoading)
            {
                this.isLoading = true;
                this.$store.dispatch("addToWishList", parseInt(this.currentVariationId)).then(
                    () =>
                    {
                        this.isLoading = false;

                        NotificationService.success(
                            this.$translate("Ceres::Template.singleItemWishListAdded")
                        );
                    },
                    () =>
                    {
                        this.isLoading = false;
                    });
            }
        },

        removeFromWishList()
        {
            if (!this.isLoading)
            {
                this.isLoading = true;
                this.$store.dispatch("removeWishListItem", { id: parseInt(this.currentVariationId) }).then(
                    () =>
                    {
                        this.isLoading = false;

                        NotificationService.success(
                            this.$translate("Ceres::Template.singleItemWishListRemoved")
                        );
                    },
                    () =>
                    {
                        this.isLoading = false;
                    });
            }
        },

        changeTooltipText()
        {
            const tooltipText = this.$translate(
                "Ceres::Template." + (this.isVariationInWishList ? "singleItemWishListRemove" : "singleItemWishListAdd")
            );

            $(".add-to-wish-list")
                .attr("data-original-title", tooltipText)
                .tooltip("hide")
                .tooltip("setContent");
        }
    }
}

</script>
