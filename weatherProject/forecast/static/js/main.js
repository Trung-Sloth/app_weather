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
    //     tileSize: 256,
    //     zoomOffset: 0,
    //     maxZoom: 22
    //   }).addTo(map);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', //Map ve tinh
    {
        maxZoom: 19
    }).addTo(map);
    
    // let currentMarker = null;
    let currentMarker1 = null;
    let currentMarker2 = null;
    let currentMarker3 = null;
    var n=0;
    var x1 = 0;
    var x2 = 0;
    var x3 = 0;
    var y1 = 0;
    var y2 = 0;
    var y3 = 0;
    
    // map.on('click', function(e) {
    //     const lat = e.latlng.lat.toFixed(6);
    //     const lng = e.latlng.lng.toFixed(6);
    
    //     db.ref("Toa-do").set({
    //     lat: parseFloat(lat),
    //     lng: parseFloat(lng),
    //     })
    //     .then(() => {
    //     document.getElementById('status').innerText = `Vi-do=${lat}, Kinh-do=${lng}`;
    //     })
    //     .catch((error) => {
    //     document.getElementById('status').innerText = `Error: ${error}`;
    //     });
    
    
    //     if (currentMarker) {
    //     map.removeLayer(currentMarker);
    //     }
    
    //     currentMarker = L.marker([lat, lng]).addTo(map);
    // });

    map.on('click', function(e) {
        n=n+1;
        if(n%3==1)
        {
          const lat1 = e.latlng.lat.toFixed(6);
          const lng1 = e.latlng.lng.toFixed(6);
          x1 = lat1;
          y1 = lng1;
          
          
          // db.ref("Toa-do-1").set({
          //   lat: parseFloat(lat1),
          //   lng: parseFloat(lng1),
          // })
      
          if ((n%3==1) && (n>3)) {
            map.removeLayer(currentMarker1);
          }
          currentMarker1 = L.marker([lat1, lng1]).addTo(map);
        }
        
        if(n%3==2)
          {
            const lat2 = e.latlng.lat.toFixed(6);
            const lng2 = e.latlng.lng.toFixed(6);
            x2 = lat2;
            y2 = lng2;
            
            // db.ref("Toa-do-2").set({
            //   lat: parseFloat(lat2),
            //   lng: parseFloat(lng2),
            // })
            
            if ((n%3==2) && (n>3)) {
              map.removeLayer(currentMarker2);
            }
            currentMarker2 = L.marker([lat2, lng2]).addTo(map);
          }
        
          if(n%3==0)
            {
              const lat3 = e.latlng.lat.toFixed(6);
              const lng3 = e.latlng.lng.toFixed(6);
              x3 = lat3;
              y3 = lng3;
              
              // db.ref("Toa-do-3").set({
              //   lat: parseFloat(lat3),
              //   lng: parseFloat(lng3),
              // })
      
              if ((n%3==0) && (n>3)) {
                map.removeLayer(currentMarker3);
              }
              currentMarker3 = L.marker([lat3, lng3]).addTo(map);
            }
      });
    
    const toggleBtn = document.getElementById('toggleBtn');
    const mapDiv = document.getElementById('map');
    const confirmBtn = document.getElementById('confirmBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    
    toggleBtn.addEventListener('click', () => {
      if(confirmBtn.style.display == 'none')
      {
        confirmBtn.style.display = 'block';
      }
      else  confirmBtn.style.display = 'none';

      if(deleteBtn.style.display == 'none')
      {
        deleteBtn.style.display = 'block';
      }
      else  deleteBtn.style.display = 'none';
      
        if (mapDiv.style.display === 'none') {
            mapDiv.style.display = 'block';
            toggleBtn.innerText = 'Hide map';
            map.invalidateSize();
        } 
        else {
            mapDiv.style.display = 'none';
            // document.getElementById('status').innerText = '';
            document.getElementById('status1').innerText = '';
            document.getElementById('status2').innerText = '';
            document.getElementById('status3').innerText = '';
            toggleBtn.innerText = 'Show map';
        }
    });

    confirmBtn.addEventListener('click', () => {
      if(n!=0)
      {
        document.getElementById('status1').innerText = `Vi-do1=${x1}, Kinh-do1=${y1}`;
        document.getElementById('status2').innerText = `Vi-do2=${x2}, Kinh-do2=${y2}`;
        document.getElementById('status3').innerText = `Vi-do3=${x3}, Kinh-do3=${y3}`;
      }
      else{
        document.getElementById('status1').innerText = '';
        document.getElementById('status2').innerText = '';
        document.getElementById('status3').innerText = '';
      }
        
        db.ref("Toa-do-1").set({
            lat: parseFloat(x1),
            lng: parseFloat(y1),
          })
        db.ref("Toa-do-2").set({
            lat: parseFloat(x2),
            lng: parseFloat(y2),
          })
        db.ref("Toa-do-3").set({
            lat: parseFloat(x3),
            lng: parseFloat(y3),
          })
    });
      
    deleteBtn.addEventListener('click', () => {
        map.removeLayer(currentMarker1);
        map.removeLayer(currentMarker2);
        map.removeLayer(currentMarker3);
        document.getElementById('status1').innerText = '';
        document.getElementById('status2').innerText = '';
        document.getElementById('status3').innerText = '';
        n=0;
    });

});
