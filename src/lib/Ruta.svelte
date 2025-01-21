<script lang="ts">
	let { onLanguageChange, lan, data, tauri, doStandBy } = $props();
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { register } from 'swiper/element/bundle';
	import fondo from '../assets/imgs/fondo_sitios_0.jpg';
	import icon360 from '../assets/imgs/icn_360.svg';
	import iconAG_sim from '../assets/imgs/icon_a.svg';
	import iconE_sim from '../assets/imgs/icon_e.svg';
	import iconHG_sim from '../assets/imgs/icon_hg.svg';
	import iconLan from '../assets/imgs/icon_lan.svg';
	import iconM_sim from '../assets/imgs/icon_m.svg';
	import iconPM_sim from '../assets/imgs/icon_pm.svg';
	import iconSA_sim from '../assets/imgs/icon_sa.svg';

	import iconM_AG from '../assets/imgs/icn_m_ag.svg';
	import iconM_E from '../assets/imgs/icn_m_e.svg';
	import iconM_HG from '../assets/imgs/icn_m_hg.svg';
	import iconM_M from '../assets/imgs/icn_m_m.svg';
	import iconM_PM from '../assets/imgs/icn_m_pm.svg';
	import iconM_SA from '../assets/imgs/icn_m_sa.svg';

	import logoHotelesG from '../assets/imgs/logo_hg.png';
	import logoMexicana from '../assets/imgs/logo_m.svg';
	import logoTrenMayaSm from '../assets/imgs/logo_tm.svg';
	import mapa from '../assets/imgs/mapa_peninsula.svg';
	import imgRuta from '../assets/imgs/ruta_portada.svg';
	import BackSlide from './BackSlide.svelte';
	import Instrucciones from './Instrucciones.svelte';
	import MapaPosition from './MapaPosition.svelte';
	import Panorama from './Panorama.svelte';
	import RutaLinea from './RutaLinea.svelte';

	let progresSwipe = $state(0);
	let sizeClass = $state('');
	let simbologia: HTMLElement;
	let slideIndex = $state(0);
	let classInstrucciones = $state('');
	let swiperEl: any;
	let currentPlace: Place = $state({
		tipo: '',
		nombre: {},
		descripcion: {},
		px: 0,
		py: 0,
		img360: '',
		pitch: 0,
		yaw: 0,
		mapa: '',
	});
	let name = $derived(currentPlace?.nombre[lan]);

	let standbyTime = data.standbyTime * 1000;
	let timer: number | undefined;

	$inspect(name);

	$effect(() => {
		if (name) {
			let longestWord = name;
			//let longestWord = getLongestString(name.split(' '));

			//sizeClass = ':' + longestWord + ' ' + longestWord.length;
			//return;
			if (longestWord.length > 12) {
				sizeClass = 'fontSmall2';
			} else if (longestWord.length > 8) {
				sizeClass = 'fontSmall1';
			} else {
				sizeClass = '';
			}
		} else {
			sizeClass = 'xx';
		}
	});

	interface Place {
		tipo: string;
		nombre: { [key: string]: string };
		descripcion: { [key: string]: string };
		px: number;
		py: number;
		img360: string;
		pitch: number;
		yaw: number;
		mapa: string;
	}

	register();
	const spaceBetween = 0;
	const onProgress = (e: { detail: [any, any] }) => {
		const [swiper, progress] = e.detail;
		//console.log(swiper.slides.length);
		progresSwipe = progress * swiper.slides.length;

		//console.log(progresSwipe);
	};
	const onSlideChange = (e: { detail: [any, any] }) => {
		console.log('slide changed', e.detail[0].activeIndex);
		classInstrucciones = e.detail[0].activeIndex == 0 ? 'instrucciones' : '';

		//lugarIndex = Math.max(1, e.detail[0].activeIndex);
		//slideIndex = e.detail[0].activeIndex;

		//currentPlace = data.lugares.find((lugar: any) => lugar.indexSlide == slideIndex);
		resetTimer();

		//if (currentPlace) console.log(currentPlace);
		//goto('/#item-' + lugarIndex);
	};

	const onNextInst = () => {
		updateSlide(1);
		slideIndex = 1;
		currentPlace = data.lugares.find((lugar: any) => lugar.indexSlide == slideIndex);
	};

	/* 	$effect(() => {
		//console.log('currentPlace', currentPlace);
		console.log('cambio');
		$inspect(currentPlace.nombre);

		let wordsArray = currentPlace.nombre[lan].split(' ');
		let biggestWord = getLongestString(wordsArray);
		console.log(biggestWord);
		if (biggestWord.length > 8) {
			sizeClass = 'fontSmall1';
		} else if (biggestWord.length > 15) {
			sizeClass = 'fontSmall2';
		} else {
			sizeClass = '';
		}
	});*/
	$inspect(currentPlace);

	const getCurrentTipoClass = () => {
		if (!currentPlace || currentPlace.tipo === '') return '';

		if (currentPlace.tipo === 'AG') return 'tipo_ag'; //aeropuerto gafsacomm
		if (currentPlace.tipo === 'E') return 'tipo_e'; //estacion
		if (currentPlace.tipo === 'HG') return 'tipo_hg'; //hotel gafsacomm
		if (currentPlace.tipo === 'M') return 'tipo_m'; //mexicana
		if (currentPlace.tipo === 'PM') return 'tipo_pm'; //pueblo magico
		if (currentPlace.tipo === 'SA') return 'tipo_sa'; //sitio arqueologico
	};

	const getCurrentTipoLabel = () => {
		if (!currentPlace || currentPlace.tipo === '') return '';
		/* if (currentPlace.tipo === 'E') return 'ESTACIÓN';
		if (currentPlace.tipo === 'HG') return 'HOTEL GAFSACOMM';
		if (currentPlace.tipo === 'SA') return 'SITIO ARQUEOLÓGICO';
		if (currentPlace.tipo === 'PM') return 'PUEBLO MÁGICO'; */

		if (currentPlace.tipo === 'AG') return data.textos.ag[lan].toUpperCase(); //aeropuerto gafsacomm
		if (currentPlace.tipo === 'E') return data.textos.e[lan].toUpperCase(); //estacion
		if (currentPlace.tipo === 'HG') return data.textos.hg[lan].toUpperCase(); //hotel gafsacomm
		if (currentPlace.tipo === 'M') return data.textos.m[lan].toUpperCase(); //mexicana
		if (currentPlace.tipo === 'PM') return data.textos.pm[lan].toUpperCase(); //pueblo magico
		if (currentPlace.tipo === 'SA') return data.textos.sa[lan].toUpperCase(); //sitio arqueologico
	};
	const getCurrentTipoSrc = () => {
		if (!currentPlace || currentPlace.tipo === '') return '';
		/* if (currentPlace.tipo === 'E') return iconM_E;
		if (currentPlace.tipo === 'HG') return iconM_HG;
		if (currentPlace.tipo === 'SA') return iconM_SA;
		if (currentPlace.tipo === 'PM') return iconM_PM; */

		if (currentPlace.tipo === 'AG') return iconM_AG; //aeropuerto gafsacomm
		if (currentPlace.tipo === 'E') return iconM_E; //estacion
		if (currentPlace.tipo === 'HG') return iconM_HG; //hotel gafsacomm
		if (currentPlace.tipo === 'M') return iconM_M; //mexicana
		if (currentPlace.tipo === 'PM') return iconM_PM; //pueblo magico
		if (currentPlace.tipo === 'SA') return iconM_SA; //sitio arqueologico
	};
	const getSizeClass = () => {
		$inspect(currentPlace);
		if (!currentPlace) return 'o';
		if (!currentPlace.nombre[lan]) return 'o';
		let wordsArray = currentPlace.nombre[lan].split(' ');
		getLongestString(wordsArray);
		if (wordsArray.length > 8) return 'fontSmall1';
		if (wordsArray.length > 12) return 'fontSmall2';
		return 'o';
	};
	const getLongestString = (arr: string[]) => {
		return arr.reduce((longest, current) => {
			return current.length > longest.length ? current : longest;
		}, '');
	};

	const switchLanguageEs = () => {
		//lan = 'es';
		onLanguageChange('es');
	};
	const switchLanguageEn = () => {
		//lan = 'en';
		onLanguageChange('en');
	};
	$effect(() => {
		let opacity = 1 - progresSwipe * 2;
		//rutaInstruccion.style.opacity = `${opacity}`;
		//logosInstrucciones.style.opacity = `${opacity}`;
		//rutaLinea.style.opacity = `${1 - opacity}`;
		console.log(progresSwipe, 1 - opacity);
		//simbologia.style.opacity = `${1 - opacity}`;
		//infoVentana.style.opacity = `${1 - opacity}`;
	});
	/* $effect(() => {
		if (currentPlace?.px) {
			puntoMapa.style.left = `${currentPlace.px}px`;
			puntoMapa.style.top = `${currentPlace.py}px`;
		}
	}); */
	const updateSlide = (newValue: number) => {
		swiperEl.swiper.slideTo(newValue);
		resetTimer();
	};
	const updateInfo = (val: number) => {
		let _currentPlace = data.lugares.find((lugar: any) => lugar.index == val);
		if (_currentPlace.info) currentPlace = _currentPlace;
		console.log(_currentPlace.nombre.es);
	};

	onMount(() => {
		swiperEl = document.querySelector('swiper-container');
		resetTimer();
	});

	const resetTimer = () => {
		//console.log(e.detail[0].progress);
		/* const [swiper, progress] = e.detail;
	

		slideProgress.set(progress); */
		clearTimeout(timer);
		//	timer?.clearTimeout();
		timer = setTimeout(() => {
			if (swiperEl) {
				doStandBy();
				swiperEl.swiper.slideTo(0, 500);
				console.log('resetTimer');
			}
		}, standbyTime);
	};
	const reset = () => {
		console.log('reset');
		doStandBy();
		swiperEl.swiper.slideTo(0, 500);
	};
