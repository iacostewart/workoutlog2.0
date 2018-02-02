
console.log("workouts log.js")
$(function () {
    $.extend(WorkoutLog, {
        log: {

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

            },
     setHistory: function() {
				var history = WorkoutLog.log.workouts;
				// console.log(history[1].id)
				// console.log(WorkoutLog.definition.userDefinitions)
				
				var len = history.length;
				// let definitions = WorkoutLog.definition.userDefinitions;
				// console.log(definitions)
				var lis = "";
					for (var i = 0; i < len; i++) {
					lis += "<li class='list-group-item'>" + 
					// history[i].id + " - " + 
					history[i].def + " - " + 
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
                    console.log("jaysiadto", WorkoutLog)
                    WorkoutLog.log.workouts.push(data.data);
                    $("#log-description").val("");
                    $("#log-result").val("");
                    $('a[href="#history"]').tab("show");
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
                  //  console.log(`Got logs: ${data}`)
                    WorkoutLog.log.workouts = data.data;
                });

            }
        }
    });
    //Click the button and create a log entry. 
    $("#log-save").on("click", WorkoutLog.log.create);
    $("#history-list").delegate('.remove', 'click', WorkoutLog.log.delete);

    if (window.localStorage.getItem("sessionToken") ) {
        WorkoutLog.log.fetchAll();
    
    }

});