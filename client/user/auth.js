$(function () {
    console.log("AughJs exists")
    $.extend(WorkoutLog, {
        //signup method
        signup: function () {
            //username & password variables.
            let username = $("#su_username").val();
            let password = $("#su_password").val();
            console.log("username", username);
            // user object
            let user = {
                user: {
                    username: username,
                    password: password
                }
            };
            console.log("user", user);
            //signup post
            let signup = $.ajax({
                type: "POST",
                url: WorkoutLog.API_BASE + "user",
                data: JSON.stringify(user),
                contentType: "application/json"
            });
            //signup done/fail
            signup.done(function (data) {
                console.log("signUP", data.user);
                if (data.sessionToken) {
                    WorkoutLog.setAuthHeader(data.sessionToken);
                    console.log('signupSessionToken', data.sessionToken)
                    WorkoutLog.definition.fetchAll();
                    WorkoutLog.log.fetchAll();
                    console.log("you made it");
                }
                $('a[href="define"]').tab('show');
                ("#su_username").valueOf("");
                $("#su_password").val("");
                $('a[href="#define"]').tab("show");
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
                    WorkoutLog.definition.fetchAll();
                    WorkoutLog.log.fetchAll();

                }
                $("#li_username").val("");
                $("#li_password").val(""); 
                $('a[href="#define"]').tab("show");
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
                window.location.reload();
                $("#loginout").text("Login");
            }
            
        }
    });
      

    // bind events
    $("#login").on("click", WorkoutLog.login);
    $("#signup").on("click", WorkoutLog.signup);
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
   

