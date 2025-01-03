import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();

const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"gym",
  password:"sahil@123",
  port:5432
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs")
})
app.get("/login", (req, res) => {
    res.render("login.ejs")
})
app.get("/register", (req, res) => {
    res.render("register.ejs")
})


app.post("/login", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    try{
        const check = await db.query("SELECT * FROM users where email= $1",[email]);
        if(check.rows.length>0){
          const user = check.rows[0];
          const password = user.password;
          if(password == pass){
            res.render("main.ejs");
          }else{
            res.send("Incorrect Password");
          }
        }else{
          res.send("User Not found")
        }
      }catch(err){
        console.log(err);
      }
})
app.post("/register", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    console.log("entered")
    try{
        const check = await db.query("SELECT * from users where email=$1",[email]);
    
    
        if(check.rows.length>0){
          res.send("Email Already Exists, Try Another email");
        }else{
          await db.query("INSERT INTO users(email,password) values($1,$2)",[email,pass]);
          console.log("INSERTED SUCCESSFULLY");
          res.render("main.ejs")
        }
      }catch(err){
        console.log("NOT INSERTED");
        console.log(err);
      }
    console.log(email,pass)
})

app.listen(3000, () => {
    console.log("COnnection Strated at Port 3000")
})