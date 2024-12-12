import { RowDataPacket } from "mysql2";
import pool from "../lib/db";

export async function getSingleRow<T extends RowDataPacket>(
  query: string,
  params: unknown[]
): Promise<T | null> {
  const [rows] = await pool.query<T[]>(query, params); // rows는 T[] 타입
  return rows[0] || null;
}
