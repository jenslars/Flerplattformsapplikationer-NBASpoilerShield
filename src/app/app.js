// App.js
import HorizontalDatePicker from './modules/horizontal-date-picker';

document.addEventListener('DOMContentLoaded', function () {
  const datepicker = new HorizontalDatePicker();

  datepicker.generateDates();
  let todaysDate = datepicker.getActiveDate();
});

