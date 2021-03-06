////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var click_check = 0;
var duration = 0;
function generate_duration_bar(){
  // duration bar
  var duration_bar = document.createElement("div");
    duration_bar.id = "duration_bar";
    duration_bar.style.position = "absolute";
    duration_bar.style.top = "80%";
    duration_bar.style.left = "20%";
    duration_bar.style.height = "9%";
    duration_bar.style.width = "79%";
    duration_bar.style.border = "1px solid #000";
    duration_bar.style.backgroundColor = "#222";
    main_window_bkgd.appendChild(duration_bar);

  var duration_bar_progress = document.createElement("div");
    duration_bar_progress.id = "duration_bar_progress";
    duration_bar_progress.style.position = "absolute";
    duration_bar_progress.style.top = 0;
    duration_bar_progress.style.left = 0;
    duration_bar_progress.style.height = "100%";
    duration_bar_progress.style.width = 0 + "%";
    duration_bar_progress.style.backgroundColor = "#0c8";
    document.getElementById("duration_bar").appendChild(duration_bar_progress);

  var duration_bar_progress_autoplay = document.createElement("div");
    duration_bar_progress_autoplay.id = "duration_bar_progress_autoplay";
    duration_bar_progress_autoplay.style.position = "absolute";
    duration_bar_progress_autoplay.style.top = 0;
    duration_bar_progress_autoplay.style.left = 0;
    duration_bar_progress_autoplay.style.height = "10%";
    duration_bar_progress_autoplay.style.width = 0;
    duration_bar_progress_autoplay.style.backgroundColor = "#ff0";
    document.getElementById("duration_bar").appendChild(duration_bar_progress_autoplay);

  var duration_bar_cover = document.createElement("div");
    duration_bar_cover.id = "duration_bar_cover";
    duration_bar_cover.style.position = "absolute";
    duration_bar_cover.style.top = 0;
    duration_bar_cover.style.left = 0;
    duration_bar_cover.style.height = "100%";
    duration_bar_cover.style.width = "100%";
    duration_bar_cover.style.backgroundColor = "rgba(200,50,50,0)";
    duration_bar_cover.style.zIndex = 2;
    document.getElementById("duration_bar").appendChild(duration_bar_cover);

  const duration_bar_cover_width = duration_bar_cover.offsetWidth;
    var handle = 0;
    duration_bar_cover.onmouseup = function(event){
      // add onmousemove here to stop the duration bar from being moved
      // after the user releases the mouse button
      duration_bar_cover.onmousemove = function(event){}
    }
    duration_bar_cover.onmousedown = function(event){
      duration_bar_cover.onmousemove = function(event){
        // get horizontal x-position of click
        var get_mouse_coord_x = event.clientX - duration_bar.offsetLeft;

        // adjust to percentage of duration_bar
        var new_progress =
          Math.round((get_mouse_coord_x / duration_bar_cover_width) * 100) + "%";
        var new_progress =
          Math.round((get_mouse_coord_x / duration_bar_cover_width) * 100);

        // adjust duration_bar_progress width to that approximate point
        duration_bar_progress.style.width = new_progress  + "%";
        duration_bar_progress_autoplay.style.width = new_progress + "%";

        // adjust media file to new point
        multimedia_player.currentTime =
          multimedia_player.duration *
          (get_mouse_coord_x / duration_bar_cover_width);

        // submit values for editing
        if (click_check === 0){
          if (time_start.style.color === "rgb(255, 0, 0)"){
            click_one = click_one_locked;
          }else{
            click_one = multimedia_player.currentTime;
          }

          // click_one = multimedia_player.currentTime;
          document.getElementById("time_start").innerHTML = "<font color='#fff'>Start Time</font><br>" + click_one.toFixed(3);

          click_check = 1;
        }else{
          // click_two = multimedia_player.currentTime;
          if (time_end.style.color === "rgb(255, 0, 0)"){
            click_two = click_two_locked;

            // these two lines are copied from above because the duration bar
            // breaks for some reason when this event happens
            // but if we add these two lines from above then it fixes
            // otherwise the duration bar will never set the new click_one value
            click_one = multimedia_player.currentTime;
            document.getElementById("time_start").innerHTML = "<font color='#fff'>Start Time</font><br>" + click_one.toFixed(3);
          }else{
            click_two = multimedia_player.currentTime;
          }

          duration = click_two - click_one;
          document.getElementById("time_duration").innerHTML = "Duration<br>" + duration.toFixed(3);

          document.getElementById("time_end").innerHTML = "<font color='#fff'>End Time</font><br>" + click_two.toFixed(3);

          click_check = 0;
        }
      }
    }
}
setTimeout(function(){
  generate_duration_bar();
}, 1000);
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////