<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Power Output</th>
        <th>Connector Type</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="station in stations" :key="station._id">
        <td>{{ station.name }}</td>
        <td>{{ station.status }}</td>
        <td>{{ station.powerOutput }}</td>
        <td>{{ station.connectorType }}</td>
        <td>{{ station.latitude }}</td>
        <td>{{ station.longitude }}</td>
        <td>
          <button @click="$emit('edit', station)">Edit</button>
          <button @click="$emit('delete', station._id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'StationList',
  props: ['stations'],
};
</script>

<style scoped>
table { width: 100%; border-collapse: collapse; margin-top: 1em; }
th, td { border: 1px solid #ccc; padding: 0.5em; text-align: left; }
button { margin-right: 0.5em; }
</style>
