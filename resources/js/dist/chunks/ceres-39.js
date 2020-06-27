(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[39],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helper_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/dom */ "./resources/js/src/app/helper/dom.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");


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
//



var NotificationService = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "variation-select",
  props: {
    forceContent: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    itemId: {
      default: null
    }
  },

  data() {
    return {
      filteredVariationsCache: {},
      lastContentCount: 0
    };
  },

  mounted() {
    // initially check for valid selection and disable add to basket button
    this.$store.commit("".concat(this.itemId, "/variationSelect/setIsVariationSelected"), !!this.currentSelection);
  },

  computed: {
    currentVariation() {
      return this.$store.getters["".concat(this.itemId, "/currentItemVariation")];
    },

    currentVariationSelect() {
      return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationSelect;
    },

    /**
     * returns true if any variation has no attributes
     */
    hasEmptyOption() {
      return this.variations.some(variation => !variation.attributes.length);
    },

    addPleaseSelectOption() {
      return App.config.item.showPleaseSelect;
    },

    /**
     * returns the variation, based on the selected attributes / unit
     * returns false if there are none or multiple results
     */
    currentSelection() {
      var filteredVariations = this.filterVariations(null, null, true);

      if (filteredVariations.length === 1) {
        return filteredVariations[0];
      }

      return false;
    },

    /**
     * returns all units, selectable by current selection
     * prop 'forceContent' with value true will return all units, without filtering
     */
    possibleUnits() {
      var possibleUnits = {};
      var variations = this.forceContent ? this.variations : this.filterVariations(null, null, null, true);

      for (var variation of variations) {
        possibleUnits[variation.unitCombinationId] = variation.unitName;
      }

      return possibleUnits;
    },

    isContentVisible() {
      return !this.forceContent && !!this.currentSelection || this.forceContent;
    },

    hasSelection() {
      return !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(this.selectedAttributes) && !Object.values(this.selectedAttributes).some(value => value < 0);
    },

    attributes() {
      return this.currentVariationSelect && this.currentVariationSelect.attributes;
    },

    units() {
      return this.currentVariationSelect && this.currentVariationSelect.units;
    },

    selectedAttributes() {
      return this.currentVariationSelect && this.currentVariationSelect.selectedAttributes;
    },

    selectedUnit() {
      return this.currentVariationSelect && this.currentVariationSelect.selectedUnit;
    },

    variations() {
      return this.currentVariationSelect && this.currentVariationSelect.variations;
    }

  },
  methods: {
    /**
     * select an attribute and check, if the selection is valid; if not, unsetInvalidSelection will be executed
     * @param {number} attributeId
     * @param {[number, string, null]} attributeValueId
     */
    selectAttribute(attributeId, attributeValueId) {
      attributeValueId = parseInt(attributeValueId) || null;

      if (this.selectedAttributes[attributeId] !== attributeValueId) {
        this.$store.commit("".concat(this.itemId, "/variationSelect/selectItemAttribute"), {
          attributeId,
          attributeValueId
        });
        this.onSelectionChange(attributeId, attributeValueId, null);
      }
    },

    /**
     * select a unit and check, if the selection is valid; if not, unsetInvalidSelection will be executed
     * @param {[number, string]} unitId
     */
    selectUnit(unitId) {
      unitId = parseInt(unitId);
      this.$store.commit("".concat(this.itemId, "/variationSelect/selectItemUnit"), unitId);
      this.onSelectionChange(null, null, unitId);
    },

    onSelectionChange(attributeId, attributeValueId, unitId) {
      if (this.currentSelection) {
        this.setVariation(this.currentSelection.variationId);
      } else if (!this.hasSelection) {
        // user switched back to "please select"
        this.setVariation(0);
      } else {
        this.unsetInvalidSelection(attributeId, attributeValueId, unitId);
      }

      this.lastContentCount = Object.keys(this.possibleUnits).length;
    },

    /**
     * changes the selected attributes / unit, to ensure a valid seelction
     * @param {[number, null]} attributeId
     * @param {[number, null]} attributeValueId
     * @param {[number, null]} unitId
     */
    unsetInvalidSelection(attributeId, attributeValueId, unitId) {
      var qualifiedVariations = this.getQualifiedVariations(attributeId, attributeValueId, unitId);
      var closestVariation = this.getClosestVariation(qualifiedVariations);

      if (!closestVariation) {
        return;
      }

      var invalidSelection = this.getInvalidSelectionByVariation(closestVariation);
      this.correctSelection(invalidSelection);
    },

    getTooltip(attribute, attributeValue) {
      if (!this.isAttributeSelectionValid(attribute.attributeId, attributeValue.attributeValueId)) {
        return this.getInvalidOptionTooltip(attribute.attributeId, attributeValue.attributeValueId);
      } else if (attribute.type === "image") {
        return this.$translate("Ceres::Template.singleItemAttributeTooltip", {
          attribute: attribute.name,
          value: attributeValue.name
        });
      }

      return "";
    },

    /**
     * returns a string for box tooltips, for not available options
     * @param {number} attributeId
     * @param {number} attributeValueId
     */
    getInvalidOptionTooltip(attributeId, attributeValueId) {
      var qualifiedVariations = this.getQualifiedVariations(attributeId, attributeValueId);
      var closestVariation = this.getClosestVariation(qualifiedVariations);

      if (!closestVariation) {
        return "";
      }

      var invalidSelection = this.getInvalidSelectionByVariation(closestVariation);
      var names = [];

      for (var attribute of invalidSelection.attributesToReset) {
        if (attribute.attributeId !== attributeId) {
          names.push("<b>" + attribute.name + "</b>");
        }
      }

      if (invalidSelection.newUnit) {
        names.push("<b>" + this.$translate("Ceres::Template.singleItemContent") + "</b>");
      }

      if (!names.length) {
        return null;
      }

      return this.$translate("Ceres::Template.singleItemNotAvailableInSelection", {
        name: names.join(", ")
      });
    },

    /**
     * returns a list of variations, filtered by attribute or unit
     * @param {[number, null]} attributeId
     * @param {[number, null]} attributeValueId
     * @param {[number, null]} unitId
     */
    getQualifiedVariations(attributeId, attributeValueId, unitId) {
      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(attributeValueId)) {
        return this.variations.filter(variation => {
          return Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(variation.attributes.find(attribute => attribute.attributeId === attributeId && attribute.attributeValueId === attributeValueId));
        });
      } else if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(unitId)) {
        return this.variations.filter(variation => variation.unitCombinationId === unitId);
      }

      return this.variations.filter(variation => !variation.attributes.length);
    },

    /**
     * returns a variation, where a minimum of changes in the selection is required to archive
     * @param {array} qualifiedVariations
     */
    getClosestVariation(qualifiedVariations) {
      var closestVariation;
      var numberOfRequiredChanges;

      for (var variation of qualifiedVariations) {
        var changes = 0;

        if (variation.unitCombinationId !== this.selectedUnit && !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isNull"])(this.selectedUnit)) {
          changes++;
        }

        for (var attribute of variation.attributes) {
          if (this.selectedAttributes[attribute.attributeId] !== attribute.attributeValueId) {
            changes++;
          }
        }

        if (!numberOfRequiredChanges || changes < numberOfRequiredChanges) {
          closestVariation = variation;
          numberOfRequiredChanges = changes;
        }
      }

      return closestVariation;
    },

    /**
     * returns object with array 'attributesToReset' and newUnit. The attributesToReset contains all attributes, which are not matching with the given variation
     * @param {object} variation
     */
    getInvalidSelectionByVariation(variation) {
      var _this = this;

      var attributesToReset = [];
      var newUnit = null;

      var _loop = function _loop(_selectedAttributeId) {
        _selectedAttributeId = parseInt(_selectedAttributeId);
        var variationAttribute = variation.attributes.find(attribute => attribute.attributeId === _selectedAttributeId);

        if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isNull"])(_this.selectedAttributes[_selectedAttributeId])) {
          if (variationAttribute && variationAttribute.attributeValueId !== _this.selectedAttributes[_selectedAttributeId] || !variationAttribute) {
            var attributeToReset = _this.attributes.find(attr => attr.attributeId === _selectedAttributeId);

            attributesToReset.push(attributeToReset);
          }
        }

        selectedAttributeId = _selectedAttributeId;
      };

      for (var selectedAttributeId in this.selectedAttributes) {
        _loop(selectedAttributeId);
      }

      if (variation.unitCombinationId !== this.selectedUnit) {
        newUnit = variation.unitCombinationId;
      }

      return {
        attributesToReset,
        newUnit
      };
    },

    /**
     * resets all invalid attributes and change the unit, if required. Prints a message to the user if so.
     * @param {object} invalidSelection
     */
    correctSelection(invalidSelection) {
      var messages = [];
      var attributes = JSON.parse(JSON.stringify(this.selectedAttributes));

      for (var attributeToReset of invalidSelection.attributesToReset) {
        messages.push(this.$translate("Ceres::Template.singleItemNotAvailable", {
          name: attributeToReset.name
        }));
        attributes[attributeToReset.attributeId] = !this.hasEmptyOption && App.config.item.showPleaseSelect ? -1 : null;
      }

      if (invalidSelection.newUnit) {
        if (this.lastContentCount > 1 && Object.keys(this.possibleUnits).length > 1 && !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isNull"])(this.selectedUnit)) {
          messages.push(this.$translate("Ceres::Template.singleItemNotAvailable", {
            name: this.$translate("Ceres::Template.singleItemContent")
          }));
        }

        this.$store.commit("".concat(this.itemId, "/variationSelect/selectItemUnit"), invalidSelection.newUnit);
      }

      this.$store.commit("".concat(this.itemId, "/variationSelect/setItemSelectedAttributes"), attributes);
      this.setVariation(this.currentSelection ? this.currentSelection.variationId : 0);
      NotificationService.warn(messages.join("<br>")).closeAfter(5000);
    },

    /**
     * returns matching variations with current selection
     * attributes and unitId could be filled, to check a specific selection
     * @param {object} attributes
     * @param {number} unitId
     * @param {boolean} strict
     */
    filterVariations(attributes, unitId, strict, ignoreUnit) {
      attributes = attributes || this.selectedAttributes;
      unitId = unitId || this.selectedUnit;
      strict = !!strict;
      ignoreUnit = !!ignoreUnit;
      var key = JSON.stringify(attributes) + "_" + unitId + "_" + strict + "_" + ignoreUnit;

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(this.filteredVariationsCache[key])) {
        return this.filteredVariationsCache[key];
      }

      var uniqueValues = [...new Set(Object.values(attributes))];
      var isEmptyOptionSelected = uniqueValues.length === 1 && Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isNull"])(uniqueValues[0]);
      var filteredVariations = this.variations.filter(variation => {
        // the selected unit is not matching
        if (!ignoreUnit && variation.unitCombinationId !== unitId) {
          return false;
        } // the variation has no attributes (only checked, if any attribute has a selected value); or the variation has attributes and empty option is selected
        // requires more than 0 attributes


        if ((!isEmptyOptionSelected && !variation.attributes.length || isEmptyOptionSelected && variation.attributes.length) && this.attributes.length > 0) {
          return false;
        }

        var _loop2 = function _loop2(attributeId) {
          var variationAttribute = variation.attributes.find(variationAttribute => variationAttribute.attributeId === parseInt(attributeId)); // an attribute is not matching with selection

          if (variationAttribute && variationAttribute.attributeValueId !== attributes[attributeId] && (strict || !strict && !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isNull"])(attributes[attributeId]) && attributes[attributeId] !== -1)) {
            return {
              v: false
            };
          }
        };

        for (var attributeId in attributes) {
          var _ret = _loop2(attributeId);

          if (typeof _ret === "object") return _ret.v;
        }

        return true;
      });
      this.filteredVariationsCache[key] = filteredVariations;
      return filteredVariations;
    },

    /**
     * returns true, if the selection with a new attribute value would be valid
     * @param {number} attributeId
     * @param {[number, string, null]} attributeValueId
     */
    isAttributeSelectionValid(attributeId, attributeValueId) {
      attributeValueId = parseInt(attributeValueId) || null;

      if (this.selectedAttributes[attributeId] === attributeValueId) {
        return true;
      }

      var selectedAttributes = JSON.parse(JSON.stringify(this.selectedAttributes));
      selectedAttributes[attributeId] = parseInt(attributeValueId) || null;
      var ignoreUnit = !(Object.keys(this.possibleUnits).length > 1 && this.isContentVisible);
      return !!this.filterVariations(selectedAttributes, null, null, ignoreUnit).length;
    },

    /**
     * returns true, if the selection with a new unitId would be valid
     * @param {[number, string]} unitId
     */
    isUnitSelectionValid(unitId) {
      unitId = parseInt(unitId);

      if (this.selectedUnit === unitId) {
        return true;
      }

      return !!this.filterVariations(null, unitId).length;
    },

    /**
     * dispatch vuex action 'loadVariation' to archive a variation
     * dispatches a custom event named 'onVariationChanged'
     * @param {[string, number, null]} variationId
     */
    setVariation(variationId) {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(variationId) && this.currentSelection) {
        variationId = this.currentSelection.variationId;
      }

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(variationId)) {
        this.$store.dispatch("".concat(this.itemId, "/loadVariation"), variationId).then(variation => {
          document.dispatchEvent(new CustomEvent("onVariationChanged", {
            detail: {
              attributes: variation.attributes,
              documents: variation.documents,
              itemId: this.itemId
            }
          }));
        });
      }
    },

    isTextCut(content) {
      if (this.$refs.attributesContaner) {
        return Object(_helper_dom__WEBPACK_IMPORTED_MODULE_2__["textWidth"])(content, "Custom-Font, Helvetica, Arial, sans-serif") > this.$refs.attributesContaner[0].clientWidth;
      }

      return false;
    },

    getSelectedAttributeValueName(attribute) {
      var selectedAttributeValueId = this.selectedAttributes[attribute.attributeId];
      var selectedAttributeValue = attribute.values.find(attrValue => attrValue.attributeValueId === selectedAttributeValueId);

      if (selectedAttributeValue) {
        return selectedAttributeValue.name;
      } else if (App.config.item.showPleaseSelect && selectedAttributeValueId === -1) {
        return this.$translate("Ceres::Template.singleItemPleaseSelect");
      }

      return this.$translate("Ceres::Template.singleItemNoSelection");
    }

  },
  watch: {
    currentSelection(value) {
      this.$store.commit("".concat(this.itemId, "/variationSelect/setIsVariationSelected"), !!value);
    },

    variations() {
      // FIX unset variation cache after subsequent variations are loaded
      this.filteredVariationsCache = {};
    }

  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _vm.attributes.length ||
    (Object.keys(_vm.possibleUnits).length > 1 && _vm.isContentVisible)
      ? _c(
          "div",
          { staticClass: "row" },
          [
            _vm._l(_vm.attributes, function(attribute) {
              return _c("div", { staticClass: "col-12 variation-select" }, [
                attribute.type === "dropdown"
                  ? _c(
                      "div",
                      {
                        ref: "attributesContaner",
                        refInFor: true,
                        staticClass: "input-unit"
                      },
                      [
                        _c(
                          "select",
                          {
                            staticClass: "custom-select",
                            on: {
                              change: function($event) {
                                return _vm.selectAttribute(
                                  attribute.attributeId,
                                  $event.target.value
                                )
                              }
                            }
                          },
                          [
                            _vm.addPleaseSelectOption || !_vm.hasSelection
                              ? _c("option", { domProps: { value: -1 } }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.singleItemPleaseSelect"
                                      )
                                    )
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.hasEmptyOption ||
                            _vm.selectedAttributes[attribute.attributeId] ===
                              null
                              ? _c(
                                  "option",
                                  {
                                    domProps: {
                                      value: null,
                                      selected:
                                        _vm.selectedAttributes[
                                          attribute.attributeId
                                        ] === null
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.singleItemNoSelection"
                                        )
                                      )
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm._l(attribute.values, function(value) {
                              return _c(
                                "option",
                                {
                                  domProps: {
                                    value: value.attributeValueId,
                                    selected:
                                      value.attributeValueId ===
                                      _vm.selectedAttributes[
                                        attribute.attributeId
                                      ]
                                  }
                                },
                                [
                                  _vm.isAttributeSelectionValid(
                                    attribute.attributeId,
                                    value.attributeValueId
                                  )
                                    ? [
                                        _vm._v(
                                          "\n                            " +
                                            _vm._s(value.name) +
                                            "\n                        "
                                        )
                                      ]
                                    : [
                                        _vm._v(
                                          "\n                            " +
                                            _vm._s(
                                              _vm.$translate(
                                                "Ceres::Template.singleItemInvalidAttribute",
                                                { name: value.name }
                                              )
                                            ) +
                                            "\n                        "
                                        )
                                      ]
                                ],
                                2
                              )
                            })
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c(
                          "label",
                          {
                            directives: [
                              {
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: _vm.isTextCut(attribute.name),
                                expression: "isTextCut(attribute.name)"
                              }
                            ],
                            attrs: {
                              "data-toggle": "tooltip",
                              "data-placement": "top",
                              title: attribute.name
                            }
                          },
                          [_vm._v(_vm._s(attribute.name))]
                        )
                      ]
                    )
                  : attribute.type === "box" || attribute.type === "image"
                  ? _c("div", [
                      _c("span", { staticClass: "text-muted" }, [
                        _vm._v(_vm._s(attribute.name) + ":")
                      ]),
                      _vm._v(" "),
                      _c("b", [
                        _vm._v(
                          _vm._s(_vm.getSelectedAttributeValueName(attribute))
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "v-s-boxes py-3",
                          class: { images: attribute.type === "image" }
                        },
                        [
                          _vm.addPleaseSelectOption
                            ? _c(
                                "div",
                                {
                                  staticClass: "v-s-box bg-white empty-option",
                                  class: {
                                    active:
                                      _vm.selectedAttributes[
                                        attribute.attributeId
                                      ] === -1,
                                    invalid: !_vm.isAttributeSelectionValid(
                                      attribute.attributeId,
                                      -1
                                    )
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.selectAttribute(
                                        attribute.attributeId,
                                        -1
                                      )
                                    }
                                  }
                                },
                                [
                                  _c("span", { staticClass: "mx-3" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.singleItemPleaseSelect"
                                        )
                                      )
                                    )
                                  ])
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.hasEmptyOption
                            ? _c(
                                "div",
                                {
                                  staticClass: "v-s-box bg-white empty-option",
                                  class: {
                                    active:
                                      _vm.selectedAttributes[
                                        attribute.attributeId
                                      ] === null,
                                    invalid: !_vm.isAttributeSelectionValid(
                                      attribute.attributeId,
                                      null
                                    )
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.selectAttribute(
                                        attribute.attributeId,
                                        null
                                      )
                                    }
                                  }
                                },
                                [
                                  _c("span", { staticClass: "mx-3" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.singleItemNoSelection"
                                        )
                                      )
                                    )
                                  ])
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(attribute.values, function(value) {
                            return _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: true,
                                    expression: "true"
                                  }
                                ],
                                staticClass: "v-s-box bg-white",
                                class: {
                                  active:
                                    value.attributeValueId ===
                                    _vm.selectedAttributes[
                                      attribute.attributeId
                                    ],
                                  invalid: !_vm.isAttributeSelectionValid(
                                    attribute.attributeId,
                                    value.attributeValueId
                                  )
                                },
                                attrs: {
                                  "data-html": "true",
                                  "data-toggle": "tooltip",
                                  "data-placement": "top",
                                  "data-original-title": _vm.getTooltip(
                                    attribute,
                                    value
                                  )
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.selectAttribute(
                                      attribute.attributeId,
                                      value.attributeValueId
                                    )
                                  }
                                }
                              },
                              [
                                attribute.type === "box"
                                  ? _c("span", { staticClass: "mx-3" }, [
                                      _vm._v(_vm._s(value.name))
                                    ])
                                  : _c("img", {
                                      staticClass: "p-1",
                                      attrs: {
                                        src: value.imageUrl,
                                        alt: value.name
                                      }
                                    })
                              ]
                            )
                          })
                        ],
                        2
                      )
                    ])
                  : _vm._e()
              ])
            }),
            _vm._v(" "),
            Object.keys(_vm.possibleUnits).length > 1 && _vm.isContentVisible
              ? _c("div", { staticClass: "col-12 variation-select" }, [
                  _c("div", { staticClass: "input-unit" }, [
                    _c(
                      "select",
                      {
                        staticClass: "custom-select",
                        on: {
                          change: function($event) {
                            return _vm.selectUnit($event.target.value)
                          }
                        }
                      },
                      _vm._l(_vm.possibleUnits, function(unit, unitId) {
                        return _c(
                          "option",
                          {
                            domProps: {
                              value: unitId,
                              selected: parseInt(unitId) === _vm.selectedUnit
                            }
                          },
                          [
                            _vm.isUnitSelectionValid(unitId)
                              ? [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(unit) +
                                      "\n                        "
                                  )
                                ]
                              : [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.singleItemInvalidAttribute",
                                          { name: unit }
                                        )
                                      ) +
                                      "\n                        "
                                  )
                                ]
                          ],
                          2
                        )
                      }),
                      0
                    ),
                    _vm._v(" "),
                    _c("label", [
                      _vm._v(
                        _vm._s(
                          _vm.$translate("Ceres::Template.singleItemContent")
                        )
                      )
                    ])
                  ])
                ])
              : _vm._e()
          ],
          2
        )
      : _c("div", [_vm._t("default")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/VariationSelect.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/app/components/item/VariationSelect.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VariationSelect.vue?vue&type=template&id=4a939d05& */ "./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05&");
/* harmony import */ var _VariationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VariationSelect.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VariationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/VariationSelect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VariationSelect.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VariationSelect.vue?vue&type=template&id=4a939d05& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-39.js.map