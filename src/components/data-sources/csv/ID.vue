<template lang='pug'>
  
  #ID

</template>



<script>
export default {
  methods: {
    makeCandidatesMap: function() {
      // 2 - qq okay, what about fancy candidates?
      // don't do this until we know ID!
      let candsMap = new Map()

      // find first alpha dim => temp key until confirmed later
      let dimsRA = [...dimensionsMap]
        
      let foundIndex = dimsRA.findIndex((dim) => {
        return dim[1].get('alpha')
      })
      // console.log('foundI', foundIndex)

      candidates.forEach(cand => {
        let candMap = new Map()
        candMap.set('notYetID', cand[foundIndex].trim())
        
        cand.forEach((dim, j) => {
          candMap.set(dimensions[j], cand[j])
        })

        // this is where the 'key' is assigned...
        // this may change later if id changes!
        candsMap.set(cand[foundIndex].trim(), candMap)
      })
      console.log(...candsMap)
    }
  }
}
</script>


<style lang="stylus" scoped>

</style>
