<template>
  <div class="stations-container">
    <div class="header-section">
      <h2>⚡ Charging Stations</h2>
      <button class="add-btn" @click="showAdd = true">
        <span class="btn-icon">+</span>
        Add Station
      </button>
    </div>
    
    <StationFilters :filters="filters" @updateFilters="updateFilters" />
    <StationList :stations="filteredStations" @edit="editStation" @delete="deleteStation" />
    <MapView :stations="filteredStations" />
    
    <transition name="modal" appear>
      <StationForm 
        v-if="showAdd || editData" 
        :station="editData" 
        @close="closeForm" 
        @saved="handleSaved" 
      />
    </transition>
  </div>
</template>

<script>
import StationList from '../components/StationList.vue';
import StationForm from '../components/StationForm.vue';
import StationFilters from '../components/StationFilters.vue';
import MapView from '../components/MapView.vue';
import axios from 'axios';

export default {
  name: 'Stations',
  components: { StationList, StationForm, StationFilters, MapView },
  data() {
    return {
      stations: [],
      showAdd: false,
      editData: null,
      filters: { status: '', powerOutput: '', connectorType: '' },
    };
  },
  computed: {
    filteredStations() {
      return this.stations.filter(s => {
        return (!this.filters.status || s.status === this.filters.status)
          && (!this.filters.powerOutput || s.powerOutput == this.filters.powerOutput)
          && (!this.filters.connectorType || s.connectorType === this.filters.connectorType);
      });
    },
  },
  methods: {
    async fetchStations() {
      const res = await axios.get('/stations');
      this.stations = res.data;
      this.showAdd = false;
      this.editData = null;
    },
    editStation(station) {
      this.editData = station;
    },
    deleteStation(id) {
      if (confirm('Delete this station?')) {
        axios.delete(`/stations/${id}`).then(this.fetchStations);
      }
    },
    closeForm() {
      this.showAdd = false;
      this.editData = null;
    },
    updateFilters(f) {
      this.filters = f;
    },
    async handleSaved() {
      await this.fetchStations();
    },
  },
  mounted() {
    this.fetchStations();
  },
};
</script>

<style scoped>
/* CSS Variables */
:root {
  --primary-bg: #0a0e17;
  --secondary-bg: #1a1f2e;
  --tertiary-bg: #252b3d;
  --primary-text: #e8eaed;
  --secondary-text: #9aa0ac;
  --accent: #4285f4;
  --accent-hover: #3367d6;
  --accent-light: rgba(66, 133, 244, 0.1);
  --success: #34a853;
  --warning: #fbbc04;
  --danger: #ea4335;
  --danger-hover: #d93025;
  --border: #303746;
  --shadow: rgba(0, 0, 0, 0.3);
  --shadow-light: rgba(0, 0, 0, 0.15);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Main Container */
.stations-container {
  max-width: 1200px;
  margin: 2rem auto;
  background: linear-gradient(135deg, var(--secondary-bg) 0%, var(--tertiary-bg) 100%);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px var(--shadow),
    0 0 0 1px var(--border);
  padding: 2.5rem;
  color:black;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.stations-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), var(--success), var(--warning));
  opacity: 0.8;
}

/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

h2 {
  font-size: 2rem;
  color:black;
  font-weight: 700;
 
  
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Buttons */
.add-btn {
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  box-shadow: 
    0 4px 16px rgba(66, 133, 244, 0.3),
    0 0 0 1px rgba(66, 133, 244, 0.2);
  position: relative;
  overflow: hidden;
}

.add-btn::before {
  
  position: absolute;
  color:black;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: var(--transition);
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 24px rgba(66, 133, 244, 0.4),
    0 0 0 1px rgba(66, 133, 244, 0.3);
}

.add-btn:hover::before {
  left: 100%;
}

.add-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 1.2rem;
  font-weight: bold;
  transition: var(--transition-fast);
}

.add-btn:hover .btn-icon {
  transform: rotate(90deg);
}

/* Form Controls */
select, input {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid var(--border);
  background: var(--tertiary-bg);
  color: var(--primary-text);
  font-size: 0.95rem;
  transition: var(--transition);
  outline: none;
}

select:focus, input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-light);
  transform: translateY(-1px);
}

select:hover, input:hover {
  border-color: var(--accent);
}

/* Table Styles */
.stations-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1.5rem;
  background: var(--secondary-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px var(--shadow-light);
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

th, td {
  padding: 1rem;
  text-align: left;
  color: var(--primary-text);
  border-bottom: 1px solid var(--border);
  transition: var(--transition-fast);
}

th {
  background: var(--tertiary-bg);
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

tbody tr {
  transition: var(--transition-fast);
}

tbody tr:hover {
  background: var(--tertiary-bg);
  transform: scale(1.01);
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Action Buttons */
.edit-btn, .delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: var(--transition);
  margin-right: 0.5rem;
  position: relative;
  overflow: hidden;
}

.edit-btn {
  background: linear-gradient(135deg, var(--warning), #ff9800);
  color: white;
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(251, 188, 4, 0.4);
}

.delete-btn {
  background: linear-gradient(135deg, var(--danger), var(--danger-hover));
  color: white;
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(234, 67, 53, 0.4);
}

/* Map View */
.map-view {
  height: 400px;
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px var(--shadow);
  border: 1px solid var(--border);
  transition: var(--transition);
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
}

.map-view:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--shadow);
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 14, 23, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--secondary-bg);
  color: var(--primary-text);
  padding: 2.5rem;
  border-radius: 16px;
  min-width: 400px;
  box-shadow: 
    0 16px 48px var(--shadow),
    0 0 0 1px var(--border);
  position: relative;
  overflow: hidden;
}

.modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--success));
}

/* Form Buttons */
.save-btn {
  background: linear-gradient(135deg, var(--success), #2e7d32);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: var(--transition);
  box-shadow: 0 4px 12px rgba(52, 168, 83, 0.3);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(52, 168, 83, 0.4);
}

.cancel-btn {
  background: var(--tertiary-bg);
  color: var(--secondary-text);
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: var(--transition);
}

.cancel-btn:hover {
  background: var(--border);
  color: var(--primary-text);
  transform: translateY(-1px);
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Modal Transitions */
.modal-enter-active, .modal-leave-active {
  transition: var(--transition);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: var(--transition);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stations-container {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .header-section {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  h2 {
    font-size: 1.5rem;
    text-align: center;
  }
  
  .modal-content {
    min-width: auto;
    margin: 1rem;
    width: calc(100vw - 2rem);
  }
  
  th, td {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
}

/* Loading States */
.loading {
  opacity: 0.6;
  pointer-events: none;
  transition: var(--transition);
}

/* Hover Effects for Interactive Elements */
*[role="button"], button, .clickable {
  cursor: pointer;
  transition: var(--transition);
}

/* Focus States for Accessibility */
button:focus-visible,
select:focus-visible,
input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--secondary-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}
</style>