<script>
	let { length, edo } = $props();
	import Vagon1 from './Vagon1.svelte';
	import Vagon2 from './Vagon2.svelte';
	let classLength = 'length1';

	$effect(() => {
		console.log(length);
		classLength = 'length' + length;
	});
</script>

<div class="inline-table tren">
	<div class="flex items-center justify-start flex-grow tren w-max">
		{#each Array(length) as vag, i}
			{#if i < length - 1}
				<Vagon1 />
			{:else}
				<Vagon2 />
			{/if}
		{/each}
	</div>
	<div class="w-full font-normal text-center label">{edo}</div>
	<!-- <div class="hidden length1 length2 length3"></div> -->
</div>

<style>
	.tren {
		height: 240px;
	}
	.label {
		font-size: 25px;
		color: #30726d;
	}
</style>
