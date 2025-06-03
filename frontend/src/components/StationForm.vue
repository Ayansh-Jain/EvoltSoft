<template>
  <div class="modal">
    <div class="modal-content">
      <h3>{{ station ? 'Edit' : 'Add' }} Station</h3>
      <form @submit.prevent="save">
        <input v-model="form.name" placeholder="Name" required />
        <input v-model.number="form.latitude" placeholder="Latitude" required type="number" step="any" />
        <input v-model.number="form.longitude" placeholder="Longitude" required type="number" step="any" />
        <input v-model="form.status" placeholder="Status" required />
        <input v-model.number="form.powerOutput" placeholder="Power Output" required type="number" />
        <input v-model="form.connectorType" placeholder="Connector Type" required />
        <button type="submit">Save</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'StationForm',
  props: ['station'],
  data() {
    return {
      form: {
        name: '', latitude: '', longitude: '', status: '', powerOutput: '', connectorType: ''
      },
    };
  },
  watch: {
    station: {
      immediate: true,
      handler(val) {
        if (val) this.form = { ...val };
        else this.form = { name: '', latitude: '', longitude: '', status: '', powerOutput: '', connectorType: '' };
      },
    },
  },
  methods: {
    async save() {
      if (this.station && this.station._id) {
        await axios.put(`/stations/${this.station._id}`, this.form);
      } else {
        await axios.post('/stations', this.form);
      }
      this.$emit('saved');
    },
  },
};
</script>

<style scoped>
.modal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; }
.modal-content { background: #fff; padding: 2em; border-radius: 8px; min-width: 300px; }
input { display: block; width: 100%; margin-bottom: 1em; padding: 0.5em; }
button { margin-right: 0.5em; }
</style>
