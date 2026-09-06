"use client";

import { type MouseEvent, useEffect, useState } from "react";
import { type ContributionMessages, fill } from "@/schema/messages";

type ContributionDay = {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
};

type ContributionsResponse = {
	total: Record<string, number>;
	contributions: ContributionDay[];
};

type GraphState =
	| { status: "loading" }
	| { status: "error" }
	| {
			status: "ready";
			total: number;
			offset: number;
			weeks: ContributionDay[][];
	  };

function toWeeks(days: ContributionDay[]): {
	offset: number;
	weeks: ContributionDay[][];
} {
	const offset = new Date(`${days[0].date}T00:00:00`).getDay();
	const weeks: ContributionDay[][] = [];
	const firstWeekLength = 7 - offset;
	weeks.push(days.slice(0, firstWeekLength));
	for (let i = firstWeekLength; i < days.length; i += 7) {
		weeks.push(days.slice(i, i + 7));
	}
	return { offset, weeks };
}

function monthLabels(
	weeks: ContributionDay[][],
	languageTag: string,
): { label: string; week: number }[] {
	const labels: { label: string; week: number }[] = [];
	let previous = "";
	weeks.forEach((week, index) => {
		const month = new Date(`${week[0].date}T00:00:00`).toLocaleString(
			languageTag,
			{ month: "short" },
		);
		if (month !== previous) {
			labels.push({ label: month, week: index });
			previous = month;
		}
	});
	return labels.filter(
		(entry, index) =>
			index === labels.length - 1 || labels[index + 1].week - entry.week >= 3,
	);
}

type Tooltip = {
	x: number;
	y: number;
	text: string;
};

function formatDay(
	date: string,
	count: number,
	languageTag: string,
	messages: ContributionMessages,
): string {
	const label = new Date(`${date}T00:00:00`).toLocaleString(languageTag, {
		month: "short",
		day: "numeric",
	});
	if (count === 0) {
		return fill(messages.none, { date: label });
	}
	if (count === 1) {
		return fill(messages.one, { date: label });
	}
	return fill(messages.many, { count, date: label });
}

type ContributionGraphProps = {
	username: string;
	errorNotice: string;
	languageTag: string;
	messages: ContributionMessages;
};

export function ContributionGraph({
	username,
	errorNotice,
	languageTag,
	messages,
}: ContributionGraphProps) {
	const [state, setState] = useState<GraphState>({ status: "loading" });
	const [tooltip, setTooltip] = useState<Tooltip | null>(null);

	const onGridOver = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		const date = target.dataset.date;
		const count = target.dataset.count;
		if (!date || count === undefined) {
			setTooltip(null);
			return;
		}
		const block = event.currentTarget.getBoundingClientRect();
		const cell = target.getBoundingClientRect();
		setTooltip({
			x: cell.left - block.left + cell.width / 2,
			y: cell.top - block.top,
			text: formatDay(date, Number(count), languageTag, messages),
		});
	};

	useEffect(() => {
		let active = true;
		fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(String(response.status));
				}
				return response.json() as Promise<ContributionsResponse>;
			})
			.then((data) => {
				if (!data.contributions?.length) {
					throw new Error("empty");
				}
				const { offset, weeks } = toWeeks(data.contributions);
				if (active) {
					setState({
						status: "ready",
						total: Object.values(data.total)[0] ?? 0,
						offset,
						weeks,
					});
				}
			})
			.catch(() => {
				if (active) {
					setState({ status: "error" });
				}
			});
		return () => {
			active = false;
		};
	}, [username]);

	if (state.status !== "ready") {
		return (
			<div className="wip-block">
				<p>{state.status === "loading" ? messages.loading : errorNotice}</p>
			</div>
		);
	}

	return (
		<div
			className="contrib-block"
			onMouseOver={onGridOver}
			onMouseLeave={() => setTooltip(null)}
		>
			{tooltip ? (
				<span
					className="contrib-tooltip"
					style={{ left: tooltip.x, top: tooltip.y }}
				>
					{tooltip.text}
				</span>
			) : null}
			<div className="contrib-scroll">
				<div className="contrib-inner">
					<div className="contrib-months" aria-hidden="true">
						{monthLabels(state.weeks, languageTag).map((month) => (
							<span
								className="contrib-month"
								key={`${month.label}-${month.week}`}
								style={{ left: month.week * 10 }}
							>
								{month.label}
							</span>
						))}
					</div>
					<div
						className="contrib-grid"
						role="img"
						aria-label={fill(messages.graphLabel, { count: state.total })}
					>
						{state.weeks.map((week, weekIndex) => (
							<div
								className="contrib-week"
								key={week[0].date}
								style={
									weekIndex === 0 && state.offset > 0
										? { marginTop: state.offset * 10 }
										: undefined
								}
							>
								{week.map((day) => (
									<span
										className="contrib-day"
										data-level={day.level}
										data-date={day.date}
										data-count={day.count}
										key={day.date}
									/>
								))}
							</div>
						))}
					</div>
					<div className="contrib-foot">
						<p className="contrib-total">
							{fill(messages.total, {
								count: state.total.toLocaleString(languageTag),
							})}
						</p>
						<div className="contrib-legend" aria-hidden="true">
							<span>{messages.less}</span>
							{[0, 1, 2, 3, 4].map((level) => (
								<span className="contrib-day" data-level={level} key={level} />
							))}
							<span>{messages.more}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
