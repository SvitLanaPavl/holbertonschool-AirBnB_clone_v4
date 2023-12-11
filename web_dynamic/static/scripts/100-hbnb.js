#!/usr/bin/node
// This function listens to the amenities input boxes, and saves the id
// of each checked box

const baseUrl = 'http://' + window.location.hostname
const searchCriteria = {
  "amenities": [],
  "cities": [],
  "states": []
};
const amenityIdDict = {};
const stateIdDict = {};
const cityIdDict = {};
$('document').ready(function () {
  // Listens for box check from the amenities tab, add it to the corresponding dicts
  $('.amenityCheck').on('change', function () {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');
      // console.log("Amenity Name:" + amenityName);
      if (amenityIdDict.hasOwnProperty(amenityName)) { // If its already in list
          delete amenityIdDict[amenityName];
          let index = searchCriteria["amenities"].indexOf(amenityId);
          if (index !== -1) {
            searchCriteria["amenities"].splice(index, 1);
          }
      } else {
        amenityIdDict[amenityName] = amenityId;
        searchCriteria["amenities"].push(amenityId)
      }
      // console.log("amenity list:" + JSON.stringify(amenityIdDict)) // Check that list methods work
      console.log("searchCriteria:" + JSON.stringify(searchCriteria))
      updateAmenityList();
  });
  // Adds the current amenity's dict names to the h4 box of Amenties div
  function updateAmenityList() {
      let amenityKeys = Object.keys(amenityIdDict);
      fullHtml = amenityKeys.join(', ') + '&nbsp;';
      $('#amenityList').html(fullHtml);
  };

  // Listens for box check from the states tab, add it to the corresponding dicts
  $('.stateCheck').on('change', function () {
  const stateId = $(this).attr('data-id');
  const stateName = $(this).attr('data-name');
  console.log("State Name:" + stateName);
  if (stateIdDict.hasOwnProperty(stateName)) { // If its already in list
      delete stateIdDict[stateName];
      let index = searchCriteria["states"].indexOf(stateId);
      if (index !== -1) {
        searchCriteria["states"].splice(index, 1);
      }
  } else {
    stateIdDict[stateName] = stateId;
    searchCriteria["states"].push(stateId)
  }
  // console.log("state list:" + JSON.stringify(stateIdDict)) // Check that list methods work
  console.log("searchCriteria:" + JSON.stringify(searchCriteria))
  updateCityStateList();
});

// Listens for box check from the cities tab, add it to the corresponding dicts
$('.cityCheck').on('change', function () {
  const cityId = $(this).attr('data-id');
  const cityName = $(this).attr('data-name');
  // console.log("City Name:" + cityName);
  if (cityIdDict.hasOwnProperty(cityName)) { // If its already in list
      delete cityIdDict[cityName];
      let index = searchCriteria["cities"].indexOf(cityId);
      if (index !== -1) {
        searchCriteria["cities"].splice(index, 1);
      }
  } else {
    cityIdDict[cityName] = cityId;
    searchCriteria["cities"].push(cityId)
  }
  console.log("city list:" + JSON.stringify(cityIdDict)) // Check that list methods work
  console.log("searchCriteria:" + JSON.stringify(searchCriteria))
  updateCityStateList();
});


// Adds the current state or city's dict names to the h4 box of Amenties div
function updateCityStateList() {
    let stateKeys = Object.keys(stateIdDict);
    let cityKeys = Object.keys(cityIdDict);
    if (cityKeys.length > 0 && stateKeys.length > 0) {
      fullHtml = cityKeys.join(', ') + ', ' + stateKeys.join(', ') + '&nbsp;';
    } else {
      fullHtml = cityKeys.join(', ') + stateKeys.join(', ') + '&nbsp;';
    }
    $('#cityStateList').html(fullHtml);
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

  // Task 4 - Get places based on searchCriteria
  function updatePlaces () {
    $.ajax({
      url: baseUrl + ':5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(searchCriteria),
      success: function (data) {
        $('SECTION.places').empty();
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
    }});
  };
  updatePlaces ();

  // Task 5. Grabbing the button and displaying the places_search
  $('button').on('click', () => {
    updatePlaces();
  });
});
