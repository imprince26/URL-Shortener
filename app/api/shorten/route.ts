import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import Url from '@/lib/models/Url';

const generateShortUrl = () => Math.random().toString(36).substring(2, 8); // Random 6-character code

export async function POST(req: Request) {
  await dbConnect();
  const { longUrl, alias } = await req.json();

  if (!longUrl) {
    return NextResponse.json({ error: "Long URL is required" }, { status: 400 });
  }

  try {
    let shortUrl;

    if (alias) {
      const existingAlias = await Url.findOne({ shortUrl: alias });
      if (existingAlias) {
        return NextResponse.json({ error: "Custom alias already taken" }, { status: 409 });
      }
      shortUrl = alias;
    } else {
      do {
        shortUrl = generateShortUrl();
      } while (await Url.findOne({ shortUrl }));
    }

    const newUrl = await Url.create({ longUrl, shortUrl });

    return NextResponse.json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newUrl.shortUrl}`,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}