<template lang="pug">

#links  
  button(id='welcome' @click='nextPage(0)')
    icon(name='home' scale=3)
    h1 HyperDViz

  button(id='dataSrc' @click='nextPage(1)')
    icon(name='file-excel-o' scale=2.5)
    h1 data source
  
  button(id='viz' @click='nextPage(3)')
    icon(name='area-chart' scale=3)
    h1 {{vizType}}

</template>


<script>

import {EventBus} from './../main'

export default {

data() {
  return {
    vizType: 'Choose VizType',
    currentPage: 0,
    pages: ['welcome', 'dataSrc', 'viz']
  }
},

created() {
  this.vizType = 'Choose VizType'
  
  EventBus.$on('changeTitle', newTitle => {
    this.vizType = newTitle
  })

  EventBus.$on('changePage', newPage => {
    this.currentPage = newPage
    console.log(newPage)

    // toggle them all?
    // set active to active, not the others?
    this.pages.forEach((page, p) => {
      let el = this.$(this.pages[p])
      if (p == this.currentPage) {
        el.classList.toggle('active')
        el.style.flexGrow = 1
      } else {
        el.style.flexGrow = 0
        el.classList.remove('active')
        
      }
      
    })

    // let el = this.$(this.pages[newPage])
    // el.classList.toggle('active')
    // el.style.flexGrow = 1
  })
},

mounted() {
  let el = this.$(this.pages[this.currentPage])
  el.style.flexGrow = 1
  el.classList.toggle('active')
},

methods: {
  $(ID) {
    return document.getElementById(ID)
  },

  nextPage(newPage) {
    EventBus.$emit('changePage', newPage)
  }
},

}
</script>


<style lang="stylus" scoped>

#links 
  width 50vw
  display flex
  margin 0 auto

#links > button
  display flex
  transition all 1s
  align-items baseline

button
  display flex
  color darkblue
  padding 0.5rem
  max-height 60px
  border-radius 0.5rem

h1 
  display none

.active
  color lime
  flex-grow 1
  background $g3
  // border-bottom 2px lime solid

.active h1  
  margin 0
  color lime
  padding-left 1rem
  display inline-block


</style>
