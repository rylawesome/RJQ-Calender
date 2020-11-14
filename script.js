    //Should have used this all the way thru instead of seperate functions w/ init, but too late now!
    //On save-id click, save item to array 'storedPlans' on local storage
    document.getElementById('reset').onclick = function() {
        localStorage.setItem("storedPlans", null);
        location.reload();
      }
      $(document).ready(function() {
        $(document).on('click','i', function() {
  
          let $index = $(this).attr('save-id');
          let inputId = '#input-'+$index;
          let $value = $(inputId).val();
          calendarItem[$index] = $value;
  
          localStorage.setItem("storedPlans", JSON.stringify(calendarItem));
        });  
      });
        // var referencing container
        let $calendarDiv = $('#container');
        //set current date/time, fetch from localstorage, and build calendar
        init();
  
        function init() {
          //clear previous time and update to current time
          currentDay.innerHTML = "";
          date_time();
          //fetch local storage
          fetchStored();
          //clear existing elements
          $calendarDiv.empty();
          //create elements
          buildCalendar();
        };
  
        //update local date/time
        function date_time() {
          currentTime = moment().format('LLLL');
          document.getElementById('currentDay').innerHTML = currentTime;
          //update date/time every 1000ms
          setTimeout(function () { date_time(); }, 1000);
        };
  
        function fetchStored() {
          // Get localStorage & parse to string
          let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
          // check storedPlans for items
          if (storedPlans !== null) {
            calendarItem = storedPlans;
        } else {
          // first time launch trigger
            calendarItem = new Array(9);
            calendarItem[3] = "Don't forget lunch!";
            calendarItem[4] = "Try adding something!";
          }
        };
  
        function buildCalendar() {
          // calendar created by row for 9-5
          for (let hour = 9; hour <= 17; hour++) {
          // index used to count 0-8 instead of 9-5
          let index = hour - 9;
      
          // row div
          let $rowDiv = $('<div>');
          $rowDiv.addClass('row');
  
          // Create div for time
          let $timeDiv = $('<div>');
          $timeDiv.addClass('hour');
    
          // create time block w/ span
          const $timeSpn = $('<span>');
          $timeSpn.addClass('time-block');
      
          // military time to reg time
          let displayHour = 0;
          if (hour > 12) { 
          displayHour = hour - 12;
        } else {
          displayHour = hour;
          }
      
        // add time to timeSpn
        $timeSpn.text(`${displayHour}`);
  
        // append into document
        $rowDiv.append($timeDiv);
        $timeDiv.append($timeSpn);
  
        // add row's input
        let $calInput = $('<input>');
        $calInput.attr('id',`input-${index}`);
        $calInput.addClass('textarea');
  
        // check localStorage for pre-existing items to add
        $calInput.val( calendarItem[index] );
        let $inputDiv = $('<div>');
        $inputDiv.addClass('textarea');
  
        // add inputs and pre-existing items
        $rowDiv.append($inputDiv);
        $inputDiv.append($calInput);
  
        // add save button
        let $saveDiv = $('<div>');
        $saveDiv.addClass('saveBtn');
  
        let $saveBtn = $('<i>');
        $saveBtn.attr('id',`saveid-${index}`);
        $saveBtn.attr('class','fa fa-save');
        //needed to save to localStorage
        $saveBtn.attr('save-id',index);
      
        // add to row
        $rowDiv.append($saveDiv);
        $saveDiv.append($saveBtn);
  
        // row color based on time
        updateRowColor($rowDiv, hour);
      
        // add each row to container
        $calendarDiv.append($rowDiv);
        };
      };
  
      function updateRowColor ($hourRow, hour) { 
        var currentHour = moment().format('H');
        if ( hour < currentHour) {
          $hourRow.addClass('past');
        } 
        else if ( hour > currentHour) {
          $hourRow.addClass('future');
        } 
        else {
          $hourRow.addClass('present');
      }
    };