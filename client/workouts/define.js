$(function () {
    $.extend(WorkoutLog, {
        definition: {
            userDefinitions: [],

            create: function () {
                let def = {
                    desc: $("#def-description").val(),
                    type: $("#def-logtype").val()
                };
                let postData = { definition: def };
                let define = $.ajax({
                    type: "POST",
                    url: WorkoutLog.API_BASE + "definition",
                    data: JSON.stringify(postData),
                    contentType: "application/json"
                });

                define.done(function (data) {
                        console.log(data.definition)
                    WorkoutLog.definition.userDefinitions.push(data.definition);
                });
            },
            fetchAll: function () {
                let fetchDefs = $.ajax({
                    type: "GET",
                    url: WorkoutLog.API_BASE + "definition",
                    headers: {
                        "authorization": window.localStorage.getItem("sessionToken")
                    }
                })
                    .done(function (data) {
                        console.log('helo')
                        WorkoutLog.definition.userDefinitions = data.data;
                    })
                    .fail(function (err) {
                        console.log(err);
                    });
            }
        }
    });
    //bindings
    $("#def-save").on("click", WorkoutLog.definition.create);
    
    //fetch definitions if we already are authenticated and refreshed
                   


    if (window.localStorage.getItem("sessionToken")) {
        WorkoutLog.definition.fetchAll();
    }
    
});