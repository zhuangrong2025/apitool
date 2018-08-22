(function($){
	$.smartList = function(){
    // 判断有序无序列表，回车自动添加相应的字符
	}
	// 无序列表
	$.smartList.order = function(el, startPos, endPos, startText, endText, startTtextSplit, brLen){
    var content
    if(startTtextSplit[brLen - 1].length != 2){
      content = startText + "- " + endText
      setTimeout(()=>{
        el.selectionStart = startPos + 2
        el.selectionEnd = endPos + 2
      }, 10)
    }else{
      // 最后一行按两次回车结束序列
      content = startText.substring(0, startText.length - 3) + "\n" + endText
      setTimeout(()=>{
        el.selectionStart = startPos
        el.selectionEnd = endPos
      }, 10)
    }
    return content
	}
	// 有序列表
	$.smartList.unordered = function(el, startPos, endPos, startText, endText, startTtextSplit, brLen, newEndText){
    var content
    // 获取回车前的序列，分割成数组，获取光标序列个数，然后+1得到下一行的序号
    var stLen = 0,
        arrStart = [],
        arrStartLen = 0
    startTtextSplit.forEach(function(item,index){
      if(item.indexOf(". ") >= 0){  // 加上item.subString(1,3).indexOf(". ")更精确
        if(item.substr(0,2) == "1."){
          stLen = index
        }
      }
    })
    for( var i=stLen; i<brLen; i++){
      arrStart.push(startTtextSplit[i])
    }
    arrStartLen = arrStart.length + 1 //下一行的序号
    // 获取回车前的序列，用两个<br>获取后面的序列，然后修改序列的顺序
    var afterList = newEndText.split("<br><br>")[0].split("<br>")
    var newAfterList = []
    var afterListChar = ''
    for(var i=1; i<=afterList.length-1;i++){
        var order
        if(afterList[i].indexOf(". ") < 0){ // 如果数组中没有". ",则不转化为数字序号
          order = ""
          newAfterList.push(order + afterList[i].substring(0))
        }else{
          order = (parseInt(afterList[i].substring(0,1)) + 1).toString() // 后半段序号加1
          newAfterList.push(order + afterList[i].substring(1))
        }
    }
    // 后半段序号拼接新的字符串
    for(var j=0; j<newAfterList.length;j++){
      afterListChar += "\n" + newAfterList[j]
    }
    // 新的后半段内容截断，起始位置是后半段序列字符个数减去<br>的4个字符数乘以个数
    var endTextSlice = endText.substring(newEndText.split("<br><br>")[0].length - (newAfterList.length * 3))
    // 组合新的序列
    content = startText + arrStartLen.toString() + ". " + afterListChar + endTextSlice
    setTimeout(()=>{
      el.selectionStart = startPos + 3
      el.selectionEnd = endPos + 3
    }, 10)
    return content
	}

})(jQuery)
