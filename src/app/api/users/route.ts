import pool from "@/src/lib/db";

export async function GET(request: any) {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Database query failed:", error); // 오류 로그 출력
    return new Response("Database query failed", { status: 500 });
  }
}
