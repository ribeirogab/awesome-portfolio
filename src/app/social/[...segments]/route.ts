import { socialImageParams, socialImageResponse } from "@/seo/social-images";

export const dynamic = "force-static";

export function generateStaticParams() {
	return socialImageParams();
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ segments: string[] }> },
) {
	const { segments } = await params;
	return socialImageResponse(segments) ?? new Response(null, { status: 404 });
}
