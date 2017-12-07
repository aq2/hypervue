<template lang='pug'>
  //- <div>
  //-   <span>HyperViz</span> interactive dataViz for hyper-dimensional data
  //- </div>
  #header
    span HyperDViz - count is 
    | interactive dataViz for hyper-dimensional data
</template>

<script>

export default {
  computed: {
    // foo() {
    //   return this.$store.state.foo
    // }
    // counter() {
    //   // return this.$store.state.myCounter
    // }
  }
}
</script>

<style lang='stylus' scoped>
  #header
    background #456
    padding .5em
    
  span 
    font-size 2.5em
    margin-right 5em
</style>
