<script>
  export let width;
  export let height;

  $: area = width * height;

  function increment() {
      count += 1;
  }
</script>

<button on:click={increment}>
	clicks: {count}
</button>
