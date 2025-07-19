document.addEventListener('DOMContentLoaded', function () {
    
    // Safety check: Ensure the 'listing' object and its geometry exist before running map code
    if (typeof listing === 'undefined' || !listing.geometry || !listing.geometry.coordinates) {
        console.error("Listing data or geometry is missing. Map cannot be initialized.");
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.parentElement.innerHTML = "<p>Map location could not be loaded.</p>";
        }
        return; // Stop the script if data is not present
    }

    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // The ID of the map container div
        style: 'mapbox://styles/mapbox/streets-v12', // Standard Mapbox style
        center: listing.geometry.coordinates, // ✅ CORRECT: Get coordinates from the 'listing' object
        zoom: 10 // A good default zoom level
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    // Add a marker to the map
    new mapboxgl.Marker({ color: "#fe424d" }) // Using your brand color
        .setLngLat(listing.geometry.coordinates) // ✅ CORRECT: Get coordinates from the 'listing' object
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h6>${listing.title}</h6><p>${listing.location}</p>`) // ✅ CORRECT: Get info from the 'listing' object
        )
        .addTo(map);
});