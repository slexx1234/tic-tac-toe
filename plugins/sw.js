if (process.browser && process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('/sw.js')
            .then(function(reg) {
                reg.update();
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

