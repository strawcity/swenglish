import { writable } from "svelte/store";

export type Relation = {
	english: { concept: string; votes: number };
	swedish: { concept: string; votes: number };
};

export const step = writable(0);
export const isAuthed = writable(false);

export const relationsResponse = writable<Relation[]>();

export function incrementStep() {
	step.update((n) => n + 1);
}
