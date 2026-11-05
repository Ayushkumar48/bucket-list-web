<script lang="ts">
	import { auth } from './data.remote';
	import Button from '#lib/components/ui/button/button.svelte';
	import Google from '#lib/components/icons/google.svelte';
	import MagicLinkLoginEmail from '#lib/components/blocks/magic-link-login/magic-link-login-email.svelte';
</script>

<div class="flex min-h-screen items-center justify-center p-6">
	<div class="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
		<div class="space-y-1">
			<h1 class="text-xl font-semibold tracking-tight">Sign in</h1>
			<p class="text-sm text-muted-foreground">Choose how you want to sign in.</p>
		</div>

		<Button href="/auth/google" variant="outline" class="w-full">
			<span class="size-5 [&>svg]:size-full"><Google /></span>
			Continue with Google
		</Button>

		<div
			class="flex items-center gap-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
		>
			or
		</div>

		<MagicLinkLoginEmail form={auth} />

		{#if auth.result}
			<p class="text-center text-sm text-muted-foreground">
				Check your inbox for the sign-in link.
			</p>
		{/if}

		<p class="text-center text-xs text-muted-foreground">
			By continuing you agree to the <a class="underline" href="##">Terms</a> and
			<a class="underline" href="##">Privacy Policy</a>.
		</p>
	</div>
</div>
