<script lang="ts">
	import type { RemoteForm } from '$app/server';
	import { toast } from '#lib/components/ui/toast/index.js';
	import Button from '#lib/components/ui/button/button.svelte';
	import Label from '#lib/components/ui/label/label.svelte';
	import Input from '#lib/components/ui/input/input.svelte';

	let { form }: { form: RemoteForm<{ email: string }, unknown> } = $props();
</script>

<form
	{...form.enhance(async (form) => {
		try {
			if (await form.submit()) {
				toast.success('Sign-in link sent. Check your inbox.');
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : 'Failed to send magic link.');
		}
	})}
	class="space-y-4"
>
	<div class="space-y-1.5">
		<Label for="email">Email</Label>
		<Input
			{...form.fields.email.as('email')}
			id="email"
			autocomplete="email"
			placeholder="you@example.com"
		/>
		{#each form.fields.email.issues() ?? [] as issue (issue)}
			<p class="text-xs text-destructive-strong">{issue.message}</p>
		{/each}
	</div>

	<Button type="submit" class="w-full" loading={Boolean(form.pending)} loadingLabel="Sending link">
		Email me a sign-in link
	</Button>
</form>
