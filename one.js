const fs = require("fs");
const uuid = require("uuid"); // Requires the 'uuid' library for generating UUIDs

const allcards = [];
// Function to generate JSON data for a given date
function generateJSONForDate(date) {
  const options = { timeZone: "Asia/Kolkata", hour12: true };
  const formattedDate = date.toLocaleDateString("en-IN", options);
  const cards = [];

  for (let hour = 1; hour <= 12; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const meridian = hour >= 12 ? "PM" : "AM";
      const hour12 = hour === 12 ? 12 : hour % 12;
      const timeStr = `${hour12.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${meridian}`;
      const taskTitle = `Task at ${timeStr}`;
      const card = {
        id: uuid.v4(),
        title: `${formattedDate} ${timeStr}`,
        tags: [],
        task: [{ id: uuid.v4(), title: taskTitle }],
      };
      allcards.push(card);
    }
  }
}

// Generate JSON data for the next year
const jsonDataForNextYear = [];

const currentDate = new Date();

for (let i = 0; i < 365; i++) {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + i);
  jsonDataForNextYear.push(generateJSONForDate(nextDate));
}

// Convert the array of board objects to a JSON string
const board = {
  id: uuid.v4(),
  boardName: "Not Started",
  card: allcards,
};
const jsonData = JSON.stringify(board, null, 2);

// Write the JSON data to a file named 'data.json'
fs.writeFile("data.json", jsonData, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("JSON data has been written to data.json");
  }
});
