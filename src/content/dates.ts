function parseIsoDate(isoDate: string): Date {
	return new Date(`${isoDate}T00:00:00Z`);
}

export function formatDay(isoDate: string): string {
	return parseIsoDate(isoDate).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
}

export function formatShortDate(isoDate: string): string {
	return parseIsoDate(isoDate).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});
}

export function formatLongDate(isoDate: string): string {
	return parseIsoDate(isoDate).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});
}

export function yearOf(isoDate: string): string {
	return isoDate.slice(0, 4);
}

export function toRfc822(isoDate: string): string {
	return parseIsoDate(isoDate).toUTCString();
}
