const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Endpoint to create a file with a random name
app.get("/create-file", (req, res) => {
  // Generate a random file name
  const fileName = `file_${Math.random().toString(36).substr(2, 9)}.txt`;
  const filePath = path.join(__dirname, fileName);

  // Write a sample content to the new file
  fs.writeFile(filePath, "This is a randomly generated file.", (err) => {
    if (err) {
      console.error("Error creating file:", err);
      return res.status(500).send("Server error");
    }

    console.log("File created:", fileName);
    res.send(`File created with name: ${fileName}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
