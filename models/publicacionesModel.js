var pool = require("./bd");
var md5 = require("md5");

async function getUltimasPublicaciones() {
  try {
    const rows = await pool.query(
      "SELECT * FROM publicaciones INNER JOIN usuarios WHERE publicaciones.id_usuarios = usuarios.id_usuarios ORDER BY id_publicaciones DESC"
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getPublicacion(id) {
  try {
    const row = await pool.query(
      "SELECT * FROM publicaciones WHERE id_publicaciones = ?",
      [id]
    );
    return row[0];
  } catch (error) {
    console.log(error);
  }
}

async function publicar(obj) {
  try {
    const row = await pool.query(
      `INSERT INTO publicaciones (id_usuarios, titulo, subtitulo, contenido, imagen) VALUES (?, ?, ?, ?, ?)`,
      [obj.id_usuarios, obj.titulo, obj.subtitulo, obj.contenido, obj.imagen]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
}

async function eliminarPublicacion(id) {
  try {
    const row = await pool.query(
      `DELETE FROM publicaciones WHERE id_publicaciones = ?`,
      [id]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
}

async function modificarPublicacion(obj, id) {
  try {
    const row = await pool.query(
      `UPDATE publicaciones SET ? WHERE id_publicaciones = ?`,
      [obj, id]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUltimasPublicaciones,
  getPublicacion,
  publicar,
  eliminarPublicacion,
  modificarPublicacion,
};
