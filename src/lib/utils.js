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

const DUTCH_MONTHS = {
	januari: 0, februari: 1, maart: 2, april: 3,
	mei: 4, juni: 5, juli: 6, augustus: 7,
	september: 8, oktober: 9, november: 10, december: 11,
};

function normalizeCardDateText(text) {
	return String(text || '')
		.replace(/[\u2018\u2019\u201B\u2032]/g, "'")
		.replace(/[\u2013\u2014]/g, '-');
}

function yearFromMatch(fullYear, shortYear) {
	if (fullYear) return parseInt(fullYear, 10);
	if (shortYear) return 2000 + parseInt(shortYear, 10);
	return null;
}

function makeValidDate(year, month, day) {
	if (year == null || month === undefined || !day) return null;
	const date = new Date(year, month, day);
	if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
		return date;
	}
	return null;
}

/**
 * Parseert homepage-kaart "Datum van tot" (card.text) naar een sorteerdatum.
 * Ondersteunt o.a. "14 - 18 december 2026", "15 oktober - 24 oktober '27",
 * "30 januari – 3 februari '27", "In 2026 op 6 verschillende momenten!".
 * @returns {Date|null}
 */
export function parseHomepageCardDate(dateString) {
	if (!dateString || typeof dateString !== 'string') return null;
	const s = normalizeCardDateText(dateString);

	// "14 - 18 december 2026" / "14-18 december '26"
	let m = s.match(/(\d{1,2})\s*-\s*\d{1,2}\s+([a-zA-Zë]+)\s+(?:'(\d{2})|(\d{4}))/i);
	if (m) {
		const date = makeValidDate(
			yearFromMatch(m[4], m[3]),
			DUTCH_MONTHS[m[2].toLowerCase()],
			parseInt(m[1], 10)
		);
		if (date) return date;
	}

	// "15 oktober - 24 oktober '27" / "30 januari - 3 februari '27"
	m = s.match(/(\d{1,2})\s+([a-zA-Zë]+)\s*-\s*\d{1,2}\s+([a-zA-Zë]+)\s+(?:'(\d{2})|(\d{4}))/i);
	if (m) {
		const date = makeValidDate(
			yearFromMatch(m[5], m[4]),
			DUTCH_MONTHS[m[2].toLowerCase()],
			parseInt(m[1], 10)
		);
		if (date) return date;
	}

	// "15 oktober 2026" / "15 oktober '27"
	m = s.match(/(\d{1,2})\s+([a-zA-Zë]+)\s+(?:'(\d{2})|(\d{4}))/i);
	if (m) {
		const date = makeValidDate(
			yearFromMatch(m[4], m[3]),
			DUTCH_MONTHS[m[2].toLowerCase()],
			parseInt(m[1], 10)
		);
		if (date) return date;
	}

	// Alleen jaartal: "In 2026 …" of "'27"
	m = s.match(/\b(20\d{2})\b/);
	if (m) return new Date(parseInt(m[1], 10), 0, 1);
	m = s.match(/'(\d{2})\b/);
	if (m) return new Date(2000 + parseInt(m[1], 10), 0, 1);

	return parseDutchDate(s);
}

/** Sorteersleutel voor homepage-kaarten: vroegste reisdatum eerst; daarna admin-order. */
export function compareHomepageCardsByDate(a, b) {
	const ta = parseHomepageCardDate(a?.text)?.getTime() ?? Number.POSITIVE_INFINITY;
	const tb = parseHomepageCardDate(b?.text)?.getTime() ?? Number.POSITIVE_INFINITY;
	if (ta !== tb) return ta - tb;
	return (a?.order ?? 0) - (b?.order ?? 0);
}

/**
 * Prijstabel-achtergrond uit Firestore (`row.bg`): dynamisch in className; Tailwind heeft
 * deze map-literals nodig om utilities te genereren. Oude waarden mappen naar huidig palet.
 */
const PRIJS_BG_MAP = {
  "bg-indigo-400": "bg-indigo-400",
  "bg-green-500": "bg-green-500",
  "bg-amber-500": "bg-amber-500",
  "bg-teal-400": "bg-teal-400",
  "bg-gray-300": "bg-gray-300",
  "bg-yellow-400": "bg-yellow-400",
  "bg-pink-600": "bg-pink-600",
  "bg-purple-200": "bg-indigo-400",
  "bg-green-200": "bg-green-500",
  "bg-orange-200": "bg-amber-500",
  "bg-blue-200": "bg-teal-400",
  "bg-gray-200": "bg-gray-300",
};

export function prijsRowBgClass(bg) {
  const key = typeof bg === "string" ? bg.trim() : "";
  if (!key) return "";
  return PRIJS_BG_MAP[key] ?? "";
}
