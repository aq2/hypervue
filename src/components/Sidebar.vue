<template lang='pug'>
 
  #sidebar 
    #toggle(@click='toggleSidebarWidth'  class='tooltip') 
      span(class='tooltiptext') click to toggle sidebar
      <icon v-if='sidebarOpen' name='chevron-circle-right'>
      </icon>
      icon(v-else name='chevron-circle-left')
    //- get-file(v-show='page3' v-if='sidebarOpen')
    //- #cats cats
    //- #vizType vizType
    #dataBtn(v-if='page2')  insert link here



</template>


<script>

// register with event bus
import {bus} from '../main'
// import getfile from './GetFile.vue'

export default {
  components: {
    // 'get-file': getfile
  },
  data() {
    return {
      page2: false,
      sidebarOpen: false
    }
  },
  methods: {
    toggleSidebarWidth: function() {
      let sid = $('#sidebar')
      sid.style.width = sid.offsetWidth >= 30 ? '25px' : '150px'
      this.sidebarOpen = !this.sidebarOpen
    }
  },
  created() {
    bus.$on('pageEvt', (data) => {
      if (data == 2) {
        this.page2 = true
      }
    })
  }
}
</script>


<style lang='stylus' scoped>

#sidebar 
  background #345
  border 1px solid #345

#toggle
  color #ddd
  padding: 3px 

#toggle:hover
  cursor pointer

.tooltip {
  position: relative;
  display: inline-block;
  color white
}

.tooltiptext
  opacity 0.5

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  top -5px
  left 150%
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%; /* To the left of the tooltip */
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
}


span 
  color white

</style>
