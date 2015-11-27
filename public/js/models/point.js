define(['backbone'], function (Backbone) {
  var initialPoints = [
    {lat:31.975, lng: 34.74}, // Rishon
    {lat:31.261, lng: 34.72}, // Beer Sheva
    {lat:31.893, lng: 34.771} // Rehovot
  ]
  return {
    addPoint: function (point) {
      initialPoints.push(point);
    },
    getPoints: function () {
      return initialPoints;
    }

  }

})