<script lang="ts">
	import { fly } from "svelte/transition";
	export let onClick: () => void;
	export let showVotes: boolean;
	export let language: keyof Relations;
	import { step, relationsResponse } from "./../../src/stores/session";

	interface Relation {
		concept: string;
		votes: number;
	}

	interface Relations {
		english: Relation;
		swedish: Relation;
	}

	function getVoteRatio(language: string) {
		let languageVotes =
			$relationsResponse[$step][language as keyof Relations]?.votes;

		let totalVotes =
			$relationsResponse[$step]?.english?.votes +
			$relationsResponse[$step]?.swedish?.votes;
		let ratio = languageVotes / totalVotes;
		return 100 * Number(ratio.toFixed(2));
	}
</script>

<div
	on:click={() => {
		onClick();
	}}
	class="w-full text-center relative cursor-pointer"
>
	<div
		class={`text-xl flex flex-col items-center align-middle justify-center h-52 w-full border-blue-200 bg-slate-50 relative z-10 rounded-md border p-2 font-${language}`}
	>
		<h1>
			{$relationsResponse[$step][language].concept}
		</h1>
	</div>

	{#if showVotes}
		<div
			in:fly={{ y: 150, duration: 350 }}
			class={`absolute -top-14 bg-slate-300 w-full rounded-t-md p-4 font-${language}`}
		>
			{getVoteRatio(language)}% {language === "english"
				? `feel the same`
				: "känner samma"}
		</div>
	{/if}
</div>
