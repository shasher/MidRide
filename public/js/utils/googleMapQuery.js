define(
  ['Q'],
  function(Q) {
    var gBase = "http://maps.googleapis.com/maps/api/geocode/json?";

    var getByCityName = function (name) {
      var defer = Q.defer();
      var query = gBase + "address=" + encodeURIComponent(name);
      console.log("Looking for %s", query);
      $.ajax(query, {
        success: function (data, status){
          defer.resolve(data.results[0].geometry.location);
        }
      });
      return defer.promise;
    };

    return {
      getByCityName: getByCityName
    }
  }
);