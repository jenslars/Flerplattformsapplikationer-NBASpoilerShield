// App.js
import React from 'react';
import ReactDOM from 'react-dom';
import Variants from './modules/mui-react-modules/skeleton/skeleton';
import DateCalendarWithState from './modules/mui-react-modules/date-calendar/date-calendar';
import HorizontalDatePicker from './modules/horizontal-date-picker';
import GameScheduleFeed from './modules/game-schedule-feed';



function elementToggle(element) {
  element.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const gameScheduleCreator = new GameScheduleFeed();
  const mainContainer = document.getElementById('main');
  const container = document.getElementById('fetched-game-section');

  container.innerHTML = '';
  ReactDOM.render(<Variants />, container);

  const datepicker = new HorizontalDatePicker();

  datepicker.generateDates();
  let todaysDate = datepicker.getActiveDate();
  gameScheduleCreator.createGameSchedule(todaysDate);
  
  var dateCalendarButton = document.getElementById('date-calendar-button');
  if (dateCalendarButton) {
      dateCalendarButton.addEventListener('click', () => {
          const dateCalendarContainer = document.getElementById('datepicker-test')
          elementToggle(dateCalendarContainer);
          ReactDOM.unmountComponentAtNode(dateCalendarContainer);
          ReactDOM.render(<DateCalendarWithState />, dateCalendarContainer);
          
      });
  } else {
      console.log('Could not find #dateCalendarButton on the page.');
  }
});

