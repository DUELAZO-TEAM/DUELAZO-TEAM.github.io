'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "070a92490a816268225718739eebeb0c",
"index.html": "7d30ffe6295dec3ff46bcd2038c11ca0",
"/": "7d30ffe6295dec3ff46bcd2038c11ca0",
"main.dart.js": "be04671e36132252ec87edff350ca85e",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "340efe3d5a8af4350218db179839a0a4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "143b56d037182456bff50eb5663edd77",
"assets/AssetManifest.json": "379b337685cfe7f9a1af403c527ce4c9",
"assets/NOTICES": "ffafac769f3de63f10c020871a189005",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "33d01f6463131a9d54a7539516bf0b9a",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/email.png": "3ff24375eae031a29f457a868cfe8613",
"assets/assets/images/logo_black.png": "cc30af83b9c163e1814cb79b510fc8c7",
"assets/assets/images/us.png": "ad8abb5003f8e2b46ec757c8cf22fb42",
"assets/assets/images/proyect.png": "517211eb590fb900a85f4dfdc3f24a57",
"assets/assets/images/map.png": "9bf2d00ad4cb981c62204854d23170b1",
"assets/assets/images/us_3.png": "74143a71e36015eab2158e0ae3d1f35f",
"assets/assets/images/logo_name.png": "d35c36dbc8ce841c1a902e4ebbb09019",
"assets/assets/images/us_2.png": "3e2bfeef43433afbf496c486e9b18959",
"assets/assets/images/background.png": "19a96ff14be0766fb36e1bacc341f6a1",
"assets/assets/images/us_1.png": "82562d350d35c15f96e22e2f19aff62b",
"assets/assets/images/proyect2.png": "54c1e2b5be620e3c3fc46bb25623730e",
"assets/assets/images/proyect3.png": "d4de4f857512f15a5c23d979e3e99bd7",
"assets/assets/images/logo_white.png": "bb7c7c98ef9499c226061db776d96c0b",
"assets/assets/images/proyect4.png": "10d2553801117c8bbc839e7f18926b7f",
"assets/assets/images/phone.png": "d70289b4495f3ab4646b06d5e0f8c862",
"assets/assets/images/us_background.png": "dcc036fdb3dd947b5f440d4f314f235e",
"assets/assets/images/service_1.png": "be8841bc492d8c0da6406bc8fd1d3aa4",
"assets/assets/images/service_3.png": "b1212697e110a55dbc8f4936394cb269",
"assets/assets/images/appbar_logo.png": "ecf199805dbb9a08000528bab5c97695",
"assets/assets/images/service_2.png": "b4de6a71b8d446827393d009417f2fa2",
"assets/assets/images/client1.png": "6a89e00c73f31537311724a84e1c2baf",
"assets/assets/images/services_1.png": "6fc7a0a96b850d302ff8b63ff970ef24",
"assets/assets/images/client2.png": "76829df890f1ab909487e0f1fe83d179",
"assets/assets/images/services_2.png": "2446547b4b3abb6b3d8cb96df55ffe1a",
"assets/assets/images/services_3.png": "55e139a86ae0142875489ad11d4a1e16",
"assets/assets/images/service_4.png": "c7c55b1e1c0246d60cf2720b68e89868",
"assets/assets/videos/dinno_movil.mp4": "5b9f789e1e5370b783fa842a352405f3",
"assets/assets/videos/dinno_desk.mp4": "1995e1e601b4e63943db0259ce911696",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
