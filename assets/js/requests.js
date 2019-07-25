$(document).ready(function () {
    /** 
     * BEGIN VARIABLES
    **/

    var $buttons = $("<div>").addClass("buttonNav");
    var $gifs = $("<div>").addClass("gifContainer");
    var defaultQuickSearches = ["Minecraft", "Call of Duty", "Nazi Zombies", "Computers", "Laptops", "XBox", "PS3", "PS4", "GTAV", "Left 4 Dead", "Fortnite", "Apex Legends"];
    buildPage();

    /**
     * END VARIABLES
     * 
     * BEGIN EVENTS
     */

    $(document).on("click", ".gif", function() {
        var $img = $(this);
        var currentVal = $img.attr("src");
        if (currentVal.includes("_s")) {
            $img.attr("src", $img.attr("movingPicture"));
        } else {
            $img.attr("src", $img.attr("stillPicture"));
        }
    });

    $(document).on("click", ".searchButton", function() {
        var $input = $(".searchBar");
        if ($input.val().length) {
            generateGifsFromSearch($input.val(), 20);
            if (!defaultQuickSearches.includes($input.val())) {
                defaultQuickSearches.push($input.val());
                addGIFButton($input.val());
            }
            $input.val("");
        }
    });

    $(document).on("click", ".gifSearchButton", function() {
        generateGifsFromSearch($(this).text(), 20);
    });

    /**
     * END EVENTS
     * 
     * START FUNCTIONS
     */

    function buildPage() {
        // Generating search bar and buttons
        $("body").prepend($buttons);
        var $searchContainer = $("<div>").addClass("searchBarContainer");
        var $searchBar = $("<input>").addClass("searchBar");
        var $searchButton = $("<button>").addClass("searchButton").text("Search");
        $(".container").append($searchContainer.append($searchBar, $searchButton), $gifs);
        defaultQuickSearches.forEach(search => {
            addGIFButton(search);
        });
    }

    function addGIFButton(search) {
        var $button = $("<button>").text(search.toUpperCase());
        $button.addClass("gifSearchButton");
        moveElement($button, $buttons);
    }

    /**
     * 
     * @param {*} search - Keyword to search from Gihpy 
     * @param {*} index - Which index of the gifs to recieve
     * @param {*} limit - how many gifs to return
     * @returns [title, rating, image url]
     */
    function generateGifsFromSearch(search, limit) {
        $gifs.empty();
        for (let i = 0; i < limit; i++) {
            $.ajax({
                url: "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + limit,
                method: "GET"
            }).then(response => {
                var $newGifElement = $("<div>").addClass("gifElement");
                var title = response.data[i].title.toUpperCase().replace("GIF", "").split(" ");
                var $gifTitle = $("<div>").addClass("gifTitle").text(title[0]);
                var $gifRating = $("<div>").addClass("gifRating").text("Rating: " + response.data[i].rating);
                var $gif = $("<img>").addClass("gif").attr("src", response.data[i].images.original_still.url).attr("movingPicture", response.data[i].images.original.url).attr("stillPicture", response.data[i].images.original_still.url);
                $newGifElement.append($gifTitle, $gifRating, $gif);
                $gifs.append($newGifElement);
            });
        }
    }

    /**
     * @param {*} element - to move
     * @param {*} to - where to move 'element'
     */
    function moveElement(element, to) {
        var $elm = $(element);
        $elm.detach();
        $(to).append($elm);

    }
});