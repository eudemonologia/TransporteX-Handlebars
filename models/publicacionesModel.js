var pool = require("./bd");
var md5 = require("md5");

async function getUltimasPublicaciones(req, res) {
  try {
    const rows = await pool.query(
      "SELECT * FROM publicaciones ORDER BY id_publicaciones DESC LIMIT 10"
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUltimasPublicaciones };
