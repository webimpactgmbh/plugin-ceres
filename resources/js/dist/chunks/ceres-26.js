(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/AddToWishList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/AddToWishList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.includes */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//



var NotificationService = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "add-to-wish-list",
  props: {
    variationId: Number
  },
  inject: {
    itemId: {
      default: null
    }
  },

  data() {
    return {
      isLoading: false
    };
  },

  computed: _objectSpread({
    isVariationInWishList() {
      return this.wishListIds.includes(this.currentVariationId);
    },

    currentVariationId() {
      return !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(this.variationId) ? this.variationId : this.currentVariationVariationId;
    },

    currentVariationVariationId() {
      var currentVariation = this.$store.getters["".concat(this.itemId, "/currentItemVariation")];

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(currentVariation)) {
        return null;
      }

      return currentVariation && currentVariation.variation && currentVariation.variation.id;
    }

  }, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapState"])({
    wishListIds: state => state.wishList.wishListIds
  })),
  methods: {
    switchState() {
      if (this.isVariationInWishList) {
        this.removeFromWishList();
      } else {
        this.addToWishList();
      }
    },

    addToWishList() {
      if (!this.isLoading) {
        this.isLoading = true;
        this.$store.dispatch("addToWishList", parseInt(this.currentVariationId)).then(response => {
          this.isLoading = false;
          NotificationService.success(this.$translate("Ceres::Template.singleItemWishListAdded"));
        }, error => {
          this.isLoading = false;
        });
      }
    },

    removeFromWishList() {
      if (!this.isLoading) {
        this.isLoading = true;
        this.$store.dispatch("removeWishListItem", {
          id: parseInt(this.currentVariationId)
        }).then(response => {
          this.isLoading = false;
          NotificationService.success(this.$translate("Ceres::Template.singleItemWishListRemoved"));
        }, error => {
          this.isLoading = false;
        });
      }
    },

    changeTooltipText() {
      var tooltipText = this.$translate("Ceres::Template." + (this.isVariationInWishList ? "singleItemWishListRemove" : "singleItemWishListAdd"));
      $(".add-to-wish-list").attr("data-original-title", tooltipText).tooltip("hide").tooltip("setContent");
    }

  },
  watch: {
    isVariationInWishList() {
      this.changeTooltipText();
    }

  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/AddToWishList.vue?vue&type=template&id=4c3118d2&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/AddToWishList.vue?vue&type=template&id=4c3118d2& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      ref: "addToWishList",
      staticClass: "btn btn-link btn-sm text-muted",
      attrs: { "data-toggle": "tooltip", "data-placement": "top", title: "" },
      on: {
        click: function($event) {
          $event.preventDefault()
          return _vm.switchState()
        }
      }
    },
    [
      _c("icon", {
        staticClass: "default-float",
        class: { "text-appearance text-danger": _vm.isVariationInWishList },
        attrs: { icon: "heart", loading: _vm.isLoading }
      }),
      _vm._v(
        "\n    " +
          _vm._s(_vm.$translate("Ceres::Template.singleItemWishList")) +
          "\n"
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/AddToWishList.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/app/components/item/AddToWishList.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddToWishList_vue_vue_type_template_id_4c3118d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddToWishList.vue?vue&type=template&id=4c3118d2& */ "./resources/js/src/app/components/item/AddToWishList.vue?vue&type=template&id=4c3118d2&");
/* harmony import */ var _AddToWishList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddToWishList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/AddToWishList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddToWishList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddToWishList_vue_vue_type_template_id_4c3118d2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddToWishList_vue_vue_type_template_id_4c3118d2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/AddToWishList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/AddToWishList.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/AddToWishList.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToWishList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddToWishList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/AddToWishList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToWishList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/AddToWishList.vue?vue&type=template&id=4c3118d2&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/AddToWishList.vue?vue&type=template&id=4c3118d2& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToWishList_vue_vue_type_template_id_4c3118d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddToWishList.vue?vue&type=template&id=4c3118d2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/AddToWishList.vue?vue&type=template&id=4c3118d2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToWishList_vue_vue_type_template_id_4c3118d2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToWishList_vue_vue_type_template_id_4c3118d2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-26.js.map