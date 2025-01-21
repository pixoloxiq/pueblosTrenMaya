<script lang="ts">
	import { onMount } from 'svelte';
	import pointE from '../assets/imgs/punto_E.svg';
	import { getTauriUrl } from '../utils/utils';
	let { src, label, tauri, selected, id, enabled, active, clickIcon } = $props();

	let newSrc = $state('');

	const getUrl = async (url: string) => {
		if (tauri) {
			let newUrl = await getTauriUrl('data/estaciones', url);
			console.log(newUrl);
			//return '/assets/imgs/estaciones/' + newUrl;
			return newUrl;
		} else {
			//const imgUrl = new URL('./assets/imgs/iconos/' + url, import.meta.url).href;
			return '/assets/estaciones/' + url;
		}
	};

	onMount(async () => {
		newSrc = await getUrl(src);
	});
	const clickId = (e: any) => {
		let nodeId = e.target.parentElement.id;
		console.log(nodeId);
		let id = nodeId.split('-')[1];
		console.log(id);
		clickIcon(id);
	};
</script>

<!-- src={newSrc} -->
<div id="item-{id}" class="iconoInt icono {enabled ? '' : 'estacionPunto'} {selected && enabled ? 'selected' : ''} {active ? 'active' : ''} relative w-max">
	{#if enabled}
		<img src={newSrc} alt="icono estación" class="iconEstacionBg estacion" onclick={clickId} ontouchend={clickId} />
	{:else}
		<img src={pointE} alt="punto estación" class="iconEstacionPunto estacion" />
	{/if}
	<div class="absolute font-normal labelIcon">
		{label}
	</div>
</div>

<style>
	.icono {
		transition: all 0.2s ease-in-out;
		scroll-snap-align: unset;

		width: 154px;
		height: 154px;
		.estacion {
			width: 100%;
			height: 100%;
			transition: all 0.2s ease-in-out;
		}
		&.estacionPunto {
			width: 100px;
			height: 100px;
		}
		&.active {
			scroll-snap-align: center;
		}
		.labelIcon {
			transition: all 0.2s ease-in-out;
			font-size: 26px;
			font-weight: 400;
			text-align: center;
			bottom: -70px;
			width: 800px;
			left: 50%;
			margin-left: -400px;
		}
	}
	.icono.selected.active {
		width: 240px;
		height: 240px;

		.labelIcon {
			font-size: 36px;
			font-weight: 600;
			bottom: -80px;
		}
	}
</style>
