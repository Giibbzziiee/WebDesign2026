// Gibson Media - Ethan Gibson - MART 441

$(document).ready(function () {

    // JQUERY PLUGIN
    $.fn.categoryHighlight = function () {
        return this.on("click", function () {
            $(this).toggleClass("highlighted");
        });
    };

    // AJAX
    $.getJSON("json/US_category_id.json", function (data) {

        var items = data.items;

        // LOOP OVER CATS IN ITEM ARRAY
        $.each(items, function (index, item) {

            var id         = item.id;
            var title      = item.snippet.title;
            var assignable = item.snippet.assignable;

            // BUILD CARD ELEMENT FOR CAT
            var $card = $("<div>")
                .addClass("cat-card")
                .addClass(assignable ? "assignable" : "nonassignable");

            var $id = $("<span>")
                .addClass("cat-id")
                .text("#" + id);

            var $title = $("<span>")
                .addClass("cat-title")
                .text(title);

            $card.append($id).append($title);

            // DROP CARD TO COLUMN
            if (assignable) {
                $("#assignable-list").append($card);
            } else {
                $("#nonassignable-list").append($card);
            }

            // ANIMATE
            setTimeout(function () {
                $card.animate(
                    { opacity: 1 },
                    { duration: 300, queue: false }
                );
                $card.css("transform", "translateY(0)");
            }, index * 40);

        });

        // APPLY CUSTOM PLUGIN
        $(".cat-card").categoryHighlight();

    }).fail(function () {
        // JSON LOAD FAILURE MESSAGE
        $(".ytcats-columns").html(
            "<p style='color:rgba(255,255,255,0.4); text-align:center; padding:2rem;'>Could not load category data. Make sure US_category_id.json is in the json/ folder.</p>"
        );
    });



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
