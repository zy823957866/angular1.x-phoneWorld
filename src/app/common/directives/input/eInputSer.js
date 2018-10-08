const eInputSer = {

    //获得指定的验证数据
    errType: (string, getSet ) => {
        let validLen = [];
        for(let reg of $scope.errorArr) {
            //错误类型
            if( getSet ) {
                if(reg.regex.includes('/')){
                    types.add('regex');
                }
                else if (reg.regex.includes('|') && !reg.regex.includes('/')){
                    types.add('len');
                }
                else {
                    types.add(reg.regex);
                }
            }

            //返回正则
            if(string === 'regex' && reg.regex.includes('/'))
                return reg;

            //返回最大长度、最小长度
            if(string === 'len' && reg.regex.includes('|') && !reg.regex.includes('/')){
                validLen.push(reg);
            }
            //返回其他数据
            if(reg.regex === string)
                return reg;

        }

        return validLen.length ? validLen : false;
    },


	//输入内容有效长度
	validLength: (nexus, len) => {
		//验证一个值的长度与 数值的关系
		var _length = $scope.ngModel && $scope.ngModel.replace(/[^\x00-\xff]/g,'***').length;
        switch(nexus){
            case '===': 
            case '==':
            	return _length === len;
            	break;
            case '>':
                return _length > len;
                break;
            case '<':
                return _length < len;
                break;
            case '>=':
                return _length >= len;
                break;
            case '<=':
                return _length <= len;
                break;
            default:
                return _length !== len;
                break;
        }
	},

	/**
	 * IE9中placeholder兼容处理
	 * @target placeholder 	占位符
	 * @target element 		input节点
	 */
	placeHolderIE : (placeholder, element) => {
		// if(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE","")) <= 9) {   // 判断浏览器是否支持 placeholder
  //           let _this = $(element);
  //           var left = _this.css("padding-left");
  //           var placeHolder = placeholder || _this.attr("placeholder");
  //           var top = parseInt(_this.css("padding-top")) + parseInt(_this.parent().css("padding-top")) + 'px';
  //           if(!_this.parent().find(".placeorder-text").length){
  //               _this.parent().append('<span class="placeorder-text" data-type="placeholder" style="left: ' + left + ';top:'+top+'">' + placeHolder + '</span>');
  //           }
  //           if (_this.val() != "") {
  //               _this.parent().find("span.placeorder-text").hide();
  //           }
  //           else {
  //               _this.parent().find("span.placeorder-text").show();
  //           }

  //           _this.on("focus", function () {
  //               $(this).parent().find("span.placeorder-text").hide();
  //           }).on("blur", function () {
  //               var _this = $(this);
  //               if (_this.val() != "") {
  //                   _this.parent().find("span.placeorder-text").hide();
  //               }
  //               else {
  //                   _this.parent().find("span.placeorder-text").show();
  //               }
  //           });

  //           // 点击表示placeholder的标签相当于触发input
  //           $("span.placeorder-text").on("click", function () {
  //               $(this).siblings("[placeholder]").trigger("click");
  //               $(this).siblings("[placeholder]").trigger("focus");
  //           });
  //       }
	}
}

export default angular
	.module('service.eInput', [])
	.factory('eInputSer', () => {
		return eInputSer;
	})
	.name;