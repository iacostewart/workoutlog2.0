$(document).ready(function(){
    $("#testAPI").on("click", function(){
        console.log("its Working");
    });
  let test = $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/test"
  })  
  .done(function(data){
      console.log(data);
  })
  .fail(function(){
      console.log("oh no!");
  });
});