const silhouette =
	"M58 12C78 12 92 24 95 44 96 50 95 54 93 58 99 63 104 68 106 73 107 76 103 77 97 78 101 81 102 84 100 87 97 88 97 89 99 91 102 94 102 99 97 104 92 110 82 114 72 116L73 136C88 148 106 154 116 166 124 176 127 190 128 205L10 205C11 188 14 172 20 162 30 150 42 142 50 132 46 120 44 110 45 100 32 92 24 76 26 56 28 32 40 12 58 12Z";

export function Portrait() {
	return (
		<div className="portrait-wrap" aria-hidden="true">
			<svg
				viewBox="0 0 145 205"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<defs>
					<linearGradient id="pfade" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0.55" stopColor="#fff" stopOpacity="1" />
						<stop offset="1" stopColor="#fff" stopOpacity="0" />
					</linearGradient>
					<mask id="pmask">
						<rect width="145" height="205" fill="url(#pfade)" />
					</mask>
				</defs>
				<g mask="url(#pmask)">
					<path
						fill="var(--portrait-soft)"
						opacity="0.5"
						transform="translate(11 -5)"
						d={silhouette}
					/>
					<path
						fill="var(--portrait-mid)"
						opacity="0.7"
						transform="translate(5 -2)"
						d={silhouette}
					/>
					<path fill="var(--portrait-ink)" d={silhouette} />
					<path
						fill="var(--portrait-mid)"
						opacity="0.5"
						d="M26 56C28 32 40 12 58 12 78 12 92 24 95 44 95 48 94 52 93 56 90 40 78 30 62 30 45 30 33 42 31 60 29 60 27 58 26 56Z"
					/>
					<path
						fill="var(--portrait-mid)"
						opacity="0.6"
						d="M64 80C70 76 74 80 72 86 70 92 64 92 62 87 61 84 62 82 64 80Z"
					/>
				</g>
			</svg>
		</div>
	);
}
