<template lang='pug'>

  #header
    span HyperDViz - count is {{counter}}
    | interactive dataViz for hyper-dimensional data

</template>

<script>

export default {
  computed: {
    counter() {
      // return this.$store.state.myCounter
      return this.$store.getters.getCounter
    }
  }
}
</script>

<style lang='stylus' scoped>
  #header
    background #456
    padding .5em
    
  span 
    font-size 2.5em
    margin-right 2em
</style>
