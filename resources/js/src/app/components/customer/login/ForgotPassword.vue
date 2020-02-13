<template>
  <form
    :id="'reset-pwd-form-' + _uid"
    method="post"
    class="reset-pwd-container login-pwd-reset"
  >
    <div
      id="resetPwd"
      ref="pwdModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title h3">
              {{ $translate("Ceres::Template.loginForgotPassword") }}
            </div>
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
            <div class="alert alert-info w-100 pwd-forgot-info">
              <span class="info-badge">{{ $translate("Ceres::Template.loginForgotPasswordInfo") }}</span>
            </div>
            <div class="row">
              <div class="col-12">
                <input
                  v-model="honeypot"
                  class="honey"
                  type="text"
                  name="username"
                  autocomplete="off"
                  tabindex="-1"
                >
                <div
                  class="input-unit no-bottom"
                  data-validate="mail"
                >
                  <input
                    :id="'mail' + _uid"
                    v-model="username"
                    type="email"
                    name="email"
                    autocomplete="email"
                    data-autofocus
                  >
                  <label :for="'mail' + _uid">{{ $translate("Ceres::Template.loginEmail") }}*</label>
                </div>
                <span class="error-msg">{{ $translate("Ceres::Template.loginEnterConfirmEmail") }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div>
              <slot name="extend-overlay-buttons" />

              <button
                v-if="!!currentTemplate && currentTemplate != 'tpl.login'"
                type="button"
                class="btn btn-danger btn-medium mr-2"
                @click.prevent="cancelResetPwd"
              >
                <i
                  class="fa fa-arrow-left"
                  aria-hidden="true"
                />
                {{ $translate("Ceres::Template.loginBackToLogin") }}
              </button>

              <button
                :disabled="isDisabled"
                class="btn btn-primary btn-medium"
                @click.prevent="validateResetPwd"
              >
                {{ $translate("Ceres::Template.loginSend") }}
                <icon
                  icon="paper-plane-o"
                  :loading="isDisabled"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import ApiService from "../../../services/ApiService";
import NotificationService from "../../../services/NotificationService";
import ModalService from "../../../services/ModalService";
import ValidationService from "../../../services/ValidationService";
import UrlService from "../../../services/UrlService";
import { isNullOrUndefined } from "../../../helper/utils";

export default {

    name: "ForgotPasswordModal",

    props: {
        currentTemplate: String
    },

    data()
    {
        return {
            username: "",
            isDisabled: false,
            honeypot: ""
        };
    },

    watch:
    {
        username()
        {
            this.resetError();
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            $(this.$refs.pwdModal).on("hidden.bs.modal", () =>
            {
                this.username = "";
            });

            const urlParams = UrlService.getUrlParams(document.location.search);

            if (!isNullOrUndefined(urlParams.show) && urlParams.show === "forgotPassword")
            {
                ModalService.findModal(this.$refs.pwdModal).show();

                this.username = !isNullOrUndefined(urlParams.email) ? urlParams.email : "";
            }
        });
    },

    methods:
    {
        validateResetPwd()
        {
            ValidationService
                .validate(this.$refs.pwdModal)
                .done(() =>
                {
                    this.sendResetPwd();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         *  Reset password
         */
        sendResetPwd()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/password_reset", { email: this.username, honeypot: this.honeypot })
                .done(() =>
                {
                    ModalService.findModal(this.$refs.pwdModal).hide();
                    this.isDisabled = false;

                    NotificationService.success(
                        this.$translate("Ceres::Template.loginSendEmailOk")
                    ).closeAfter(5000);

                })
                .fail(() =>
                {
                    this.isDisabled = false;

                    NotificationService.error(
                        this.$translate("Ceres::Template.loginResetPwDErrorOnSendEmail")
                    ).closeAfter(5000);
                });
        },

        cancelResetPwd()
        {
            this.resetError();

            ModalService
                .findModal(this.$refs.pwdModal)
                .hide()
                .then(() =>
                {
                    ModalService
                        .findModal(document.getElementById("login"))
                        .show();
                });
        },

        resetError()
        {
            ValidationService.unmarkAllFields(this.$refs.pwdModal);
        }
    }
}
</script>
