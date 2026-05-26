import Link from "next/link";
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

export default function Pagination({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) {
	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-center gap-2">
			<PaginationLink
				href={{ query: { page: currentPage - 1 } }}
				disabled={currentPage <= 1}
				label="← Prev"
			/>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
				<PaginationLink
					key={p}
					href={{ query: { page: p } }}
					label={String(p)}
					active={p === currentPage}
				/>
			))}

			<PaginationLink
				href={{ query: { page: currentPage + 1 } }}
				disabled={currentPage >= totalPages}
				label="Next →"
			/>
		</div>
	);
}
