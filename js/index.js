/************ 사전지식 *************/
/* 
// for(var v of datas) {
// for(var i in datas) {
for(var i=0; i<datas.length; i++){
	html  = '<div class="slide">';
	html += '<img src="'+datas[i].src+'" class="img">';
	html += '</div>';
	$(".main-wrap").append(html);
} 

$(".section").each(function(i){
	var $obj = $(this);
	if(i == 0) {
		$(this).css("top", $(this).prev().outerHeight() + "px");
	}
	else {
		setTimeout(function(){
			var top = $obj.prev().offset().top + $obj.prev().outerHeight();
			$obj.css("top", top+"px");
		}, i * 300);
	}
}); 
*/

/************ 전역변수 *************/
var datas;
var mainNow = 0;
var mainPrev, mainNext, mainLast;
mainAjax();


/************ 사용자함수 *************/
function mainAjax() {
	$.get("../json/banner.json", function(res){
		datas = res.banners;
		mainLast = datas.length - 1;
		mainPager();
		mainInit();
	});
}

function mainInit() {
	mainPrev = (mainNow == 0) ? mainLast : mainNow - 1;
	mainNext = (mainNow == mainLast) ? 0 : mainNow + 1;
	$(".main-wrap").find(".slide").remove();
	$(htmlMaker(mainNow)).appendTo(".main-wrap").css({
		"position": "relative",
		"transition": "transform 0.5s"
	});
	$(htmlMaker(mainPrev)).appendTo(".main-wrap").css("top", "-100%");
	$(htmlMaker(mainNext)).appendTo(".main-wrap").css("top", "100%");
	$(".main-wrap .pager").removeClass("active");
	$(".main-wrap .pager").eq(mainNow).addClass("active");
	setTimeout(function(){
		$(".main-wrap").find(".slide").eq(0).find(".ani-trans").css("transform", "translateX(0)");
	}, 300);
}

function htmlMaker(n) {
	html  = '<div class="slide">';
	html += '<img src="'+datas[n].src+'" class="img">';
	html += '<div class="mask"></div>';
	html += '<div class="slide-content '+datas[n].class+'">';
	html += '<h2 class="title ani-trans">'+datas[n].title+'<span>.</span></h2>';
	html += '<h3 class="desc ani-trans">'+datas[n].desc+'</h3>';
	html += '<div class="bts">';
	for(var i=0, bt; i<datas[n].buttons.length; i++) {
		bt = datas[n].buttons[i];
		html += '<a href="'+bt.link+'" class="'+bt.class+' ani-trans">'+bt.title+'</a>';
	}
	html += '</div>';
	html += '</div>';
	html += '</div>';
	return html;
}

function mainPager() {
	for(var i=0; i<=mainLast; i++) {
		$('<span class="pager"></span>').appendTo(".main-wrap .pagers").click(onPagerClick);
	}
}

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
function onResize() {
	$(".main-wrap").css("margin-top", $(".header").outerHeight() + "px");
	var classHei = $(".class-wrap .item").eq(0).outerWidth() * 0.75;
	$(".class-wrap .item").outerHeight(classHei);
	/*
	for(var i=0, adHei=0; i<$(".ad-wrap>.ad").length; i++) {
		adHei = ($(".ad-wrap>.ad").eq(i).outerHeight() > adHei) 
		? $(".ad-wrap>.ad").eq(i).outerHeight() 
		: adHei;
		console.log(adHei);
	}
	$(".ad-wrap > .ad").each(function(){
		$(this).outerHeight(adHei);
	});
	*/
}

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

function onMainPrev() {
	$(".main-wrap > .slide").eq(0).css("transform", "translateY(100px)");
	$(".main-wrap > .slide").eq(1).stop().animate({"top": 0}, 500, function() {
		mainNow = (mainNow == 0) ? mainLast : mainNow - 1;
		mainInit();
	});
}

function onMainNext() {
	$(".main-wrap > .slide").eq(0).css("transform", "translateY(-100px)");
	$(".main-wrap > .slide").eq(2).stop().animate({"top": 0}, 500, function() {
		mainNow = (mainNow == mainLast) ? 0 : mainNow + 1;
		mainInit();
	});
}

function onPagerClick() {
	var target = [];
	var old = mainNow;
	mainNow  = $(this).index();
	if(mainNow > old) {
		// console.log("아래거 올라옴");
		target[0] = "100%";
		target[1] = "-100px";
	}
	else if(mainNow < old) {
		// console.log("위에거 내려옴");
		target[0] = "-100%";
		target[1] = "100px";
	}
	else {
		return false;
	}
	$(".main-wrap > .slide").not($(".main-wrap > .slide").eq(0)).remove();
	$(htmlMaker(mainNow)).appendTo(".main-wrap").css("top", target[0]);
	$(".main-wrap > .slide").eq(0).css("transform", "translateY("+target[1]+")");
	$(".main-wrap > .slide").eq(1).stop().animate({"top": 0}, 500, mainInit);
}



/************ 이벤트선언 *************/
$(window).resize(onResize).trigger("resize");

$(".header .navi-child").hover(onNaviHover, onNaviLeave);
$(".header .navi-bars").click(onBarClick);
$(".header .navi-child-mo").click(onNaviChildClick);

$(".main-wrap > .bt-prev").click(onMainPrev);
$(".main-wrap > .bt-next").click(onMainNext);

$("section").imagesLoaded(onResize);


var $masonry = $(".classes").imagesLoaded(function(){
	$masonry.masonry({
		itemSelector: '.class',
		columnWidth: '.class-sizer',
		percentPosition: true
	});
});
