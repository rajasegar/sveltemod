<script>
  let {
    width: width,
    height: height
  } = $props();

  let count = $state(0);
  let name = $state('John');
  let flag = $state(true);
  const foo = 'bar';

  function increment() {
      count += 1;
  }
</script>

<button on:click={increment}>
	clicks: {count}
</button>
