var bower = '../components';
require.config({
  paths: {
      async: bower + '/requirejs-plugins/src/async',
      'backbone': bower + '/backbone/backbone',
      'backbone.marionette': bower + '/backbone.marionette/lib/backbone.marionette',
      jquery: bower + '/jquery/dist/jquery',
      underscore: bower + '/underscore/underscore',
      hbs: bower + '/require-handlebars-plugin/hbs',
      tmpl: '../templates',
      Q: bower + '/q-bower/q'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require(
  [
    'backbone.marionette',
    'hbs!tmpl/riderLayout',
    'hbs!tmpl/driverLayout',
    'models/point',
    'utils/googleMapQuery',
    'Q',
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBXB4tMi8IMPZumZA4AOYtIarUfB7qqArg'
  ],
  function (Marionette, riderTemplate, driverLayout, pointModel, mapQuery, Q) {
    var RiderLayout = Marionette.LayoutView.extend({
      template: riderTemplate,
      ui: {
        cityName: '#cityName',
        submitButton: '#setLocation'
      },
      addLocation: function () {
        var that = this;
        var cityName = this.ui.cityName.val();
        mapQuery.getByCityName(cityName)
        .then(this.setMarker.bind(this))
        .then(this.saveLocation)
        .done();
      },
      saveLocation: function (location) {
        pointModel.addPoint(location);
        Q(location)
      },
      setMarker: function (location) {
        this.marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: 'cityName'
        });
        this.map.setCenter(location);
        Q(location);
      },
      events: {
        'click @ui.submitButton' : 'addLocation'
      },
      onShow: function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 32.04 , lng: 34.80}, // Tel Aviv
          zoom: 10
        });
      }
    });

    var DriverLayout = Marionette.LayoutView.extend({
      template: driverLayout,
      ui: {
        cityName: '#cityName',
        submitButton: '#setLocation'
      },
      // showRiders: function() {
      //   // var ridersLocations = pointModel.getPoints();
      //   // var that = this;
      //   // ridersLocations.forEach(function(item) {
      //   //   that.showSingleRider(item);
      //   // });
      // },
      // showSingleRider: function(location) {
      //   this.marker = new google.maps.Marker({
      //     position: location,
      //     map: this.map,
      //     title: 'rider'
      //   });
      // },
      onShow: function () {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 32.04 , lng: 34.80}, // Tel Aviv
          zoom: 10
        });
        // this.showRiders();
      }
    })

    var AppLayout = Marionette.LayoutView.extend({
      template: false,
      el: 'body',
      regions: {
        header: '#header',
        content: '#content'
      },
      ui: {
        'driver': '#header a[data-target=driver]',
        'rider': '#header a[data-target=rider]'
      },
      events: {
        'click @ui.driver' : 'showDriver',
        'click @ui.rider' : 'showRider'
      },
      showDriver: function () {
        this.content.show(new DriverLayout());
      },
      showRider: function () {
        this.content.show(new RiderLayout());
      }
    });

    new AppLayout().render();

  }
);

