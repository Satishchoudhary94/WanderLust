 document.addEventListener('DOMContentLoaded', function () {
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates, // coordinates from the listing
      zoom: 9 // starting zoom
    });

    // Add Marker and Popup
  new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>${listingLocation}</h6><p>Exact location provided after booking</p>`)
  )
  .addTo(map);
  });