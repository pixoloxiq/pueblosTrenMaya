<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import iconEstacionBig from '../assets/imgs/icon_e_big.svg';
	import imgRutaLinea from '../assets/imgs/linea_ruta.svg';
	import imgRiel from '../assets/imgs/riel.svg';
	import FakeTren from './FakeTren.svelte';
	import IconoEstacion from './IconoEstacion.svelte';
	import IconoLinea from './IconoLinea.svelte';
	import Tren from './Tren.svelte';
	let icnEBig = iconEstacionBig;
	let containerParent: HTMLDivElement;
	let isDown: boolean = $state(false);
	let scrollLeft: number = $state(0);
	let startX: number = $state(0);
	const scale: { val: number } = getContext('scale');
	let isMoving = $state(false);

	let { onLanguageChange, lan, data, tauri, updateSlide, updateInfo, lugarIndex = $bindable() } = $props();

	//let lugarIndex = $state(1);
	let lugarId = $state('1');

	$effect(() => {
		console.log(data);
	});

	$effect(() => {
		console.log(`lugar Inex --> ${lugarIndex}`);
		lugarId = lugarIndex.toString();

		var myElement = document.getElementById('item-' + lugarId);
		console.log(myElement);
		/* waitAndRun(250, () => {
			myElement?.scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
		}); */
	});
	async function waitAndRun(n: number, callback: () => void) {
		await new Promise((resolve) => setTimeout(resolve, n));
		callback();
	}

	function mouseIsDown(e: { pageX: number }) {
		console.log('is down');
		isDown = true;
		containerParent.style.scrollSnapType = 'none';
		containerParent.style.scrollBehavior = 'auto';
		console.log(`e pageX ${e.pageX}`);
		startX = e.pageX - containerParent.offsetLeft;
		scrollLeft = containerParent.scrollLeft;
	}
	function touchIsDown(e: any) {
		console.log('is down');
		isDown = true;
		containerParent.style.scrollSnapType = 'none';
		containerParent.style.scrollBehavior = 'auto';
		const touch = e.touches[0];
		console.log(`touch.clientX ${touch.clientX}`);
		startX = touch.clientX - containerParent.offsetLeft;
		scrollLeft = containerParent.scrollLeft;
	}
	function mouseUp(e: any) {
		console.log('is up');

		isDown = false;
		console.log(lugarIndex);
		if (lugarIndex == 0) {
			updateSlide(0);
			updateInfo(0);
			return;
		}

		if (data.lugares[lugarIndex - 1].info) {
			let slideIndex = data.lugares[lugarIndex - 1]?.indexSlide;
			waitAndRun(150, () => {
				updateSlide(slideIndex);
				updateInfo(lugarIndex);
			});
			let myElement = document.getElementById('item-' + lugarIndex);
			myElement?.scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
		}
		/* waitAndRun(50, () => {
			containerParent.style.scrollSnapType = 'x proximity';
			containerParent.style.scrollBehavior = 'smooth';
		}); */
	}

	function mouseLeave(e: any) {
		console.log('is leave');
		isDown = false;
		/* let slideIndex = data.lugares[lugarIndex - 1]?.indexSlide;
		waitAndRun(150, () => {
			updateSlide(slideIndex);
		}); */

		/* 	waitAndRun(50, () => {
			containerParent.style.scrollSnapType = 'x proximity';
			containerParent.style.scrollBehavior = 'smooth';
		}); */
	}
	function mouseMove(e: MouseEvent) {
		if (isDown) {
			e.preventDefault();
			//Move vertcally
			const x = e.pageX - containerParent.offsetLeft;
			const walkX = ((x - startX) * 1) / scale.val;
			//console.log(walkX, scrollLeft);
			containerParent.scrollLeft = scrollLeft - walkX;
		}
	}
	function touchMove(e: TouchEvent) {
		if (isDown) {
			e.preventDefault();
			//Move vertcally
			const touch = e.touches[0];
			console.log(`touch.clientX ${touch.clientX}`);
			const x = touch.clientX - containerParent.offsetLeft;
			const walkX = ((x - startX) * 1) / scale.val;
			//console.log(walkX, scrollLeft);
			containerParent.scrollLeft = scrollLeft - walkX;
		}
	}

	const observeFunction = (entries: any) => {
		entries.forEach((entry: { target: any; isIntersecting: any }) => {
			let id = entry.target.id.split('-')[1];
			if (isMoving) return;
			if (entry.isIntersecting) {
				console.log(`${entry.target.id}  is visible`);
				lugarIndex = parseInt(id);

				//entry.target.updateSelected(true);
				entry.target.classList.add('selected');
			} else {
				console.log(`${entry.target.id}  is not visible`);
				//entry.target.updateSelected(false);
				entry.target.classList.remove('selected');
			}
		});
	};
	/* 	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log('Element is visible');
				} else {
					console.log('Element is not visible');
				}
			});
		},
		{ threshold: [0.5] }
	); */

	onMount(() => {
		const estacionElements = document.querySelectorAll('.iconoInt');

		//const parent = estacionElement?.parentElement;
		//const intersectElement = document.querySelector('.intersect');
		/* if (estacionElement) {
			//const observer = new IntersectionObserver(observeFunction, { threshold: [0.5], root: intersectElement, rootMargin: '-50% -50%' });
			
			observer.observe(estacionElement);
		} */
		const observer = new IntersectionObserver(observeFunction, { threshold: [0.5], root: containerParent, rootMargin: '0px -40% 0px -40%' });
		estacionElements.forEach((element) => {
			observer.observe(element);
		});
		var myElement = document.getElementById('item-' + lugarId);
		console.log(myElement);
		myElement?.scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
		/* waitAndRun(250, () => {
			myElement?.scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
		}); */
	});
	const getTrenLength = (index: number): number => {
		if (index < data.lugares.length - 1) {
			let nextLugar = data.lugares[index + 1];
			if (nextLugar.info) {
				return 2 + Math.round(Math.random() * 1);
			} else {
				return 1;
			}
		} else {
			return 5;
		}
	};

	const clickIcon = (id: number) => {
		return;
		var myElement = document.getElementById('item-' + id);
		console.log(myElement);
		updateInfo(id);
		myElement?.scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
		let slideIndex = data.lugares[id - 1]?.indexSlide;
		waitAndRun(150, () => {
			updateSlide(slideIndex);
		});

		//lugarIndex = id;
	};

	//$inspect(isDown);
	$inspect(lugarIndex);
	$inspect(`isMoving ${isMoving}`);

	export const moveToSlide = (slideIndex: number) => {
		let myElement = document.getElementById('item-' + slideIndex);
		lugarIndex = slideIndex;
		console.log(`moveToSlide ${slideIndex}`);
		console.log(myElement);
		isMoving = true;
		myElement?.classList.add('selected');

		myElement?.scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
		setTimeout(() => {
			isMoving = false;
		}, 1000);
	};
	export const updateLugarIndex = (val: number) => {
		lugarIndex = val;
	};
