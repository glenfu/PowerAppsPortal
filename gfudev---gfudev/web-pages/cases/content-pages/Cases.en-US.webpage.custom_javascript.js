$(function () {
  $(
    '#filterDropdownId ul:nth-child(2) li:contains("My Active Cases")'
  ).remove();
  $(".entity-grid.entitylist").click(function () {
    $(
      '#filterDropdownId ul:nth-child(2) li:contains("My Active Cases")'
    ).remove();
  });
});
