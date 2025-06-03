<template>
  <div id="map" style="height: 400px; margin-top: 2em;"></div>
</template>

<script>
import L from 'leaflet';
export default {
  name: 'MapView',
  props: ['stations'],
  mounted() {
    this.map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.updateMarkers();
  },
  watch: {
    stations: {
      handler() { this.updateMarkers(); },
      deep: true,
    },
  },
  methods: {
    updateMarkers() {
      if (this.markers) {
        this.markers.forEach(m => this.map.removeLayer(m));
      }
      this.markers = (this.stations || []).map(station => {
        const marker = L.marker([station.latitude, station.longitude]).addTo(this.map);
        marker.bindPopup(`<b>${station.name}</b><br>Status: ${station.status}<br>Power: ${station.powerOutput}<br>Connector: ${station.connectorType}`);
        return marker;
      });
    },
  },
  beforeUnmount() {
    this.map.remove();
  },
};
</script>

<style>
@import 'https://unpkg.com/leaflet/dist/leaflet.css';
</style>
