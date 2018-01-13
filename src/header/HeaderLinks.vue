<template lang="pug">

#links  
  button(id='b0' @click='nextPage(0)')
    icon(name='home' scale=3)
    h1 HyperDViz

  button(id='b1' @click='nextPage(1)')
    icon(name='file-excel-o' scale=2.5)
    h1 {{dataTitle}}
  
  button(id='b4' @click='nextPage(4)')
    icon(name='area-chart' scale=3)
    h1 {{vizType}}

</template>


<script>

import {EventBus} from './../main'

export default {

data() {
  return {
    dataTitle: 'data source',
    vizType: 'Choose VizType',
    currentPage: 0,
    pages: ['welcome', 'dataSrc', 'dataSrc', 'dataSrc', 'chooseViz', 'viz'],
    pgs: [0,1,2,2,4]
  }
},

created() {
  // this.vizType = 'Choose VizType'
  
  EventBus.$on('changeDataTitle', newDataTitle => {
    this.dataTitle = newDataTitle
  })

  EventBus.$on('changeVizTitle', newVizTitle => {
    this.vizType = newVizTitle
  })

  EventBus.$on('changePage', newPage => {
    this.currentPage = newPage
    console.warn('-----np', newPage)
    
    // let i = 'b' + this.pgs[newPage]
    // console.log('i', i)
    // let el = this.$(i)
    // el.classList.add('active')

    let lnx = this.$('links')
    let kids = [...lnx.childNodes]
    console.log('kids', kids)

    const pgs = this.pgs  

    kids.forEach(kid => {
      let bId = kid.id
      console.log('bI', bId)
      
      let el = this.$(bId)
      console.log('el', el)
      
      // now change bx into x
      let b = Number(bId[1])  // ie 2nd character of string
      console.log('b', b)
      if (b == pgs[this.currentPage]) {
        console.log('activating', b)
        el.classList.add('active')
      } else {
        console.log('remving', b)    
        el.classList.remove('active')
      }
    })
  })
},

mounted() {
  let el = this.$('b' + this.currentPage)
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
