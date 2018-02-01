$(function () {
    $.extend(WorkoutLog, {
        //signup method
        signup: function () {
            //username & password variables.
            let username = $("#su_username").val();
            let password = $("#su_password").val();
            // user object
            let user = {
                user: {
                    username: username,
                    password: password
                }
            };
            //signup post
            let signup = $.ajax({
                type: "POST",
                url: WorkoutLog.API_BASE + "user",
                data: JSON.stringify(user),
                contentType: "application/json"
            });
            //signup done/fail
            signup.done(function (data) {
                if (data.sessionToken) {
                    WorkoutLog.setAuthHeader(data.sessionToken);
                    console.log("you made it");
                }

                $("#signup-modal").modal("hide");
                $(".disabled").removeClass("disabled");
                $("#loginout").text("Logout");
            }).fail(function () {
                $("#su_error").text("there was an issue with sign up").show();
            });


        },

        //login method

        login: function () {
            //login variables
            let username = $("#li_username").val();
            let password = $("#li_password").val();
            let user = { user: { username: username, password: password } };
            // login POST

            let login = $.ajax({
                type: "POST",
                url: WorkoutLog.API_BASE + "login",
                data: JSON.stringify(user),
                contentType: "application/json"
            });

            //LOgin done/fail
            login.done(function (data) {
                if (data.sessionToken) {
                    WorkoutLog.setAuthHeader(data.sessionToken);

                }
                $("#login-modal").modal("hide");
                $(".disabled").removeClass("disabled");
                $("#loginout").text("logout");

            }).fail(function () {
                $("#li_error").text("There was an issue with Sign up").show();
            });

        },
        //logout

        loginout: function () {
            if (window.localStorage.getItem("sessionToken")) {
                window.localStorage.removeItem("sessionToken");
                $("#loginout").text("Login");
            }
        }
    });

    // bind events
    $("#login").on("click", WorkoutLog.login);
    $("#signup").on("clicK", WorkoutLog.signup);
    $("#loginout").on("click", WorkoutLog.loginout);

    if (window.localStorage.getItem("sessionToken")) {
        $("#loginout").text("logout");
    }
});

//  $("#signup").on("click", WorkoutLog.signup);
// //loginout method
// console.log("clicked");
// console.log(data.sessionToken);

//     });
//     //bind events



