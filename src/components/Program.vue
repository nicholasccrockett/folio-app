<script lang="ts">

export default {
    onMounted() {
        console.log('mounted')
        let container = document.getElementById('terminal-container')!
        term.open(container)
        
        term.write(' Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ' )
    }
}

</script>


<template>
    <head>
    <link rel="stylesheet" href="node_modules/xterm/css/xterm.css" />
  </head>
    <body id="body">
      <div id="terminal-container"></div>
    </body>
</template>

<style src="../../node_modules/xterm/css/xterm.css"></style>