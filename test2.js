/** 解析日期
 * { year: 2021, month: 7, day: 30, hour: 18, minute: 52, second: 0, week: 5, Y: 2021, M: 7, D: 30, h: 18, m: 52, s: 0, w: 5, YY: '21', MM: '07', DD: '30', hh: '18', mm: '52', ss: '00'} */ 
function parseDate(date) {
    const DATE = date ? new Date(date) : new Date()
    const Y = DATE.getFullYear(), M = DATE.getMonth() + 1, D = DATE.getDate(), h = DATE.getHours(), m = DATE.getMinutes(), s = DATE.getSeconds(), w = DATE.getDay()
    const YY = (Y + '').substr(2), MM = M < 10 ? '0' + M : M + '', DD = D < 10 ? '0' + D : D + '', hh = h < 10 ? '0' + h : h + '', mm = m < 10 ? '0' + m : m + '', ss = s < 10 ? '0' + s : s + ''   
    return {year: Y, month: M, day: D, hour: h, minute: m, second: s, week: w, Y, M, D, h, m, s, w, YY, MM, DD, hh, mm, ss}
}

/** 格式化时间
 *  formatDate('YYYY-M-D h:m', '2008.06.22 12:33')  2008-6-22 12:33
 *  formatDate('YYYY-MM-DD h:m', new Date())        2021-07-30 19:22
 *  formatDate('YYYY-MM-DD h:m', 1627624608866)     2021-07-30 13:56
 *  formatDate('YYYY-M-D h:m:s', null)              2021-7-30 19:22:40
 *  formatDate('YYYY-M-D h:m:s')                    2021-7-30 19:22:40
 *  formatDate()                                    2021-07-30 */
 function formatDate(fmt, dt) {    
    const {Y, M, D, h, m, s, w, YY, MM, DD, hh, mm, ss} = parseDate(dt)
    if (fmt) {
        const weekMap = ['日','一','二','三','四','五','六']
        const o = {"YYYY": Y, "YY": YY, "Y": Y, "MM": MM, "M": M, "DD": DD, "D": D, "hh": hh, "h": h, "mm": mm, "m": m, "ss": ss, "s": s} 
        if(/(Y+)/.test(fmt)) {fmt = fmt.replace(RegExp.$1, (Y + "").substr(4 - RegExp.$1.length))}
        if(/(w+)/.test(fmt)) {fmt = fmt.replace(RegExp.$1, '星期' + weekMap[w])}
        for(var k in o) {fmt = fmt.replace(new RegExp("("+ k +")"), o[k])}
        return fmt
    }    
    return Y + '-' + MM + '-' + DD
}

// 今日之前n天的集合
function beforeTodayDays(days) {
    let NOW_STAMP = (new Date()).getTime()
    let arr = []
    while(days >= 0){        
        arr.push(formatDate('YYYY-MM-DD', NOW_STAMP))
        NOW_STAMP -= (24 * 60 * 60 * 1000)
        days--
    }
    return arr
}

// 今日之前n天 起始与结束日期
function beforeTodayDaysRange(days) {
    const NOW = new Date()
    const START_STAMP = NOW.getTime() - 24 * 60 * 60 * 1000 * days
    return [formatDate('YYYY-MM-DD', START_STAMP), formatDate('YYYY-MM-DD', NOW)]
}

module.exports = {
    parseDate,
    formatDate,
    beforeTodayDays,
    yesterday: () => beforeTodayDays(1)[1],
    latestSevenDays: () => beforeTodayDays(7),
    latestFifteenDays: () => beforeTodayDays(15),
    latestThirtyDaysRange: () => beforeTodayDaysRange(30),
    latestThirtyDays: () => beforeTodayDays(30)
}