</script>

<div class="flex justify-center w-full ruta-main">
	<swiper-container
		slides-per-view={1}
		space-between={spaceBetween}
		centered-slides={true}
		onswiperprogress={onProgress}
		onswiperslidechange={onSlideChange}
		threshold="2"
		enabled={true}
		class="swiperContainer"
		longSwipesRatio={0.01}
	>
		<swiper-slide class="slide"><Instrucciones {onLanguageChange} {lan} {data}></Instrucciones></swiper-slide>
		{#each data.lugares.filter((item: { info: boolean }) => item.info === true) as lugar, index}
			<swiper-slide class="slide"
				><BackSlide src={lugar.imagen} {tauri} actual={index == slideIndex} is360={lugar.img360 != ''} marginTop={lugar.py}></BackSlide></swiper-slide
			>
		{/each}
		<!-- <swiper-slide class="slide"
			><img class="portada-back w-[2160px] h-[3840px]" src={imgGUIA2} alt="Guia" /></swiper-slide
		>
		<swiper-slide class="slide"
			><img class="portada-back w-[2160px] h-[3840px]" src={imgGUIA2} alt="Guia" /></swiper-slide
		>
		<swiper-slide class="slide">Slide 3</swiper-slide> -->
	</swiper-container>
</div>

<!-- <div class="flex justify-center w-full logo-trenMaya pointer-events-none {classInstrucciones}">
	<img class="logoTrenMaya" src={imgTrenMaya} alt="Logo Trem Maya" />
</div> -->

{#if false}
	<div class="flex justify-center w-full pointer-events-none logos-inst">
		<img class="logoMexicana" src={logoMexicana} alt="Logo Mexicana" />
		<img class="logoTrenMayaSm" src={logoTrenMayaSm} alt="Logo Tren Maya" />
		<img class="logoHotelesG" src={logoHotelesG} alt="Logo Hoteles Gafsacomm" />
	</div>
{/if}

{#if slideIndex == 0}
	<div in:fade={{ duration: 250 }} out:fade={{ duration: 250 }} class="flex justify-center w-full pointer-events-none ruta-inst">
		<img class="ruta" src={imgRuta} alt="Ruta" />
	</div>
	<button aria-label="siguiente" onclick={onNextInst} class="btn-inst-sig"></button>
{/if}
{#if slideIndex > 0}
	<div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 50 }} class="absolute z-10 w-full pointer-events-none simbologia">
		<div class="relative simb">
			<div class="relative flex items-center font-semibold align-middle simIcon">
				<img src={iconPM_sim} alt="Logo Pueblo Magico" />{data.textos.pm[lan]}
			</div>
			<div class="relative flex items-center font-semibold align-middle simIcon">
				<img src={iconE_sim} alt="Logo Estacion" />{data.textos.e[lan]}
			</div>
			<div class="relative flex items-center font-semibold align-middle simIcon">
				<img src={iconAG_sim} alt="Logo Aeropuerto Gafsacomm" />{data.textos.ag[lan]}
			</div>
			<div class="relative flex items-center font-semibold align-middle simIcon">
				<img src={iconSA_sim} alt="Logo Sitio arqueologico" />{data.textos.sa[lan]}
			</div>
			<div class="relative flex items-center font-semibold align-middle simIcon">
				<img src={iconHG_sim} alt="Logo Hoteles Gafsacomm" />{data.textos.hg[lan]}
			</div>
			<div class="relative flex items-center font-semibold align-middle simIcon">
				<img src={iconM_sim} alt="Logo Hoteles Gafsacomm" />{data.textos.m[lan]}
			</div>
		</div>
		<div class="absolute flex justify-center logos">
			<img class="simlogoTrenMayaSm" src={logoTrenMayaSm} alt="Logo Tren Maya" />
			<img class="simlogoHotelesG" src={logoHotelesG} alt="Logo Hoteles Gafsacomm" />
			<img class="simlogoMexicana" src={logoMexicana} alt="Logo Mexicana" />
		</div>
	</div>
	<img in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 150 }} class="absolute h-fit fondo" src={fondo} alt="fondo" />
	<div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 150 }} class="top-0 flex justify-center w-full ruta-simb">
		<!-- <div class="relative top-0 w-[500px] h-full bg-lightGreen intersect left-1/2"></div> -->
		<RutaLinea {onLanguageChange} {lan} {data} {tauri} {updateSlide} {updateInfo}></RutaLinea>
	</div>

	<div class="absolute z-20 flex justify-between w-full pointer-events-none lan-btn">
		<div class="pointer-events-auto language-btn glow">
			<div class="flex h-full">
				<img src={iconLan} alt="Language Icon" />
			</div>

			<div class="italic language-btn-text">
				{#if lan === 'es'}
					<span class="boldSelected">ES&nbsp;&nbsp;/</span>&nbsp;&nbsp;EN
				{:else}
					ES&nbsp;&nbsp;<span class="boldSelected">/&nbsp;&nbsp;EN</span>
				{/if}
			</div>
			<button aria-label="Cambiar a español" type="button" class="language-btn-es" onclick={switchLanguageEs}></button>
			<button aria-label="Switch to english" type="button" class="language-btn-en" onclick={switchLanguageEn}></button>
		</div>
		{#if currentPlace.img360}
			<div class="pano-indicator">
				<div class="flex items-center justify-center h-full align-middle pano-btn-img">
					<img src={icon360} alt="pano Icon" />
				</div>
				<div class="pano-btn-text">{@html data.textos.panorama[lan]}</div>
			</div>
		{/if}
		<button aria-label="Regresar" onclick={reset} class="flex content-center justify-end pointer-events-auto reset-btn">
			<span class="boldSelected">{data.textos.reiniciar[lan]}</span>
		</button>
	</div>
	<div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 100 }} class="absolute flex justify-center w-full pointer-events-none info">
		<div class="ventanaInfo">
			<img class="mapa" src={mapa} alt="Mapa" />
			<!-- <img class="mapa" src={currentPlace.mapa} alt="MapaPosition" /> -->
			<MapaPosition src={currentPlace.mapa} {tauri} />
			<!-- <div bind:this={puntoMapa} class="punto-mapa {getCurrentTipoClass()}">
				{#if currentPlace.tipo === 'AG'}
					<img class="punto" src={imgPuntoAG} alt="Punto" />
				{:else if currentPlace.tipo === 'E'}
					<img class="punto" src={imgPuntoE} alt="Punto" />
				{:else if currentPlace.tipo === 'HG'}
					<img class="punto" src={imgPuntoHG} alt="Punto" />
				{:else if currentPlace.tipo === 'M'}
					<img class="punto" src={imgPuntoM} alt="Punto" />
				{:else if currentPlace.tipo === 'PM'}
					<img class="punto" src={imgPuntoPM} alt="Punto" />
				{:else if currentPlace.tipo === 'SA'}
					<img class="punto" src={imgPuntoSA} alt="Punto" />
				{/if}
			</div> -->
			<div class="placeInfo">
				<h2 class="font-normal {getCurrentTipoClass()}">
					<img class="iconTipo" src={getCurrentTipoSrc()} alt="Tipo de lugar" />
					{getCurrentTipoLabel()}
				</h2>
				<h1 class="font-semibold {sizeClass}">{currentPlace.nombre[lan]}</h1>
				<div class="font-normal content">{@html currentPlace?.descripcion[lan]}</div>
			</div>
		</div>
	</div>
	{#if currentPlace.img360}
		{#key currentPlace}
			<Panorama {resetTimer} src={currentPlace?.img360} {tauri} pitch={currentPlace?.pitch} yaw={currentPlace?.yaw}></Panorama>
		{/key}
	{/if}
{/if}

<!-- <img class="pleca" src={imgPleca} alt="Pleca" /> -->

<style>
	.logo-trenMaya {
		position: absolute;
		top: 90px;
		transition: all 0.2s ease-in-out;
	}
	.logo-trenMaya.instrucciones {
		top: 246px;
	}
	.simbologia {
		top: 3546px;
		.simb {
			padding-left: 110px;
			width: 1150px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			letter-spacing: 2.5px;

			.simIcon {
				width: 330px;
				font-size: 24px;
				margin-bottom: 30px;
				padding-right: 20px;
				img {
					width: 58px;
					height: 58px;
					margin-right: 30px;
				}
			}
		}
		.logos {
			right: 0px;
			width: 950px;
			top: 40px;
			/* align-content: center; */
			flex-wrap: wrap;
			/* justify-content: flex-start; */
			gap: 104px;
			padding-inline: 50px;
			align-items: center;

			.simlogoMexicana {
				height: 45px;
			}
			.simlogoTrenMayaSm {
				height: 66px;
			}
			.simlogoHotelesG {
				height: 40px;
			}
		}
	}
	.boldSelected {
		font-weight: 800;
		font-style: italic;
		color: #62cdb4;
	}
	.swiperContainer {
		width: 2160px;
		height: 3840px;
		z-index: 0;
	}
	.btn-inst-sig {
		position: absolute;
		top: 0px;
		height: 3840px;
		width: 2160px;
		z-index: 40;
		opacity: 0;
		background-color: rebeccapurple;
	}
	.lan-btn {
		display: flex;
		top: 1742px;
		.language-btn {
			width: 450px;
			height: 100px;
			display: flex;
			background-color: #00524c;
			/* opacity: 0.4; */
			color: white;
			font-size: 50px;
			align-content: center;
			justify-content: start;
			flex-wrap: wrap;
			position: relative;
			text-shadow: 0 0 20px #62cdb4;

			img {
				width: 58px;
				margin-inline-start: 58px;
				margin-inline-end: 75px;
			}

			.language-btn-text {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			button {
				height: 100%;
				width: 100px;
				position: absolute;
				&.language-btn-es {
					/* background-color: red; */
					width: 290px;
				}
				&.language-btn-en {
					/* background-color: blue; */
					left: 290px;
					width: 160px;
				}
			}

			&:hover {
				box-shadow: 0 0 25px #00524c;
			}
		}
		.pano-indicator {
			position: absolute;
			top: 0;
			left: 450px;
			width: 650px;
			height: 100px;
			background-color: #9547f4;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 21px;
			color: white;
			border-radius: 0 100px 100px 0;
			.pano-btn-img {
				width: 220px;
			}
			img {
				height: 64px;
			}
		}
	}

	.reset-btn {
		width: 350px;
		height: 100px;
		display: flex;
		background-color: #00524c;
		/* opacity: 0.4; */
		color: white;
		font-size: 50px;
		align-content: center;
		justify-content: start;
		flex-wrap: wrap;
		position: relative;
		text-shadow: 0 0 20px #62cdb4;
		padding-left: 40px;
	}

	.logos-inst {
		position: absolute;
		bottom: 246px;
		align-items: center;
		gap: 90px;
	}
	.logoMexicana {
		height: 64px;
	}
	.logoTrenMayaSm {
		height: 84px;
	}
	.logoHotelesG {
		height: 46px;
	}
	.ruta-linea {
		top: 108px;
	}
	.ruta-riel {
		top: 152px;
	}
	.ruta-inst {
		position: absolute;
		bottom: 645px;
	}
	.ruta-simb {
		position: absolute;
		bottom: 588px;
		height: 240px;
	}
	.punto-mapa {
		width: 54px;
		height: 54px;
		position: absolute;
	}
	.fondo {
		top: 1842px;
	}
	.info {
		top: 2510px;
		.ventanaInfo {
			width: 2016px;
			height: 894px;
			background: rgba(0, 0, 0, 0.6);
			-webkit-backdrop-filter: blur(14px);
			backdrop-filter: blur(14px);
			border: 1px solid rgb(255 255 255);
			border-radius: 45px;
			overflow: hidden;

			.mapa {
				width: 1229px;
				/* height: 873px; */
				bottom: -4px;
				left: -186px;
				position: absolute;
				/* opacity: .2; */
			}
			.placeInfo {
				width: 1120px;
				margin-left: 890px;
				padding-inline: 87px;
				.iconTipo {
					height: 55px;
					margin-left: 10px;
					float: left;
					margin-right: 44px;
				}
				h2 {
					margin-top: 77px;
					font-size: 33px;
					display: flex;
					align-items: center;
					&.tipo_ag {
						color: #eb5a30;
					}
					&.tipo_e {
						color: #02998e;
					}
					&.tipo_hg {
						color: #3fa9f5;
					}
					&.tipo_m {
						color: #2670a8;
					}
					&.tipo_pm {
						color: #ff507a;
					}
					&.tipo_sa {
						color: #9547f4;
					}
				}
				h1 {
					margin-top: 18px;
					font-size: 162px;
					line-height: 0.9;
					&.fontSmall1 {
						font-size: 119px;
					}
					&.fontSmall2 {
						font-size: 100px;
					}
				}
				.content {
					font-size: 28px;
					margin-top: 80px;
					line-height: 1.25;
				}
			}
		}
	}
	:global(p) {
		margin-bottom: 30px;
	}

	.pleca {
		bottom: 0px;
		position: absolute;
	}
</style>
