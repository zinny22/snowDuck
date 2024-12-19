/**
 * 메세지 한개 가져오기
 * @param req : NextRequest
 * @method : GET
 * @return
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
}
