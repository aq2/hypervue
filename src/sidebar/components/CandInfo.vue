<template lang="pug">

#info
  .data
    | name
  .databar
    .bar(v-for='(crit, c) in crits')
      .top(:id="'top'+c") {{critInit(c)}}
      .bottom(:id="'bott'+c")

</template>


<script>

export default {

computed: {
  candiData() {
    return this.$store.getters.getCandiData
  },
  dimMeta() {
    return this.$store.getters.getDimMeta
  },
  crits() {
    return this.dimMeta.crits
  },
  
},
data() {
  return {
    critID: 34,
    critInit(c) {
      return this.dimMeta.dimNames[this.crits[c]][0]
    }  
  }
},

// listen to click on node event to change candKeyloop[]



}
</script>




<style lang="stylus" scoped>

#info
  background blue
  width 600px
  height 80px
  margin 0
  display flex

.databar  
  display flex
  height 60px
  // padding 0

.bar
  width 20px
  background red

.top
  background green
  height 20px
  text-align center

#top5
  height 50px

#top3
  height 40px
  


</style>
