function init() {
	$(".box").each(function(i){
		if(i > 0) {
			setTimeout(function(){
				tops = $(".box").eq(i).prev().offset().top + $(".box").eq(i).prev().innerHeight();
				console.log(tops);
				$(".box").eq(i).css("top", tops + "px");
			}, i * 300);
		}
	});
}




$(window).resize(init).trigger("resize");