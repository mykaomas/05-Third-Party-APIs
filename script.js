$(function () {
  // Display current day
  const todayDate = dayjs();
  $('#currentDay').text(todayDate.format('dddd, MMMM D h:mm A'));

  // Function to update time-block class based on current hour
  function updateHourClasses() {
    const currentHour = todayDate.hour();

    $(".time-block").each(function() {
      let blockElement = $(this);
      // Extract the hour from the id and convert it to an integer
      let blockHour = parseInt(blockElement.attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        blockElement.removeClass("present").addClass("past");
      } else if (blockHour === currentHour) {
        blockElement.removeClass("future").addClass("present");
      } else {
        blockElement.removeClass("past").addClass("future");
      }
    });
  }

  // Function to load saved descriptions from local storage
  function loadDescriptions() {
    $(".time-block").each(function() {
      let blockElement = $(this);
      let blockHour = parseInt(blockElement.attr("id").split("-")[1]);

      const savedDescription = localStorage.getItem(blockHour);

      if (savedDescription !== null) {
        $(blockElement).find(".description").val(savedDescription);
      }
    });
  }

  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function() {
    let blockElement = $(this).parent()
    let blockHour = parseInt(blockElement.attr("id").split("-")[1]);
    let description = blockElement.find(".description").val();

    localStorage.setItem(blockHour, description);
  });

  // Update time-block classes on page load
  updateHourClasses();

  // Load saved descriptions from local storage
  loadDescriptions();
});
