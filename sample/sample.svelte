<script>
  let {
    width: width,
    height: height
  } = $props();


  $: area = width * height;

  $effect(() => {
    console.log('hello');
  });


  function increment() {
      count += 1;
  }
</script>

<button on:click={increment}>
	clicks: {count}
</button>
