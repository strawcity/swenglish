<script lang="ts">
	import { writeNewRelation } from "$lib/firebase";
	import { step } from "./../../src/stores/session";

	function onSubmit(e: SubmitEvent) {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		writeNewRelation($step, data.english, data.swedish);
		e?.target?.reset();
	}
</script>

<div
	class="h-screen w-full p-16 flex justify-center items-center align-middle flex-col relative"
>
	<form
		class="w-full flex flex-col justify-between align-middle items-center"
		on:submit|preventDefault={onSubmit}
	>
		<div class="w-full flex justify-around">
			<div class="flex flex-col">
				<label for="name">English</label>
				<input class="p-3" id="english" name="english" value="" />
			</div>
			<div class="flex flex-col">
				<label for="name">Swedish</label>
				<input class="p-3" id="swedish" name="swedish" value="" />
			</div>
		</div>
		<button
			class="px-4 py-3 border-slate-600 border rounded-3xl bg-slate-100 w-52 mt-10"
			>Submit a concept pair!</button
		>
	</form>
</div>
