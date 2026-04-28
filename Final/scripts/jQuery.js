// Gibson Media - Ethan Gibson - MART 441

$(document).ready(function () {

  // REALM Info
  var realms = [
    {
      name: "Yggdrasil",
      desc: "The world tree binds all realms. From its roots to its crown, nine worlds breathe.",
      img: "styles/images/jQuery/Yggdrasil.png",
      accent: "#7ab0e0"
    },
    {
      name: "Asgard",
      desc: "Home of the Aesir. Where golden halls await the worthy and Odin's ravens never rest.",
      img: "styles/images/jQuery/Asgard.jpg",
      accent: "#f0c040"
    },
    {
      name: "Midgard",
      desc: "The world of men. Fragile, fleeting, and watched by gods and giants alike.",
      img: "styles/images/jQuery/Midgard.jpg",
      accent: "#7eb87e"
    },
    {
      name: "Jotunheim",
      desc: "Land of the giants. Ancient beyond memory, where stone and frost hold dominion.",
      img: "styles/images/jQuery/Jotunheim.jpg",
      accent: "#9ab8d4"
    },
    {
      name: "Helheim",
      desc: "Where the dishonored dead find silence. Cold, still, and endlessly patient.",
      img: "styles/images/jQuery/Helheim.jpg",
      accent: "#8899bb"
    },
    {
      name: "Niflheim",
      desc: "The primordial fog. Before fire, before life - there was only this.",
      img: "styles/images/jQuery/Niflheim.jpg",
      accent: "#7ab0c8"
    },
    {
      name: "Muspelheim",
      desc: "Realm of fire and ruin. The world began here, and here it will end.",
      img: "styles/images/jQuery/Muspelheim.jpg",
      accent: "#e05c20"
    },
    {
      name: "Vanaheim",
      desc: "Where old magic breathes through root and river. The gods of nature keep their counsel.",
      img: "styles/images/jQuery/Vanaheim.jpg",
      accent: "#a8c87a"
    },
    {
      name: "Alfheim",
      desc: "Realm of the light elves. Radiant and distant, like a memory of something sacred.",
      img: "styles/images/jQuery/Alfheim.jpg",
      accent: "#c8e0b0"
    },
    {
      name: "Svartalfheim",
      desc: "Deep beneath the roots of Yggdrasil. Where the dwarves forge fate itself.",
      img: "styles/images/jQuery/svartalfheim.png",
      accent: "#7888aa"
    }
  ];

  // STATE
  var currentIndex  = 0;
  var REALM_DURATION = 7000;
  var FADE_DURATION  = 1200;
  var shape_COUNT     = 25;
  var shape_SHAPES    = ["square", "circle", "diamond"];
  var progressInterval = null;


  function buildshapes(accent) {
    $("#shape-container").empty();
    for (var i = 0; i < shape_COUNT; i++) {
      var size   = Math.floor(Math.random() * 6) + 8;
      var top    = Math.floor(Math.random() * 86) + 5;
      var left   = Math.floor(Math.random() * 88) + 4;
      var shape  = shape_SHAPES[Math.floor(Math.random() * shape_SHAPES.length)];
      var radius = shape === "circle" ? "50%" : "0px";
      var rotate = shape === "diamond" ? "rotate(45deg)" : "rotate(0deg)";

      var $r = $("<div>").addClass("shape").css({
        width:           size + "px",
        height:          size + "px",
        top:             top + "%",
        left:            left + "%",
        "border-radius": radius,
        "border-color":  accent,
        transform:       rotate
      });

      $("#shape-container").append($r);
    }
  }


  function driftshapes() {
    $(".shape").each(function () {
      var $r        = $(this);
      var curTop    = parseFloat($r.css("top"));
      var curLeft   = parseFloat($r.css("left"));
      var newTop    = curTop  + (Math.random() * 8) - 4;
      var newLeft   = curLeft + (Math.random() * 8) - 4;
      $r.animate(
        { top: newTop + "%", left: newLeft + "%" },
        { duration: REALM_DURATION * 0.9, easing: "linear", queue: false }
      );
    });
  }

  // PROGRESS BAR
  function startProgress() {
    $("#progress-fill").stop(true).css("width", "0%");
    clearInterval(progressInterval);
    var startTime = Date.now();
    progressInterval = setInterval(function () {
      var elapsed = Date.now() - startTime;
      var pct     = Math.min((elapsed / REALM_DURATION) * 100, 100);
      $("#progress-fill").css("width", pct + "%");
      if (pct >= 100) clearInterval(progressInterval);
    }, 50);
  }

  // SHOW REALM
  function showRealm(index) {
    var realm = realms[index];

    $("#realm-name, #realm-desc, #realm-label").fadeOut(FADE_DURATION * 0.55);
    $(".shape").fadeOut(FADE_DURATION * 0.45);

    $("#bg-image").fadeOut(FADE_DURATION, function () {
      $(this).css("background-image", "url('" + realm.img + "')");
      $(this).fadeIn(FADE_DURATION);
    });

    setTimeout(function () {
      $("#progress-fill").css("background", realm.accent);
      $("#realm-label").text("THE NINE REALMS");
      $("#realm-name").text(realm.name.toUpperCase());
      $("#realm-desc").text(realm.desc);
      $("#realm-name, #realm-desc, #realm-label").fadeIn(FADE_DURATION);

      buildshapes(realm.accent);
      $(".shape").fadeIn(FADE_DURATION);
      driftshapes();

    }, FADE_DURATION * 0.75);

    startProgress();
  }

  // CYCLE
  function nextRealm() {
    currentIndex = (currentIndex + 1) % realms.length;
    showRealm(currentIndex);
  }

  // INIT
  $.each(realms, function (i, r) {
    $("<img>").attr("src", r.img);
  });

  $("#bg-image").css("background-image", "url('" + realms[0].img + "')");
  showRealm(0);
  setInterval(nextRealm, REALM_DURATION);

  // NAV TOGGLE 
  var $navToggle = $(".nav-toggle");
  var $navMenu   = $(".nav-menu");

  if ($navToggle.length && $navMenu.length) {
    $navToggle.on("click", function () {
      $navToggle.toggleClass("active");
      $navMenu.toggleClass("active");
    });
    $(".nav-link").on("click", function () {
      $navToggle.removeClass("active");
      $navMenu.removeClass("active");
    });
    $(window).on("scroll", function () {
      $(".main-nav").toggleClass("scrolled", $(this).scrollTop() > 50);
    });
  }

});
