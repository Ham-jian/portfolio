/* 반응형, 모바일 링크 연결==================================== */
function MM_openBrWindow(theURL,winName,features){
  window.open(theURL,winName,features);
}



$(document).ready(function(){

  /* 헤더 스크롤 내릴때 숨기기 */
    let lastScroll = 0;
  $(window).on('scroll', function(){
      let scrollTop = $(this).scrollTop();
      if(scrollTop > lastScroll) {
          //down
          $('header').removeClass('fixed');
      } else {
          // up
          $('header').addClass('fixed');
      }
      lastScroll = scrollTop;
  });


  /* 메뉴 클릭 */
  $(".gnb li").click(function(){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });

  /* 스크롤위치 메뉴 활성화 */
  $(window).scroll(function(){
    let scroll=$(this).scrollTop();
    $("#txt1").text(scroll);

    if(scroll>=1000 && scroll<2009){
      $(".gnb li:nth-child(1) a").addClass("active");
    }else{
      $(".gnb li:nth-child(1) a").removeClass("active");
    };

    if(scroll>=2010 && scroll<3944){
      $(".gnb li:nth-child(2) a").addClass("active");
    }else{
      $(".gnb li:nth-child(2) a").removeClass("active");
    };

    if(scroll>=3945 && scroll<5051){
      $(".gnb li:nth-child(3) a").addClass("active");
    }else{
      $(".gnb li:nth-child(3) a").removeClass("active");
    };

    if(scroll>=5052 && scroll<6425){
      $(".gnb li:nth-child(4) a").addClass("active");
    }else{
      $(".gnb li:nth-child(4) a").removeClass("active");
    };

    if(scroll>=6426 && scroll<7909){
      $(".gnb li:nth-child(5) a").addClass("active");
    }else{
      $(".gnb li:nth-child(5) a").removeClass("active");
    };
  });


  /* 모바일 햄버거 메뉴 */
  // $(".gnb").hide();
  slide = true;

  $(".allmenu").click(function(){
    if(slide){
      $(this).addClass("active");
      $(".gnb").animate({top:"0"});
      slide = false;
    }else {
      $(this).removeClass("active");
      $(".gnb").animate({top:"-200%"});
      slide = true;
    };
  });

  /* Mobile Modal=========================== */
  //모바일 어플 뷰페이지
  $(".p-inner.ml>.content-box.cb2").click(function(){

    $("html").css({overflowY:"hidden"}); //기존 html 스크롤 숨기기

    $(".mpop>li").show(); //각 목록의 내용
    $("#mpopup").stop().fadeIn(); //검정배경
    $('.pop_body').scrollTop(0);
  });


  /* Web Design Modal============================================ */
  //각 목록을 클릭했을때
  //UX·UI DESIGN------------------------------
  $(".u-inner.cl1>.content-box").click(function(){

    g_pop=$(this).index();

    $(".g_page span:nth-child(1)").text(g_pop+1); //오른쪽 상단 페이지번호
    $("html").css({overflowY:"hidden"}); //기존 html 스크롤 숨기기

    $(".pop>li").eq(g_pop).show(); //각 목록의 내용
    $("#popup").stop().fadeIn(); //검정배경
    $('.pop_body').scrollTop(0);
    $('header').stop().hide();

  });

  //이전다음버튼
  $(".left_btn").click(function(){
    $('.pop_body').scrollTop(0);

    if(g_pop>0){
      $(".pop>li").eq(g_pop).stop().fadeOut();
      g_pop--;
      $(".g_page span:nth-child(1)").text(g_pop+1);
      $(".pop>li").eq(g_pop).stop().fadeIn();
    };

  });

  $(".right_btn").click(function(){
    $('.pop_body').scrollTop(0);

    if(g_pop<5){
      $(".pop>li").eq(g_pop).stop().fadeOut();
      g_pop++;
      $(".g_page span:nth-child(1)").text(g_pop+1);
      $(".pop>li").eq(g_pop).stop().fadeIn();
    };

  });

  //GRAPHIC ----------------------------------
  $(".u-inner.cl2>.content-box").click(function(){

    g_pop2=$(this).index();

    $(".g_page span:nth-child(1)").text(g_pop2+1); //오른쪽 상단 페이지번호
    $("html").css({overflowY:"hidden"}); //기존 html 스크롤 숨기기

    $(".pop2>li").eq(g_pop2).show(); //각 목록의 내용
    $("#popup2").stop().fadeIn(); //검정배경
    $('.pop_body').scrollTop(0);

  });

  //이전다음버튼
  $(".left_btn").click(function(){
    $('.pop_body').scrollTop(0);

    if(g_pop2>0){
      $(".pop2>li").eq(g_pop2).stop().fadeOut();
      g_pop2--;
      $(".g_page span:nth-child(1)").text(g_pop2+1);
      $(".pop2>li").eq(g_pop2).stop().fadeIn();
    };

  });

  $(".right_btn").click(function(){
    $('.pop_body').scrollTop(0);

    if(g_pop2<8){
      $(".pop2>li").eq(g_pop2).stop().fadeOut();
      g_pop2++;
      $(".g_page span:nth-child(1)").text(g_pop2+1);
      $(".pop2>li").eq(g_pop2).stop().fadeIn();
    };

  });

  //close버튼(공통)
  $(document).mouseup(function (e){
    var ModalClose = $("#popup, #popup2, #mpopup");      
    if(ModalClose.has(e.target).length == 0){
      ModalClose.fadeOut(400); 
      $(".pop>li, .pop2>li").stop().fadeOut();
      $("html").css({"overflow-y":"scroll"});
      $('header').stop().fadeIn();
    }      
  }); 

  $(document).keydown(function(e){
    var code = e.keyCode || e.which;     
    if (code == 27) {
        $('#popup, #popup2, #mpopup').fadeOut();
        $("html").css({"overflow-y":"scroll"});
    }
  });

  $('#popup .btn_close, #popup2 .btn_close, #mpopup .btn_close, .text .close').click(function(){
    $('#popup, #popup2, #mpopup, .resolution').fadeOut();
    $("html").css({"overflow-y":"scroll"});
  });

  /* 해상도 */
  $(document).mouseup(function (e){
    var ResClose = $(".resolution");      
    if(ResClose.has(e.target).length == 0){
      ResClose.fadeOut(400); 
      $('header').stop().fadeIn();
    }      
  }); 
});