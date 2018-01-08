<template lang='pug'>
 
#sidebar
  #dims
    h3 dimensions
    .dim(v-for='(dim,d) in dimNames' :ID="'dim'+d" v-if='dimCrit(d)'
      @click='showDim(d)') {{dim}}
      
      .stats(:ID="'span'+d")
        p range: {{stats(d).min}} - {{stats(d).max}}
        p mean:{{(stats(d).mean)}} sd:{{stats(d).stdDev}}
    hr
  #order
    h3 order by
    hr
  #colour
    h3 colour by
    hr 
  #search
    h3 search
    | insert search here

</template>


<script>

import {EventBus} from '../../../main'

export default {
  computed: {
    candiData() {
      return this.$store.getters.getCandiData
    },
    dimMeta() {
      return this.$store.getters.getDimMeta
    },
    dimData() {
      return this.$store.getters.getDimData
    },
    dimNames() {
      return this.dimMeta.dimNames
    },
    crits() {
      return this.dimMeta.crits
    },
    ranger(d) {
      return this.range(d)
    }
  },  
  
  data() {
    return {
      open: true,
    }
  },
  
  methods: {
    // critDims() {
    //   let critDims = []
    //   this.dimNames.forEach((name, n) => {
    //     if (this.crits.includes(n)) {
    //       critDims.push(name)
    //     }
    //   })
    //   return critDims
    // },
    showDim(d) {
      console.log(d)
      // reset color for t'others
      const allDims = [...document.getElementsByClassName('dim')]
      allDims.forEach((d) => {
        d.style.color = '#111'
      })
      const dim = document.getElementById('dim' + d)
      dim.style.color = '#89a'

      // show dim stats for each node
      const candiData = this.candiData
      Object.entries(candiData).forEach(([c, cand]) => {
        // console.log(cand)
        const norm = cand.norm
        const myNorm = cand.norm[d]
        console.log(myNorm)
      })

    },

    dimCrit(d) {
      // const dimNames = this.dimNames
      const crits = this.crits
      if (crits.includes(d)) {
        return true
      }
      return false
    },

    stats(d) {
      console.log(d)
      const dimData = this.dimData
      const myDim = dimData[d]
      const stats = myDim.stats
      console.log(stats)
      // // const stat = stats[d]
      const {min, max, mean, sd} = stats
      let roundStats = {}
      Object.entries(stats).forEach(([k,v]) => {
        roundStats[k] = Math.round(v)
      })
      console.log('rS', roundStats)
      return roundStats
      // const range = min + ' - ' + max
      // return range
      // return d
    },


    toggle: function() {
      this.open = !this.open
      let sid = document.getElementById('sidebar')
      sid.style.width = sid.offsetWidth >= 50 ? '0px' : '150px'
    },
    
    setHeight() {
      const headerH = 60
      const windowH = window.innerHeight
      const sidebarH = windowH - headerH
      let sid = document.getElementById('sidebar')
      sid.style.height = sidebarH + 'px'
    }
  },
  
  created() {
    EventBus.$on('sidebarToggled', () => {
      this.toggle()
    })

    EventBus.$on('sidebarHeight', () => {
      // alert('foo')
      this.setHeight()
    })
    
    EventBus.$on('sidebarOpen', () => {
      this.openUp()
    })
  },

  mounted() {
    this.setHeight()
  }
}

</script>


<style lang='stylus'>

#sidebar
  background $g3
  transition .1s all ease-out
  margin 0
  // margin-top 0.5rem
  width 150px
  border-right 2px solid $g2
  position relative
  top -40px
  height 99.8vh
  > div
    padding-left 0.15rem

#dims 
  // margin-top 0.51rem

.dim
  margin-bottom 0.5rem
  color $g9

.stats p
  color $g7

p 
  padding 0
  margin 0

h3  
  padding-top 0.25rem
  margin-bottom 0.25rem
  // margin 0

hr 
  border 0
  border-top 2px dotted $g5
  width 100px
  margin 10px auto

</style>
