/**
 * BEGIN VARIABLES
 */

    var $buttons = $("<div>").addClass("buttonNav");
    buildPage();

/**
 * 
 * 
 * START FUNCTIONS
 */

function buildPage() {
    // Generating search bar and buttons
    $("body").prepend($buttons);
    var $searchContainer = $("<div>").addClass("searchBarContainer");
    var $searchBar = $("<input>").addClass("searchBar");
    var $searchButton = $("<button>").addClass("searchButton");
    $("body").append($searchContainer.append($searchBar, $searchButton));
    addGIFButton("Minecraft"); addGIFButton("Call of Duty"); addGIFButton("Nazi Zombies"); addGIFButton("Computers");
    addGIFButton("Laptops"); addGIFButton("XBox"); addGIFButton("PS3"); addGIFButton("PS4");
    addGIFButton("GTAV"); addGIFButton("Left 4 Dead"), addGIFButton("Fortnite"); addGIFButton("Apex Legends");;

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
 */
function $requestGIF(search, index, limit) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + limit,
        method: "GET"
    }).then(response => {
        return $("<img>").attr("src", response.data[index].images.original.url);
    })
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