import md5 from 'md5';
export function GenerateHash(): string {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();
	const hash = md5(`Valantis_${yyyy}${mm}${dd}`).toString();
	return hash;
}
