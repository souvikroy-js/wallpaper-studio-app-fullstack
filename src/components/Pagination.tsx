"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UrlObject } from "url";

function PaginationLink({
	href,
	label,
	active,
	disabled,
}: {
	href: UrlObject;
	label: string;
	active?: boolean;
	disabled?: boolean;
}) {
	if (disabled) {
		return (
			<span className="cursor-not-allowed rounded px-3 py-1 text-sm text-gray-300 select-none">
				{label}
			</span>
		);
	}

	return (
		<Link
			href={href}
			className={`rounded px-3 py-1 text-sm transition-colors ${
				active
					? "bg-blue-600 font-semibold text-white"
					: "bg-gray-100 text-gray-700 hover:bg-gray-200"
			}`}>
			{label}
		</Link>
	);
}

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
	const delta = 2;
	const range: (number | string)[] = [];
	const rangeWithDots: (number | string)[] = [];
	let l: number | undefined;

	// For small number of pages, show all
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// Always include first page, pages around current, and last page
	for (let i = 1; i <= totalPages; i++) {
		if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
			range.push(i);
		}
	}

	// Add ellipses where there are gaps
	for (const i of range) {
		if (typeof i === "number" && l !== undefined) {
			if (i - l === 2) {
				rangeWithDots.push(l + 1);
			} else if (i - l !== 1) {
				rangeWithDots.push("...");
			}
		}
		rangeWithDots.push(i);
		l = typeof i === "number" ? i : l;
	}

	return rangeWithDots;
}

export default function Pagination({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) {
	const pathname = usePathname();

	// Validate and sanitize inputs
	const validatedTotalPages = Math.max(
		1,
		Number.isInteger(totalPages) ? totalPages : 1
	);
	const validatedCurrentPage = Math.max(
		1,
		Math.min(
			validatedTotalPages,
			Number.isInteger(currentPage) ? currentPage : 1
		)
	);

	if (validatedTotalPages <= 1) return null;

	const pageNumbers = getPageNumbers(validatedCurrentPage, validatedTotalPages);

	return (
		<div className="flex items-center justify-center gap-2">
			<PaginationLink
				href={{ pathname, query: { page: validatedCurrentPage - 1 } }}
				disabled={validatedCurrentPage <= 1}
				label="← Prev"
			/>

			{pageNumbers.map((p, index) => {
				if (p === "...") {
					return (
						<span
							key={`ellipsis-${index}`}
							className="px-3 py-1 text-sm text-gray-500 select-none">
							...
						</span>
					);
				}
				return (
					<PaginationLink
						key={p}
						href={{ pathname, query: { page: p } }}
						label={String(p)}
						active={p === validatedCurrentPage}
					/>
				);
			})}

			<PaginationLink
				href={{ pathname, query: { page: validatedCurrentPage + 1 } }}
				disabled={validatedCurrentPage >= validatedTotalPages}
				label="Next →"
			/>
		</div>
	);
}
