
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

	function formatTime(dateTimeString: string): string {
		let dateTime
		if (dateTimeString.includes("Z")) {
			let timeString = dateTimeString.slice(0, dateTimeString.length - 1)
			dateTime = new Date(timeString);
		} else {
			dateTime = new Date(dateTimeString)
		}

		const hour = dateTime.getHours().toString().padStart(2, '0')
		const minute = dateTime.getMinutes().toString().padStart(2, '0')

		const formatTime = `${hour}:${minute}`
		return formatTime
	}

	function StringToDate(dateString: string) {
		// Ex. dateString = "30/09/2023, 22:05";
		const parts = dateString.split(", "); // แยกวันที่และเวลา ---> ["30/09/2023", "22:05"]
		const dateParts = parts[0].split("/"); // แยกวันที่ออกเป็นส่วนย่อย ["30", "09", "2023"]
		const timeParts = parts[1].split(":"); // แยกเวลาออกเป็นส่วนย่อย ["22", "05"]

		const year = +(dateParts[2]);
		const month = +(dateParts[1]) - 1; // เดือนต้องลบ 1 เนื่องจาก JavaScript เริ่มนับเดือนที่ 0
		const day = +(dateParts[0]);
		const hour = +(timeParts[0]);
		const minute = +(timeParts[1]);

		const dateObj = new Date(year, month, day, hour, minute);

		return dateObj;
	}

	function getDateTime(dateTimeString: Date) {
		if (!dateTimeString) {
			return
		}

		const year = dateTimeString.getFullYear();
		const month = (dateTimeString.getMonth() + 1).toString().padStart(2, '0'); // เริ่มจาก 0
		const day = dateTimeString.getDate().toString().padStart(2, '0');

		const formatDateString = `${day}/${month}/${year}`

		return formatDateString
	}

	return { formatDateTime, StringToDate, getDateTime, formatTime }

}

export default useDateVal

