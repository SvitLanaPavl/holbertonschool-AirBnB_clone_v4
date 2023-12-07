#!/usr/bin/node
// This function listens to the amenities input boxes, and saves the id
// of each checked box

const amenityIdList = [];
$('document').ready(function () {
    $("#checkBoxes").on('change', function () {
        const amenityId = $(this).data('id')
        console.log(amenityId)
    });
});
