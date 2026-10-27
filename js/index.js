/* 반응형, 모바일 링크 연결==================================== */
function MM_openBrWindow(theURL,winName,features){
  window.open(theURL,winName,features);
}



$(document).ready(function(){

  var $win = $(window);
  var $html = $('html');
  var $header = $('header');
  var mqMobile = window.matchMedia('(max-width: 767px)');

  /* 헤더 스크롤 내릴때 숨기기 (모바일은 최상단에서도 보이게 → 햄버거 접근) */
  var lastScroll = 0;
  function updateHeader(){
    var scrollTop = $win.scrollTop();
    if($header.hasClass('menu-open')){ lastScroll = scrollTop; return; }

    if(mqMobile.matches && scrollTop <= 10){
      $header.addClass('fixed');
    }else if(scrollTop > lastScroll){
      //down
      $header.removeClass('fixed');
    }else{
      // up
      $header.addClass('fixed');
    }
    lastScroll = scrollTop;
  }


  /* 스크롤위치 메뉴 활성화 : 고정 px(1920 전용) → 각 섹션 실제 위치 기준 */
  var $menuLinks = $('.gnb a');
  var $sections = $menuLinks.map(function(){
    return document.getElementById(this.getAttribute('href').slice(1));
  });
  function updateActive(){
    var scroll = $win.scrollTop();
    var current = -1;
    $sections.each(function(i){
      if(this && scroll >= $(this).offset().top - 80){ current = i; }
    });
    $menuLinks.removeClass('active');
    if(current > -1){ $menuLinks.eq(current).addClass('active'); }
  }

  $win.on('scroll', function(){
    updateHeader();
    updateActive();
  });
  if(mqMobile.matches){ updateHeader(); }
  updateActive();


  /* 모바일 햄버거 메뉴 */
  var $allmenu = $('.allmenu');
  function setMenu(open){
    $header.toggleClass('menu-open', open);
    $allmenu.toggleClass('active', open)
            .attr({'aria-expanded': open, 'aria-label': open ? '메뉴 닫기' : '메뉴 열기'});
    if(open){ $header.addClass('fixed'); }
  }
  $allmenu.on('click', function(){
    setMenu(!$header.hasClass('menu-open'));
  });
  $('.gnb').on('click', 'a', function(){
    setMenu(false);
  });
  $(document).on('click', function(e){
    if($header.hasClass('menu-open') && !$(e.target).closest('nav').length){ setMenu(false); }
  });
  function onBreakpoint(){
    setMenu(false);
    if(mqMobile.matches){ updateHeader(); }
  }
  if(mqMobile.addEventListener){ mqMobile.addEventListener('change', onBreakpoint); }
  else if(mqMobile.addListener){ mqMobile.addListener(onBreakpoint); }


  /* 링크 없는 버튼(#none) 클릭 시 주소창에 #none 붙지 않게 */
  $(document).on('click', 'a[href="#none"]', function(e){
    e.preventDefault();
  });


  /* 모달 공통 ============================================ */
  var $openModal = null;

  function openModal($modal){
    $openModal = $modal;
    $html.css({overflowY:"hidden"}); //기존 html 스크롤 숨기기
    $header.stop(true, true).hide();
    $modal.stop(true, true).fadeIn(); //검정배경
    $modal.find('.pop_body').scrollTop(0);
  }

  function closeModal(){
    if(!$openModal){ return; }
    var $modal = $openModal;
    $openModal = null;
    $modal.stop(true, true).fadeOut(400, function(){
      $modal.find('.pop>li, .pop2>li').stop(true, true).hide();
    });
    $html.css({"overflow-y":"scroll"});
    $header.stop(true, true).fadeIn();
  }

  /* 상세 갤러리(UX/UI, GRAPHIC) : 모달별로 번호·버튼 분리 */
  function Gallery(modalSel, listSel){
    var $modal = $(modalSel);
    var $items = $modal.find(listSel + '>li');
    var $page = $modal.find('.g_page span').first();
    var idx = 0;

    function go(next){
      if(next < 0 || next > $items.length - 1 || next === idx){ return; }
      $modal.find('.pop_body').scrollTop(0);
      $items.eq(idx).stop(true, true).fadeOut();
      idx = next;
      $page.text(idx + 1);
      $items.eq(idx).stop(true, true).fadeIn();
    }

    $modal.find('.left_btn').on('click', function(){ go(idx - 1); });
    $modal.find('.right_btn').on('click', function(){ go(idx + 1); });

    return {
      $modal: $modal,
      open: function(n){
        idx = n;
        $items.stop(true, true).hide();
        $items.eq(idx).show(); //각 목록의 내용
        $page.text(idx + 1); //왼쪽 상단 페이지번호
        openModal($modal);
      },
      prev: function(){ go(idx - 1); },
      next: function(){ go(idx + 1); }
    };
  }

  var uxuiGallery = Gallery('#popup', '.pop');
  var graphicGallery = Gallery('#popup2', '.pop2');

  //UX·UI DESIGN------------------------------
  $(".u-inner.cl1>.content-box").on('click', function(e){
    e.preventDefault();
    uxuiGallery.open($(this).index());
  });

  //GRAPHIC ----------------------------------
  $(".u-inner.cl2>.content-box").on('click', function(e){
    e.preventDefault();
    graphicGallery.open($(this).index());
  });

  /* Mobile Modal=========================== */
  //모바일 어플 뷰페이지
  $(".p-inner.ml>.content-box.cb2").on('click', function(e){
    e.preventDefault();
    $(".mpop>li").show(); //각 목록의 내용
    openModal($("#mpopup"));
  });

  //닫기버튼, 바깥(검정배경) 클릭
  $('#popup .btn_close, #popup2 .btn_close, #mpopup .btn_close').on('click', closeModal);
  $('#popup, #popup2, #mpopup').on('click', function(e){
    if(e.target === this){ closeModal(); }
  });

  //키보드 : ESC 닫기, 좌우 화살표 이동
  $(document).on('keydown', function(e){
    var code = e.keyCode || e.which;
    if(code == 27){
      closeModal();
      setMenu(false);
      $('.resolution').fadeOut(400);
    }
    if($openModal && (code == 37 || code == 39)){
      var g = $openModal.is(uxuiGallery.$modal) ? uxuiGallery : ($openModal.is(graphicGallery.$modal) ? graphicGallery : null);
      if(g){ code == 37 ? g.prev() : g.next(); }
    }
  });


  /* ABOUT 사진 팝업 */
  $(".s-hover").on('click', function(){
    $(".scent_hover").stop(true, true).toggle(400);
  }).on('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); $(this).trigger('click'); }
  });


  /* 해상도 안내 : X 또는 바깥 클릭 시 닫기 */
  $('.resolution').on('click', function(e){
    if(!$(e.target).closest('.text').length || $(e.target).closest('.close').length){
      $(this).fadeOut(400);
    }
  });
});
