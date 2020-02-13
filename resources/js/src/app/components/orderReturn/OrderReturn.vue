<template>
  <div>
    <order-return-item
      v-for="(orderItem, index) in orderData.order.orderItems"
      :key="index"
      :order-item="orderItem"
      :is-net="amount.isNet || showNetPrices"
      :item-details-data="itemDetailsData"
    />

    <div class="d-flex flex-wrap flex-column flex-sm-row justify-content-between mt-3">
      <button
        class="btn btn-primary btn-appearance mt-1"
        :class="buttonSizeClass"
        @click="selectAllItems()"
      >
        {{ $translate("Ceres::Template.returnSelectAll") }}
        <i
          class="fa fa-check-square-o default-float"
          aria-hidden="true"
        />
      </button>
      <button
        class="btn btn-primary btn-appearance mt-1"
        :disabled="isDisabled || isLoading"
        :class="buttonSizeClass"
        @click="showConfirmationModal()"
      >
        {{ $translate("Ceres::Template.returnTrigger") }}
        <i
          class="fa fa-arrow-right default-float"
          aria-hidden="true"
        />
      </button>
    </div>

    <div
      ref="orderReturnConfirmation"
      class="modal fade"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              {{ $translate("Ceres::Template.returnSendBack") }}
            </h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li
                v-for="(orderReturnItem, index) in orderReturnItems"
                :key="index"
              >
                {{ orderReturnItem.quantity }}x {{ orderReturnItem.orderItem | itemBundleName }}
              </li>
            </ul>

            <div class="input-unit textarea cmp-contact mt-4">
              <textarea
                id="contact_wish"
                class="no-resize"
                rows="5"
                @change="updateOrderReturnNote($event.target.value)"
              />
              <label for="contact_wish">{{ $translate("Ceres::Template.returnReason") }}</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-secondary btn-medium"
              :class="buttonSizeClass"
            >
              <i
                class="fa fa-times"
                aria-hidden="true"
              />
              {{ $translate("Ceres::Template.returnCancel") }}
            </button>
            <button
              :disabled="isLoading"
              type="button"
              class="btn btn-primary btn-appearance btn-medium"
              :class="buttonSizeClass"
              @click="sendReturnItems()"
            >
              <icon
                icon="check"
                :loading="isLoading"
              />
              {{ $translate("Ceres::Template.returnConfirm") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "../../services/NotificationService";
import { mapState, mapMutations, mapActions } from "vuex";
import { navigateTo } from "../../services/UrlService";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

import OrderReturnItem from "./OrderReturnItem.vue";

export default {

    components:
    {
        OrderReturnItem
    },

    mixins: [ButtonSizePropertyMixin],

    props: {
        initOrderData:
        {
            type: Object,
            required: true
        },

        orderAccessKey:
        {
            type: String,
            default: ""
        },

        itemDetailsData:
        {
            type: Array,
            default: () => []
        }
    },

    data()
    {
        return {
            isLoading: false
        };
    },

    created()
    {
        this.$store.commit("setOrderReturnData", this.initOrderData);
        this.$store.commit("setOrderAccessKey", this.orderAccessKey);
    },

    computed:
    {
        amount()
        {
            return this.orderData.order.amounts.find(amount => !amount.isSystemCurrency) || this.orderData.order.amounts[0];
        },

        ...mapState({
            orderData: state => state.orderReturn.orderData,
            orderReturnItems: state => state.orderReturn.orderReturnItems,
            isDisabled: state => state.orderReturn.orderReturnItems.length === 0,
            showNetPrices: state => state.basket.showNetPrices
        })
    },

    methods:
    {
        showConfirmationModal()
        {
            $(this.$refs.orderReturnConfirmation).modal("show");
        },

        sendReturnItems()
        {
            this.isLoading = true;

            this.sendOrderReturn().then(
                () =>
                {
                    $(this.$refs.orderReturnConfirmation).modal("hide");
                    navigateTo(window.location.origin);
                    NotificationService.success(
                        this.$translate("Ceres::Template.returnConfirmationInfo")
                    ).closeAfter(3000);
                },
                () =>
                {
                    this.isLoading = false;
                    $(this.$refs.orderReturnConfirmation).modal("hide");
                });
        },

        selectAllItems()
        {
            vueEventHub.$emit("select-all-items");
        },

        ...mapMutations([
            "updateOrderReturnNote"
        ]),

        ...mapActions([
            "sendOrderReturn"
        ])
    }
}
</script>
