
export const countElements = 15;

interface FilterResult<T> {
	totalPages: number;
	itemsPerPage: T[];
}

export const getFilteredItems = <T extends { [key: string]: any}>(
	items: T[],
	currentPage: number,
	query?: string | null,
	itemsPerPage: number = countElements
): FilterResult<T> => {
	let filtered = items;

	if (query) {
		const normalizedQuery = query.toLowerCase().trim();
		filtered = items.filter(
			(item) =>
				item.ticker.toLowerCase().includes(normalizedQuery) ||
				item.name.toLowerCase().includes(normalizedQuery)
		);
	}

	const offset = (currentPage - 1) * itemsPerPage;
	const paginatedItems = filtered.slice(offset, offset + itemsPerPage);

	return {
		totalPages: Math.ceil(filtered.length / itemsPerPage),
		itemsPerPage: paginatedItems,
	};
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'...',
		totalPages,
	];
};
