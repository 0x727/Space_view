// ==UserScript==
// @name         FOFA view
// @namespace    http://tampermonkey.net/
// @version      0.5
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

GM_registerMenuCommand("FOFA Login", openLoginForm, "l");
GM_registerMenuCommand("FOFA 识别结果", FofaFind, "s");

// 创建自定义输入表单
function openLoginForm() {
    const body = document.getElementsByTagName('body')[0];
    const loginDiv = document.createElement('div');
    loginDiv.innerHTML = `
    <div style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background-color:white; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0, 0, 0, 0.5); z-index:100000;">
        <h3>Login to FOFA</h3>
        <label>Username (一般是邮箱): 
            <input type="text" id="fofaUsername" style="width:100%;" placeholder="e.g., 1234567890" />
        </label><br/><br/>
        <label>Fofa Key: 
            <input type="password" id="fofaKey" style="width:100%;" />
        </label><br/><br/>
        <button id="loginSubmit">Submit</button>
        <button id="loginCancel">Cancel</button>
    </div>
    `;
    body.appendChild(loginDiv);

    document.getElementById('loginSubmit').onclick = function() {
        const username = document.getElementById('fofaUsername').value;
        const FofaKey = document.getElementById('fofaKey').value;
        if (username && FofaKey) {
            GM_setValue("username", username);
            GM_setValue("FofaKey", FofaKey);
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

// 识别功能
function FofaFind() {
    var username = GM_getValue("username");
    var FofaKey = GM_getValue("FofaKey");

    if (!username || !FofaKey) {
        console.error("No username or FofaKey found");
        return;
    }
    const body = document.getElementsByTagName('body')[0];
    const div = document.createElement('div');
    div.innerHTML = `<div style="font-size:14px;color:rgba(0,0,0,0.65);box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) ;background-color: #fff;border-radius: 5px;border: 1px solid #ebebeb;left:20px;top:20px;position: fixed;z-index: 1000000">
        <div style="display: flex;justify-content: flex-end;margin-right: 8px;">
          <div id="expandBtn" style="color:rgb(24, 36, 127);cursor: pointer;margin-left: 8px;margin-top: 4px;font-size: 12px;margin-bottom: 4px;display: none">FOFA展开</div>
          <div id="hideBtn" style="cursor: pointer;font-size: 12px;margin-top: 2px;color:rgb(96, 98, 102);">隐藏</div>
        </div>
        <div id="contentDiv" class="plugs_content_fofa" style="padding-bottom: 10px;">
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
              <div class="area_fofa" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
            </div>
            <div style="margin-bottom: 4px;display: flex">
              <div style="margin-right: 6px;white-space: nowrap">运营商和org:</div>
              <div class="org_fofa" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
            </div>
            <div style="margin-bottom: 4px;display: flex">
              <div style="margin-right: 6px;white-space: nowrap">ICP:</div>
              <div class="icp_fofa" style="word-wrap:break-word;word-break:normal;overflow: hidden;">null</div>
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
          <div class="copy-text-data" style="cursor: pointer;display: flex;margin-top: 8px;border-top:1px solid #ebebeb;justify-content: flex-end;padding-right: 4px;">复制</div>
          <ul class="demo1" style="width: 100%;max-height: 350px;max-width: 600px; overflow: auto;">
            <div style="display: flex;margin-top: 8px;">
              <div style="padding: 0 10px;">
                <div class="table_title_fofa">null</div>
              </div>
              <div style="padding: 0 10px;">
                <div class="table_protocol_fofa">null</div>
              </div>
              <div style="padding: 0 10px;">
                <div class="table_port_fofa">null</div>
              </div>
              <div style="padding: 0 10px;">
                <div class="table_server_fofa">null</div>
              </div>
              <div style="padding: 0 10px;">
                <div class="table_url_fofa">
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

    var Fofa_url = "https://fofa.info/api/v1/search/all?email=" + username + "&key=" + FofaKey + "&fields=country,province,city,isp,as_organization,ip,title,protocol,port,host,server,icp&qbase64=";

    var search, url;

    if (isValidIP_reg.test(target)) {
        search = btoa('ip=="' + target + '"');
        url = Fofa_url + search;
    } else {
        search = btoa('host=="' + target + '"');
        url = Fofa_url + search;
    }
    if (!url) {
        console.error("URL generation failed.");
        return;
    }

    // 发起 FOFA 查询请求
    try {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(xhr) {
                
                if (xhr.status !== 200) {
                    console.error("FOFA Request failed, status code:", xhr.status);
                    return;
                }
                const res = JSON.parse(xhr.responseText);

                const target_data = res.results || [];
                if (target_data.length === 0) {
                    
                    return;
                }
                // 获取 HTML 元素
                const area = document.getElementsByClassName('area_fofa')[0];
                const org = document.getElementsByClassName('org_fofa')[0];
                const protocol = document.getElementsByClassName('protocol_fofa')[0];
                const port = document.getElementsByClassName('port_fofa')[0];
                const icp = document.getElementsByClassName('icp_fofa')[0];

                const table_title = document.getElementsByClassName('table_title_fofa')[0];
                const table_protocol = document.getElementsByClassName('table_protocol_fofa')[0];
                const table_port = document.getElementsByClassName('table_port_fofa')[0];
                const table_server = document.getElementsByClassName('table_server_fofa')[0];
                const table_url = document.getElementsByClassName('table_url_fofa')[0];

                // 遍历数据并展示到页面
                let title_innerHTML = `<div style='white-space: nowrap'>标题</div>`;
                let protocol_innerHTML = `<div style='white-space: nowrap'>协议</div>`;
                let port_innerHTML = `<div style='white-space: nowrap'>端口</div>`;
                let server_innerHTML = `<div style='white-space: nowrap'>server</div>`;
                let url_innerHTML = `<div style='white-space: nowrap'>url</div>`;

                target_data.forEach(item => {
                    title_innerHTML += `<div style="white-space: nowrap;height: 20px">${item[6] || 'N/A'}</div>`;
                    protocol_innerHTML += `<div style="white-space: nowrap;height: 20px">${item[7] || 'N/A'}</div>`;
                    if (item[7] === "http" || item[7] === "https") {
                        var urlNoProtocol = item[9].replace(/^https?\:\/\//i, "");
                        var urlProtocol = item[7] + "://" + urlNoProtocol;
                        url_innerHTML += `<div style="white-space: nowrap;height: 20px"><a href="${urlProtocol}" target='_blank' style="color: #1890ff;text-decoration: none">${urlProtocol}</a></div>`;
                    } else {
                        url_innerHTML += `<div style="white-space: nowrap;height: 20px"><a href="" target='_blank' style="color: #1890ff;text-decoration: none"></a></div>`;
                    }
                    port_innerHTML += `<div style="white-space: nowrap;height: 20px">${item[8] || 'N/A'}</div>`;
                    server_innerHTML += `<div style="white-space: nowrap;height: 20px">${item[10] || 'N/A'}</div>`;
                });

                table_title.innerHTML = title_innerHTML;
                table_protocol.innerHTML = protocol_innerHTML;
                table_port.innerHTML = port_innerHTML;
                table_server.innerHTML = server_innerHTML;
                table_url.innerHTML = url_innerHTML;
                const target_location = target_data[0] || {};
                area.textContent = [target_location[0] || '', target_location[1] || '', target_location[2] || ''].filter(item => item).join('-') || 'N/A';
                org.textContent = [target_location[3] || '', target_location[4] || ''].filter(item => item).join(',') || 'N/A';
                icp.textContent = Array.from(new Set(target_data.filter(item => item[11]).map(item => item[11]))).join(',') || 'N/A';
                protocol.textContent = Array.from(new Set(target_data.filter(item => item[7]).map(item => item[7]))).join(',') || 'N/A';
                port.textContent = Array.from(new Set(target_data.filter(item => item[8]).map(item => item[8]))).join(',') || 'N/A';
            },
            onerror: function(xhr) {
                console.error("FOFA Request error:", xhr);
            }
        });
    } catch (e) {
        console.error("Error while sending request:", e);
    }
}
