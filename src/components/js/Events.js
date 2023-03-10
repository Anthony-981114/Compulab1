
const events = [
  
  {
    title: "Long Event",
    start: getDate("YEAR-MONTH-12"),
    end: getDate("YEAR-MONTH-12")
  },
  {
    groupId: "999",
    title: "Repeating Event",
    start: getDate("YEAR-MONTH-09T16:00:00+00:00")
  },
  {
    groupId: "999",
    title: "Repeating Event",
    start: getDate("YEAR-MONTH-16T16:00:00+00:00")
  },
  {
    title: "Conference",
    start: "YEAR-MONTH-17",
    end: getDate("YEAR-MONTH-19")
  },
  {
    title: "Meeting",
    start: getDate("YEAR-MONTH-18T10:30:00+00:00"),
    end: getDate("YEAR-MONTH-18T12:30:00+00:00")
  },
  { title: 'Meeting', start: "2023-01-12 T10:30:00+00:00", end:"2023-01-12 T12:30:00+00:00" }
];

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default events;
