const path = require("path")

module.exports = {
    entry: {
        'picnic.js': [
            "./src/picnic.js",
            "./src/extensions/javascript.js",
            "./src/extensions/jquery.js",
            "./src/components/locale.js",
            "./src/components/responsive.js",
            "./src/components/url.js",
            "./src/components/router.js",
            "./src/components/backdrop.js",
            "./src/components/scrollbar.js",
            "./src/components/preloader.js",
            "./src/components/event.js",
            "./src/components/controller.js",
            "./src/components/layer.js",
            "./src/components/modal.js",
            "./src/components/panel.js",
            "./src/components/filter.js",
            "./src/plugins/clicked.js",
            "./src/plugins/dropdown.js",
            "./src/plugins/lazy-load.js",
            "./src/plugins/horizontal-scroll.js",
            "./src/plugins/scroll-to.js",
            "./src/plugins/scroll-top.js",
            "./src/plugins/sticky.js",
            "./src/plugins/tabs.js",
            "./src/plugins/title-bubble.js",
            "./src/plugins/tooltip.js",
            "./src/plugins/form-submit-button.js",
            "./src/plugins/toggle-password.js",
            "./src/plugins/floating-label.js",
            "./src/plugins/drag-scroll.js",
            "./src/plugins/collapsable.js"
        ]
    },

    output: {
        filename: "[name]",
        path: path.resolve(__dirname, "dist")
    },
    mode: 'production',
    module: {
        rules: []
    }
}
