<template>
  <form
    ref="resetPasswordForm"
    class="w-100 clearfix"
    method="post"
  >
    <div
      class="input-feedback-container"
      data-validate="password"
    >
      <div class="input-unit">
        <popper
          v-cloak
          ref="passwordHint"
          trigger="focus"
          placement="bottom"
        >
          <template #handle>
            <input
              :id="_uid + 'password_first'"
              v-model="passwordFirst"
              type="password"
              name="password"
              autocomplete="new-password"
            >
          </template>
          <template #title>
            {{ $translate("Ceres::Template.resetPwPasswordHintTitle") }}
          </template>
          <template #content>
            <ul class="pl-3">
              <li>{{ $translate("Ceres::Template.resetPwPasswordHintLength") }}</li>
              <li>{{ $translate("Ceres::Template.resetPwPasswordHintDigit") }}</li>
              <li>{{ $translate("Ceres::Template.resetPwPasswordHintChar") }}</li>
            </ul>
          </template>
        </popper>

        <label :for="_uid + 'password_first'">{{ $translate("Ceres::Template.resetPwNewPassword") }}*</label>
      </div>
    </div>

    <div
      class="input-feedback-container"
      data-validate="ref"
    >
      <div class="input-unit">
        <input
          :id="_uid + 'password_second'"
          v-model="passwordSecond"
          type="password"
          name="password"
          autocomplete="new-password"
          :data-validate-ref="'#' + _uid + 'password_first'"
        >
        <label :for="_uid + 'password_second'">{{ $translate("Ceres::Template.resetPwRepeatPassword") }}*</label>
      </div>
    </div>

    <button
      class="btn btn-primary btn-appearance btn-large float-right"
      :disabled="isDisabled"
      @click.prevent="validatePassword"
    >
      <span>{{ $translate("Ceres::Template.resetPwSave") }}</span>
      <i
        class="fa fa-floppy-o"
        aria-hidden="true"
      />
    </button>
  </form>
</template>

<script>
import ValidationService from "../../services/ValidationService";
import { navigateTo } from "../../services/UrlService";
import { isNullOrUndefined } from "../../helper/utils";
import ApiService from "../../services/ApiService";
import NotificationService from "../../services/NotificationService";

export default {

    name: "ResetPasswordForm",

    props: {
        contactId:
        {
            type: Number,
            required: true
        },
        hash:
        {
            type: String,
            required: true
        }
    },

    data()
    {
        return {
            passwordFirst: "",
            passwordSecond: "",
            isDisabled: false
        };
    },

    methods: {

        validatePassword()
        {

            ValidationService.validate(this.$refs.resetPasswordForm)
                .done(() =>
                {
                    this.saveNewPassword();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "has-error");
                    const validation = !isNullOrUndefined(invalidFields[0]) ? invalidFields[0].dataset.validate : null;

                    if (validation === "password")
                    {
                        NotificationService.error(
                            this.$translate("Ceres::Template.resetPwInvalidPassword")
                        );
                    }
                    else if (validation === "ref")
                    {
                        NotificationService.error("Ceres::Template.resetPwRepeatNewPassword");
                    }
                });
        },

        saveNewPassword()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/password", { password: this.passwordFirst, password2: this.passwordSecond, contactId: this.contactId, hash: this.hash })
                .done(() =>
                {

                    navigateTo(window.location.origin);

                    NotificationService.success(
                        this.$translate("Ceres::Template.resetPwChangePasswordSuccessful")
                    ).closeAfter(3000);

                })
                .fail(() =>
                {
                    this.isDisabled = false;

                    NotificationService.error(
                        this.$translate("Ceres::Template.resetPwChangePasswordFailed")
                    ).closeAfter(5000);
                });
        }
    }

}
</script>

<style>

</style>