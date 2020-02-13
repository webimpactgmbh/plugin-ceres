<template>
  <form
    :id="'newsletter-input-form_' + _uid"
    method="post"
    @submit.prevent="validateData"
  >
    <div class="row">
      <div
        v-if="showNameInputs"
        class="col-xs-6"
      >
        <div class="input-unit">
          <label :for="'first-name-input_' + _uid">{{ $translate("Ceres::Template.newsletterFirstName") }}</label>
          <input
            :id="'first-name-input_' + _uid"
            v-model="firstName"
            type="text"
          >
        </div>
      </div>
      <div
        v-if="showNameInputs"
        class="col-xs-6 pl-0"
      >
        <div class="input-unit">
          <label :for="'last-name-input_' + _uid">{{ $translate("Ceres::Template.newsletterLastName") }}</label>
          <input
            :id="'last-name-input_' + _uid"
            v-model="lastName"
            type="text"
          >
        </div>
      </div>

      <div class="col-xs-12">
        <div class="input-group">
          <div
            class="input-unit"
            data-validate="mail"
          >
            <label :for="'email-input-id_' + _uid">{{ $translate("Ceres::Template.newsletterEmail") }} *</label>
            <input
              :id="'email-input-id_' + _uid"
              v-model="email"
              type="email"
              autocomplete="email"
            >
          </div>
          <input
            v-model="honeypot"
            class="honey"
            type="text"
            name="username"
            autocomplete="off"
            tabindex="-1"
          >
        </div>
      </div>

      <div
        v-if="showPrivacyPolicyCheckbox"
        class="col-xs-12"
      >
        <div
          class="form-check small"
          data-validate
        >
          <input
            :id="'privacy-policy-accept-id_' + _uid"
            v-model="privacyPolicyValue"
            type="checkbox"
            class="form-check-input"
            name="privacy-policy-accept"
          >
          <label
            :for="'privacy-policy-accept-id_' + _uid"
            class="form-check-label"
            v-html="privacyPolicyText"
          />
        </div>
      </div>

      <div class="col-xs-12 mt-3">
        <div class="input-group-btn">
          <button
            type="button"
            class="btn btn-block btn-primary btn-appearance"
            :disabled="isDisabled"
            :class="buttonSizeClass"
            @click="validateData"
          >
            <icon
              icon="paper-plane-o"
              :loading="isDisabled"
            />
            {{ $translate("Ceres::Template.newsletterSubscribeButtonLabel") }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import ApiService from "../../services/ApiService";
import NotificationService from "../../services/NotificationService";
import ValidationService from "../../services/ValidationService";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

export default {
    mixins: [ButtonSizePropertyMixin],

    props: {
        showNameInputs:
        {
            type: Boolean,
            default: false
        },
        showPrivacyPolicyCheckbox:
        {
            type: Boolean,
            default: true
        },
        emailFolder:
        {
            type: Number,
            default: 0
        }
    },

    data()
    {
        return {
            firstName: "",
            lastName: "",
            email: "",
            isDisabled: false,
            privacyPolicyValue: false,
            honeypot: ""
        };
    },

    computed:
    {
        privacyPolicyText()
        {
            const link = "<a href=\"" + App.urls.privacyPolicy + "\" target=\"_blank\"><span class=\"text-primary text-appearance\">"
                + this.$translate("Ceres::Template.checkoutPrivacyPolicy", { "hyphen": "&shy;" })
                + "</span></a>";

            return this.$translate("Ceres::Template.newsletterAcceptPrivacyPolicy", { "policy": link });
        }
    },

    methods: {
        validateData()
        {
            this.isDisabled = true;

            ValidationService.validate($("#newsletter-input-form_" + this._uid))
                .done(() =>
                {
                    this.save();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");

                    this.isDisabled = false;
                });
        },

        save()
        {
            ApiService.post("/rest/io/customer/newsletter", { email: this.email, firstName: this.firstName, lastName: this.lastName, emailFolder: this.emailFolder, honeypot: this.honeypot })
                .done(() =>
                {
                    NotificationService.success(
                        this.$translate("Ceres::Template.newsletterSuccessMessage")
                    ).closeAfter(3000);
                    this.resetInputs();
                })
                .fail(() =>
                {
                    NotificationService.error(
                        this.$translate("Ceres::Template.newsletterErrorMessage")
                    ).closeAfter(5000);
                })
                .always(() =>
                {
                    this.isDisabled = false;
                });
        },

        resetInputs()
        {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.privacyPolicyValue = false;
        }
    }
}
</script>
