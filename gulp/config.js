var dest = "./public/build";

module.exports = {
  js: {
    vendor: [
     "public/js/vendor/jquery.js",
     "public/js/vendor/underscore.js",
     "public/js/vendor/backbone.js",
     "public/js/vendor/owl.carousel.min.js",
     "public/js/vendor/slick.js",
    ],
    src: [
      "public/js/models/*.js",
      "public/js/collections/*.js",
      "public/js/views/*.js",
      "public/js/main.js",
      "public/js/routers/*.js",
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
    dest: dest,
    vendorfile: "vendor.css",
  },
  less: {
    src: [
      'public/less/*.less',
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