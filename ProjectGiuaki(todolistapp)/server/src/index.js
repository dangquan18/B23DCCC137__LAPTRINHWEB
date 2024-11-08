const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRouter");
const userRoutes = require("./routes/userRouter");
const assignRoutes = require("./routes/assignRouter");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json()); // Giúp parse dữ liệu JSON
app.use("/api", todoRoutes); // Sử dụng các route đã định nghĩa
app.use("/api", userRoutes); // Sử dụng các route đã định nghĩa
app.use("/api/", assignRoutes); // Sử dụng các route đã định nghĩa

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
