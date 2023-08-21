const db = require("../config"); //this imprt the db con from config
const { hash, compare, hashSync } = require("bcrypt");
const { createToken } = require("../middleware/authentication");
class Users {
    fetchUsers(req, res) {
        const query = `
            SELECT userID, firstName, lastName, userAge, gender, userRole,
            emailAdd, userPass, profileUrl
            FROM Users;
        `;
        db.query(query, (err, results) => {
          if (err) throw err;
          res.json({
            status: res.statusCode, // Corrected typo here
            results,
          });
        });
      }
  fetchUser(req, res) {
    const query = `
        SELECT userID, firstName, lastNmae,userAge, gender,userRole,
        emailAdd, profileUrl
        FROM Users
        WHERE userId = ${req.params.id};
        `;
    db.query(query, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result,
      });
    });
  }
  async register(req, res) {
    try {
      const data = req.body;
      // Encrypt password
      data.userPass = await hash(data.userPass, 15);
      // PAYLOAD means DATA THAT COMES FROM THE USER
      const user = {
        emailAdd: data.emailAdd,
        userPass: data.userPass,
      };
      // Query
      const query = `
        INSERT INTO Users
        SET ?;
      `;
      await db.query(query, [data]);
      // Create a token
      const token = createToken(user);
      res.status(200).json({
        msg: "You are now registered.",
        token,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  login(req, res) {
    const { emailAdd, userPass } = req.body;
    const query = `
      SELECT userID, firstName, lastName, userAge, gender, userRole,
      emailAdd, profileUrl, userPass
      FROM Users
      WHERE emailAdd = ?;
    `;
    db.query(query, [emailAdd], async (err, result) => {
      if (err) {
        console.error("Database error during login:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
  
      if (!result?.length) {
        console.log("User not found with email:", emailAdd);
        res.status(401).json({
          msg: "Invalid email address or password.",
        });
        return;
      }
  
      const user = result[0];
  
      await compare(userPass, user.userPass, (cErr, cResult) => {
        if (cErr) {
          console.error("Error comparing passwords:", cErr);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
  
        if (cResult) {
          const token = createToken({
            emailAdd,
            userPass,
          });
          res.status(200).json({
            msg: "Logged in",
            token,
            result: user,
          });
        } else {
          console.log("Invalid password");
          res.status(401).json({
            msg: "Invalid email address or password.",
          });
        }
      });
    });
  }
  
  
  updateUser(req, res) {
    const data = req.body;
    if (data.userPass) {
      data.userPass = hashSync(data.userPass, 15);
    }
    const query = `
        UPDATE Users
        SET ?
        WHERE userID = ?
        `;
    db.query(query, [data, req.params.id], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "The user record was updated.",
      });
    });
  }
  deleteUser(req, res) {
    const query = `DELETE FROM Users
        WHERE userID = ?`;
    db.query(query, [req.params.id], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "A user record was deleted.",
      });
    });
  }
}
module.exports = Users;


