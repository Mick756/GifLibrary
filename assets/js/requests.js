$(document).ready(function () {

    var $buttons = $("<div>").addClass("buttonNav");
    var $gifs = $("<div>").addClass("gifContainer");
    var quickSearches = localStorage.getItem("searches") !== null ? localStorage.getItem("searches").split(",") : ["minecraft", "call of duty", "zombies", "computers", "laptops", "xbox", "ps3", "ps4", "gtav", "left 4 dead", "fortnite", "apex legends"];
    buildPage();

    $(document).on("click", ".gif", function () {
        var $img = $(this);
        var currentVal = $img.attr("src");
        if (currentVal.includes("_s")) {
            $img.attr("src", $img.attr("movingPicture"));
        } else {
            $img.attr("src", $img.attr("stillPicture"));
        }
    });

    $(document).on("click", ".searchButton", function () {
        var $input = $(".searchBar");
        if ($input.val().length) {
            generateGifsFromSearch($input.val(), 20);
            if (!quickSearches.includes($input.val())) {
                quickSearches.push($input.val().toLowerCase().trim());
                addGIFButton($input.val());
            }
            $input.val("");
        }
        localStorage.setItem("searches", quickSearches);
    });

    $(document).on("click", ".removeButton", function () {
        var $input = $(".searchBar");
        if ($input.val().length && quickSearches.includes($input.val().toLowerCase())) {
            console.log("CLICK");
            $buttons.empty();
            console.log(quickSearches);
            quickSearchs = quickSearches.splice(quickSearches.indexOf($input.val().toLowerCase()), 1);
            console.log(quickSearches);
            localStorage.setItem("searches", quickSearches);
            quickSearches = localStorage.getItem("searches").split(",");
            quickSearches.forEach(search => {
                //if (search !== empty) {
                    addGIFButton(search);
            });
            $input.val("");
        } else {
            $gifs.empty();
        }
    });

    $(document).on("click", ".gifSearchButton", function () {
        generateGifsFromSearch($(this).text(), 40);
    });

    function buildPage() {
        // Generating search bar and buttons
        $("body").prepend($buttons);
        var $searchContainer = $("<div>").addClass("searchBarContainer");
        var $searchBar = $("<input>").addClass("searchBar");
        var $searchButton = $("<button>").addClass("searchButton").text("Search");
        var $removeButton = $("<button>").addClass("removeButton").text("Remove/Clear");
        $(".container").append($searchContainer.append($searchBar, $searchButton, $removeButton), $gifs);
        quickSearches.forEach(search => {
            addGIFButton(search);
        });
    }

    function addGIFButton(search) {
        var $button = $("<button>").text(search.toUpperCase());
        $button.addClass("gifSearchButton");
        moveElement($button, $buttons);
    }

    function generateGifsFromSearch(search, limit) {
        $gifs.empty();
        for (let i = 0; i < limit; i++) {
            $.ajax({
                url: "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + limit,
                method: "GET"
            }).then(response => {
                var $newGifElement = $("<div>").addClass("gifElement");
                var $dataDiv = $("<div>").addClass("gifDataContainer");
                var $pictureDiv = $("<div>").addClass("gifPictureContainer");
                var title = response.data[i].title.toUpperCase().replace("GIF", "").split(" ");    
                var $gifTitle = $("<div>").addClass("gifTitle").text("Title: " + title[0]);
                var $gifRating = $("<div>").addClass("gifRating").text("Rating: " + response.data[i].rating.toUpperCase());
                $dataDiv.append($gifTitle, $gifRating);
                var $gif = $("<img>").addClass("gif").attr("src", response.data[i].images.original_still.url).attr("movingPicture", response.data[i].images.original.url).attr("stillPicture", response.data[i].images.original_still.url);
                $pictureDiv.append($gif);
                $newGifElement.append($dataDiv, $pictureDiv);
                $gifs.append($newGifElement);
            });
        }
    }

    function moveElement(element, to) {
        var $elm = $(element);
        $elm.detach();
        $(to).append($elm);
    }
});