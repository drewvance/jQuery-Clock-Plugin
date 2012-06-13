/* Sets time in clock div and calls itself every second */
/**
* Clock plugin
* Copyright (c) 2010 John R D'Orazio (donjohn.fmmi@gmail.com)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 
* Turns a jQuery dom element into a dynamic clock
*  
* @timestamp defaults to clients current time
*   $("#mydiv").clock();
*   >> will turn div into clock using client computer's current time
* @timestamp server-side example:
*   Say we have a hidden input with id='timestmp' the value of which is determined server-side with server's current time
*   $("#mydiv").clock({"timestamp":$("#timestmp").val()});
*   >> will turn div into clock passing in server's current time as retrieved from hidden input
*    
* @format sets the datetime format,
* Examples: 
* 'MM/DD/YYYY HH:mm:ss AM' => 7/23/1983 9:30:53 PM
* 'DD.MM.YYYY HH:mm:ss' => 23.7.1983 21:30:53
*/

(function ($, undefined) {

    $.clock = { version: "2.0.1", format: {} }

    t = new Array();

    $.fn.clock = function (options) {


        return this.each(function () {
            options = options || {};
            options.timestamp = options.timestamp || "systime";
            systimestamp = new Date();
            systimestamp = systimestamp.getTime();
            options.sysdiff = 0;
            if (options.timestamp != "systime") {
                mytimestamp = new Date(options.timestamp);
                options.sysdiff = options.timestamp - systimestamp;
            }
            options.langSet = options.langSet || "en";
            options.format = options.format;
            options.calendar = options.calendar || "true";


            if (!$(this).hasClass("jqclock")) { $(this).addClass("jqclock"); }

            var addleadingzero = function (i) {
                if (i < 10) { i = "0" + i; }
                return i;
            },
    updateClock = function (el, myoptions) {
        var el_id = $(el).attr("id");
        if (myoptions == "destroy") { clearTimeout(t[el_id]); }
        else {
            mytimestamp = new Date();
            mytimestamp = mytimestamp.getTime();
            mytimestamp = mytimestamp + myoptions.sysdiff;
            mytimestamp = new Date(mytimestamp);
            var h = mytimestamp.getHours(),
        m = mytimestamp.getMinutes(),
        s = mytimestamp.getSeconds(),
        dy = mytimestamp.getDay(),
        dt = mytimestamp.getDate(),
        mo = mytimestamp.getMonth() + 1,
        y = mytimestamp.getFullYear(),
        ap = "",
        calend = "";

            if (myoptions.format.toLowerCase().indexOf("am") >= 0 ||
  		myoptions.format.toLowerCase().indexOf("pm") >= 0) {
                ap = " AM";
                if (h > 11) { ap = " PM"; }
                if (h > 12) { h = h - 12; }
                if (h == 0) { h = 12; }
            }

            // add a zero in front of numbers 0-9
            h = addleadingzero(h);
            m = addleadingzero(m);
            s = addleadingzero(s);


            var to_render = myoptions.format;
            to_render = to_render.replace('MM', mo);
            to_render = to_render.replace('DD', dt);
            to_render = to_render.replace('YYYY', y);

            to_render = to_render.replace('hh', h);
            to_render = to_render.replace('HH', h);
            to_render = to_render.replace('mm', m);
            to_render = to_render.replace('ss', s);
            to_render = to_render.replace('AM', ap);

            to_render = "<span class='clockdate'>" + to_render + "</span>";

            $(el).html(to_render);
            t[el_id] = setTimeout(function () { updateClock($(el), myoptions) }, 1000);
        }

    }

            updateClock($(this), options);
        });
    }

    return this;

})(jQuery);
