$(document).ready(function() {
    framework: 'bootstrap3'    
    // Instance the tour
    var tour = new Tour({
        steps: [
        {
            element: "#search",
            placement: "bottom",
            title: "Search",
            content: "Allows you to search through record(s) e.g. case, knowledge article, etc.",
            animation: "true",
            //duration: 3000
        },
        {
            element: "#linksTable",
            placement: "top",
            title: "Manage Apps",
            content: "Personalise your favourite apps for quick accessibility",
            animation: "true",
            //duration: 3000
        }
        ],
        backdrop: false,
        storage: false
    });

    $('.button').click(function(){
        // Initialize the tour
        tour.start();
    });

});