export const getMap = async () => {

  var map = L.map('map').setView([48.856614, 2.3522219], 13);
    marker = new L.marker([48.856614, 2.3522219])
    .bindPopup('hi guys')
    .addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}