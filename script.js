// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Display current day
  const todayDate = dayjs();
  $('#currentDay').text(todayDate.format('dddd, MMMM D h:mm A'));

  // Function to update time-block class based on current hour
  function updateHourClasses() {
    const currentHour = todayDate.hour();

    $(".time-block").each(function() {
      let blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past").addClass("present");
      } else {
        $(this).removeClass("present").addClass("future");
      }
    });
  }

  // Function to load saved descriptions from local storage
  function loadDescriptions() {
    $(".time-block").each(function() {
      let blockHour = $(this).attr("id");
      const savedDescription = localStorage.getItem(blockHour);

      if (savedDescription !== null) {
        $(this).find(".description").val(savedDescription);
      }
    });
  }

  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function() {
    var blockHour = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();

    localStorage.setItem(blockHour, description);
  });

  // Update time-block classes on page load
  updateHourClasses();

  // Load saved descriptions from local storage
  loadDescriptions();
});





  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
