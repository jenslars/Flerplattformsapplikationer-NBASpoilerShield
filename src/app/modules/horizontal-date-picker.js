class HorizontalDatePicker {
    constructor() {
        this.startDate = new Date(); 
        this.startDate.setHours(0, 0, 0, 0);
    }

    generateDateElement(date) {
        const dayInitial = date.toLocaleString('default', { weekday: 'short' })[0];
        const dayDate = date.getDate();
        const monthNumber = date.getMonth() + 1;
        const isSelected = date.getTime() === this.startDate.getTime() ? 'active' : '';

        return `
            <div class="day-div" monthValue="${monthNumber}" dateValue="${date.getFullYear()}-${monthNumber.toString().padStart(2, '0')}-${dayDate.toString().padStart(2, '0')}">
                <p class="day">${dayInitial}</p>
                <p class="day-date">${dayDate}</p>
                <div class="selected-date ${isSelected}"></div>
            </div>
        `;
    }

    generateDates() {
        const dateContainer = document.getElementById('days');
        dateContainer.innerHTML = '';
    
        let currentDate = new Date(this.startDate);
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
        currentDate.setDate(currentDate.getDate() - 42);
    
        let weekDiv;
        const currentWeekNumber = this.getWeekOfDate(new Date());
    
        for (let i = 0; i < 91; i++) {
            let newWeekNumber = this.getWeekOfDate(currentDate);
    
            if (!weekDiv || weekDiv.getAttribute('weekValue') !== newWeekNumber.toString()) {
                weekDiv = document.createElement('div');
                weekDiv.className = 'week-div';
                weekDiv.setAttribute('weekValue', newWeekNumber);
                if (newWeekNumber === currentWeekNumber) {
                    weekDiv.classList.add('active');
                }
                dateContainer.appendChild(weekDiv);
            }
    
            const dateElementHTML = this.generateDateElement(currentDate);
            weekDiv.insertAdjacentHTML('beforeend', dateElementHTML);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        this.updateMonthYear();
        this.addEventListeners();
    }
    
    
    

    addEventListeners() {
        const gameScheduleCreator = new GameScheduleCreator();
        document.querySelectorAll('.day-div').forEach(dayDiv => {
            dayDiv.addEventListener('click', function() {
                document.querySelectorAll('.selected-date.active').forEach(activeDiv => {
                    activeDiv.classList.remove('active');
                });
    
                const selectedDateDiv = this.querySelector('.selected-date');
                selectedDateDiv.classList.add('active');
    
                const date = this.getAttribute('dateValue');
                gameScheduleCreator.createGameSchedule(date);
            });
        });
    
        const prevButton = document.getElementById('previous-week-button');
        const nextButton = document.getElementById('next-week-button');
    
        prevButton.addEventListener('click', () => {
            const activeWeek = document.querySelector('.week-div.active');
            const previousWeek = activeWeek.previousElementSibling;
    
            if (previousWeek && previousWeek.classList.contains('week-div')) {
                activeWeek.classList.remove('active');
                previousWeek.classList.add('active');
                this.updateMonthYear();
            }
            // dateContainer.scrollBy({ left: -100, behavior: 'smooth' });
        });
    
        nextButton.addEventListener('click', () => {
            const activeWeek = document.querySelector('.week-div.active');
            const nextWeek = activeWeek.nextElementSibling;
    
            if (nextWeek && nextWeek.classList.contains('week-div')) {
                activeWeek.classList.remove('active');
                nextWeek.classList.add('active');
                this.updateMonthYear();
            }
            // dateContainer.scrollBy({ left: 100, behavior: 'smooth' });
        });
    }

    updateActiveDate(dateStr) {
        const currentlyActiveDate = document.querySelector('.day-div .selected-date.active');
        if (currentlyActiveDate) {
            currentlyActiveDate.classList.remove('active');
        }
    
        const allDateDivs = document.querySelectorAll('.day-div');
        let foundDateDiv = null;
        allDateDivs.forEach(div => {
            if (div.getAttribute('dateValue') === dateStr) {
                const selectedDateDiv = div.querySelector('.selected-date');
                if (selectedDateDiv) {
                    selectedDateDiv.classList.add('active');
                    foundDateDiv = div;
                }
            }
        });
    
        if (!foundDateDiv) {
            console.error('No matching date found for:', dateStr);
            return;
        }
    
        const activeWeekDiv = foundDateDiv.closest('.week-div');
        const currentlyActiveWeek = document.querySelector('.week-div.active');
        if (currentlyActiveWeek) {
            currentlyActiveWeek.classList.remove('active');
        }
        if (activeWeekDiv) {
            activeWeekDiv.classList.add('active');
        }

        this.updateMonthYear();
    }
    
    updateMonthYear() {
        let monthYearLabel = document.getElementById('month-year').querySelector('p');
        const activeWeekDayDivs = document.querySelectorAll('.week-div.active .day-div');
        if (activeWeekDayDivs.length === 0) {
            monthYearLabel.textContent = "No active dates";
            return;
        }
    
        const dateValues = Array.from(activeWeekDayDivs).map(div => new Date(div.getAttribute('dateValue')));
        const months = dateValues.map(date => date.toLocaleString('default', { month: 'long' }));
        const years = dateValues.map(date => date.getFullYear());
    
        const uniqueMonths = [...new Set(months)];
        const uniqueYears = [...new Set(years)];
    
        let monthLabel = uniqueMonths.join(' / ');
        let yearLabel = uniqueYears.join(' / ');
    
        monthYearLabel.textContent = `${monthLabel} ${yearLabel}`;
    }
    

    getActiveDate() {
        const activeDayDiv = document.querySelector('.day-div .selected-date.active');
        if (activeDayDiv) {
            const date = activeDayDiv.parentElement.getAttribute('dateValue');
            console.log('Active date is:', date);
            return date;
        } else {
            console.log('No active date found.');
            return null;
        }
    }

    // Takes an date object and returns the week number of the date. 
    getWeekOfDate(date) {
        let dateCopy = new Date(date.getTime());
    
        dateCopy.setDate(dateCopy.getDate() + 4 - (dateCopy.getDay() || 7));
    
        let yearStart = new Date(dateCopy.getFullYear(), 0, 1);
    
        let weekNumber = Math.ceil(((dateCopy - yearStart) / 86400000 + 1) / 7);
    
        return weekNumber;
    } 
}

export default HorizontalDatePicker;