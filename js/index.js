/************ 사용자함수 *************/
function fixShow(show) {
	if(show) {
		$(".header > .fix-wrap").css("display", "block");
		setTimeout(function(){
			$(".header > .fix-wrap").addClass("active");
			$(".header > .fix-wrap > div").addClass("active");
		}, 0);
	}
	else {
		$(".header > .fix-wrap").removeClass("active");
		$(".header > .fix-wrap > div").removeClass("active");
		setTimeout(function(){
			$(".header > .fix-wrap").css("display", "none");
		}, 500);
	}
}

/************ 이벤트콜백 *************/
function onNaviHover() {
	$(this).find(".subs").stop().fadeIn(500);
}

function onNaviLeave() {
	$(this).find(".subs").stop().fadeOut(500);
}

function onBarClick() {
	if($(this).hasClass("default")) {
		$(this).removeClass("default").addClass("active");
		fixShow(true);
	}
	else if($(this).hasClass("active")) {
		$(this).removeClass("active").addClass("default");
		fixShow(false);
	}
	else {
		$(this).addClass("active");
		fixShow(true);
	}
}

function onNaviChildClick() {
	$(this).next().stop().slideToggle(500);
	$(this).children("i").toggleClass("active");
}

/************ 이벤트선언 *************/
$(".header .navi-child").hover(onNaviHover, onNaviLeave);
$(".header .navi-bars").click(onBarClick);
$(".header .navi-child-mo").click(onNaviChildClick);