// 导入时间包
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 获取相对时间的方法
export const fmtDate = (value) => {
  // console.log(dayjs())
  // dayjs() 获取当前时间（dayjs中一个特殊的对象）
  // dayjs(value) 指定的时间（dayjs中一个特殊的对象）
  return dayjs().from(dayjs(value))
}
