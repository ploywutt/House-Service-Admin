
function useDateVal() {

	function formatDateTime(dateTimeString: string): string {
		const dateTime = new Date(dateTimeString);
		const year = dateTime.getUTCFullYear();
		const month = (dateTime.getUTCMonth() + 1).toString().padStart(2, '0'); // เริ่มจาก 0
		const day = dateTime.getUTCDate().toString().padStart(2, '0');
		const hour = dateTime.getUTCHours().toString().padStart(2, '0');
		const minute = dateTime.getUTCMinutes().toString().padStart(2, '0');
		const ampm = dateTime.getUTCHours() < 12 ? 'AM' : 'PM';

		return `${day}/${month}/${year} ${hour}:${minute}${ampm}`;
	}
	return formatDateTime

}

export default useDateVal