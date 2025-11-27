<template>
  <ErrorBoundary>
    <ProductList />
  </ErrorBoundary>
</template>

<script>
import ProductList from '../components/user/ProductList.vue'
import ErrorBoundary from '../components/common/ErrorBoundary.vue'

export default {
  name: 'UserView',
  components: {
    ProductList,
    ErrorBoundary
  }
}
</script>