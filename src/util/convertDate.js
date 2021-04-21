const postfixDay = (day) => {
    if ((day >= 4 && day <= 20) || (day >= 24 && day <= 30)) {
        return `${day}th`;
    }
    const digit = day % 10;
    switch (digit) {
        case 1:
            return `${day}st`;
        case 2:
            return `${day}nd`;
        case 3:
            return `${day}rd`;
        default:
            return `${day}th`;
    }
};

const fullMonthName = (month) => {
    if (month < 1 || month > 12) {
        return 'Invalid month';
    }
    switch (month) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        default:
            return 'December';
    }
};

const convertDate = (date) => {
    let [year, month, day] = date.split('-');
    month = fullMonthName(+month);
    day = postfixDay(+day);
    return `${day} ${month} ${year}`;
};

export default convertDate;
