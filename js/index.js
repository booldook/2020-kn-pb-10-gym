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
	}
	else if($(this).hasClass("active")) {
		$(this).removeClass("active").addClass("default");
	}
	else {
		$(this).addClass("active");
	}
}

/************ 이벤트선언 *************/
$(".header .navi-child").hover(onNaviHover, onNaviLeave);
$(".header .navi-bars").click(onBarClick);