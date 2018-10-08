
//默认语言(中文)设置
if( !localStorage.getItem('lang') ){
	localStorage.setItem('lang','zh_CN');
}

let lang = window.localStorage.lang;

//获得语言对应的数据
let i18n = require('./package/' + lang + '/index.js');

//递归获取对应的属性值
const get = (code) => {
		if(code.includes('.')){
			let _key = code.split('.');
			let count = 0;

			let getValue = (t) => {
				count ++;
				if(count < _key.length)
					return getValue(t[_key[count]]);
				else
					return t;	
			}
			return getValue(i18n[_key[count]])
		}else{
			return i18n[code] || code;
		}
	}

const langSer = () => {
	return {
		T : (code) => get(code)
	}
}

export default angular
	.module('language' , [])
	.factory('T', langSer)
	.filter('T', () => {
		return (code) => {
			console.log(code)
			return get(code);
		};
	})
	.name;