// DateCalendarWithState.js
import React, { Component } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material';
import CustomToolbar from './custom-toolbar/custom-toolbar';
import { customTheme } from './custom-theme/custom-theme';
import GameScheduleFeed from '../../game-schedule-feed';
import HorizontalDatePicker from '../../horizontal-date-picker';

//Date calendar used as a popup
class DateCalendarWithState extends Component {
  constructor(props) {
      super(props);
      this.state = {
          value: dayjs(),
          isVisible: true,
      };
      this.gameScheduleCreator = new GameScheduleFeed();
      this.horizontalDatePicker = new HorizontalDatePicker();
      this.dateCalendarContainer = document.getElementById('datepicker-test')
  }

  elementToggle (element) {
    element.classList.toggle('active');
  }

  handleCancel = () => {
      this.setState({ isVisible: false });
      this.elementToggle(this.dateCalendarContainer);
  };

  handleSearch = () => {
    this.setState({ isVisible: false });
    this.gameScheduleCreator.createGameSchedule(this.state.value.format('YYYY-MM-DD'));
    this.elementToggle(this.dateCalendarContainer);
    this.horizontalDatePicker.updateActiveDate(this.state.value.format('YYYY-MM-DD'));

};

  render() {
      const { value, isVisible } = this.state;
      const actions = [
          { text: 'Cancel', method: this.handleCancel },
          { text: 'Search', method: this.handleSearch }
      ];

      if (!isVisible) return null;

      return (
        <div class="datepicker-custom-style">
          <ThemeProvider theme={customTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker 
                      value={value}
                      onChange={(newValue) => this.setState({ value: newValue })}
                      components={{
                          ActionBar: () => <CustomToolbar actions={actions} />
                      }}
                      orientation="portrait"
                      openTo="day"
                      showToolbar={false}
                      renderInput={() => null}
                  />
              </LocalizationProvider>
          </ThemeProvider>
        </div>
      );
  }
}

export default DateCalendarWithState;
