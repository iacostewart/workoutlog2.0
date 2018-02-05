
console.log("workouts log.js")
$(function () {
    $.extend(WorkoutLog, {   ////// this is one giant object  the name of the object is log: thats why workouts setHistory and all the others end with : 
        log: {  //// i suspect that workout log is a larger constainer with lots of objects branching off of it. thats why we see alot of WorkoutLog.somethings.. its calling that part of the object. 

            workouts: [],

            setDefinitions: function () {
                let defs = WorkoutLog.definition.userDefinitions;
                let len = defs.length;
                let opts;
                for (var i = 0; i < len; i++) {
                    opts += "<option value='" + defs[i].id + "'>" + defs[i].description + "</option>";
                }
                $("#log-definition").children().remove();
                $("#log-definition").append(opts);
               // $("#update-definition").children().remove();
               // $("#update-definition").append(opts);

            },
            
     setHistory: function() {
				var history = WorkoutLog.log.workouts;
				// console.log(history[1].id)
				 console.log(WorkoutLog.definition.userDefinitions)
				// console.log(history[2]);
				var len = history.length;
				// let definitions = WorkoutLog.definition.userDefinitions;
				// console.log(definitions)
				var lis = "";
					for (var i = 0; i < len; i++) {
                        console.log(`${history[1].def}`);
					lis += "<li class='list-group-item'>" + 
					//history[i].id + " - " + 
                    history[i].def + " - " + 
                   // console.log('defis not here', def);
					history[i].result + " " +
					// pass the log.id into the button's id attribute // watch your quotes!
					"<div class='pull-right'>" +
						"<button id='" + history[i].id + "' class='update'><strong>U</strong></button>" +
						"<button id='" + history[i].id + "' class='remove'><strong>X</strong></button>" +
					"</div></li>";
                  
              }
              $("#history-list").children().remove();
              $("#history-list").append(lis);

            },
            create: function () {
                let itsLog = {
                    desc: $("#log-description").val(),
                    result: $("#log-result").val(),
                    def: $("#log-definition option:selected").text()
                };
                let postData = { log: itsLog };
                let logger = $.ajax({
                    type: "POST",
                    url: WorkoutLog.API_BASE + "log",
                    data: JSON.stringify(postData),
                    contentType: "application/json"
                });
                logger.done(function(data) {
                   // console.log("jaysiadto", WorkoutLog)
                   // console.log({data}, 'imhere')
                   console.log(data)
                    WorkoutLog.log.workouts.push(data);
                    
                    $("#log-description").val("");
                    $("#log-result").val("");
                    $('a[href="#history"]').tab("show");
                    //window.location.reload();

                });
            },

                getWorkout: function() {
                    let thisLog = {id: $(this).attr("id")};
                    console.log(thisLog);
                    logID = thisLog.id;
                    let updateData = { log: thisLog };
                    let getLog = $.ajax({
                        type: "GET",
                        url: WorkoutLog.API_BASE + "log/" + logID,
                        data: JSON.stringify(updateData),
                        contentType: "application/json"

                    });
                getLog.done(function(data){
                    $('a[href="#update-log"]').tab("show");
                    $('#update-result').val(data.result);
                    $('#update-description').val(data.description);
                    $('#update-id').val(data.id);
                });
              
                },
                updateWorkout: function() {
                    $("#update").text("Update");
                    let updateLog = {
                        id: $('#update-id').val(),
                        desc: $("#update-description").val(),
                            result: $("#update-result").val(),
                            def: $("#update-definition option:selected").text()
                    };
                    for( var i = 0; i < WorkoutLog.log.workouts.length; i++){
                        if(WorkoutLog.log.workouts[i].id == updateLog.id){
                            WorkoutLog.log.workouts.splice(i, 1);
                        }
                    }
                    WorkoutLog.log.workouts.push(updateLog);
                    let updateLogData = { log: updateLog };
                    let updater = $.ajax({
                        type: "PUT",
                        url: WorkoutLog.API_BASE + "log",
                        data: JSON.stringify(updateLogData),
                        contentType: "application/json"
                    });
                    
                    updater.done(function(data) {
                        console.log(data);
                        $("#update-description").val("");
                        $("#update-result").val("");
                        //$("#history-list").val("");
                        $('a[href="#history"]').tab("show");
                    });
                },


                delete: function(){
                        let thisLog = { 
                            //"this" is the button on the li 
                            //.attr("id") targets teh value of the id attribute of button
                            id: $(this).attr("id")
                        };
                        let deleteData = { log: thisLog };
                        let deleteLog = $.ajax({
                            type: "DELETE",
                            url: WorkoutLog.API_BASE + "log",
                            data: JSON.stringify(deleteData),
                            contentType: "application/json"
                        });
                        // removes list item 
                //refrences button then grabs cossest li
                $(this).closest("li").remove();
                
                // deletes item out of workouts array
                 for(var i = 0; i < WorkoutLog.log.workouts.length; i++){
                     if(WorkoutLog.log.workouts[i].id == thisLog.id){
                         WorkoutLog.log.workouts.splice(i, 1);

                     }
                 }
                 deleteLog.fail(function(){
                    console.log("nope... you did not delete it.");
                });
                },
            fetchAll: function () {
                let fetchDefs = $.ajax({
                    type: "GET",
                    url: WorkoutLog.API_BASE + "log",
                    headers: {
                        "authorization": window.localStorage.getItem("sessionToken")
                    }
                })
                .done(function(data) {
                console.log(data)
                    console.log(`Got logs`,data)
                    WorkoutLog.log.workouts = data.data;
                console.log(data.data[2])
                })
                .fail(function(err) {
                    console.log(err);
                });
                

            }
        }
    });
    //Click the button and create a log entry. 
    $("#log-save").on("click", WorkoutLog.log.create);
 //  $('#log-save').on('click', window.location.reload());
    $("#history-list").delegate('.remove', 'click', WorkoutLog.log.delete);
    $("#log-update").on("click", WorkoutLog.log.updateWorkout);
    $("#history-list").delegate('.update', 'click', WorkoutLog.log.getWorkout);
    

    if (window.localStorage.getItem("sessionToken") ) {
        WorkoutLog.log.fetchAll();
    
    }

});