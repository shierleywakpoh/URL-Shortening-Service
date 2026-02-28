import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface create extends RowDataPacket {
  id: number;
  url: string;
  shortUrl: string;
  createAt: Date;
  updateAt: Date;
  accessCount?: number;
}

export interface get {
  id: number;
  url: string;
  shortUrl: string;
  createAt: Date;
  updateAt: Date;
}
