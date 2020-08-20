const staticCacheName = "site-static";
const assets = [
	// "/",

	//PWA
	"/favicon/favicon-32x32.png",
	"/favicon/favicon-16x16.png",
	"/favicon/site.webmanifest",
	"/favicon/safari-pinned-tab.svg",
	"/favicon/apple-touch-icon.png",
	// "/favicon/android-chrome-192x192.png",
	// CSS
	"/css/userInterface/init.css",
	"/css/userInterface/nav.css",
	"/css/userInterface/home.css",
	"/css/userInterface/banner_modal.css",
	"/css/userInterface/homeProduct.css",
	"/css/user/shopping/elasticSearch.css",
	"/css/bootstrap.css",
	"/css/loadingScreen.css",
	// JS
	"/js/useInterface/nav.js",
	"/js/useInterface/loadingScreen.js",
	"/js/useInterface/home.js",
	"/js/user/elasticSearch.js",
	"/js/user/addToCart.js",
	"/js/user/wishlist.js",
	"/js/app.js",
	// Image & logo & font
	"/img/hacking2.jpg",
	"/img/logo.svg",
	"/img/shop/elasticSearch.svg",
	"/fonts/CooperHewitt-Light.otf",
	"/fonts/CRACKWALL-Regular.ttf",
	

	// CDN
	"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css",
	"https://code.jquery.com/jquery-3.3.1.min.js",
	"https://unpkg.com/gijgo@1.9.11/css/gijgo.min.css",
	"https://unpkg.com/gijgo@1.9.11/js/gijgo.min.js",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap",
	"https://code.jquery.com/jquery-3.3.1.js",
	"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
	"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
	"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js",
	"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
	"https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css",
	"https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js",
	// Rich text editor
	// "//cdn.quilljs.com/1.3.6/quill.js",
	// "//cdn.quilljs.com/1.3.6/quill.min.js",
	// "//cdn.quilljs.com/1.3.6/quill.snow.css",
	// "//cdn.quilljs.com/1.3.6/quill.bubble.css",
	"//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css",

	// Fallback page
	"/fallback/fallback.html",
	"/fallback/fallback.css",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js",
	"https://res.cloudinary.com/dchpyunul/image/upload/v1597602225/denoshop/demo-bg_jo432d.jpg",
];

// install event
self.addEventListener("install", (evt) => {
	evt.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			console.log("caching shell assets");
			cache.addAll(assets);
		})
	);
});

// activate event
self.addEventListener("activate", (evt) => {
	//console.log("service worker activated");
});

// fetch event
self.addEventListener("fetch", (evt) => {
	// console.log("fetch event", evt);
	evt.respondWith(
		caches.match(evt.request).then((cacheRes) => {
			return cacheRes || fetch(evt.request);
		}).catch(() => caches.match("/fallback/fallback.html"))
	);

});
