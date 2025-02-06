import dbConnect from '@/lib/dbConnect';
import Url from '@/lib/models/Url';
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: { shortUrl: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  await dbConnect();
  const { shortUrl } = params;

  const urlData = await Url.findOne({ shortUrl });
  if (urlData) {
    urlData.clicks += 1;
    await urlData.save();
    redirect(urlData.longUrl);
  }

  return <p className="text-center text-red-500">Link not found.</p>;
}
