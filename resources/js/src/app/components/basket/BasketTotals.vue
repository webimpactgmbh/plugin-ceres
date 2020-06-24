<template>
    <div class="cmp-totals">
        <div class="h3">{{ $translate("Ceres::Template.basketSum") }}</div>
        <div class="component-loading with-icon refreshing" :class="{ 'is-loading': isBasketLoading }">
            <dl>
                <slot name="before-item-sum"></slot>

                <!-- Basket value (gross) -->
                <template v-if="visibleFields.includes('basketValueGross')">
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketValue") }} ({{ $translate("Ceres::Template.basketGross") }})
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ calculateBaseValue(basket.itemSum, basket.basketRebate)| currency  }}
                    </dd>
                </template>
                <!-- Basket value (gross) -->

                <!-- Rebate -->
                <template v-if="visibleFields.includes('rebate') && basket.basketRebate">
                    <dt class="rebate-hint">
                        {{ $translate("Ceres::Template.basketRebate") }}
                    </dt><!--
                --><dd class="rebate-hint" v-if="!showNetPrices">
                        {{ calculateBaseValue(basket.itemSum, basket.basketRebate) - basket.itemSum | currency  }}
                    </dd>
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketSubTotal") }} ({{ $translate("Ceres::Template.basketGross") }})
                    </dt><!--
                --><dd :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ basket.itemSum | currency }}
                    </dd>
                </template>
                <!-- Rebate -->

                
                <slot name="after-item-sum"></slot>
                
                <slot name="before-shipping-costs"></slot>


                <!-- Shipping (gross) -->
                <template v-if="visibleFields.includes('shippingCostsGross')">
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketShippingCosts") }} ({{ $translate("Ceres::Template.basketGross") }})
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ basket.shippingAmount | currency }}
                    </dd>
                </template>
                <!-- Shipping (gross) -->
                
                <slot name="after-shipping-costs"></slot>

                <!-- Coupon -->
                <template v-if="visibleFields.includes('promotionCoupon') && basket.couponCode && basket.couponCampaignType === 'promotion'">
                    <dt class="font-weight-bold">
                        {{ $translate("Ceres::Template.basketCoupon") }}
                    </dt><!--
                --><dd class="font-weight-bold">
                        {{ basket.couponDiscount | currency }}
                    </dd>
                </template>
                <!-- Coupon -->
                
                <slot name="before-total-sum"></slot>


                <slot name="before-vat"></slot>


                <slot name="after-vat"></slot>

                <div class="totalSum">
                    <hr>
                    <!-- Total sum (gross) -->
                    <template v-if="visibleFields.includes('totalSumGross')">
                        <dt :class="{ 'font-weight-bold': !showNetPrices }">
                            {{ $translate("Ceres::Template.basketTotalSum") }} ({{ $translate("Ceres::Template.basketGross") }})
                        </dt><!--
                        --><dd :class="{ 'font-weight-bold': !showNetPrices }">
                            {{ basket.basketAmount | currency }}
                        </dd>
                    </template>
                    <!-- Total sum (gross) -->

                    <!-- Coupon -->
                    <template v-if="visibleFields.includes('salesCoupon') && basket.couponCode && basket.couponCampaignType === 'sales'">
                        <dt class="font-weight-bold">
                            {{ $translate("Ceres::Template.basketCoupon") }}
                        </dt><!--
                     --><dd class="font-weight-bold">
                            {{ basket.couponDiscount | currency }}
                        </dd>
                    </template>
                    <!-- Coupon -->

                    <!-- Coupon open amount -->
                    <template v-if="visibleFields.includes('openAmount') && basket.couponCampaignType === 'sales'">
                        <dt class="font-weight-bold">
                            {{ $translate("Ceres::Template.basketOpenAmount") }}
                        </dt><!--
                    --><dd class="font-weight-bold">
                            {{ basket.openAmount | currency }}
                        </dd>
                    </template>
                    <!-- Coupon open amount -->
                </div>
                
                <div>{{ $translate("Ceres::Template.itemInclVAT") }}</div>

                <slot name="after-total-sum"></slot>
            </dl>
        </div>

        <div v-if="basket.isExportDelivery && deliveryExportTranslation" class="alert alert-info w-100">
            {{ deliveryExportTranslation }}
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {

    props:
    {
        visibleFields:
        {
            type: Array,
            default: () => [
                "basketValueNet",
                "basketValueGross",
                "rebate",
                "shippingCostsNet",
                "shippingCostsGross",
                "promotionCoupon",
                "totalSumNet",
                "vats",
                "totalSumGross",
                "salesCoupon",
                "openAmount"
            ]
        }
    },

    computed:
    {
        currentShippingCountry()
        {
            const shippingCountryId = this.basket.shippingCountryId;

            return this.shippingCountries.find(country => country.id === shippingCountryId);
        },

        shopCountry()
        {
            const shopCountryId = this.basket.shopCountryId;

            return this.shippingCountries.find(country => country.id === shopCountryId);
        },

        deliveryExportTranslation()
        {
            const shopCountry = this.shopCountry && this.shopCountry.currLangName;
            const currentShippingCountry = this.currentShippingCountry && this.currentShippingCountry.currLangName;

            return this.$translate("Ceres::Template.basketExportDeliveryWarning", { from: shopCountry, to: currentShippingCountry });
        },

        ...mapState({
            basket: state => state.basket.data,
            isBasketLoading: state => state.basket.isBasketLoading,
            shippingCountries: state => state.localization.shippingCountries,
            showNetPrices: state => state.basket.showNetPrices
        })
    },

    methods: {
        calculateBaseValue(value, percent)
        {
            return (value / (100 - percent)) * 100;
        }
    }
}
</script>