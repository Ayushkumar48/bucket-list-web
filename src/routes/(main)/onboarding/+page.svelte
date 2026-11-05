<script lang="ts">
	import Button from '#lib/components/ui/button/button.svelte';
	import Input from '#lib/components/ui/input/input.svelte';
	import Label from '#lib/components/ui/label/label.svelte';
	import Textarea from '#lib/components/ui/textarea/textarea.svelte';
	import { toast } from '#lib/components/ui/toast/index.js';
	import { onboarding } from '../data.remote';
</script>

<svelte:head>
	<title>Set up your profile · Bucket List</title>
</svelte:head>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
	<div class="w-full max-w-lg space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
		<div class="space-y-2">
			<p class="text-sm font-medium text-primary">One last step</p>
			<h1 class="text-2xl font-semibold tracking-tight">Set up your profile</h1>
			<p class="text-sm leading-relaxed text-muted-foreground">
				Tell people a little about yourself before you start checking things off your list.
			</p>
		</div>

		<form
			{...onboarding.enhance(async (form) => {
				try {
					await form.submit();
				} catch (error: unknown) {
					toast.error(error instanceof Error ? error.message : 'Could not save your profile.');
				}
			})}
			class="space-y-5"
		>
			<div class="space-y-1.5">
				<Label for="name">Name</Label>
				<Input
					{...onboarding.fields.name.as('text')}
					id="name"
					autocomplete="name"
					placeholder="Ada Lovelace"
				/>
				{#each onboarding.fields.name.issues() ?? [] as issue (issue)}
					<p class="text-xs text-destructive-strong">{issue.message}</p>
				{/each}
			</div>

			<div class="space-y-1.5">
				<Label for="username">Username</Label>
				<div
					class="flex items-center rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring"
				>
					<span class="pl-3 text-sm text-muted-foreground">@</span>
					<Input
						{...onboarding.fields.username.as('text')}
						id="username"
						autocomplete="username"
						placeholder="your_username"
						class="h-10 min-w-0 flex-1 border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
					/>
				</div>
				<p class="text-xs text-muted-foreground">
					Use lowercase letters, numbers, and underscores.
				</p>
				{#each onboarding.fields.username.issues() ?? [] as issue (issue)}
					<p class="text-xs text-destructive-strong">{issue.message}</p>
				{/each}
			</div>

			<div class="space-y-1.5">
				<Label for="bio"
					>Bio <span class="font-normal text-muted-foreground">(optional)</span></Label
				>
				<Textarea
					{...onboarding.fields.bio.as('text')}
					id="bio"
					rows={4}
					placeholder="What are you excited to do?"
				/>
				{#each onboarding.fields.bio.issues() ?? [] as issue (issue)}
					<p class="text-xs text-destructive-strong">{issue.message}</p>
				{/each}
			</div>

			<Button
				type="submit"
				class="w-full"
				loading={Boolean(onboarding.pending)}
				loadingLabel="Saving profile"
			>
				Continue to Bucket List
			</Button>
		</form>
	</div>
</div>
