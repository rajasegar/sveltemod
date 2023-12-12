<script>
  export let width;
  export let height;

  function increment() {
      count += 1;
  }
</script>

<button on:click={increment}>
	clicks: {count}
</button>
