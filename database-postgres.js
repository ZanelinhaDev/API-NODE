import { sql } from "./db.js";

const generateRandomId = () => Math.floor(Math.random() * 1000000) + 1;

export class DatabasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title ilike ${
        "%" + search + "%"
      }`;
    } else {
      videos = await sql`SELECT * FROM videos`;
    }

    return videos;
  }

  async create(video) {
    const videoId = generateRandomId();
    const { title, description, duration } = video;

    await sql`INSERT INTO videos (
    id, 
    title, 
    description, 
    duration) 
    VALUES 
    (${videoId}, 
    ${title}, 
    ${description}, 
    ${duration})`;
  }

  async update(videoId, video) {
    const { title, description, duration } = video;

    await sql`
      UPDATE videos
      SET
        title = ${title},
        description = ${description},
        duration = ${duration}
      WHERE
        id = ${videoId}
    `;
  }

  async delete(id) {
    await sql`
      DELETE FROM videos
      WHERE id = ${id}
    `;
  }
}
