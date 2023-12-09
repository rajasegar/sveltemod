<script>
	let count = 0;
  const foo = 'bar';

	function increment() {
		count += 1;
	}
</script>

<button on:click={increment}>
	clicks: {count}
</button>
