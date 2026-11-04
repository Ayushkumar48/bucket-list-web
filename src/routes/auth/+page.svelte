<script lang="ts">
	import {
		MagicLinkLogin,
		MagicLinkLoginEmail,
		MagicLinkLoginForm,
		MagicLinkLoginHeader,
		MagicLinkLoginInbox,
		MagicLinkLoginPanel,
		MagicLinkLoginBrand,
		MagicLinkLoginLegal,
		MagicLinkLoginProviders,
		MagicLinkLoginResend,
		MagicLinkLoginSent,
		MagicLinkLoginSentHeader,
		MagicLinkLoginViews,
		type MagicLinkStatus
	} from '#lib/components/blocks/magic-link-login/index.js';
	import Github from '#lib/components/icons/github.svelte';
	import Google from '#lib/components/icons/google.svelte';

	let status = $state<MagicLinkStatus>('idle');
	let email = $state('');
	let error = $state<string>();
	let resendAvailableAt = $state<number>();
	let now = $state(Date.now());

	$effect(() => {
		const timer = setInterval(() => (now = Date.now()), 1000);
		return () => clearInterval(timer);
	});

	async function send(address: string) {
		status = 'sending';
		const res = await fetch('/api/auth/magic-link', {
			method: 'POST',
			body: JSON.stringify({ email: address })
		});
		if (!res.ok) {
			error = "We couldn't send the link. Try again in a moment.";
			status = 'error';
			return;
		}
		resendAvailableAt = Date.now() + 30_000;
		status = 'sent';
	}
</script>

<div class="flex min-h-screen w-screen items-center justify-center">
	<MagicLinkLogin {status} bind:email {error} {now} {resendAvailableAt}>
		<MagicLinkLoginPanel>
			<MagicLinkLoginBrand>
				<span
					class="flex size-8 items-center justify-center rounded-xl bg-foreground text-background"
				></span>
				<span>Acme</span>
			</MagicLinkLoginBrand>
			<MagicLinkLoginViews>
				<MagicLinkLoginForm>
					<MagicLinkLoginHeader />
					<MagicLinkLoginProviders
						providers={[
							{ id: 'github', label: 'GitHub', icon: githubIcon },
							{ id: 'google', label: 'Google', icon: googleIcon }
						]}
					/>
					<MagicLinkLoginEmail onSubmit={send} />
					<MagicLinkLoginLegal>
						By continuing you agree to the <a href="##">Terms</a> and
						<a href="##">Privacy Policy</a>.
					</MagicLinkLoginLegal>
				</MagicLinkLoginForm>
				<MagicLinkLoginSent>
					<MagicLinkLoginSentHeader />
					<MagicLinkLoginInbox />
					<MagicLinkLoginResend onResend={() => send(email)} onBack={() => (status = 'idle')} />
				</MagicLinkLoginSent>
			</MagicLinkLoginViews>
		</MagicLinkLoginPanel>
	</MagicLinkLogin>
</div>

{#snippet githubIcon()}
	<span class="size-5 [&>svg]:size-full"><Github /></span>
{/snippet}

{#snippet googleIcon()}
	<span class="size-5 [&>svg]:size-full"><Google /></span>
{/snippet}
