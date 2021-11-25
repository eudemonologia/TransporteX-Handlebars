var pool = require("./bd");
var md5 = require("md5");

async function getUsuarioByUsernameAndPassword(user, password) {
  try {
    var query = `SELECT * FROM usuarios WHERE usuario = '${user}' AND password = '${md5(
      password
    )}' limit 1`;
    var rows = await pool.query(query);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUsuarioByUsernameAndPassword };
