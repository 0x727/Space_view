// ==UserScript==
// @name         Hunter view
// @namespace    http://tampermonkey.net/
// @version      0.5
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

GM_registerMenuCommand("Hunter Login", openLoginForm, "l");
GM_registerMenuCommand("Hunter 识别结果", HunterFind, "s");

// 创建自定义输入表单
function openLoginForm() {
    const body = document.getElementsByTagName('body')[0];
    const loginDiv = document.createElement('div');
    loginDiv.innerHTML = `
    <div style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background-color:white; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0, 0, 0, 0.5); z-index:100000;">
        <h3>Login to Hunter</h3>
        <label>Username (一般是手机号):
            <input type="text" id="hunterUsername" style="width:100%;" placeholder="e.g., 1234567890" />
        </label><br/><br/>
        <label>Hunter ApiKey:
            <input type="password" id="hunterKey" style="width:100%;" />
        </label><br/><br/>
        <button id="loginSubmit">Submit</button>
        <button id="loginCancel">Cancel</button>
    </div>
    `;
    body.appendChild(loginDiv);

    document.getElementById('loginSubmit').onclick = function() {
        const username = document.getElementById('hunterUsername').value;
        const HunterKey = document.getElementById('hunterKey').value;
        if (username && HunterKey) {
            GM_setValue("username", username);
            GM_setValue("HunterKey", HunterKey);
            alert("Login successful!");
            body.removeChild(loginDiv);  // Remove form after login
        } else {
            alert("Please fill in both fields.");
        }
    };

    document.getElementById('loginCancel').onclick = function() {
        body.removeChild(loginDiv);
    };
}

function HunterFind() {
    var username = GM_getValue("username");
    var HunterKey = GM_getValue("HunterKey");

    if (!username || !HunterKey) {
        console.error("No username or HunterKey found");
        return;
    }

    const body = document.getElementsByTagName('body')[0];
    const div = document.createElement('div');
    div.innerHTML = `<div style="font-size:14px;color:rgba(0,0,0,0.65);box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) ;background-color: #fff;border-radius: 5px;border: 1px solid #ebebeb;right:20px;top:20px;position: fixed;z-index: 1000000">
        <div style="display: flex;justify-content: flex-end;margin-right: 8px;">
          <div id="expandBtn" style="color:rgb(24, 36, 127);cursor: pointer;margin-left: 8px;margin-top: 4px;font-size: 12px;margin-bottom: 4px;display: none">Hunter展开</div>
          <div id="hideBtn" style="cursor: pointer;font-size: 12px;margin-top: 2px;color:rgb(96, 98, 102);">隐藏</div>
        </div>
        <div id="contentDiv" class="plugs_content" style="padding-bottom: 10px;">
          <div style="margin-left: 4px;border-radius: 2px;display: inline-block;padding: 8px;padding-right: 40px;">
            <div style="margin-bottom: 4px;display: flex">
              <div style="margin-right: 6px;white-space: nowrap">RDAP_IP_CIDR:</div>
              <div class="rdap_cidr" style="word-wrap:break-word;word-break:normal;overflow: hidden;">N/A</div>
            </div>
            <div style="margin-bottom: 4px;display: flex">
              <div style="margin-right: 6px;white-space: nowrap">RDAP_描述:</div>
              <div class="rdap_description" style="word-wrap:break-word;word-break:normal;overflow: hidden;">N/A</div>
            </div>
            <div style="margin-bottom: 4px;display: flex">
              <div style="margin-right: 6px;white-space: nowrap">地区:</div>
              <div class="area" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
            </div>
            <div style="margin-bottom: 4px;display: flex">
              <div style="margin-right: 6px;white-space: nowrap">运营商和org:</div>
              <div class="org" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
            </div>
            <div style="margin-bottom: 4px;display: flex">
              <div style="margin-right: 6px;white-space: nowrap">ICP:</div>
              <div class="icpnumber" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
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
        <div class="copy-text-data" style="cursor: pointer;display: flex;margin-top: 8px;border-top:1px solid #ebebeb;justify-content: flex-end;padding-right: 4px;">
              复制
        </div>
          <ul class="demo1" style="width: 100%;max-height: 350px;max-width: 600px; overflow: auto;">
          <div style="display: flex;margin-top: 8px;">
            <div style="padding: 0 10px;">
              <div class="table_title">null</div>
            </div>
            <div style="padding: 0 10px;">
              <div class="table_protocol">null</div>
            </div>
            <div style="padding: 0 10px;">
              <div class="table_port">null</div>
            </div>
            <div style="padding: 0 10px;">
              <div class="table_code">null</div>
            </div>
            <div style="padding: 0 10px;">
              <div class="table_url">
                <div>
                  <a href="" class="url1" style="color: #1890ff;text-decoration: none">url</a>
                </div>
              </div>
            </div>
          </div>
          </ul>
        </div>
      </div>`;
    body.appendChild(div);
    // 隐藏/展开功能
    const hideBtn = document.getElementById('hideBtn');
    const expandBtn = document.getElementById('expandBtn');
    const contentDiv = document.getElementById('contentDiv');

    hideBtn.onclick = function() {
        contentDiv.style.display = 'none';
        hideBtn.style.display = 'none';
        expandBtn.style.display = 'block';
    };

    expandBtn.onclick = function() {
        contentDiv.style.display = 'block';
        hideBtn.style.display = 'block';
        expandBtn.style.display = 'none';
    };

    var target = window.location.hostname;

    var isValidIP_reg = /(\d{1,3}\.){3}\d{1,3}/;

    // 如果是 IP，则执行 RDAP 查询
    if (isValidIP_reg.test(target)) {
        // 发起 RDAP 请求
        var rdap_url = `https://rdap.apnic.net/ip/${target}`;
        GM_xmlhttpRequest({
            method: "GET",
            url: rdap_url,
            onload: function(xhr) {
                if (xhr.status !== 200) {
                    console.error("RDAP Request failed, status code:", xhr.status);
                    return;
                }
                const rdap_res = JSON.parse(xhr.responseText);

                // 提取 CIDR 和描述
                const handle = rdap_res.handle;
                const cidr = rdap_res.cidr0_cidrs[0].v4prefix + "/" + rdap_res.cidr0_cidrs[0].length;
                const description = rdap_res.remarks[0].description[0] || 'N/A';

                // 将 CIDR 和描述信息填充到小卡片中
                const rdap_cidr_element = document.getElementsByClassName('rdap_cidr')[0];
                const rdap_description_element = document.getElementsByClassName('rdap_description')[0];
                rdap_cidr_element.textContent = cidr || 'N/A';
                rdap_description_element.textContent = description || 'N/A';

            },
            onerror: function(xhr) {
                console.error("RDAP Request error:", xhr);
            }
        });
    }

    var Hunter_url = "https://hunter.qianxin.com/openApi/search?username=" + username + "&api-key=" + HunterKey + "&page=1&page_size=50&is_web=3&start_time=" + getNewDate("before", 6) + "&end_time=" + getNewDate() + "&search=";

    var search, url;

    if (isValidIP_reg.test(target)) {
        search = btoa('ip=="' + target + '"');
        url = Hunter_url + search;
    } else {
        search = btoa('domain=="' + target + '"');
        url = Hunter_url + search;
    }

    if (!url) {
        console.error("URL generation failed.");
        return;
    }

    // 发起 Hunter 查询请求
    try {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(xhr) {
                if (xhr.status !== 200) {
                    console.error("Hunter Request failed, status code:", xhr.status);
                    return;
                }
                const res = JSON.parse(xhr.responseText);

                const target_data = res.data?.arr || [];
                if (target_data.length === 0) {
                    return;
                }

                // 获取 HTML 元素
                const area = document.getElementsByClassName('area')[0];
                const org = document.getElementsByClassName('org')[0];
                const protocol = document.getElementsByClassName('protocol')[0];
                const port = document.getElementsByClassName('port')[0];
                const surplus = document.getElementsByClassName('surplus')[0];
                const icpnumber = document.getElementsByClassName('icpnumber')[0];

                const table_title = document.getElementsByClassName('table_title')[0];
                const table_protocol = document.getElementsByClassName('table_protocol')[0];
                const table_port = document.getElementsByClassName('table_port')[0];
                const table_code = document.getElementsByClassName('table_code')[0];
                const table_url = document.getElementsByClassName('table_url')[0];

                // 遍历数据并展示到页面
                let title_innerHTML = `<div style='white-space: nowrap'>标题</div>`;
                let protocol_innerHTML = `<div style='white-space: nowrap'>协议</div>`;
                let port_innerHTML = `<div style='white-space: nowrap'>端口</div>`;
                let code_innerHTML = `<div style='white-space: nowrap'>状态码</div>`;
                let url_innerHTML = `<div style='white-space: nowrap'>url</div>`;

                target_data.forEach(item => {
                    title_innerHTML += `<div style="white-space: nowrap;height: 20px">${item.web_title || 'N/A'}</div>`;
                    protocol_innerHTML += `<div style="white-space: nowrap;height: 20px">${item.protocol || 'N/A'}</div>`;
                    code_innerHTML += `<div style="white-space: nowrap;height: 20px">${item.status_code || 'N/A'}</div>`;
                    url_innerHTML += `<div style="white-space: nowrap;height: 20px"><a href="${item.url}" target='_blank' style="color: #1890ff;text-decoration: none">${item.url}</a></div>`;
                    port_innerHTML += `<div style="white-space: nowrap;height: 20px">${item.port || 'N/A'}</div>`;
                });

                table_title.innerHTML = title_innerHTML;
                table_protocol.innerHTML = protocol_innerHTML;
                table_code.innerHTML = code_innerHTML;
                table_port.innerHTML = port_innerHTML;
                table_url.innerHTML = url_innerHTML;

                const target_location = target_data[0] || {};
                area.textContent = [target_location.country || '', target_location.province || '', target_location.city || ''].filter(item => item).join('-') || 'N/A';
                org.textContent = Array.from(new Set(target_data.filter(item => item.as_org).map(item => item.as_org))).join(',') || 'N/A';
                icpnumber.textContent = target_data[0].number || 'N/A';
                protocol.textContent = Array.from(new Set(target_data.filter(item => item.protocol).map(item => item.protocol))).join(',') || 'N/A';
                port.textContent = Array.from(new Set(target_data.filter(item => item.port).map(item => item.port))).join(',') || 'N/A';
                surplus.textContent = res.data.rest_quota?.split('：')[1] || 'N/A';

            },
            onerror: function(xhr) {
                console.error("Hunter Request error:", xhr);
            }
        });
    } catch (e) {
        console.error("Error while sending request:", e);
    }
}

function getNewDate(flag, many) {
    const thirtyDays = [4, 6, 9, 11];
    const thirtyOneDays = [1, 3, 5, 7, 8, 10, 12];
    const currDate = new Date();
    const year = currDate.getFullYear();
    let month = currDate.getMonth() + 1;
    let countDays = 0;
    let targetDateMilli = 0;
    let GMTDate = '';
    let targetYear = '';
    let targetMonth = '';
    let targetDate = '';
    let dealDate = '';
    let hh = currDate.getHours() < 10 ? "0" + currDate.getHours() : currDate.getHours();
    let mm = currDate.getMinutes() < 10 ? "0" + currDate.getMinutes() : currDate.getMinutes();
    let ss = currDate.getSeconds() < 10 ? "0" + currDate.getSeconds() : currDate.getSeconds();

    const isLeapYear = !!((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);

    for (let i = 0; i < many; i++) {
        if (flag === 'before') {
            month = month - 1 <= 0 ? 12 : month - 1;
        } else {
            month = month + 1 > 12 ? 1 : month + 1;
        }
        thirtyDays.includes(month) ? (countDays += 30) : thirtyOneDays.includes(month) ? (countDays += 31) : isLeapYear ? (countDays += 29) : (countDays += 28);
    }

    targetDateMilli = currDate.setDate(currDate.getDate() - (flag === 'before' ? countDays : countDays * -1));
    GMTDate = new Date(targetDateMilli);
    targetYear = GMTDate.getFullYear();
    targetMonth = GMTDate.getMonth() + 1;
    targetDate = GMTDate.getDate();
    targetMonth = targetMonth.toString().padStart(2, '0');
    targetDate = targetDate.toString().padStart(2, '0');
    dealDate = `${targetYear}-${targetMonth}-${targetDate} ${hh}:${mm}:${ss}`;
    return escape(dealDate);
}
