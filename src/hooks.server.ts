import { SvelteGoogleAuthHook } from '@peralmq/svelte-google-auth/server';
import type { Handle } from '@sveltejs/kit';

const credentials = {"web":{"client_id":"699022649456-h8cajd2jh59ea1fd9j87fpkq31qg7mpv.apps.googleusercontent.com","project_id":"titanium-cacao-386118","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["https://peralmq.github.io/vwmp/_auth/callback","http://localhost:5173/_auth/callback"],"javascript_origins":["https://peralmq.github.io","http://localhost:5173"]}}
const auth = new SvelteGoogleAuthHook(credentials.web);

export const handle: Handle = async ({ event, resolve }) => {
	return await auth.handleAuth({ event, resolve });
};