<template>
  <div class="filters">
    <select v-model="localFilters.status" @change="emitFilters">
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
    <input v-model="localFilters.powerOutput" @input="emitFilters" placeholder="Power Output" type="number" />
    <select v-model="localFilters.connectorType" @change="emitFilters">
      <option value="">All Connectors</option>
      <option value="Type1">Type1</option>
      <option value="Type2">Type2</option>
      <option value="CCS">CCS</option>
      <option value="CHAdeMO">CHAdeMO</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'StationFilters',
  props: ['filters'],
  data() {
    return {
      localFilters: { ...this.filters },
    };
  },
  methods: {
    emitFilters() {
      this.$emit('updateFilters', { ...this.localFilters });
    },
  },
  watch: {
    filters: {
      handler(val) { this.localFilters = { ...val }; },
      deep: true,
    },
  },
};
</script>

<style scoped>
.filters { margin: 1em 0; display: flex; gap: 1em; }
select, input { padding: 0.5em; }
</style>
