<script>
	let { edo } = $props();
	import Vagon1 from './Vagon1.svelte';
	let classLength = 'length1';

	$effect(() => {
		console.log(length);
		classLength = 'length' + length;
	});
</script>

<div id="item-0" class="z-10 inline-table tren iconoInt">
	<div class="flex items-center justify-start flex-grow tren w-max">
		<Vagon1 />
	</div>
	<!-- <div class="w-full font-normal text-center label">{edo}</div> -->
	<!-- <div class="hidden length1 length2 length3"></div> -->
</div>

<style>
	.tren {
		scroll-snap-align: center;
		height: 240px;
	}
	.label {
		font-size: 25px;
		color: #30726d;
	}
</style>