</script>

<!-- <div class="absolute top-0">
	{isDown}{scale.val}
</div> -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- <div class="relative top-0 w-[500px] h-full bg-lightGreen intersect left-1/2"></div> -->
<div
	bind:this={containerParent}
	onmousedown={mouseIsDown}
	ontouchstart={touchIsDown}
	onmouseup={mouseUp}
	ontouchend={mouseUp}
	onmousemove={mouseMove}
	ontouchmove={touchMove}
	onmouseleave={mouseLeave}
	class="z-10 w-full overflow-x-hidden scroll-smooth ruta-linea lineContainer"
>
	<img class="absolute ruta-linea-graph" src={imgRutaLinea} alt="Ruta" />
	<img class="absolute ruta-riel-graph" src={imgRiel} alt="Riel" />
	<div class="z-10 inline-flex lineaTren">
		<Tren edo="" length={5} />
		<FakeTren edo={data.lugares[0].edo} />
		<Tren edo="" length={2} />
		{#each data.lugares as lugar, i}
			{#if lugar.tipo === 'E'}
				<div class="flex items-center float-left iconContainer">
					<!-- <img
					src={getUrl('/Users/danielmujica/Desktop/data/imgs/iconos/icon_e_1.png')}
					alt="icono estación"
					class="iconEstacionBg estacion {lugarIndex === lugar.id ? 'selected' : ''}"
				/> -->
					<IconoEstacion
						{clickIcon}
						src={lugar.icono}
						id={lugar.index}
						{tauri}
						enabled={lugar.info}
						selected={lugarIndex === lugar.index}
						label={lugar.nombre[lan]}
						active={lugar.info}
					></IconoEstacion>
				</div>
				<Tren edo={lugar.edo} length={getTrenLength(i)} />
			{:else if lugar.info}
				<div class="flex items-center float-left iconContainer">
					<!-- <img
					src={iconSitioArqueologicoBig}
					alt="icono sitio arqueologico"
					class=" sa {lugarIndex === lugar.id ? 'selected' : ''}"
				/> -->
					<IconoLinea {clickIcon} tipo={lugar.tipo} selected={lugarIndex === lugar.index} id={lugar.index} label={lugar.nombre[lan]}></IconoLinea>
				</div>
				<Tren edo={lugar.edo} length={2 + Math.round(Math.random() * 1)} />
			{/if}

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
		height: 3840px;
		.ruta-linea-graph {
			top: 2115px;
		}
		.ruta-riel-graph {
			top: 2164px;
		}
	}
	.iconContainer {
		height: 240px;
	}
	.lineContainer {
		scroll-snap-type: x mandatory;
		.lineaTren {
			margin-top: 2010px;
		}

		/*scroll-snap-points-x: repeat(100%);*/
	}
	.lineContainer.down {
		scroll-snap-type: none;
	}
</style>
