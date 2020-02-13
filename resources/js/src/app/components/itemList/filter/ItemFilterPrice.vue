<template>
  <div class="item-filter-price">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">{{ currency }}</span>
      </div>

      <input
        v-model="priceMin"
        type="number"
        class="form-control"
        placeholder="Min"
        @focus="selectAll($event)"
      >
    </div>

    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">{{ currency }}</span>
      </div>

      <input
        v-model="priceMax"
        type="number"
        class="form-control"
        placeholder="Max"
        @focus="selectAll($event)"
      >
    </div>

    <button
      v-tooltip
      type="button"
      class="btn btn-primary btn-appearance"
      :class="{'disabled': isDisabled}"
      data-toggle="tooltip"
      data-placement="top"
      :title="$translate('Ceres::Template.itemApply')"
      @click="triggerFilter()"
    >
      <icon
        icon="check"
        :loading="isLoading"
      />
    </button>
  </div>
</template>

<script>
import UrlService from "../../../services/UrlService";
import { mapState } from "vuex";

export default {
    data()
    {
        return {
            priceMin: "",
            priceMax: "",
            currency: App.activeCurrency
        };
    },

    created()
    {
        const urlParams = UrlService.getUrlParams(document.location.search);

        this.priceMin = urlParams.priceMin || "";
        this.priceMax = urlParams.priceMax || "";
    },

    computed:
    {
        isDisabled()
        {
            return (this.priceMin === "" && this.priceMax === "") ||
                (parseInt(this.priceMin) >= parseInt(this.priceMax)) ||
                this.isLoading;
        },

        ...mapState({
            isLoading: state => state.itemList.isLoading
        })
    },

    methods:
    {
        selectAll(event)
        {
            event.target.select();
        },

        triggerFilter()
        {
            if (!this.isDisabled)
            {
                this.$store.dispatch("selectPriceFacet", { priceMin: this.priceMin, priceMax: this.priceMax });
            }
        }
    }
}
</script>
