// Connection to MongoDB Cluster
const connectDB = require("./db");
connectDB();
const User = require("./UserModel");

const express = require("express");
const app = express();
const axios = require("axios");
const { response } = require("express");

//@route GET /users
//@desc testing API endpoint
app.get("/users", (req, res) => {
  console.log("GET: /users");
  res.json({ text: "Hello World" });
});

//@route /user/sigin/callback
//@desc Callback from github Oauth
app.get("/user/sigin/callback", (req, res, next) => {
  console.log("GET: /user/sigin/callback");
  const { query } = req;
  const { code } = query;
  const clientID = "48f664a977f859d68b03";
  const clientSecret = "f25715a3934e5a1a4595a6846795419b3da98b3e";

  if (!code) {
    return res.json({
      success: false,
      data: null,
    });
  }

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => {
      access_token = response.data.access_token;
      app.set("accessToken", access_token);
      //
      res.redirect("http://localhost:3000/dashboard");
    })
    .catch((err) => {
      res.json({
        success: false,
        data: null,
      });
    });
});

//@route /dashboard
//@desc Dashboard containing all repos
app.get("/dashboard", (req, res) => {
  console.log("GET: /dashboard");
  const access_token = app.get("accessToken");
  //get user info to register in DB
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  })
    .then(async (response) => {
      let user = await User.findOne({ githubId: response.data.id });
      if (!user) {
        console.log("Adding user to DB");
        const newUser = new User({
          githubId: response.data.id,
          displayName: response.data.login,
          htmlUrl: response.data.html_url,
        });
        await newUser.save();
      }
    })
    .catch((err) => console.log(err));

  axios({
    method: "get",
    url: `https://api.github.com/user/repos`,
    headers: {
      Authorization: "token " + access_token,
    },
  })
    .then((response) => {
      //
      app.set("userData", JSON.stringify(response.data));
      res.json({ userData: response.data });
    })
    .catch((err) => res.json({ userData: null }));
});

//@route /repo/:id
//@desc Get AutoDevTech score for unique repo id
app.get("/repo/:id", function (req, res) {
  const id = req.params.id;
  console.log(`GET: /repo/${id}`);
  const userData = JSON.parse(app.get("userData"));
  const repoToAnalyze = userData.filter((repo) => repo.id == id);
  const owner = repoToAnalyze[0].owner.login;
  const repoName = repoToAnalyze[0].name;
  // console.log(access_token);
  axios({
    method: "get",
    url: `https://api.github.com/repos/${owner}/${repoName}/contents`,
    headers: {
      Authorization: "token " + access_token,
    },
  })
    .then((response) => {
      const data = response.data;
      const score = data.reduce((acc, curr) => {
        return acc + parseInt(curr.size);
      }, 0);
      res.json({ repoScore: score % 100 });
    })
    .catch((err) => console.log(err));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
