
document.addEventListener('DOMContentLoaded',() => {

    const firebaseConfig = {
        apiKey: "AIzaSyAmd8V46CLS11cyu1UnjqBwtcBUXybnyNA",
        authDomain: "map-1-b0eae.firebaseapp.com",
        databaseURL: "https://map-1-b0eae-default-rtdb.asia-southeast1.firebasedatabase.app/",
        projectId: "map-1-b0eae",
        storageBucket: "map-1-b0eae.appspot.com",
    };
    
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    const map = L.map('map').setView([10.850324, 106.772186], 20);
    
    //   L.tileLayer('https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=WxV6QKoeVDywcxuiW3su', // Map bth
    //   { 
    //     attribution: 'OpenStreetMap contributors',
    //     tileSize: 256,
    //     zoomOffset: 0,
    //     maxZoom: 22
    //   }).addTo(map);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', //Map ve tinh
    {
        attribution: 'Tiles Esri',
        maxZoom: 19
    }).addTo(map);
    
    let currentMarker = null;
    
    map.on('click', function(e) {
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);
    
        db.ref("Toa-do").set({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        })
        .then(() => {
        document.getElementById('status').innerText = `Vi-do=${lat}, Kinh-do=${lng}`;
        })
        .catch((error) => {
        document.getElementById('status').innerText = `Error: ${error}`;
        });
    
    
        if (currentMarker) {
        map.removeLayer(currentMarker);
        }
    
        currentMarker = L.marker([lat, lng]).addTo(map);
    });
    
    const toggleBtn = document.getElementById('toggleBtn');
    const mapDiv = document.getElementById('map');
    toggleBtn.addEventListener('click', () => {
        if (mapDiv.style.display === 'none') {
        mapDiv.style.display = 'block';
        toggleBtn.innerText = 'Hide map';
        map.invalidateSize();
        } 
        else {
        mapDiv.style.display = 'none';
        document.getElementById('status').innerText = '';
        toggleBtn.innerText = 'Show map';
        }
    });

})