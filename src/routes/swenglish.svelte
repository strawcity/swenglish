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
</script>

{#if $relationsResponse && $relationsResponse[$step]}
	<div
		class="h-screen w-full p-16 flex justify-center items-center align-middle flex-col relative"
	>
		<div class="flex items-center  align-middle space-x-10 w-full">
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
				in:fade={{ duration: 350, delay: 1000 }}
				class="absolute bottom-0 bg-slate-300 w-full rounded-t-md p-4 flex justify-center cursor-pointer"
			>
				<h2 class="font-bold">Next</h2>
			</div>
		{/if}
	</div>
{:else}
	<div
		class="h-screen w-full p-16 flex justify-center items-center align-middle flex-col relative"
	>
		<h3>YA DONE</h3>
		<a class="text-lg" href="/contribute">Submit a translation</a>
	</div>
{/if}
