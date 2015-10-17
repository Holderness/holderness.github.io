var dest = "./public/build";

module.exports = {
  js: {
    vendor: [
     "javascripts/vendor/jquery.js",
     "javascripts/vendor/underscore.js",
     "javascripts/vendor/backbone.js",
     "javascripts/vendor/owl.carousel.min.js",
     "javascripts/vendor/slick.js",
    ],
    src: [
      "javascripts/models/*.js",
      "javascripts/collections/*.js",
      "javascripts/views/*.js",
      "javascripts/main.js",
      "javascripts/routers/*.js",
    ],
    dest: dest,
    vendorfile: "vendor.js",
    filename: "main.js",
  },
  css: {
    vendor: [
      'public/css/vendor/owl.carousel.css',
      'public/css/vendor/slick.css',
      'public/css/vendor/normalize.css',
    ],
    src: [
      'css/style.css',
    ],
    dest: dest,
    filename: "main.css",
    vendorfile: "vendor.css",
  },
  less: {
    src: [
      'public/less/*.less',
      // 'public/less/media/*.less',
    ],
    dest: dest,
    filename: "style.css",
  },
  browserSync: {
    server: {
      baseDir: dest
    }
  }

};