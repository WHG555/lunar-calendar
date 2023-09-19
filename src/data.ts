import {Solar, SolarMonth, SolarWeek, HolidayUtil} from 'lunar-typescript'
import {reactive, watch} from 'vue'

const now = Solar.fromDate(new Date())

class Day {
    public month: number = 0
    public day: number = 0
    public lunarDay: string = ''
    public lunarMonth: string = ''
    public yearGanZhi: string = ''
    public yearShengXiao: string = ''
    public monthGanZhi: string = ''
    public dayGanZhi: string = ''
    public ymd: string = ''
    public desc: string = ''
    public isToday: boolean = false
    public isSelected: boolean = false
    public isRest: boolean = false
    public isHoliday: boolean = false
    public festivals: string[] = []
    public yi: string[] = []
    public ji: string[] = []
}

class Week {
    public days: Day[] = []
}

class Month {
    public heads: string[] = []
    public weeks: Week[] = []
}

class Holiday {
    public name: string = ''
    public month: number = 0
}
  
export const state = reactive({
    year: now.getYear(),
    month: now.getMonth(),
    weekStart: 1,
    selected: new Day(),
    data: new Month(),
    holidays: new Array<Holiday>(),
    holidayMonth: 0
})
