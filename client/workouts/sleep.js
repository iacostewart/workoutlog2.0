
$(function () {
    $.extend(WorkoutLog, {
        sleep: {
            userSleep: [],

            create: function () {
                let sleep = {
                    hours: parseInt( $("#sleep-data").val()),
                   
                    
                };  
                
                let postData = { sleep: sleep };
                let define = $.ajax({
                    type: "POST",
                    url: WorkoutLog.API_BASE + "sleep",
                    data: JSON.stringify(postData),
                    contentType: "application/json"
                });
console.log(postData);

                define.done(function(data) {
                    WorkoutLog.sleep.userSleep.push(data.sleep);
                    console.log(data)
                  //  $("#sleep-data").val("");
                    
                });
            },
            fetchAll: function () {
                let fetchDefs = $.ajax({
                    type: "GET",
                    url: WorkoutLog.API_BASE + "sleep",
                    headers: {
                        "authorization": window.localStorage.getItem("sessionToken")
                    }
                })
                    .done(function (data) {
                        console.log('helo')
                        WorkoutLog.sleep.userSleep = data;
                    })
                    .fail(function (err) {
                        console.log(err);
                    });
            }
        }
    });
    //bindings
    $("#sleep-save").on("click", WorkoutLog.sleep.create);
    
    //fetch definitions if we already are authenticated and refreshed
                   


    if (window.localStorage.getItem("sessionToken")) {
        WorkoutLog.sleep.fetchAll();
    }
    
});