type AssetsBinding = {
	fetch(request: Request): Promise<Response>;
};

type Env = {
	ASSETS: AssetsBinding;
	REDIRECT_HOSTS: Record<string, string>;
};

function redirectTarget(request: Request, hosts: Record<string, string>) {
	const url = new URL(request.url);
	const host = hosts[url.hostname];
	if (!host) {
		return undefined;
	}
	url.hostname = host;
	url.protocol = "https:";
	url.port = "";
	return url.toString();
}

export default {
	fetch(request: Request, env: Env): Promise<Response> | Response {
		const target = redirectTarget(request, env.REDIRECT_HOSTS ?? {});
		if (target) {
			return Response.redirect(target, 301);
		}
		return env.ASSETS.fetch(request);
	},
};
