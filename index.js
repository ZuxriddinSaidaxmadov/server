const { randomUUID } = require("crypto");
const express = require("express");

const app = express();

const data = [
  { id: 1, name: "zuxriddin", password: "saidaxmadov", email: "email.com" },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.status(200).json(data);
});

app.post("/reg", (req, res) => {
  const { name, password, email } = req.body;
  if (!name === "" || !password === "" || !email === "") {
    res.status(403).json({
      error: "Barcha formalarni to'ldiring!",
    });
  } else {
    console.log("to'liq");
    data.push({
      id: randomUUID(),
      name,
      password,
      email,
    });
    res.status(200).json({
      massage: "ro'yxatdan muvafaqiyatli o'tdingiz!",
      name,
      password,
      email,
    });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email === "" || !password === "") {
    res.status(403).json({
      error: "Barcha formalarni to'ldiring",
    });
  } else {
    let user = data.filter((user) => {
      return user.email === email;
    });

    if (user[0]) {
      if (user[0].password === password) {
        res.status(200).json({
          massage: "hesh kelibsiz",
          user: user[0],
        });
      } else {
        res.status(403).json({
          error: "Noto'g'ri kod kiritdingiz!",
        });
      }
    } else {
      res.status(403).json({
        error: "Ro'yxatdan o'tmagansiz!",
      });
    }
  }
});

app.listen(5001, () => {
  console.log("run server");
});
