import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await axios.get(body.url);

  const data = response.data;

  return Response.json(data);
}
