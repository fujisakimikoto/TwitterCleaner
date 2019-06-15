//建立输出, 删除：tclsDebug.html("");
$("body").append('<div id="tclsDebug"></div>');
var tclsDebug = $("#tclsDebug");
var tclsGridCell;
tclsDebug.css({"z-index":1024,"position":"fixed","width":"320px","height":"50%","background-color":"rgba(0, 0, 0, 0.7)","color":"#FFF","left":0,"bottom":0,"overflow-y":"scroll","border":"#000 solid 3px"});
function tclslog(tclsLogInfo) {
    tclsDebug.append("<div>"+tclsLogInfo+"</div>");
}
function tclsRL() {
    tclsDebug.html("");
    var tclsGridTimelineItems = $(".GridTimeline-items");
    var tclsGridCell = tclsGridTimelineItems.find(".Grid-cell");
    tclsShowHide(tclsGridCell,true);
    tclslog("推特跟随者过滤工具 已加载<br>请在控制台输入以下命令：<br>重新载入：<code>tclsRL();</code><br>显示无背景图用户：<code>tclsTBG();</code><br>显示无头像用户：<code>tclsTBG();</code><br>疑似随机用户名：<code>tclsTRO();</code><hr>已扫描人员数量："+tclsGridCell.length);
}
tclsRL();
function tclsShowHide(tclsObj,tclsisshow) {
    if (tclsisshow) {
        tclsObj.css("display","inline-block");
    } else { 
        tclsObj.css("display","none");
    }
}
//筛选资料卡图片
function tclsTBG() {
    tclsRL();
    tclsGridCell.each(function(){
        let tclsCellN = $(this).find(".u-linkComplex-target").text();
        let tclsCell = $(this).find(".ProfileCard-bg").css("background-image");
        if (tclsCell == "none") {
            tclslog("无背景："+tclsCellN);
            tclsShowHide($(this),true);
        } else {
            tclsShowHide($(this),false);
        }
    });
}
//筛选空白头像
function tclsTBG() {
    tclsRL();
    tclsGridCell.each(function(){
        let tclsCellN = $(this).find(".u-linkComplex-target").text();
        let tclsCell = $(this).find(".ProfileCard-avatarImage").attr("src");
        if (tclsCell == "https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png") {
            tclslog("无头像："+tclsCellN);
            tclsShowHide($(this),true);
        } else {
            tclsShowHide($(this),false);
        }
    });
}
//显示用户名
function tclsCellName(tclsCellCharType,tclsCellCharTypeNew) {
    var tclsCellCharTypeC = tclsCellCharType[0];
    var tclsCellCharConv = tclsCellCharType[1];
    if (tclsCellCharTypeC != tclsCellCharTypeNew) {
        tclsCellCharConv++;
        tclsCellCharTypeC = tclsCellCharTypeNew;
    } else {
        tclsCellCharConv--;
    }
    return [tclsCellCharTypeC,tclsCellCharConv];
}
//检查随机用户名
function tclsTRO() {
    tclsRL();
    tclsGridCell.each(function(){
        let tclsCell = $(this).find(".u-linkComplex-target").text();
        let tclsCellLength = tclsCell.length;
        var tclsCellCharType = [0,0];
        for(tclsCelli=0;tclsCelli<tclsCellLength;tclsCelli++){
            let tclsCellChar = tclsCell.charAt(tclsCelli);
            if (tclsCellChar.match(/^.*[A-Z]+.*$/) != null) {
                tclsCellCharType = tclsCellName(tclsCellCharType,1);
            } else if (tclsCellChar.match(/^.*[a-z]+.*$/) != null) {
                tclsCellCharType = tclsCellName(tclsCellCharType,2);
            } else if (tclsCellChar.match(/^.*[0-9]+.*$/) != null) {
                tclsCellCharType = tclsCellName(tclsCellCharType,3);
            } else {
                tclsCellCharType = tclsCellName(tclsCellCharType,4);
            }
        }
        tclslog("用户名："+tclsCell+"，可疑级别："+tclsCellCharType[1]);
        if (tclsCellCharType[1] > 0) {
            tclsShowHide($(this),true);
        } else {
            tclsShowHide($(this),false);
        }
    });
}