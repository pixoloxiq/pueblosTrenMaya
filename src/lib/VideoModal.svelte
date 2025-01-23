<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { getTauriUrl } from '../utils/utils';
	let { videoSrc, cerrarVideo } = $props();
	let videoSourceFinal = $state('');
	const tauri: { val: boolean } = getContext('tauri');

	onMount(async () => {
		//videoSourceFinal = await getUrlVideo(videoSrc);
	});

	const getUrlVideo = async (url: string) => {
		if (tauri) {
			let newUrl = await getTauriUrl('data/videos', url);
			console.log(newUrl);
			//return '/assets/videos/iconos/' + newUrl;
			videoSourceFinal = newUrl;
		} else {
			//const imgUrl = new URL('./assets/videos/iconos/' + url, import.meta.url).href;
			videoSourceFinal = '/assets/videos/' + url;
		}
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="myModal" class="modal" onclick={cerrarVideo}>
	{#await getUrlVideo(videoSrc)}
		<!-- promise is pending -->
		<p>waiting for the promise to resolve...</p>
	{:then value}
		<div class="modal-content">
			<span class="close" id="closeModalBtn" onclick={cerrarVideo}>&times;</span>

			<div class="video-container">
				<!-- svelte-ignore a11y_media_has_caption -->
				<video autoplay loop>
					<source src={videoSourceFinal} type="video/mp4" />
					Tu navegador no soporta el elemento de video.
				</video>
			</div>
		</div>
	{/await}
</div>

<style>
	.modal {
		position: fixed;
		z-index: 20;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.modal-content {
		position: relative;
		margin: auto;
		padding: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		/* max-width: 600px; */
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	}

	.close {
		color: white;
		position: absolute;
		top: 1200px;
		font-size: 110px;
		font-weight: bold;
		transition: 0.3s;
		z-index: 10;
	}

	.close:hover,
	.close:focus {
		color: #bbb;
		text-decoration: none;
		cursor: pointer;
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		width: 100%;
		background: black;
	}

	.video-container video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
