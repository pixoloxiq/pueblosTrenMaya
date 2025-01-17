<script>
	let { onLanguageChange, lan, data } = $props();
	import imgPortada from '../assets/imgs/1.png';
	import imgPortadaBack from '../assets/imgs/back_portada.png';
	import iconHand from '../assets/imgs/icon_hand.svg';
	import iconLan from '../assets/imgs/icon_lan.svg';
	import logoHotelesG from '../assets/imgs/logo_hg.png';
	import logoMexicana from '../assets/imgs/logo_m.svg';
	import logoTrenMayaSm from '../assets/imgs/logo_tm.svg';
	import titulo from '../assets/imgs/titulo.svg';

	const switchLanguageEs = () => {
		//lan = 'es';
		onLanguageChange('es');
	};
	const switchLanguageEn = () => {
		//lan = 'en';
		onLanguageChange('en');
	};

	$effect(() => {
		console.log(data.instrucciones);
	});
</script>

<div class="portada w-[2160px] h-[3840px]">
	<img class="hidden portada-back w-[2160px] h-[3840px]" src={imgPortada} alt="Guia" />

	<img class=" portada-back" src={imgPortadaBack} alt="Portada" />

	<!-- <div class="cont-center logo-portada">
		<img class="logoTrenMaya" src={imgTrenMaya} alt="Logo Trem Maya" />
	</div> -->
	<div class="cont-center logos-portada">
		<img class="logoTrenMayaSm" src={logoTrenMayaSm} alt="Logo Tren Maya" />
		<img class="logoHotelesG" src={logoHotelesG} alt="Logo Hoteles Gafsacomm" />
		<img class="logoMexicana" src={logoMexicana} alt="Logo Mexicana" />
	</div>

	<div class="font-bold cont-center contenido-portada">
		<!-- <h1>DESCUBRE EL<br />MUNDO MAYA</h1> -->
		<img id="titulo" src={titulo} alt="Titulo" />
		<h2 class="font-bold bienvenido">
			SITIOS ARQUEOLÓGICOS<br />
			Y PUEBLOS MÁGICOS
		</h2>

		<div class="flex justify-center w-full portada-btn">
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

			<!-- {language === 'English' ? 'Switch to Spanish' : 'Switch to English'} -->
		</div>
		<div class="cont-center portada-instrucciones mt-[88px]">
			<img class="handIcon heartbeat" src={iconHand} alt="Hand Icon" />
		</div>
		<div
			class="cont-center flex flex-col items-center justify-center portada-instrucciones mt-[88px]"
		>
			<p class="font-semibold">
				{@html data.instrucciones.es}
			</p>
			<p class="mt-[90px] font-semibold">
				{@html data.instrucciones.en}
			</p>
		</div>
	</div>

	<!-- <div class="cont-center pleca-portada">
		<img class="pleca" src={imgPleca} alt="Pleca" />
	</div> -->
</div>

<style>
	.portada {
		font-family: 'Montserrat';
		font-weight: 400;

		img#titulo {
			height: 303px;
			margin-left: 266px;
			margin-bottom: 140px;
		}

		/* .logo-portada {
			position: absolute;
			top: 246px;
		} */

		.language-btn {
			width: 752px;
			height: 212px;
			display: flex;
			background-color: #00524c;
			/* opacity: 0.4; */
			color: white;
			font-size: 87px;
			align-content: center;
			justify-content: start;
			flex-wrap: wrap;
			position: relative;
			text-shadow: 0 0 20px #fff;
			box-shadow: 0 0 25px #00524c;

			img {
				width: 105px;
				margin-inline-start: 105px;
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
					width: 460px;
				}
				&.language-btn-en {
					/* background-color: blue; */
					left: 460px;
					width: 290px;
				}
			}
		}

		.portada-instrucciones {
			color: #62cdb4;
			text-align: center;
			font-size: 36px;
			line-height: 1.2;
			letter-spacing: 0.25rem;
		}
	}

	.boldSelected {
		font-weight: 800;
		font-style: italic;
	}
	.handIcon {
		height: 93px;
	}

	/* 	.glow {
		-webkit-animation: glow 1s ease-in-out infinite alternate;
		-moz-animation: glow 1s ease-in-out infinite alternate;
		animation: glow 1s ease-in-out infinite alternate;
	} */

	.portada-back {
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
		z-index: -1;
	}
	.cont-center {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.contenido-portada {
		position: absolute;
		top: 759px;
		display: block;
		/* h1 {
			font-size: 170px;
			line-height: 1.1;
			text-align: center;
			margin-bottom: 224px;
		} */
		h2 {
			font-size: 102px;
			line-height: 1.2;
			text-align: center;
		}

		.portada-btn {
			display: flex;
			margin-top: 290px;
		}
	}
	.logos-portada {
		position: absolute;
		bottom: 736px;
		align-items: center;
		gap: 132px;
	}
	.logoMexicana {
		height: 85px;
		margin-top: -50px;
	}
	.logoTrenMayaSm {
		height: 190px;
	}
	.logoHotelesG {
		height: 98px;
	}

	.heartbeat {
		-webkit-animation: heartbeat 1.5s ease-in-out infinite both;
		animation: heartbeat 1.5s ease-in-out infinite both;
	}

	/* ----------------------------------------------
 * Generated by Animista on 2025-1-17 0:26:3
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

	/**
 * ----------------------------------------
 * animation heartbeat
 * ----------------------------------------
 */
	@-webkit-keyframes heartbeat {
		from {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: center center;
			transform-origin: center center;
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		10% {
			-webkit-transform: scale(0.91);
			transform: scale(0.91);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		17% {
			-webkit-transform: scale(0.98);
			transform: scale(0.98);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		33% {
			-webkit-transform: scale(0.87);
			transform: scale(0.87);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		45% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
	@keyframes heartbeat {
		from {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: center center;
			transform-origin: center center;
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		10% {
			-webkit-transform: scale(0.91);
			transform: scale(0.91);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		17% {
			-webkit-transform: scale(0.98);
			transform: scale(0.98);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		33% {
			-webkit-transform: scale(0.87);
			transform: scale(0.87);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		45% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
</style>
