<template>
  <div class="space-y-8">
    <AdminDashboard />
  </div>
</template>

<script>
import AdminDashboard from '../components/admin/AdminDashboard.vue'

export default {
  name: 'AdminView',
  components: {
    AdminDashboard
  }
}
</script>