import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * Parseert Nederlandse datum tekst naar Date object voor Belgische tijdzone
 * @param {string} dateString - Nederlandse datum tekst zoals "woensdag 3 december 2025"
 * @returns {Date|null} - Date object of null als parsing mislukt
 */
export function parseDutchDate(dateString) {
	if (!dateString || typeof dateString !== 'string') {
		return null;
	}

	// Nederlandse maandnamen mapping
	const monthNames = {
		'januari': 0, 'februari': 1, 'maart': 2, 'april': 3,
		'mei': 4, 'juni': 5, 'juli': 6, 'augustus': 7,
		'september': 8, 'oktober': 9, 'november': 10, 'december': 11
	};

	// Probeer verschillende formaten te matchen
	const patterns = [
		// "woensdag 3 december 2025" of "3 december 2025"
		/(?:(?:maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag)\s+)?(\d{1,2})\s+(\w+)\s+(\d{4})/i,
		// "3/12/2025" of "3-12-2025"
		/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
		// "2025-12-03" (ISO format)
		/(\d{4})-(\d{1,2})-(\d{1,2})/
	];

	for (const pattern of patterns) {
		const match = dateString.match(pattern);
		if (match) {
			let day, month, year;

			if (pattern === patterns[0]) {
				// Nederlandse maand naam
				day = parseInt(match[1]);
				const monthName = match[2].toLowerCase();
				month = monthNames[monthName];
				year = parseInt(match[3]);
			} else if (pattern === patterns[1]) {
				// DD/MM/YYYY of DD-MM-YYYY
				day = parseInt(match[1]);
				month = parseInt(match[2]) - 1; // JavaScript maanden zijn 0-based
				year = parseInt(match[3]);
			} else if (pattern === patterns[2]) {
				// YYYY-MM-DD (ISO)
				year = parseInt(match[1]);
				month = parseInt(match[2]) - 1; // JavaScript maanden zijn 0-based
				day = parseInt(match[3]);
			}

			if (month !== undefined && day && year) {
				// Maak Date object in Belgische tijdzone
				const date = new Date(year, month, day);
				// Valideer dat de datum correct is
				if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
					return date;
				}
			}
		}
	}

	return null;
}

/**
 * Controleert of een datum verstreken is (voor Belgische tijdzone)
 * @param {string|Date} dateInput - Datum als string of Date object
 * @returns {boolean} - true als datum verstreken is
 */
export function isDatePassed(dateInput) {
	if (!dateInput) return false;
	
	let date;
	if (typeof dateInput === 'string') {
		date = parseDutchDate(dateInput);
	} else if (dateInput instanceof Date) {
		date = dateInput;
	} else {
		return false;
	}

	if (!date) return false;

	// Huidige datum in Belgische tijdzone
	const now = new Date();
	
	// Vergelijk alleen de datum (niet de tijd)
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const eventDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	
	return eventDate < today;
}
