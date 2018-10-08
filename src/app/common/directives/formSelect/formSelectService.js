const animate = {
	slide : (target, clickWindow) => {
		//动画时间
		let t = 200;
		let m = $(target).find('.dropdown-menu');

		if(m.css('display') == 'none' && !clickWindow) {

			//三角形上旋转
			animate.triangleRotate(target, 'top');
			m.slideDown(t);
			m.css('display','block');

		}else {

			//三角形下旋转
			animate.triangleRotate(target, 'bottom');
			m.slideUp(t);
		}

		animate.closeSlide(target);
	},
	closeSlide : (target) => {
		$(document).on("click", function (event) {
            if ($(target).has(event.target).length === 0){
                animate.slide(target, 'window');
            }
        });
	},
	triangleRotate : (target, flag) => {
		if(flag == 'top'){
			$(target).find('.icon-arrowb').removeClass('icon-rotate-down').addClass('icon-rotate-top');
		}else{
			$(target).find('.icon-arrowb').removeClass('icon-rotate-top').addClass('icon-rotate-down');
		}
		
	}
}

export default angular
	.module('service.animate', [])
	.factory('animate', () => {
		return animate;
	})
	.name;