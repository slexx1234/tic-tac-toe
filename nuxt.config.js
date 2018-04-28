const title = 'Tic-tac-toe - Play online';
const description = 'Play the classic Tic-Tac-Toe game (also called Noughts and Crosses) for free online with one players.';
const locale = 'en';

module.exports = {
    head: {
        title: title,
        htmlAttrs: {
            lang: locale,
            prefix: 'og: http://ogp.me/ns#'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { hid: 'description', name: 'description', content: description },
            { name: 'theme-color', content: '#2196f3' },
            { name: 'HandheldFriendly', content: true },
            { name: 'MobileOptimized', content: 320 },
            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
            { name: 'msapplication-config', content: 'browserconfig.xml' },
            { name: 'author', content: 'Shchepkin Aleksey' },

            // Twitter Card
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@slexx1234' },
            { name: 'twitter:creator', content: '@slexx1234' },

            // Open Graph
            { property: 'og:title', content: title },
            { property: 'og:image', content: '/favicons/og-200.png' },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:image:width', content: '200' },
            { property: 'og:image:height', content: '200' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://tictactoee.netlify.com/' },
            { property: 'og:description', content: description },
            { property: 'og:locale', content: locale },
            { property: 'og:site_name', content: 'Tic-tac-toe' },

        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
            { rel: 'manifest', href: '/manifest.json' },

            // Icons
            { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicons/ios-57.png' },
            { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicons/ios-60.png' },
            { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicons/ios-72.png' },
            { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicons/ios-76.png' },
            { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicons/ios-114.png' },
            { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicons/ios-120.png' },
            { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicons/ios-144.png' },
            { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicons/ios-152.png' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/ios-180.png' },
            { rel: 'icon', type: 'image/png', href: '/favicons/favicon.png' },
            { rel: 'mask-icon', href: '/favicons/favicon.svg', color: '#000' },
            { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
        ],
    },

    generate: {
        minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            minifyCSS: true,
            minifyJS: true,
            processConditionalComments: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeTagWhitespace: true,
            sortAttributes: true,
            sortClassName: true,
            trimCustomFragments: true,
            useShortDoctype: true,
        },
    },

    loading: { color: '#ffffff' },

    plugins: [
        '~plugins/global.js',
        '~plugins/vuetify.js',
        '~plugins/sw.js',
    ],

    build: {
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
};
