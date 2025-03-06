<script lang="ts">
	let { onLanguageChange, lan, data } = $props();
	import { fade } from 'svelte/transition';
	import imgInst from '../assets/imgs/2.png';
	import imgInstBack from '../assets/imgs/foto-opacidad.jpg';
	import iconHand from '../assets/imgs/icon_handSwipe.svg';
	// import function to register Swiper custom elements
	import { register } from 'swiper/element/bundle';

	register();
	const spaceBetween = 10;
	const onProgress = (e: { detail: [any, any] }) => {
		const [swiper, progress] = e.detail;
		console.log(progress);
	};
	const onSlideChange = (e: { detail: [any, any] }) => {
		console.log('slide changed');
	};

	const switchLanguageEs = () => {
		//lan = 'es';
		onLanguageChange('es');
	};
	const switchLanguageEn = () => {
		//lan = 'en';
		onLanguageChange('en');
	};
</script>

<div class=" inst w-[2160px] h-[3840px]">
	<img class="hidden portada-back w-[2160px] h-[3840px]" src={imgInst} alt="Guia" />
	<img class=" portada-back" src={imgInstBack} alt="Portada" />

	<!-- <div class="flex justify-center w-full logo-inst">
		<img class="logoTrenMaya" src={imgTrenMaya} alt="Logo Trem Maya" />
	</div> -->
	<!-- <div class="absolute flex justify-start w-full inst-lan-btn">
		<div class="language-btn glow">
			<div class="flex h-full">
				<img src={iconLan} alt="Language Icon" />
			</div>

			<div class="language-btn-text">
				ES&nbsp;&nbsp;<span class="boldSelected glow">/&nbsp;&nbsp;EN</span>
			</div>
			<button
				aria-label="Cambiar a español"
				type="button"
				class="language-btn-es"
				onclick={switchLanguageEs}
			></button>
			<button
				aria-label="Switch to english"
				type="button"
				class="language-btn-en"
				onclick={switchLanguageEn}
			></button>
		</div>

	</div> -->
	<div class="flex justify-center w-full contenido-inst">
		<h2 class="font-bold bienvenido">
			SITIOS ARQUEOLÓGICOS<br />
			Y PUEBLOS MÁGICOS
		</h2>
		<h3 class="italic text-center">EL TREN MAYA NOS UNE</h3>

		{#if lan === 'es'}
			<div class="bienvenido">
				<h1 transition:fade={{ duration: 250 }} class="absolute">
					{@html data.textos.bienvenido.es}
				</h1>
			</div>
		{:else}
			<div class="bienvenido">
				<h1 transition:fade={{ duration: 250 }} class="absolute">
					{@html data.textos.bienvenido.en}
				</h1>
			</div>
		{/if}

		<div class="flex justify-center w-full portada-instrucciones mt-[338px]">
			<img class="icon-hand wobble-hor-bottom" src={iconHand} alt="Hand Icon" />
		</div>
		<div class="cont-center flex flex-col items-center justify-center inst-instrucciones text-lightGreen text-center mt-[88px]">
			{#if lan === 'es'}
				<p transition:fade={{ duration: 250 }} class="absolute font-semibold mt-[110px]">
					{@html data.textos.instrucciones2.es}
				</p>
			{:else}
				<p transition:fade={{ duration: 250 }} class="absolute font-semibold mt-[110px]">
					{@html data.textos.instrucciones2.en}
				</p>
			{/if}
		</div>
	</div>
	<!-- <div class="flex justify-center w-full logos-inst">
		<img class="logoMexicana" src={logoMexicana} alt="Logo Mexicana" />
		<img class="logoTrenMayaSm" src={logoTrenMayaSm} alt="Logo Tren Maya" />
		<img class="logoHotelesG" src={logoHotelesG} alt="Logo Hoteles Gafsacomm" />
	</div> -->
	<!-- <div class="flex justify-center w-full ruta-inst">
		<img class="ruta" src={imgRuta} alt="Ruta" />
	</div> -->
	<!-- <img class="pleca" src={imgPleca} alt="Pleca" /> -->
</div>

<style>
	.inst {
		font-family: 'Montserrat';
		font-weight: 400;

		.inst-instrucciones {
			font-size: 36px;
			line-height: 1.2;
			letter-spacing: 0.25rem;
		}
		.contenido-inst {
			position: absolute;
			top: 1200px;
			display: block;
			.icon-hand {
				width: 186px;
			}

			h2 {
				font-size: 102px;
				line-height: 1.2;
				text-align: center;
				margin-bottom: 216px;
			}
			h3 {
				color: #62cdb4;
				font-size: 36px;
				margin-bottom: 94px;
			}
			.bienvenido {
				h1 {
					font-size: 130px;
					font-weight: 600;
					line-height: 1.2;

					text-align: center;
					width: 100%;
					position: absolute;
				}
			}
		}
	}
	.wobble-hor-bottom {
		-webkit-animation: wobble-hor-bottom 3s 2s infinite both;
		animation: wobble-hor-bottom 3s 2s infinite both;
	}

	@-webkit-keyframes wobble-hor-bottom {
		0%,
		100% {
			-webkit-transform: translateX(0%);
			transform: translateX(0%);
			-webkit-transform-origin: 50% 50%;
			transform-origin: 50% 50%;
		}
		15% {
			-webkit-transform: translateX(-30px) rotate(-6deg);
			transform: translateX(-30px) rotate(-6deg);
		}
		30% {
			-webkit-transform: translateX(15px) rotate(6deg);
			transform: translateX(15px) rotate(6deg);
		}
		45% {
			-webkit-transform: translateX(-15px) rotate(-3.6deg);
			transform: translateX(-15px) rotate(-3.6deg);
		}
		60% {
			-webkit-transform: translateX(9px) rotate(2.4deg);
			transform: translateX(9px) rotate(2.4deg);
		}
		75% {
			-webkit-transform: translateX(-6px) rotate(-1.2deg);
			transform: translateX(-6px) rotate(-1.2deg);
		}
	}
	@keyframes wobble-hor-bottom {
		0%,
		100% {
			-webkit-transform: translateX(0%);
			transform: translateX(0%);
			-webkit-transform-origin: 50% 50%;
			transform-origin: 50% 50%;
		}
		10% {
			-webkit-transform: translateX(-20px) rotate(-6deg);
			transform: translateX(-20px) rotate(-6deg);
		}
		20% {
			-webkit-transform: translateX(10px) rotate(6deg);
			transform: translateX(10px) rotate(6deg);
		}
		30% {
			-webkit-transform: translateX(-10px) rotate(-3.6deg);
			transform: translateX(-10px) rotate(-3.6deg);
		}
		40% {
			-webkit-transform: translateX(5px) rotate(2.4deg);
			transform: translateX(5px) rotate(2.4deg);
		}
		50% {
			-webkit-transform: translateX(-4px) rotate(-1.2deg);
			transform: translateX(-4px) rotate(-1.2deg);
		}
		90% {
			-webkit-transform: translateX(-4px) rotate(-1.2deg);
			transform: translateX(0px) rotate(0deg);
		}
	}
</style>
