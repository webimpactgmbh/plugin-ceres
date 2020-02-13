<template>
  <div class="container-max">
    <div class="d-flex flex-grow-1 position-relative my-2">
      <input
        ref="searchInput"
        v-model="searchString"
        type="search"
        class="search-input flex-grow-1 px-3 py-2"
        :autofocus="isShopBuilder"
        @input="onValueChanged($event.target.value)"
        @keyup.enter="search()"
        @focus="isSearchFocused = true"
        @blur="setIsSearchFocused(false)"
      >

      <slot name="search-button">
        <button
          class="search-submit px-3"
          type="submit"
          @click="search()"
        >
          <i class="fa fa-search" />
        </button>
      </slot>
    </div>

    <slot
      v-if="isSearchFocused && autocompleteResult.length"
      name="autocomplete-suggestions"
    >
      <div
        v-if="isSearchFocused && autocompleteResult.length"
        class="autocomplete-suggestions shadow bg-white w-100 overflow-auto"
      >
        <search-suggestion-items
          :show-item-images="showItemImages"
          :forward-to-single-item="forwardToSingleItem"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import UrlService from "../../services/UrlService";
import { isNullOrUndefined, defaultValue } from "../../helper/utils";
import { pathnameEquals } from "../../helper/url";
import { mapState } from "vuex";
import { debounce } from "../../helper/debounce";

export default {

    name: "ItemSearch",

    props: {
        showItemImages:
        {
            type: Boolean,
            default: false
        },
        forwardToSingleItem:
        {
            type: Boolean,
            default: App.config.search.forwardToSingleItem
        },
        timeout:
        {
            type: Number,
            default: 500
        }
    },

    data()
    {
        return {
            isSearchFocused: App.isShopBuilder,
            onValueChanged: null,
            searchString: ""
        };
    },

    created()
    {
        this.onValueChanged = debounce(searchString =>
        {
            this.autocomplete(searchString);
        }, defaultValue(this.timeout, 500));
    },

    computed:
    {
        isShopBuilder()
        {
            return App.isShopBuilder;
        },

        ...mapState({
            autocompleteResult: state => state.itemSearch.autocompleteResult,
            moduleSearchString: state => state.itemList.searchString
        })
    },

    watch:
    {
        // set the current search string, after clicking on a suggestion
        moduleSearchString(newVal)
        {
            if (newVal && newVal.length)
            {
                this.searchString = newVal;
            }
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            this.$store.commit("setItemListSearchString", urlParams.query);

            this.$refs.searchInput.value = !isNullOrUndefined(urlParams.query) ? urlParams.query : "";
        });
    },

    methods:
    {
        search()
        {
            if (this.$refs.searchInput.value.length)
            {
                if (pathnameEquals(App.urls.search))
                {
                    this.$store.dispatch("searchItems", this.$refs.searchInput.value);
                }
                else
                {
                    window.open(`${App.urls.search}?query=${ this.searchString }`, "_self", false);
                }
            }
        },

        autocomplete(searchString)
        {
            if (searchString.length >= 2)
            {
                this.$store.dispatch("loadItemSearchAutocomplete", searchString);
            }
            else
            {
                this.$store.commit("setAutocompleteResult", []);
            }
        },

        // hide autocomplete after 100ms to make clicking on it possible
        setIsSearchFocused(value)
        {
            setTimeout(() =>
            {
                this.isSearchFocused = !!value;
            }, 100);
        }
    }
}
</script>
