<script lang="ts">
	import { writeNewRelation } from "$lib/firebase";
	import { relationsResponse } from "./../../src/stores/session";
	import { getData } from "$lib/firebase";

	let hasSubmitted = false;
	let showCopiedBanner = false;

	if (!$relationsResponse) {
		getData();
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(document.location.host);
		showCopiedBanner = true;

		setTimeout(() => {
			showCopiedBanner = false;
		}, 3000);
	}

	function onSubmit(e: SubmitEvent) {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		if ($relationsResponse) {
			writeNewRelation($relationsResponse.length, data.english, data.swedish);
			hasSubmitted = true;
			e?.target?.reset();
		}
	}
</script>

<div
	class="h-screen w-full p-16 flex justify-center items-center align-middle flex-col relative"
>
	{#if hasSubmitted}
		<div>
			<button
				on:click|preventDefault={copyToClipboard}
				class="px-4 py-3 border-slate-100 border rounded-3xl bg-slate-600 text-white w-52 mt-10"
				>{showCopiedBanner
					? "Copied to clipboard!"
					: "Send it to your friends!"}</button
			>
		</div>
	{:else}<form
			class="w-full flex flex-col justify-between align-middle items-center"
			on:submit|preventDefault={onSubmit}
		>
			<div class="w-full flex gap-8 justify-center md:flex-row flex-col">
				<div class="flex flex-col">
					<input
						class="p-3"
						id="english"
						name="english"
						placeholder="English"
						value=""
					/>
				</div>
				<div class="flex flex-col">
					<input
						class="p-3"
						id="swedish"
						name="swedish"
						value=""
						placeholder="Swedish"
					/>
				</div>
			</div>
			<button
				class="px-4 py-3 border-slate-600 border rounded-3xl bg-slate-100 w-52 mt-10"
				>Submit a concept pair!</button
			>
		</form>{/if}
</div>
