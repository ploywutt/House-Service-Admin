
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

import calendaricon from "../assets/icon/calendar.svg"

function DatePicker({ date, setDate }: any) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id="calendar"
					className={cn(
						"w-48 h-11 px-4 py-2.5 text-gray-900 bg-white rounded-lg border border-gray-300 justify-between items-center inline-flex focus:border focus:border-blue-500 text-base font-normal relative hover:bg-gray-100 active:bg-gray-300",
						!date &&
						"text-muted-foreground text-gray-700 text-base font-normal"
					)}
				>
					{date ? (
						format(date, "dd/MM/yyyy")
					) : (
						<span>กรุณาเลือกวันที่</span>
					)}
					<img src={calendaricon} className="absolute right-4 " />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

export default DatePicker