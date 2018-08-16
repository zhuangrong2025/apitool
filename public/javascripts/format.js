(function($){
	// 获取url参数
	$.format = function(){

	}
	// 加粗 斜体 等前后字符包裹文本
	$.format.wraper = function(val, el, character, startPos, endPos, startText, endText, selectedText){
		var c_len = character.length
    var content
    if(val.substring(startPos, startPos - c_len) == character && val.substring(endPos, endPos + c_len) == character ){
       // 选中的文字前后有对应的markdown字符，则清除markdown字符，不格式化
       content = val.substring(0, startPos - c_len) + selectedText + val.substring(endPos + c_len)
       setTimeout(()=>{
         el.selectionStart = startPos - c_len
         el.selectionEnd = endPos - c_len
       }, 10)
    }else{
      // 选中的文字加markdown格式
      if(character == "# " || character == "## " || character == "### " ){
        content = startText + character + selectedText + endText
      }else{
        content = startText + character + selectedText + character + endText
      }
      setTimeout(()=>{
        el.selectionStart = startPos + c_len
        el.selectionEnd = endPos + c_len
      }, 10)
    }
		return content
	}

  // 插入格式
  $.format.insert = function(el, character, startPos, endPos, startText, endText, presetText){
    var pre_len = presetText.length
    var c_len = character.length
    content =  startText + presetText + endText
    setTimeout(()=>{
      if( character == "**" || character == "_" || character == "~~" || character == "***"){
        el.setSelectionRange(startPos + c_len, startPos + (pre_len - c_len))
      }else{
        el.setSelectionRange(startPos + c_len, startPos + pre_len)
      }
    }, 10)
    return content
  }

  // 替换格式--用于超链接,将选中文字全部替换
  $.format.replace = function(val, el, character, startPos, endPos, startText, endText, selectedText){
    var c_len = character.length
    var content
    content = val.substring(0, startPos - c_len) +  "[" + selectedText + "](http://www.qq.com)" + val.substring(endPos + c_len)
    setTimeout(()=>{
      el.setSelectionRange(startPos + selectedText.length + 3, (startPos + selectedText.length + 20))
    }, 10)
    return content
  }

})(jQuery)
