<script lang="ts">
	let { tipo, label, selected, id } = $props();
	import { fade } from 'svelte/transition';

	import iconAG_sim from '../assets/imgs/icon_a.svg';
	import iconAG_big from '../assets/imgs/icon_ag_big.svg';
	import iconHG_sim from '../assets/imgs/icon_hg.svg';
	import iconHG_big from '../assets/imgs/icon_hg_big.svg';
	import iconM_sim from '../assets/imgs/icon_m.svg';
	import iconM_big from '../assets/imgs/icon_m_big.svg';
	import iconPM_sim from '../assets/imgs/icon_pm_58_1.svg';
	import iconPM_big from '../assets/imgs/icon_pm_big.svg';
	import iconSA_sim from '../assets/imgs/icon_sa_58_1.svg';
	import iconSA_big from '../assets/imgs/icon_sa_big.svg';
	import pointAG from '../assets/imgs/punto_AG.svg';
	import pointHG from '../assets/imgs/punto_HG.svg';
	import pointM from '../assets/imgs/punto_M.svg';
	import pointPM from '../assets/imgs/punto_PM.svg';
	import pointSA from '../assets/imgs/punto_SA.svg';

	const getIconSel = (tipo: string) => {
		switch (tipo) {
			case 'AG':
				return iconAG_big;
			case 'HG':
				return iconHG_big;
			case 'M':
				return iconM_big;
			case 'PM':
				return iconPM_big;
			case 'SA':
				return iconSA_big;
			default:
				return iconHG_big;
		}
	};
	const getIconNormal = (tipo: string) => {
		switch (tipo) {
			case 'AG':
				return pointAG;
			case 'HG':
				return pointHG;
			case 'M':
				return pointM;
			case 'PM':
				return pointPM;
			case 'SA':
				return pointSA;
			default:
				return pointHG;
		}
	};
	const getIconSim = (tipo: string) => {
		switch (tipo) {
			case 'AG':
				return iconAG_sim;
			case 'HG':
				return iconHG_sim;
			case 'M':
				return iconM_sim;
			case 'PM':
				return iconPM_sim;
			case 'SA':
				return iconSA_sim;
			default:
				return iconHG_sim;
		}
	};

	const getLabel = (tipo: string) => {
		switch (tipo) {
			case 'HG':
				return '';
			case 'PM':
				return 'PUEBLO MÁGICO';
			case 'SA':
				return label;
			default:
				return label;
		}
	};
</script>

<div id="item-{id}" class="icono {selected ? 'selected' : ''} relative iconContainer w-max">
	<div class="relative w-full h-full">
		{#if selected}
			<img
				transition:fade={{ duration: 250 }}
				src={getIconSel(tipo)}
				alt="icono estación"
				class="iconEstacionBg estacion"
			/>
		{:else}
			<img
				transition:fade={{ duration: 250 }}
				src={getIconNormal(tipo)}
				alt="icono estación"
				class="iconEstacionBg estacion"
			/>
			<img
				transition:fade={{ duration: 250 }}
				src={getIconSim(tipo)}
				alt="icono Simbologia"
				class="iconEstacionSimb estacion"
			/>
		{/if}

		<div class="absolute font-normal labelIcon">
			<div class="flex items-center justify-center">
				{getLabel(tipo)}
			</div>
		</div>
	</div>
</div>

<style>
	.icono {
		width: 100px;
		height: 100px;
		transition: all 0.2s ease-in-out;
		/* scroll-snap-align: center; */
		/* scroll-margin-left: 960px; */
		/* scroll-margin-right: 960px; */

		.estacion {
			position: absolute;
			top: 0px;
			width: 100%;
			height: 100%;
		}

		.labelIcon {
			transition: all 0.2s ease-in-out;
			font-size: 26px;
			font-weight: 400;
			width: 400px;
			height: 60px;
			left: -150px;
			text-align: center;
			bottom: -208px;
			white-space: pre-line;
			line-height: 1.1;
		}
		.iconEstacionSimb {
			top: 136px;
		}
	}
	.icono.selected {
		width: 240px;
		height: 240px;

		.labelIcon {
			font-size: 36px;
			font-weight: 600;
			bottom: -80px;
			left: -80px;
		}
	}
</style>
