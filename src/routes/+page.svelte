<script lang="ts">
	import { invoke } from '@tauri-apps/api/core';
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	// import function to register Swiper custom elements
	import Ruta from '$lib/Ruta.svelte';
	import { register } from 'swiper/element/bundle';
	import Portada from '../lib/Portada.svelte';

	//const homeDirPath = homeDir();
	//let { data }: { data: PageData } = $props();

	let { data } = $props();
	let lan = $state('es');
	let pantalla = $state('portada');

	let boxEl = $state(null);
	let boxWidth = $state(0);
	let scale = $state({ val: 1 });

	setContext('scale', scale);

	//console.log(`--> ${homeDirPath}`);

	// when using `"withGlobalTauri": true`, you may use
	// const { exists, BaseDirectory } = window.__TAURI__.fs;

	// Check if the `$APPDATA/avatar.png` file exists
	// register Swiper custom elements
	register();

	//readFile();

	//console.log(`--> ${appLocalDataDirPath}`);

	let name = $state('');
	let greetMsg = $state('');
	let width = $state(0);
	let height = $state(0);
	let propScale = $state(0);
	let mainDom: HTMLElement;

	const spaceBetween = 10;
	const onProgress = (e: { detail: [any, any] }) => {
		const [swiper, progress] = e.detail;
		console.log(progress);
	};
	const onSlideChange = (e: { detail: [any, any] }) => {
		console.log('slide changed');
	};

	async function greet(event: Event) {
		event.preventDefault();
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		greetMsg = await invoke('greet', { name });
	}

	$effect(() => {
		let propWidth = width / 2160;
		let propHeight = height / 3840;
		console.log(`--> ${propWidth} ${propHeight}`);
		propScale = Math.min(propWidth, propHeight);
		scale.val = propScale;

		mainDom.style.transform = `scale(${propScale})`;
	});

	const onHomeLanguageChange = (_lan: string) => {
		lan = _lan;
		console.log(`--> ${lan}`);
		pantalla = 'instrucciones';
	};
	const onLanguageChange = (_lan: string) => {
		lan = _lan;
		console.log(`--> ${lan}`);
	};

	const doStandBy = () => {
		pantalla = 'portada';
	};

	/* onMount(() => {
    const resizeObserver = new ResizeObserver(entries => {
      // We're only watching one element
      const entry = entries.at(0);

      //Get the block size
      boxWidth = entry.contentBoxSize[0].blockSize;	
    });

    resizeObserver.observe(boxEl);

    // This callback cleans up the observer
    return () => resizeObserver.unobserve(boxEl);
  }); */
</script>

<div class="w-dvw h-dvh" bind:offsetWidth={width} bind:offsetHeight={height}></div>
<main bind:this={mainDom} class="top-0 overflow-hidden left-0 absolute select-none w-[2160px] h-[3840px] origin-top-left {data.tauri ? 'mainTauriTest' : ''}">
	{#if pantalla === 'portada'}
		<div class="absolute" in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
			<Portada onLanguageChange={onHomeLanguageChange} {lan} data={data.props?.data}></Portada>
		</div>
	{/if}
	{#if pantalla === 'instrucciones'}
		<div class="absolute" in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
			<Ruta {onLanguageChange} {lan} data={data.props?.data} tauri={data.tauri} {doStandBy}></Ruta>
			<!-- <Instrucciones {onLanguageChange} {lan} data={data.props.data}></Instrucciones> -->
		</div>
	{/if}
</main>

<style>
	:global(body) {
		/* applies to <body> */
		margin: 0;
	}
	:global(img) {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
	}

	:root {
		font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
		font-size: 16px;
		line-height: 24px;
		font-weight: 400;

		color: #f6f6f6;
		background-color: #2f2f2f;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
	}

	.mainTauriTest {
		transform-origin: 0 0;
		transform: scale(0.440625);
	}
</style>
