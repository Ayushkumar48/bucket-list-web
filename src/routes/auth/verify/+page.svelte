<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '#lib/components/ui/button/button.svelte';
	import {
		Empty,
		EmptyContent,
		EmptyDescription,
		EmptyHeader,
		EmptyIllustration,
		EmptyTitle
	} from '#lib/components/ui/empty/index.js';
	import Spinner from '#lib/components/ui/spinner/spinner.svelte';
	let { data } = $props();
	const listsPath = resolve('/(main)/lists');

	const getErrorMessage = (error: unknown) => {
		if (error instanceof Error) return error.message;
		if (typeof error === 'object' && error !== null && 'message' in error) {
			const message = error.message;
			if (typeof message === 'string') return message;
		}
		return 'Could not verify this sign-in link.';
	};

	$effect(() => {
		const verification = data.verification;
		if (browser && verification) {
			void verification.then(() => goto(listsPath)).catch(() => undefined);
		}
	});
</script>

{#snippet unavailable(description: string)}
	<Empty variant="card" size="sm" class="w-full">
		<EmptyIllustration scene="offline" phase="done" label="Sign-in link unavailable" />
		<EmptyHeader>
			<EmptyTitle>Sign-in link unavailable</EmptyTitle>
			<EmptyDescription>{description}</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<Button href="/auth">Request a new link</Button>
		</EmptyContent>
	</Empty>
{/snippet}

<svelte:head>
	<title>Verifying sign-in · Bucket List</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center p-6">
	<div
		class="w-full max-w-sm space-y-5 rounded-2xl border border-border bg-card p-6 text-center sm:p-8"
	>
		{#if !data.token}
			{@render unavailable('This sign-in link is missing its token.')}
		{:else if data.verification}
			{#await data.verification}
				<Spinner class="mx-auto size-6" label="Verifying sign-in" />
				<div class="space-y-1">
					<h1 class="text-xl font-semibold tracking-tight">Signing you in</h1>
					<p class="text-sm text-muted-foreground">Just a moment while we verify your link.</p>
				</div>
			{:then}
				<Spinner class="mx-auto size-6" label="Opening your bucket lists" />
				<div class="space-y-1">
					<h1 class="text-xl font-semibold tracking-tight">Sign-in complete</h1>
					<p class="text-sm text-muted-foreground">Opening your bucket lists…</p>
				</div>
			{:catch error}
				{@render unavailable(getErrorMessage(error))}
			{/await}
		{:else}
			{@render unavailable('We could not start the verification.')}
		{/if}
	</div>
</div>
