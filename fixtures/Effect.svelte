<script>
  let count = 0;

  $: console.log('hello');

  function increment() {
      count += 1;
  }
</script>

<button on:click={increment}>
	clicks: {count}
</button>
