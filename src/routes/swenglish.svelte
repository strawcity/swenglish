<script lang="ts">
	import { vote } from "$lib/firebase";
	import {
		step,
		relationsResponse,
		incrementStep
	} from "./../../src/stores/session";
	import { fade } from "svelte/transition";
	import Card from "./../../src/components/Card.svelte";

	let showNextStep = false;
	let hasVoted = false;
	let showEnglishVotes = false;
	let showSwedishVotes = false;
	let showCopiedBanner = false;

	function handleVote(currentStep: number, language: string) {
		if (!hasVoted) {
			vote(currentStep, language);
		}
		showNextStep = true;
	}

	function handleNextClick() {
		incrementStep();
		showNextStep = false;
		showEnglishVotes = false;
		showSwedishVotes = false;
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(document.location.host);
		showCopiedBanner = true;

		setTimeout(() => {
			showCopiedBanner = false;
		}, 3000);
	}
</script>

<h1 class="text-2xl text-center absolute top-0 w-full py-4 ">
	Vem har the best uttryck?
</h1>
{#if $relationsResponse && $relationsResponse[$step]}
	<div
		class="h-screen w-full p-3 md:p-16  flex justify-center items-center align-middle flex-col relative"
	>
		<div class="flex items-center align-middle space-x-3 md:space-x-10 w-full">
			<Card
				showVotes={showEnglishVotes}
				onClick={() => {
					handleVote($step, "english");
					showEnglishVotes = true;
				}}
				language={"english"}
			/>
			<Card
				showVotes={showSwedishVotes}
				onClick={() => {
					handleVote($step, "swedish");
					showSwedishVotes = true;
				}}
				language={"swedish"}
			/>
		</div>

		{#if showNextStep}
			<div
				on:click={() => {
					handleNextClick();
				}}
				in:fade={{ duration: 350, delay: 350 }}
				class="absolute bottom-0 sm:p-3 bg-slate-600 text-white w-full rounded-t-md p-4 flex justify-center cursor-pointer"
			>
				<h2 class="font-bold text-xl">Next</h2>
			</div>
		{/if}
	</div>
{:else}
	<div
		class="h-screen w-full p-16 flex justify-center items-center align-middle flex-col relative"
	>
		<h3 class="text-2xl mb-8">That's all the uttryck we've got hittills</h3>
		<div class="flex md:flex-row flex-col gap-6">
			<button
				on:click|preventDefault={copyToClipboard}
				class="px-4 py-3 border-slate-100 text-xl border rounded-3xl bg-slate-600 text-white md:w-52 "
				>{showCopiedBanner
					? "Copied to clipboard!"
					: "Send it to your friends!"}</button
			>

			<a
				class="px-4 text-center py-3 border-slate-600 border text-xl flex justify-center items-center rounded-3xl bg-slate-100 md:w-52 "
				href="/contribute">Submit a translation</a
			>
		</div>
	</div>
{/if}
