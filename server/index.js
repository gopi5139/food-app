const express = require("express")
const mangoose = require("mongoose")
const cors = require("cors")
const authRoutes = require('./routes/AuthRoutes');

const app = express()
app.use(cors());
app.use(express.json())

mangoose.connect("mongodb+srv://hitmanRohit:45%40roHit_Hitman@mathinhand.ulj5anc.mongodb.net/food-app?retryWrites=true&w=majority").then(s => console.log("DB connected")).catch(s => console.log("DB Error:", s))

app.get("/", (req, res) => {
    res.json("Hello");
})

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
