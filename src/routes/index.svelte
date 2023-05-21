<script context="module" lang="ts">
	import { getData } from "$lib/firebase";

	export const prerender = true;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col justify-between items-center w-full">
	<h1>
		<span class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</span>
	</h1>
	<a class="text-lg" href="/swenglish" on:click={() => getData()}>Play</a>
</section>
