import dayjs from "dayjs";

export let from_day: string;
export let end_day: string;
const today: dayjs.Dayjs = dayjs();
const isSunday: boolean = today.day() === 0;
//ローカルタイムゾーン取得するにはisoではなくformatを使用
if (isSunday) {
  from_day = dayjs().subtract(1, "week").startOf("week").add(1, "day").format();
  end_day = dayjs().subtract(1, "week").endOf("week").add(1, "day").format();
} else {
  from_day = dayjs().startOf("week").add(1, "day").format();
  end_day = dayjs().endOf("week").add(1, "day").format();
}