//console portal

import { defineComponent } from 'vue'
import { program } from 'commander';


export default defineComponent({
  
  // type inference enabled
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // type: string | undefined
    this.msg // type: string
    this.count // type: number
  }
})

export program({
  
})