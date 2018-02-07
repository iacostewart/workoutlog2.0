$(function () {
    let WorkoutLog = (function($, undefined) {
        let API_BASE = "http://localhost:3000/api/";
        let userDefinitions = [];

        let setAuthHeader = function (sessionToken) {
            window.localStorage.setItem("sessionToken", sessionToken);
            //Set the authorization header
            //This can be done on individual calls
            //here we showcase ajaxSetup as a global tool#sign
            $.ajaxSetup({
                "headers": {
                    "Authorization": sessionToken
                }
            });
        };
        //public
        return {
            API_BASE: API_BASE,
            setAuthHeader: setAuthHeader
        };
    })(jQuery);

    //ensure .disabled aren't clickable 
    $('.nav-tabs a[data-toggle= "tab"]').on("click", function(e) {
        let token = window.localStorage.getItem("sessionToken");
        if ($(this).hasClass("disabled") && !token) {
            e.preventDefault();
            return false;
        }
    });
    // bind tab change events
    // $('a[data-toggle= "tab"]').on('shown.bs.tab', function (e) {
    //     let target = $(e.target).attr("href");// activated tab
    //     if (target === "#log") {
    //         WorkoutLog.log.setDefinitions();
    //     }

    //     if (target === "#history") {
    //         WorkoutLog.log.setHistory();
    //     }
    // });
    // bind enter key
    $(document).on("keypress", function (e) {
        
        if (e.which === 13) { // enter key
            console.log(e);
            if ($("#signup-modal").is(":visible")) {
                $("#signup").trigger("click");
                console.log('signup button clicked');
                
            }
            if ($("#login-modal").is(":visible") ) {
                $("#login").trigger("click");
                console.log('loginButtonClick');
            }
        }
    });

    //setHeader if we 
//bind tab change events
//boostrap tab  binding to a boostrap event
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    let target = $(e.target).attr("href"); // activated tab
    if (target === "#log") {
       WorkoutLog.log.setDefinitions();
    }
    if (target === "#update-log") {
        WorkoutLog.log.setDefinitions();
    }

    if (target === "#history") {
        console.log(WorkoutLog.log.workouts)
       WorkoutLog.log.setHistory();
    }

});

    let token = window.localStorage.getItem("sessionToken");
    if (token) {
        WorkoutLog.setAuthHeader(token);
        
    }

    // expose this to the other workoutlog modules
    window.WorkoutLog = WorkoutLog;
});