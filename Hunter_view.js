// ==UserScript==
// @name         Hunter view
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Send the current website to Hunter
// @author       0cat
// @match        http://*/*
// @match        https://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      *
// @license MIT
// ==/UserScript==

GM_registerMenuCommand ("Hunter Login",Login, "l");
GM_registerMenuCommand ("Hunter 识别结果",HunterFind, "s");

function Login(){
    var username=prompt("Please enter Hunter Username","111")
    var HunterKey=prompt("Please enter Hunter Key","")
    if(HunterKey== null || HunterKey== "" || username== null || username== ""){
        alert("未登录")
        return;
    }
    GM_setValue("username",username);
    GM_setValue("HunterKey",HunterKey);
}

function getNewDate(flag, many) {

    const thirtyDays = [4, 6, 9, 11] // 30天的月份
    const thirtyOneDays = [1, 3, 5, 7, 8, 10, 12] // 31天的月份
    const currDate = new Date() // 今天日期
    const year = currDate.getFullYear()
    let month = currDate.getMonth() + 1
    let targetDateMilli = 0
    let GMTDate = '' // 中国标准时间
    let targetYear = '' // 年
    let targetMonth = '' // 月
    let targetDate = '' // 日
    let dealTargetDays = '' // 目标日期
    let hh = currDate.getHours() < 10 ? "0" + currDate.getHours() : currDate.getHours();//时
    let mm = currDate.getMinutes() < 10 ? "0" + currDate.getMinutes() : currDate.getMinutes();//分
    let ss = currDate.getSeconds() < 10 ? "0" + currDate.getSeconds() : currDate.getSeconds();//秒

    let dealDate='' //YYYY-MM-DD HH:MM:SS
    const isLeapYear =
        !!((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) // 是否是闰年
    // console.log(isLeapYear, "isLeapYear");
    let countDays = 0 // 累计天数
    for (let i = 0; i < many; i++) {
        if (flag === 'before') {
        month = month - 1 <= 0 ? 12 : month - 1
        } else {
        month = month + 1 > 12 ? 1 : month + 1
        }
        thirtyDays.includes(month)
        ? (countDays += 30)
        : thirtyOneDays.includes(month)
            ? (countDays += 31)
            : isLeapYear
            ? (countDays += 29)
            : (countDays += 28)
    }
    targetDateMilli = currDate.setDate(
        currDate.getDate() - (flag === 'before' ? countDays : countDays * -1)
    )
    GMTDate = new Date(targetDateMilli)
    targetYear = GMTDate.getFullYear()
    targetMonth = GMTDate.getMonth() + 1
    targetDate = GMTDate.getDate()
    targetMonth = targetMonth.toString().padStart(2, '0')
    targetDate = targetDate.toString().padStart(2, '0')
    dealTargetDays = `${targetYear}-${targetMonth}-${targetDate}`
    dealDate = dealTargetDays+ " " + hh + ":" + mm + ":" + ss;

    return dealDate
}

function HunterFind(){
  const body = document.getElementsByTagName('body')[0]
const div = document.createElement('div')
div.innerHTML = `<div style="font-size:14px;color:rgba(0,0,0,0.65);box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) ;background-color: #fff;border-radius: 5px;border: 1px solid #ebebeb;right:20px;top:20px;position: fixed;z-index: 1000000">
      <div style="display: flex;justify-content: flex-end;margin-right: 8px;">
        <div style="color:rgb(24, 36, 127);cursor: pointer;margin-left: 8px;margin-top: 4px;font-size: 12px;margin-bottom: 4px;display: none" class="icon-xiajiantou">Hunter展开</div>
        <div style="cursor: pointer;font-size: 12px;margin-top: 2px;color:rgb(96, 98, 102);" class="icon-xiajiantou-copy">隐藏</div>
      </div>
      <div class="plugs_content" style="padding-bottom: 20px;">
        <div style="margin-left: 4px;border-radius: 2px;display: inline-block;padding: 8px;padding-right: 40px;">
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">地区:</div>
            <div class="area" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
          </div>
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">运营商和org:</div>
            <div class="org" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
          </div>
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">协议:</div>
            <div class="protocol" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
          </div>
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">端口:</div>
            <div class="port">null</div>
          </div>
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">剩余积分:</div>
            <div class="surplus">null</div>
          </div>
        </div>
        <div style="display: flex;margin-top: 8px;border-top:1px solid #ebebeb;padding-top: 10px;width: 100%;">

        </div>
        <div style="display: flex;margin-top: 8px;">
          <div style="padding: 0 10px;">
            <div class="table_title">
              null
            </div>
          </div>
          <div style="padding: 0 10px;">
            <div class="table_protocol">
              null
            </div>
          </div>
          <div style="padding: 0 10px;">
            <div class="table_port">
              null
            </div>
          </div>
          <div style="padding: 0 10px;">
            <div class="table_code">
              null
            </div>
          </div>
          <div style="padding: 0 10px;">
            <div class="table_url">
              <div>
                <a href="" class="url1" style="color: #1890ff;text-decoration: none">xxxxx</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
body.appendChild(div)
    var username = GM_getValue("username");
    var HunterKey = GM_getValue("HunterKey");
    var url
    var search
    var Hunter_url = "https://hunter.qianxin.com/openApi/search?username="+ username + "&api-key=" + HunterKey + "&page=1&page_size=20&is_web=3&start_time=\"" + getNewDate("before", 3) + "\" &end_time=\""+ getNewDate() +"\"&search="
    var target = window.location.hostname // 获取域名或者ip
    var isValidIP_reg=/(\d{1,3}\.){3}\d{1,3}/ //判断是否是ip还是domain
    var messaage = {}
    messaage.type = 2
    messaage.message = target
    const msg = JSON.stringify(messaage)
    if (isValidIP_reg.test(target))
    {
        search = btoa('ip=="'+target+'"')
        url = Hunter_url+search
    }
    else
    {
        search = btoa('domain=="'+target+'"')
        url = Hunter_url+search
    }
    GM_xmlhttpRequest({
        url:url,
        method :"GET",
        data:msg,
        onload:function(xhr){
            const res = JSON.parse(xhr.responseText)

            const top_icon = document.getElementsByClassName('icon-xiajiantou-copy')[0]
            const bottom_icon = document.getElementsByClassName('icon-xiajiantou')[0]
            const content = document.getElementsByClassName('plugs_content')[0]

            const area = document.getElementsByClassName('area')[0]
            const org = document.getElementsByClassName('org')[0]
            const protocol = document.getElementsByClassName('protocol')[0]
            const port = document.getElementsByClassName('port')[0]
            const surplus = document.getElementsByClassName('surplus')[0]

            const table_title = document.getElementsByClassName('table_title')[0]
            const table_protocol = document.getElementsByClassName('table_protocol')[0]
            const table_port = document.getElementsByClassName('table_port')[0]
            const table_code = document.getElementsByClassName('table_code')[0]
            const table_url = document.getElementsByClassName('table_url')[0]

            let title_innerHTML = `<div>标题</div>`
            let protocol_innerHTML = `<div>协议</div>`
            let port_innerHTML = `<div>端口</div>`
            let code_innerHTML = `<div>状态码</div>`
            let url_innerHTML = `<div>url</div>`

            const data = res.data || {}

            const target_data = data.arr || []

            target_data.forEach(item=>{
                title_innerHTML = title_innerHTML + `<div style="white-space: nowrap;height: 20px">${item.web_title}</div>`
                protocol_innerHTML = protocol_innerHTML + `<div style="white-space: nowrap;height: 20px">${item.protocol}</div>`
                code_innerHTML = code_innerHTML + `<div style="white-space: nowrap;height: 20px">${item.status_code}</div>`
                url_innerHTML = url_innerHTML + `<div style="white-space: nowrap;height: 20px"><a href="${item.url}" target='_blank' style="color: #1890ff;text-decoration: none">${item.url}</a></div>`
                port_innerHTML = port_innerHTML + `<div style="white-space: nowrap;height: 20px">${item.port}</div>`
            })

            table_title.innerHTML = title_innerHTML
            table_protocol.innerHTML = protocol_innerHTML
            table_code.innerHTML = code_innerHTML
            table_port.innerHTML = port_innerHTML
            table_url.innerHTML = url_innerHTML

            const target_location = target_data[0] || {}

            area.textContent = [target_location.country || '',target_location.province || '',target_location.city || ''].filter(item=>item).join('-') || ''

            org.textContent = target_data[0].as_org || ''

            protocol.textContent = Array.from(new Set(target_data.filter(item=>item.protocol).map(item=>item.protocol))).join(',')

            port.textContent = Array.from(new Set(target_data.filter(item=>item.port).map(item=>item.port))).join(',')

            surplus.textContent = data.rest_quota.split('：')[1] || ''

            port.style.wordWrap = 'break-word'
            port.style.wordBreak = 'normal'
            port.style.overflow = 'hidden'
            port.style.width = '350px'

            protocol.style.wordWrap = 'break-word'
            protocol.style.wordBreak = 'normal'
            protocol.style.overflow = 'hidden'
            protocol.style.width = '350px'

            area.style.wordWrap = 'break-word'
            area.style.wordBreak = 'normal'
            area.style.overflow = 'hidden'
            area.style.width = '350px'

            org.style.wordWrap = 'break-word'
            org.style.wordBreak = 'normal'
            org.style.overflow = 'hidden'
            org.style.width = '350px'

            top_icon.onclick = ()=>{
                content.style.display = 'none'
                top_icon.style.display = 'none'
                bottom_icon.style.display = 'block'
            }

            bottom_icon.onclick = ()=>{
                content.style.display = 'block'
                top_icon.style.display = 'block'
                bottom_icon.style.display = 'none'
            }
        }
    });
}
