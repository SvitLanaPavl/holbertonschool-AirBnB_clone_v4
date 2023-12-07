#!/usr/bin/node
// This function listens to the amenities input boxes, and saves the id
// of each checked box

const amenityIdDict = {};
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

    function updateAmenityList() {
        let amenityKeys = Object.keys(amenityIdDict);
        fullHtml = amenityKeys.join(', ') + '&nbsp;';
        $('#amenityList').html(fullHtml);
    }
});
