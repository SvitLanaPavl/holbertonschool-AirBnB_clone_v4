#!/usr/bin/node
// This function listens to the amenities input boxes, and saves the id
// of each checked box

const amenityIdDict = {};
const baseUrl = 'http://' + window.location.hostname
$('document').ready(function () {
    $('li input[type="checkbox"]').on('change', function () {
        const amenityId = $(this).attr('data-id')
        const amenityName = $(this).attr('data-name')
        console.log("Amenit Name:" + amenityName)
        if (amenityIdDict.hasOwnProperty(amenityName)) { // If its already in list
            delete amenityIdDict[amenityName]
        } else {
         amenityIdDict[amenityName] = amenityId;
        }
        // console.log("amenity list:" + JSON.stringify(amenityIdDict)) // Check that list methods work
        updateAmenityList();
    });
    // Adds the current amenity's dict names to the h4 box of Amenties div
    function updateAmenityList() {
        let amenityKeys = Object.keys(amenityIdDict);
        fullHtml = amenityKeys.join(', ') + '&nbsp;';
        $('#amenityList').html(fullHtml);
    };

  // Task 3 - Checks the status of backend, gives red dot in top right corner if good.
  $.ajax({
    url: baseUrl + ':5001/api/v1/status/',
    type: 'GET',
    success: (data) => {
      if (data.status == 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  // Task 4 - Get places based on perameters
  $.ajax({
    url: baseUrl + ':5001/api/v1/places_search/',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
          <div class="title_box">
            <h2>${ place.name }</h2>
            <div class="price_by_night">\$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
      }))
  }})
});
