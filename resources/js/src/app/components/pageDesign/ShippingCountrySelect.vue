<template>
  <ul
    v-if="!basketSelect"
    class="row"
  >
    <li
      v-for="shippingCountry in localization.shippingCountries"
      :key="shippingCountry.id"
      class="col-6 col-sm-4 px-0"
      :class="{'active': localization.shippingCountryId == shippingCountry.id}"
    >
      <a
        v-tooltip="isDisabled"
        class="nav-link"
        data-toggle="collapse"
        href="#countrySettings"
        :class="{'is-disabled': isDisabled}"
        :disabled="isDisabled"
        data-placement="top"
        data-trigger="hover"
        data-boundary="window"
        :data-title="$translate('Ceres::Template.headerChangeDeliveryCountry')"
        @click="setShippingCountry(shippingCountry.id)"
      >

        <i :class="'flag-icon flag-icon-' + shippingCountry.isoCode2.toLowerCase()" />
        {{ shippingCountry.currLangName }}
      </a>
    </li>
  </ul>
  <div v-else>
    <div class="h3">
      {{ $translate('Ceres::Template.headerSelectShippingCountry') }}
    </div>
    <select
      v-if="localization.shippingCountries.length > 1"
      class="form-control"
      @change="setShippingCountry($event.target.value)"
    >
      <option
        v-for="shippingCountry in localization.shippingCountries"
        :key="shippingCountry.id"
        v-tooltip="isDisabled"
        :value="shippingCountry.id"
        :class="{'is-disabled': isDisabled}"
        :disabled="isDisabled"
        :selected="localization.shippingCountryId == shippingCountry.id"
      >
        {{ shippingCountry.currLangName }}
      </option>
    </select>
    <div v-else>
      {{ getCountryName(localization.shippingCountryId) }}
    </div>
  </div>
</template>

<script>
import { removeUrlParam } from "../../services/UrlService";
import { mapState, mapGetters } from "vuex";

export default {
    props:
    {
        disableInput: Boolean,
        openBasketPreview: Boolean,
        basketSelect: Boolean
    },

    computed:
    {
        isDisabled()
        {
            return !!this.basket.customerInvoiceAddressId || !!this.basket.customerShippingAddressId || this.disableInput;
        },

        ...mapState({
            localization: state => state.localization,
            basket: state => state.basket.data
        }),

        ...mapGetters([
            "getCountryName"
        ])
    },

    created()
    {
        removeUrlParam("openBasketPreview");
    },

    methods:
    {
        setShippingCountry(id)
        {
            if (!this.isDisabled)
            {
                this.$store.dispatch("selectShippingCountry", { shippingCountryId: id, openBasketPreview: this.openBasketPreview });
            }
        }
    }
}
</script>
