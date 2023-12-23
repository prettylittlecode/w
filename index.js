const { faker, el } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const { paragraph } = require("txtgen/dist/cjs/txtgen.js");
const methodOverride = require("method-override");
const { count, profile } = require("console");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: `Anushka@2002`,
});

let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.image.avatar(),
    faker.internet.password(),
    paragraph(3),
  ];
};

// login or home route

app.get("/", (req, res) => {
  let q = "SELECT count(*) FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    res.send("Error in Database");
  }
});

// posts route

app.get("/posts", (req, res) => {
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (err, posts) => {
      if (err) throw err;

      res.render("posts.ejs", { posts });
    });
  } catch (err) {
    res.send("Error");
  }
});

// profile route
app.get("/posts/:id/user", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("user.ejs", { user });
    });
  } catch (err) {
    res.send("Error");
  }
});

// edit form route
app.get("/posts/:id/user/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let edit = result[0];
      res.render("edit.ejs", { edit });
    });
  } catch (err) {
    res.send("Error");
  }
});

// edit route

app.patch("/posts/:id/user", (req, res) => {
  let { id } = req.params;
  let { password: password, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (password != user.password) {
        res.send("Wrong Pass");
      } else {
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect(`/posts/${id}/user`);
        });
      }
    });
  } catch (err) {
    res.send("Error");
  }
});

// create new user
app.get("/newuser", (req, res) => {
  res.render("new.ejs");
});

// adding new user
app.post("/newuser", (req, res) => {
  let { username, email, avatar, password, content } = req.body;
  let id = faker.string.uuid();
  let q = `INSERT INTO user (id, username, email, avatar, password, content) VALUES ('${id}','${username}','${email}','${avatar}','${password}','${content}')`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect("/posts");
    });
  } catch (err) {
    res.send("Error");
  }
});

// delete route
app.get("/posts/:id/user/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("Error");
  }
});

// delete user
app.delete("/posts/:id/user", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (password != user.password) {
        res.send("Wrong Password");
      } else {
        let q1 = `DELETE FROM user WHERE id = '${id}'`;
        connection.query(q1, (err, result) => {
          if (err) throw err;
          else {
            res.redirect("/posts");
          }
        });
      }
    });
  } catch (err) {
    res.send("Error");
  }
});

app.listen(8080, () => {
  console.log("listening to port 8080");
});

// insert in bulk into db

// let q = `INSERT INTO user(id, username, email, avatar, password, content) VALUES ?`;
// let data = [];
// for (let i = 0; i <= 50; i++) {
//   data.push(createRandomUser());
// }
// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }
// connection.end();

// let users = [];
// for (let i = 1; i <= 50; i++) {
//   users.push(createRandomUser());
// }
