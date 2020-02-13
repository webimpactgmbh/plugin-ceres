<template>
  <div
    class="form-check"
    :class="{ 'error': showError }"
  >
    <input
      :id="'privacy-policy-accept' + _uid"
      class="form-check-input"
      type="checkbox"
      :checked="value"
      @change="onValueChanged($event.target.checked)"
    >
    <label
      class="form-check-label"
      :for="'privacy-policy-accept' + _uid"
    >
      <span v-html="labelHtml" /><!--
            --><sup>*</sup>
    </label>
  </div>
</template>

<script>
export default {

    name: "AcceptPrivacyPolicyCheck",

    props: {
        value: Boolean ,
        showError: Boolean
    },

    computed: {
        labelHtml()
        {
            const contactPrivacyPolicy = this.$translate("Ceres::Template.contactPrivacyPolicy", { "hyphen": "&shy;" });
            const html = `
                <!----><a href="${ App.urls.privacyPolicy }" target="_blank" class="text-appearance">
                    <span>${ contactPrivacyPolicy }</span>
                </a><!---->
            `;

            return this.$translate("Ceres::Template.contactAcceptPrivacyPolicy", { policy: html });
        }
    },

    methods:
    {
        onValueChanged(value)
        {
            this.$emit("input", value);
        }
    }
}
</script>