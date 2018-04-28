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

            // Поисковики
            { name: 'yandex-verification', content: '7a2343cc4687239f' },
            { name: 'google-site-verification', content: 'j_6szK19CBprPSt4b5qxaLIvx7IitJWx6tyzkWgxFno' },
            { name: 'wmail-verification', content: '29d08e18ececcecaa8e5162b082fcb11' },
            { name: 'msvalidate.01', content: '7E04FF9455E17D24E4D53F0C881E418C' },
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
            collapseBooleanAttributes: false,
            collapseWhitespace: false,
            decodeEntities: false,
            minifyCSS: false,
            minifyJS: false,
            processConditionalComments: false,
            removeAttributeQuotes: false,
            removeComments: false,
            removeEmptyAttributes: false,
            removeOptionalTags: false,
            removeRedundantAttributes: false,
            removeScriptTypeAttributes: false,
            removeStyleLinkTypeAttributes: false,
            removeTagWhitespace: false,
            sortAttributes: false,
            sortClassName: false,
            trimCustomFragments: false,
            useShortDoctype: false,
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
