import clockicon from "../assets/icon/clock.svg";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function TimePicker(props: {
  hour: string[];
  minute: string[];
  handleHour: (e: string) => void;
  handleMinute: (e: string) => void;
  clickHour: string;
  clickMinute: string;
  selectedTime: string;
  setSelectedTime: (e: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          // variant={"outline"}
          id="time"
          className={cn(
            "w-44 h-11 px-4 py-2.5 text-gray-900 bg-white rounded-lg border border-gray-300 justify-between items-center inline-flex focus:border focus:border-blue-500 text-base font-normal relative hover:bg-gray-100 active:bg-gray-300",
            !props.selectedTime &&
              "text-muted-foreground text-gray-700 text-base font-normal"
          )}
        >
          {props.selectedTime ? (
            `${props.selectedTime}`
          ) : (
            <span>กรุณาเลือกเวลา</span>
          )}
          <img src={clockicon} className="absolute right-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-[164px] h-[298px] bg-white rounded-lg shadow p-0 realtive">
        <div className="flex">
          <ScrollArea className=" w-20 h-[246px] rounded-tl-md p-1">
            {props.hour.map((item, index: number) => {
              return (
                <Button
                  // variant="picker"
                  key={index}
                  className="bg-transparent text-gray-700 text-base font-normal cursor-pointer w-10/12 h-[37px] px-3"
                  onClick={() => {
                    props.handleHour(item);
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </ScrollArea>
          <Separator orientation="vertical" />
          <ScrollArea className="w-20 h-[246px] rounded-tr-md p-1">
            {props.minute.map((item, index: number) => {
              return (
                <Button
                  // variant="picker"
                  key={index}
                  className="bg-transparent text-gray-700 text-base font-normal cursor-pointer w-10/12 h-[37px] px-3 "
                  onClick={() => {
                    props.handleMinute(item);
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </ScrollArea>
        </div>
        <div className="w-[164px] h-[52px] flex justify-between items-center border-t bottom-0 absolute">
          <div className="pl-4 text-gray-900">
            {props.clickHour}:{props.clickMinute}
          </div>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              props.setSelectedTime(`${props.clickHour}:${props.clickMinute}`);
            }}
          >
            ยืนยัน
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default TimePicker;
