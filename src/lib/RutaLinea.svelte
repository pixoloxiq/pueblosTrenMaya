<script lang="ts">
	import iconEstacionBig from '../assets/imgs/icon_e_big.svg';
	import IconoEstacion from './IconoEstacion.svelte';
	import IconoLinea from './IconoLinea.svelte';
	import Tren from './Tren.svelte';
	let icnEBig = iconEstacionBig;

	let { onLanguageChange, lan, data, lugarIndex, tauri } = $props();

	let lugarId = $state('1');

	$effect(() => {
		console.log(data);
	});

	$effect(() => {
		console.log(lugarIndex);
		lugarId = lugarIndex.toString();

		var myElement = document.getElementById('item-' + lugarId);
		console.log(myElement);
		waitAndRun(250, () => {
			myElement?.scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
		});
	});
	async function waitAndRun(n: number, callback: () => void) {
		await new Promise((resolve) => setTimeout(resolve, n));
		callback();
	}
</script>

<div class="z-10 w-full overflow-x-hidden scroll-smooth ruta-linea">
	<div class="inline-flex">
		<Tren edo={data.lugares[0].edo} length={5} />
		{#each data.lugares as lugar, i}
			{#if lugar.tipo === 'E'}
				<div class="flex items-center float-left iconContainer">
					<!-- <img
					src={getUrl('/Users/danielmujica/Desktop/data/imgs/iconos/icon_e_1.png')}
					alt="icono estación"
					class="iconEstacionBg estacion {lugarIndex === lugar.id ? 'selected' : ''}"
				/> -->
					<IconoEstacion
						src={lugar.icono}
						id={lugar.index}
						{tauri}
						selected={lugarIndex === lugar.index}
						label={lugar.nombre[lan]}
					></IconoEstacion>
				</div>
			{:else}
				<div class="flex items-center float-left iconContainer">
					<!-- <img
					src={iconSitioArqueologicoBig}
					alt="icono sitio arqueologico"
					class=" sa {lugarIndex === lugar.id ? 'selected' : ''}"
				/> -->
					<IconoLinea
						tipo={lugar.tipo}
						selected={lugarIndex === lugar.index}
						id={lugar.index}
						label={lugar.nombre[lan]}
					></IconoLinea>
				</div>
			{/if}
			<Tren edo={lugar.edo} length={2 + Math.round(Math.random() * 1)} />

			<!-- <div class="absolute">
				<h2>{lugar.nombre.es}</h2>
			</div> -->
		{/each}
		<!-- {/if} -->
		<Tren edo={data.lugares[data.lugares.length - 1].edo} length={5} />
		<!--  -->
	</div>
</div>

<style>
	.ruta-linea {
		overflow: hidden;
		white-space: nowrap;
		height: 400px;
	}
	.iconContainer {
		height: 240px;
	}
</style>
