<!-- MyComponent.vue -->
<template>
  <div class="my-component">
    <h1>{{ title }}</h1>
    <button @click="incrementCount">Click me</button>
    <p>Count: {{ count }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data() {
    return {
      title: 'Page portugais',
      count: 0
    }
  },
  methods: {
    incrementCount() {
      this.count++;
    }
  }
}
</script>

<style scoped>
.my-component {
  text-align: center;
  margin-top: 20px;
}
</style>
