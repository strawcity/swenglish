<script context="module" lang="ts">
	import { getData } from "$lib/firebase";

	export const prerender = true;
</script>

<svelte:head>
	<title>Swenglish</title>
	<meta
		name="description"
		content="A voting system to decide which phrase is best in English or Swedish"
	/>
</svelte:head>

<div
	class="flex flex-col items-center justify-center align-middle h-full w-full px-14 "
>
	<h1 class="text-5xl text-center mb-5">Vem har the best uttryck?</h1>
	<p class="text-3xl mb-5">Engelska or Swedish?</p>
	<p class=" max-w-lg">
		När man har two languages, vi have an amazing styrke. Du kan välja wich word
		you want to, för att spara time. But which word/phrase is korrekt?
	</p>
	<a
		class="px-4 py-3 border-slate-600 border rounded-3xl text-center bg-slate-100 w-52 mt-10"
		href="/swenglish"
		on:click={() => getData()}>Vote here!</a
	>
</div>
