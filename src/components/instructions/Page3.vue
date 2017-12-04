<template lang="pug">
  div
    h1 Choose a data-file from your computer
    p press the button i the sidebar to seelct a data file
    p it must be in CSV format
    p with criteria headers as first row, eg:
    <pre>        
    |    city,state,population,land area
    |    seattle,WA,652405,83.9
    |     new york,NY,8405837,302.6
    |     boston,MA,645966,48.3
    |     kansas city,MO,467007,315.0
    </pre>
</template>


<script>

export default {
  created() {
    // sidebar needs to be wide
    let sid = $('#sidebar')
    sid.style.width = '150px'
  }

}
</script>


