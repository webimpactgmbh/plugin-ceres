<script>
export default {

    name: "TabItem",

    props: {
        active:
        {
            type: Boolean,
            default: false
        },
        title:
        {
            type: String,
            default: null
        },
        dataBuilderClickable:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            localActive: this.active
        };
    },

    methods:
    {
        setActive(isActive)
        {
            this.localActive = isActive;
        }
    },

    render(createElement)
    {
        return createElement(
            "div",
            {
                staticClass: "tab-pane",
                class: {
                    active: this.localActive
                },
                attrs: {
                    role: "tabpanel"
                }
            },
            [this.$slots.default]
        );
    }
}
</script>