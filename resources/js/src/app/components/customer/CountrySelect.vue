<template>
  <div>
    <div
      class="input-unit"
      data-validate=""
      data-model="countryId"
    >
      <select
        :value="selectedCountryId"
        class="custom-select"
        @change="countryChanged($event.target.value)"
      >
        <option
          v-for="country in countryList"
          :key="country.id"
          :value="country.id"
          :selected="country.id === selectedCountryId"
        >
          {{ country.currLangName }}
        </option>
      </select>
      <label>{{ $translate("Ceres::Template.headerCountry") }}</label>
    </div>

    <template v-if="isInOptionalFields('stateId')">
      <div
        v-if="stateList && stateList.length > 0"
        v-validate="isInRequiredFields('stateId')"
        class="input-unit"
        data-model="stateId"
      >
        <select
          :value="selectedStateId"
          class="custom-select"
          @change="stateChanged($event.target.value)"
        >
          <option :selected="selectedStateId === null">
            {{ $translate("Ceres::Template.addressPleaseSelect") }}
          </option>
          <option
            v-for="state in stateList"
            :key="state.id"
            :value="state.id"
            :selected="state.id === selectedStateId"
          >
            {{ state.name }}
          </option>
        </select>
        <label>
          {{ transformTranslation("Ceres::Template.headerState", "stateId") }}
        </label>
      </div>
    </template>
  </div>
</template>

<script>
import TranslationService from "../../services/TranslationService";
import { isNullOrUndefined } from "../../helper/utils";
import { mapState } from "vuex";

export default {

    name: "CountrySelect",

    props:
    {
        selectedCountryId: Number,
        selectedStateId: Number,
        addressType: {
            type: String,
            required: true
        },
        optionalAddressFields: {
            type: Object,
            default: () =>
            {}
        },
        requiredAddressFields: {
            type: Object,
            default: () =>
            {}
        }
    },

    data()
    {
        return {
            stateList  : [],
            selectedCountry: {}
        };
    },

    computed:
    {
        addressKeyPrefix()
        {
            return this.addressType === "1" ? "billing_address." : "delivery_address.";
        },

        optionalFields()
        {
            const iso = this.selectedCountry.isoCode2.toLowerCase();

            if (isNullOrUndefined(this.optionalAddressFields[iso]))
            {
                return this.optionalAddressFields.de;
            }

            return this.optionalAddressFields[iso];
        },

        requiredFields()
        {
            const iso = this.selectedCountry.isoCode2.toLowerCase();

            if (isNullOrUndefined(this.requiredAddressFields[iso]))
            {
                return this.requiredAddressFields.de;
            }

            return this.requiredAddressFields[iso];
        },

        ...mapState({
            shippingCountryId: state => state.localization.shippingCountryId,
            countryList: state => state.localization.shippingCountries
        })
    },

    watch: {
        selectedCountryId()
        {
            this.updateSelectedCountry();
        }
    },

    /**
     * Get the shipping countries
     */
    created()
    {
        this.updateSelectedCountry();
    },

    methods: {
        /**
         * Method to fire when the country has changed
         */
        countryChanged(value)
        {
            this.$emit("country-changed", this.getCountryById(parseInt(value)));
            this.$emit("state-changed", null);
        },

        /**
         * @param {*} value
         */
        stateChanged(value)
        {
            this.$emit("state-changed", parseInt(value));
        },

        /**
         * @param countryId
         * @returns {*}
         */
        getCountryById(countryId)
        {
            return this.countryList.find(
                function(country)
                {
                    if (country.id === countryId)
                    {
                        return country;
                    }

                    return null;
                });
        },

        updateSelectedCountry()
        {
            const countryId = this.selectedCountryId || this.shippingCountryId;

            this.selectedCountry = this.getCountryById(countryId);

            if (this.selectedCountry)
            {
                this.stateList = this.selectedCountry.states || [];
            }

            this.countryChanged(countryId);
        },

        isInOptionalFields(key)
        {
            return this.optionalFields.includes(this.addressKeyPrefix + key);
        },

        isInRequiredFields(key)
        {
            return this.requiredFields.includes(this.addressKeyPrefix + key);
        },

        transformTranslation(translationKey, addressKey)
        {
            const translation = TranslationService.translate(translationKey);
            const isRequired = this.isInRequiredFields(addressKey);

            return translation + (isRequired ? "*" : "");
        }
    }
}
</script>