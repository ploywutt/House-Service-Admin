
function useDateVal() {
	function formatDateTime(dateTimeString: string): string {
		let dateTime
		if (dateTimeString.includes("Z")) {
			let timeString = dateTimeString.slice(0, dateTimeString.length - 1)
			dateTime = new Date(timeString);
		} else {
			dateTime = new Date(dateTimeString)
		}
		const year = dateTime.getFullYear();
		const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // เริ่มจาก 0
		const day = dateTime.getDate().toString().padStart(2, '0');
		let hour = dateTime.getHours()
		let newHour: string;
		if (hour == 24) {
			hour = 0
			newHour = hour.toString().padStart(2, '0');
		} else if (hour > 12) {
			hour -= 12
			newHour = hour.toString().padStart(2, '0');
		} else {
			newHour = hour.toString().padStart(2, '0');
		}
		const minute = dateTime.getMinutes().toString().padStart(2, '0');
		const ampm = dateTime.getHours() < 12 ? 'AM' : 'PM';

		const formatDateTime = `${day}/${month}/${year} ${newHour}:${minute}${ampm}`;
		return formatDateTime
	}

	function StringToDate(formattedDateTime: string) {
		// สมมติว่า formattedDateTime เป็นข้อความที่เก็บวันที่และเวลาในรูปแบบ LocaleString
		// const formattedDateTime = "10/09/2023, 14:30:00 PM"; // เป็นตัวอย่างเท่านั้น

		// แปลง formattedDateTime กลับเป็น Date
		const parsedDate = new Date(formattedDateTime);

		// แปลง Date กลับเป็น ISO-8601 DateTime โดยไม่เปลี่ยนเวลา
		const isoDateTime = new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000).toISOString();

		return isoDateTime
	}

	return { formatDateTime, StringToDate }

}

export default useDateVal

