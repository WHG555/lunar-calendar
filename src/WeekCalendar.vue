<script setup lang="ts">
import {reactive} from 'vue'
import {Solar, SolarWeek} from 'lunar-typescript'
import dong_zhi from '../assets/dong_zhi.webp'
import xiao_han from '../assets/xiao_han.webp'
import da_han from '../assets/da_han.webp'
import li_chun from '../assets/li_chun.webp'
import yu_shui from '../assets/yu_shui.webp'
import jing_zhe from '../assets/jing_zhe.webp'
import chun_fen from '../assets/chun_fen.webp'
import qing_ming from '../assets/qing_ming.webp'
import gu_yu from '../assets/gu_yu.webp'
import li_xia from '../assets/li_xia.webp'
import xiao_man from '../assets/xiao_man.webp'
import mang_zhong from '../assets/mang_zhong.webp'
import xia_zhi from '../assets/xia_zhi.webp'
import xiao_shu from '../assets/xiao_shu.webp'
import da_shu from '../assets/da_shu.webp'
import li_qiu from '../assets/li_qiu.webp'
import chu_shu from '../assets/chu_shu.webp'
import bai_lu from '../assets/bai_lu.webp'
import qiu_fen from '../assets/qiu_fen.webp'
import han_lu from '../assets/han_lu.webp'
import shuang_jiang from '../assets/shuang_jiang.webp'
import li_dong from '../assets/li_dong.webp'
import xiao_xue from '../assets/xiao_xue.webp'
import da_xue from '../assets/da_xue.webp'

const now = Solar.fromDate(new Date())

const JIE_QI: { [key: string]: string } = {
  '冬至': dong_zhi,
  '小寒': xiao_han,
  '大寒': da_han,
  '立春': li_chun,
  '雨水': yu_shui,
  '惊蛰': jing_zhe,
  '春分': chun_fen,
  '清明': qing_ming,
  '谷雨': gu_yu,
  '立夏': li_xia,
  '小满': xiao_man,
  '芒种': mang_zhong,
  '夏至': xia_zhi,
  '小暑': xiao_shu,
  '大暑': da_shu,
  '立秋': li_qiu,
  '处暑': chu_shu,
  '白露': bai_lu,
  '秋分': qiu_fen,
  '寒露': han_lu,
  '霜降': shuang_jiang,
  '立冬': li_dong,
  '小雪': xiao_xue,
  '大雪': da_xue
}

class Day {
  public week: string = ''
  public day: string = ''
  public text: string = ''
  public jieQi: string = ''
  public isFestival: boolean = false
  public isToday: boolean = false
}

const state = reactive({
  year: now.getYear(),
  month: now.getMonth(),
  day: now.getDay(),
  weekIndex: 1,
  weekStart: 1,
  heads: ['一', '二', '三', '四', '五', '六', '日'],
  icon: '',
  days: new Array<Day>()
})

function buildDay(d: Solar) {
  const day = new Day()
  day.day = (d.getDay() < 10 ? '0' : '') + d.getDay()
  const lunar = d.getLunar()
  let text = lunar.getMonthInChinese() + '月' + lunar.getDayInChinese()
  let festivals = d.getFestivals()
  if (festivals.length > 0) {
    text = festivals[0]
    day.isFestival = true
  }
  festivals = lunar.getFestivals()
  if (festivals.length > 0) {
    text = festivals[0]
    day.isFestival = true
  }
  const jq = lunar.getJieQi()
  if (jq) {
    text = jq
    day.isFestival = true
  }
  day.text = text
  day.week = d.getWeekInChinese()
  if (d.toString() === now.toString()) {
    day.isToday = true
  }
  day.jieQi = lunar.getPrevJieQi(true).getName()
  return day
}

function render() {
  const week = SolarWeek.fromYmd(state.year, state.month, state.day, state.weekStart)
  state.weekIndex = week.getIndexInYear()
  const days: Day[] = []
  let jq: string = ''
  let count = 0
  week.getDays().forEach(d => {
    const day = buildDay(d)
    if (jq == '') {
      jq = day.jieQi
    }
    if (day.jieQi == jq) {
      count++
    } else if (count < 4) {
      jq = day.jieQi
    }
    days.push(day)
  })
  state.icon = JIE_QI[jq]
  state.days = days
}

render()

function onPrevWeek() {
  const week = SolarWeek.fromYmd(state.year, state.month, state.day, state.weekStart).next(-1, false)
  if (week.getYear() !== state.year) {
    state.month = 12
    state.day = 31
  } else {
    state.month = week.getMonth()
    state.day = week.getDay()
  }
  state.year = week.getYear()
  render()
}

function onNextWeek() {
  const week = SolarWeek.fromYmd(state.year, state.month, state.day, state.weekStart).next(1, false)
  if (week.getYear() !== state.year) {
    state.month = 1
    state.day = 1
  } else {
    state.month = week.getMonth()
    state.day = week.getDay()
  }
  state.year = week.getYear()
  render()
}

</script>

<template>
  <div class="calendar">
    <div class="title">
      <div class="year">{{ state.year }}</div>
      <div class="month">
        <a href="javascript:void(0);" @click="onPrevWeek">&lt;</a>
        第 {{ state.weekIndex }} 周
        <a href="javascript:void(0);" @click="onNextWeek">&gt;</a>
      </div>
    </div>
    <div class="body">
      <ul>
        <li class="icon">
          <img :src="state.icon">
        </li>
        <li v-for="day in state.days" :class="{festival: day.isFestival, today: day.isToday}">
          {{ day.day }}
          <i>{{ day.text }}</i>
          <b>周{{ day.week }}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.calendar {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  color: #303133;

  a {
    color: #409EFF;
    text-decoration: none;
  }

  div.title {
    height: 48px;
    line-height: 48px;
    font-size: 22px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #606266;

    div.year {
      color: #303133;
    }

    div.month {
      width: 120px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  div.body {
    background: #FAFCFF;
    border-left: 1px solid #CDD0D6;
    border-top: 1px solid #CDD0D6;
    overflow: hidden;
    width: 831px;

    ul {
      list-style: none;

      li {
        position: relative;
        display: block;
        float: left;
        width: 90px;
        height: 300px;
        border-right: 1px solid #CDD0D6;
        border-bottom: 1px solid #CDD0D6;
        font-size: 26px;
        padding-top: 20px;
        overflow: hidden;

        i {
          position: absolute;
          display: block;
          right: 5px;
          top: 80px;
          font-style: normal;
          width: 12px;
          font-size: 12px;
          color: #909399;
        }

        b {
          position: absolute;
          display: block;
          right: 5px;
          top: 25px;
          font-weight: normal;
          width: 12px;
          font-size: 12px;
          color: #606266;
        }

      }

      li.icon {
        width: 200px;
        padding: 0;

        img {
          width: 200px;
        }
      }

      li.festival {
        i {
          color: #F56C6C;
        }
      }

      li.today {
        color: #E6A23C;
        font-weight: bold;
      }
    }
  }
}
</style>
