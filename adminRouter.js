const express = require("express");
const multer = require("multer");
const path = require("path");

// multer middlewire for avatar upload

const avatarUpload = multer({
  dest: "./uploads/avatar",
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    // if (file.fieldName != "avatar") return cb(null, false);
    console.log(file);
    cb(null, true);
  },
}).any();

// multer middlewire for gallary upload
const gallaryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./uploads/gallary`);
  },

  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    console.log(ext);
    const fileName =
      originalName.replace(ext, "").split(" ").join("-") + "-" + Date.now();

    cb(null, fileName + ext);
  },
});

const gallaryUpload = multer({
  storage: gallaryStorage,
  //   dest: "./uploads/gallary",
}).array("gallary", 5);

// multer middlewire for nid upload
const nidUpload = multer({
  dest: "./uploads/nid",
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/webp" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    )
      cb(null, true);
    else cb("webp/jpg/png supported");
  },
}).fields([
  { name: "front", maxCount: 1 },
  { name: "back", maxCount: 1 },
]);

const router = express.Router();

// middlewire

router.use((req, res, next) => {
  if (req.params.id == 1) {
    req.user = "admin";
  } else req.user = "public";

  next();
});

router.get("/dashboard", (req, res) => {
  res.send("admin dashboard");
});

router.get("/home", (req, res) => {
  res.send("admin home");
});

router.route("/nid").post(nidUpload, (req, res) => {
  res.send("NID uploaded successfully");
});

router.route("/gallary").post(gallaryUpload, (req, res) => {
  res.send("Gallary Uploaded");
});

router
  .route("/user/:id")
  .get((req, res) => {
    res.send(`Your user id is ${req.params.id}`);
  })
  .post(avatarUpload, (req, res) => {
    res.send("Uploaded sucessfully");
  });

//   useing all uploader at once
// router
//   .route("/upload")
//   .post(avatarUpload, gallaryUpload, nidUpload, (req, res) => {
//     res.send("all uploaded successfully");
//   });

// errror handler

router.use("/dashboard", (err, req, res, next) => {
  res.status(500).send("problem in admin dashboard");
});

router.use("/", (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Problem in admin route");
});

module.exports = router;
