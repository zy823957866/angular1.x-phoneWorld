const animate = {
	slide : (target, e) => {
		//
		let t = 200;
		let m = target.find('.dropdown-menu');

		if(m.css('display') == 'none') {
			m.slideDown(t);
			m.css('display','block');
		}else {
			m.slideUp(t);
		}
	}
}

export default angular
	.module('service.animate', [])
	.factory('animate', () => {
		return animate;
	})
	.name;