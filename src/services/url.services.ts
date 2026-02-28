import { nanoid } from "nanoid";
import { conn } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { create, get } from "../models/url.model";

export class urlServices {
  static async createService(url: string): Promise<create> {
    try {
      const sqlSelect = "SELECT * FROM urlShort WHERE url = ?";
      const resultSelect = await conn.query<create[]>(sqlSelect, [url]);
      if (resultSelect[0].length > 0) {
        return resultSelect[0][0];
      }

      const shortUrl = nanoid(6);
      const sql = "INSERT INTO urlShort (url,shortUrl) VALUES (?,?)";
      const resultCreate = await conn.query<ResultSetHeader>(sql, [
        url,
        shortUrl,
      ]);
      //console.log("update", resultCreate[0].affectedRows);
      if (resultCreate[0].affectedRows == 0) {
        throw new Error("Short url exist");
      }
      const idCreated = resultCreate[0].insertId;
      const value = await conn.query<create[]>(
        "SELECT id, url, shortUrl, createAt, updateAt FROM urlShort WHERE id = ?",
        [idCreated]
      );

      //console.log(value[0][0]);
      return value[0][0];
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new error("Something error");
    }

    //const result = await conn.query("SELECT MIN(id) AS output FROM urlShort");
  }
  static async getService(url: string): Promise<get> {
    try {
      const sqlSelect = "SELECT * FROM urlShort WHERE shortUrl = ?";
      const result = await conn.query<create[]>(sqlSelect, [url]);

      if (result[0].length == 0) {
        throw new Error("Short url not found");
      }
      const objResult = {
        id: result[0][0].id,
        url: result[0][0].url,
        shortUrl: result[0][0].shortUrl,
        createAt: result[0][0].createAt,
        updateAt: result[0][0].updateAt,
      };
      const accCount = result[0][0].accessCount;
      let incrementView = 0;

      if (accCount != undefined) {
        incrementView = accCount + 1;
      }
      const sqlUpdate =
        "UPDATE urlShort SET accessCount = ? WHERE shortUrl = ? ";
      await conn.query<ResultSetHeader>(sqlUpdate, [incrementView, url]);
      return objResult;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Something error");
    }
  }
  static async putService(shortUrl: string, url: string): Promise<create> {
    try {
      const sqlUpdate = "UPDATE urlShort SET url = ? WHERE shortUrl = ?";
      const resultUpdate = await conn.query<ResultSetHeader>(sqlUpdate, [
        url,
        shortUrl,
      ]);

      const sqlSelect =
        "SELECT id, url, shortUrl, createAt, updateAt FROM urlShort WHERE shortUrl = ?";

      const result = await conn.query<create[]>(sqlSelect, [shortUrl]);
      if (resultUpdate[0].affectedRows == 0) {
        throw new Error("Short url not found");
      }
      return result[0][0];
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Something Error");
    }
  }
  static async deleteService(url: string): Promise<any> {
    try {
      const sql = "DELETE FROM urlShort WHERE shortUrl = ? ";
      const result = await conn.query<ResultSetHeader>(sql, [url]);
      if (result[0].affectedRows == 0) {
        throw new Error("short url not found");
      }
      return result[0].affectedRows;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("something error");
    }
  }
  static async getStats(url: string): Promise<create> {
    try {
      const sql = "SELECT * FROM urlShort WHERE shortUrl = ?";
      const result = await conn.query<create[]>(sql, [url]);

      if (result[0].length == 0) {
        throw new Error("short not found");
      }

      return result[0][0];
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("something error");
    }
  }
}
