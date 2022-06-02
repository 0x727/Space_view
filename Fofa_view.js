// ==UserScript==
// @name         FOFA view
// @namespace    http://tampermonkey.net/
// @version      0.4.0
// @description  Send the current website to FOFA
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

GM_registerMenuCommand ("FOFA Login",Login, "l");
GM_registerMenuCommand ("FOFA 识别结果",FofaFind, "s");

function Login(){
    var username=prompt("Please enter Fofa Username","")
    var FofaKey=prompt("Please enter Fofa Key","")
    if(FofaKey== null || FofaKey== "" || username== null || username== ""){
        alert("未登录")
        return;
    }
    GM_setValue("username",username);
    GM_setValue("FofaKey",FofaKey);
}



function FofaFind(){
  const body = document.getElementsByTagName('body')[0]
const div = document.createElement('div')
div.innerHTML = `<div style="font-size:14px;color:rgba(0,0,0,0.65);box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) ;background-color: #fff;border-radius: 5px;border: 1px solid #ebebeb;left:20px;top:20px;position: fixed;z-index: 1000000">
      <div style="display: flex;justify-content: flex-end;margin-right: 8px;">
        <div style="color:rgb(24, 36, 127);cursor: pointer;margin-left: 8px;margin-top: 4px;font-size: 12px;margin-bottom: 4px;display: none" class="icon-xiajiantou-fofa">Fofa展开</div>
        <div style="cursor: pointer;font-size: 12px;margin-top: 2px;color:rgb(96, 98, 102);" class="icon-xiajiantou-copy-fofa">隐藏</div>
      </div>
      <div class="plugs_content_fofa" style="padding-bottom: 10px;">
        <div style="margin-left: 4px;border-radius: 2px;display: inline-block;padding: 8px;padding-right: 40px;">
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">地区:</div>
            <div class="area_fofa" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
          </div>
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">运营商和org:</div>
            <div class="org_fofa" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
          </div>
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">协议:</div>
            <div class="protocol_fofa" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
          </div>
          <div style="margin-bottom: 4px;display: flex">
            <div style="margin-right: 6px;white-space: nowrap">端口:</div>
            <div class="port_fofa">null</div>
          </div>
        </div>
      <div class="copy-text-data" style="cursor: pointer;display: flex;margin-top: 8px;border-top:1px solid #ebebeb;justify-content: flex-end;padding-right: 4px;">
            复制
      </div>
        <ul class="demo1" style="width: 100%;max-height: 350px;max-width: 600px; overflow: auto;">
        <div style="display: flex;margin-top: 8px;">
          <div style="padding: 0 10px;">
            <div class="table_title_fofa">
              null
            </div>
          </div>
          <div style="padding: 0 10px;">
            <div class="table_protocol_fofa">
              null
            </div>
          </div>
          <div style="padding: 0 10px;">
            <div class="table_port_fofa">
              null
            </div>
          </div>
          <div style="padding: 0 10px;">
            <div class="table_server_fofa">
              null
            </div>
          </div>
          <div style="padding: 0 10px;">
            <div class="table_url_fofa">
              <div>
                <a href="" class="url1" style="color: #1890ff;text-decoration: none">url</a>
              </div>
            </div>
          </div>
        </div>
        <ul>
      </div>
    </div>`
body.appendChild(div)
    var username = GM_getValue("username");
    var FofaKey = GM_getValue("FofaKey");
    var url
    var search
    var Fofa_url = "https://fofa.info/api/v1/search/all?email="+ username + "&key=" + FofaKey + "&fields=country,province,city,isp,as_organization,ip,title,protocol,port,host,server&qbase64="
    var target = window.location.hostname // 获取域名或者ip
    var isValidIP_reg=/(\d{1,3}\.){3}\d{1,3}/ 
    var messaage = {}
    messaage.type = 2
    messaage.message = target
    const msg = JSON.stringify(messaage)
    if (isValidIP_reg.test(target))
    {
        search = btoa('ip=="'+target+'"')
        url = Fofa_url+search
    }
    else
    {
        search = btoa('host=="'+target+'"')
        url = Fofa_url+search
    }
    GM_xmlhttpRequest({
        url:url,
        method :"GET",
        data:msg,
        onload:function(xhr){
            const data = JSON.parse(xhr.responseText)

            const top_icon = document.getElementsByClassName('icon-xiajiantou-copy-fofa')[0]
            const bottom_icon = document.getElementsByClassName('icon-xiajiantou-fofa')[0]
            const content = document.getElementsByClassName('plugs_content_fofa')[0]
            const copy = document.getElementsByClassName('copy-text-data')[0]

            const area = document.getElementsByClassName('area_fofa')[0]
            const org = document.getElementsByClassName('org_fofa')[0]
            const protocol = document.getElementsByClassName('protocol_fofa')[0]
            const port = document.getElementsByClassName('port_fofa')[0]

            const table_title = document.getElementsByClassName('table_title_fofa')[0]
            const table_protocol = document.getElementsByClassName('table_protocol_fofa')[0]
            const table_port = document.getElementsByClassName('table_port_fofa')[0]
            const table_server = document.getElementsByClassName('table_server_fofa')[0]
            const table_url = document.getElementsByClassName('table_url_fofa')[0]

            let title_innerHTML = `<div style='white-space: nowrap'>标题</div>`
            let protocol_innerHTML = `<div style='white-space: nowrap'>协议</div>`
            let port_innerHTML = `<div style='white-space: nowrap'>端口</div>`
            let server_innerHTML = `<div style='white-space: nowrap'>server</div>`
            let url_innerHTML = `<div style='white-space: nowrap'>url</div>`
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

            const target_data = data.results || []

            target_data.forEach(item=>{
                title_innerHTML = title_innerHTML + `<div style="white-space: nowrap;height: 20px">${item[6]}</div>`
                protocol_innerHTML = protocol_innerHTML + `<div style="white-space: nowrap;height: 20px">${item[7]}</div>`
                if (item[7] == "http" || item[7] == "https")
                {
                    var urlNoProtocol = item[9].replace(/^https?\:\/\//i, "");
                    var urlProtocol = item[7] + "://" +urlNoProtocol
                    url_innerHTML = url_innerHTML + `<div style="white-space: nowrap;height: 20px"><a href="${urlProtocol}" target='_blank' style="color: #1890ff;text-decoration: none">${urlProtocol}</a></div>`
                }
                else
                {
                    url_innerHTML = url_innerHTML + `<div style="white-space: nowrap;height: 20px"><a href="" target='_blank' style="color: #1890ff;text-decoration: none"></a></div>`
                }
                port_innerHTML = port_innerHTML + `<div style="white-space: nowrap;height: 20px">${item[8]}</div>`
                server_innerHTML = server_innerHTML + `<div style="white-space: nowrap;height: 20px">${item[10]}</div>`
            })

            table_title.innerHTML = title_innerHTML
            table_protocol.innerHTML = protocol_innerHTML
            table_port.innerHTML = port_innerHTML
            table_server.innerHTML = server_innerHTML
            table_url.innerHTML = url_innerHTML

            copy.onclick = ()=>{
                const target = target_data.map((item)=>{
                    const copy_target_data = item[6] + '  ' + item[7] + '  ' + item[8] + '  ' + item[10] + '  ' + item[9] + '\r\n'
                    return copy_target_data
                })
                const input = document.createElement('textarea')
                document.body.appendChild(input)
                input.value = target.join('')
                input.select()
                document.execCommand("copy")
                document.body.removeChild(textarea)
          }


            const target_location = target_data[0] || {}

            area.textContent = [target_location[0] || '',target_location[1] || '',target_location[2] || ''].filter(item=>item).join('-') || ''

            org.textContent = [target_location[3] || '',target_location[4] || ''].filter(item=>item).join(',') || ''

            protocol.textContent = Array.from(new Set(target_data.filter(item=>item[7]).map(item=>item[7]))).join(',')

            port.textContent = Array.from(new Set(target_data.filter(item=>item[8]).map(item=>item[8]))).join(',')


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
        }
    });
}
