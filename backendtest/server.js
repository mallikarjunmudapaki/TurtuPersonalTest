// server.js
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:"jay@123",
  database: "turtu_db",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Function to generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

// NodeMailer setup for sending OTP emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "turtutesting2@gmail.com",
    pass: "ntfphgmaulccyljn",
  },
});

// Register endpoint
// app.post('/api/register', (req, res) => {
//   const { username, email, phone_number, password } = req.body;
//   const otp = generateOtp();
//   const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

//   // Insert user into the temp_users table
//   const sqlInsert = `
//     INSERT INTO temp_users (username, email, phone_number, password, otp, otp_expiry, registration_date)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;
//   db.query(
//     sqlInsert,
//     [username, email, phone_number, password, otp, otpExpiry, new Date()],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ status: 'error', message: 'Database error: ' + err.message });
//       }

//       // Send OTP email
//       const mailOptions = {
//         from: "turtutesting2@gmail.com",
//         to: email,
//         subject: 'OTP Verification',
//         text: `Your OTP for account verification is: ${otp}. This OTP is valid for 10 minutes.`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return res.status(500).json({ status: 'error', message: 'Failed to send OTP. Please try again.' });
//         }
//         res.status(200).json({ status: 'success', message: 'OTP has been sent to your email.' });
//       });
//     }
//   );
// });


app.post('/api/register', async (req, res) => {
    const { username, email, phone_number, password } = req.body;
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt
  
      // Insert user into the temp_users table
      const sqlInsert = `
        INSERT INTO temp_users (username, email, phone_number, password, otp, otp_expiry, registration_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        sqlInsert,
        [username, email, phone_number, hashedPassword, otp, otpExpiry, new Date()],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ status: 'error', message: 'Database error: ' + err.message });
          }
  
          // Send OTP email
          const mailOptions = {
            from: 'turtutesting2@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for account verification is: ${otp}. This OTP is valid for 10 minutes.`,
          };
  
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res
                .status(500)
                .json({ status: 'error', message: 'Failed to send OTP. Please try again.' });
            }
            res
              .status(200)
              .json({ status: 'success', message: 'OTP has been sent to your email.' });
          });
        }
      );
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error processing request: ' + error.message });
    }
  });

// OTP verification endpoint
app.post('/api/verify_otp', (req, res) => {
  const { email, otp } = req.body;

  // Verify OTP and expiration
  const sqlVerify = `
    SELECT * FROM temp_users WHERE email = ? AND otp = ? AND otp_expiry > NOW()
  `;
  db.query(sqlVerify, [email, otp], (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Database error: ' + err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Invalid or expired OTP.' });
    }

    // OTP verified successfully
    res.status(200).json({ status: 'success', message: 'Email verified successfully!' });
  });
});



app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    // Check if the user exists in the database
    const sqlQuery = 'SELECT * FROM temp_users WHERE email = ?';
    db.query(sqlQuery, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Database error: ' + err.message });
      }
  
      // If user does not exist
      if (results.length === 0) {
        return res.status(400).json({ status: 'error', message: 'Invalid email or password.' });
      }
  
      const user = results[0];
  
      // Check if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ status: 'error', message: 'Invalid email or password.' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, "turtutest", {
        expiresIn: '1h',
      });
  
      // Send the token to the client
      res.status(200).json({ status: 'success', message: 'Login successful', token });
    });
  });

  // Middleware to verify token and extract user information
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
  
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized: No token provided' });
    }
  
    // Verify the token and extract the payload
    jwt.verify(token, 'turtutest', (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token' });
      }
      req.user = decoded; // Save decoded user info to req.user
      next();
    });
  };
  
  // Route to verify token (called from frontend to validate user's session)
  app.post('/api/verify-token', (req, res) => {
    const { token } = req.body;
  
    jwt.verify(token, 'turttest', (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
      }
  
      // Token is valid, return success status
      res.status(200).json({ status: 'success', message: 'Token verified successfully' });
    });
  });
  // Contact form submission route without input validation
app.post('/api/contact', (req, res) => {
  const { username, email, phone_number, queries } = req.body;

  // Insert the contact form data into the database
  const sql = 'INSERT INTO contacts (username, email, phone_number, queries) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, phone_number, queries], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ status: 'error', message: 'Database error: ' + err.message });
    }
    res.status(200).json({ status: 'success', message: 'Contact message stored successfully!' });
  });
});

  // // Contact form submission route with token verification
  // app.post('/api/contact', verifyToken, (req, res) => {
  //   const { username, email, phone_number, query } = req.body;
  
  //   // Insert the contact form data into the database
  //   const sql = 'INSERT INTO contacts (username, email, phone_number, query) VALUES (?, ?, ?, ?)';
  //   db.query(sql, [username, email, phone_number, query], (err, result) => {
  //     if (err) {
  //       console.error('Database error:', err);
  //       return res.status(500).json({ status: 'error', message: 'Database error: ' + err.message });
  //     }
  //     res.status(200).json({ status: 'success', message: 'Contact message stored successfully!' });
  //   });
  // });

  // Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save resumes in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Save the file with its original name
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File filter to accept only PDF and DOCX files
const fileFilter = (req, file, cb) => {
  const fileTypes = /pdf|doc|docx/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOCX files are allowed!'));
  }
};

// Initialize Multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
  fileFilter: fileFilter,
});

// Create the 'uploads' directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Career form submission route
app.post('/api/career', upload.single('resume_filename'), (req, res) => {

  const { email, phone_number, profile } = req.body;
  const resumeFilename = req.file ? req.file.filename : null; // Get the uploaded resume filename

  if (!resumeFilename) {
    return res.status(400).json({ status: 'error', message: 'Resume upload failed' });
  }

  // Insert the career form data into the database
  const sql = `
    INSERT INTO career_applications (email, phone_number, profile, resume_filename, created_at, user_id)
    VALUES (?, ?, ?, ?, NOW(), ?)
  `;

  db.query(sql, [email, phone_number, profile, resumeFilename, req.user.id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ status: 'error', message: 'Database error: ' + err.message });
    }

    res.status(200).json({ status: 'success', message: 'Career application submitted successfully!' });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
