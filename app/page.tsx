"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link2, ChartBar, Settings, Copy, X} from "lucide-react";
import axios from "axios";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!longUrl) {
      return toast.error("Please enter a valid URL.");
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/shorten", { longUrl, alias });
      setShortUrl(response.data.shortUrl);

      toast.success("URL shortened successfully!", {
        description: "Your shortened URL is ready to use.",
      });
    } catch (error) {
      console.error("Error shortening URL:", error);
      toast.error("Failed to shorten the URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied to clipboard!");
  };

  return (
    <div className="container flex flex-col items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Shorten Your Links with Style
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Transform long URLs into memorable, trackable short links
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 w-full max-w-2xl rounded-lg border bg-card p-8 shadow-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Enter your URL</Label>
            <Input
              id="url"
              placeholder="https://example.com/very-long-url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alias">Custom alias (optional)</Label>
            <Input
              id="alias"
              placeholder="my-custom-url"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Button type="submit" size="default" disabled={loading}>
              {loading ? (
                "Shortening..."
              ) : (
                <>
                  <Link2 className="mr-2 h-4 w-4" />
                  Shorten
                </>
              )}
            </Button>
          </div>
        </form>

        {shortUrl && (
          <div className="mt-6 flex items-center justify-between bg-gray-800 text-white p-4 rounded-md">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words hover:underline"
            >
              {shortUrl}
            </a>
            <div className="">
            <Button variant="ghost" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={() => setShortUrl("")}>
            <X className="h-4 w-4" />
            </Button>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border bg-card p-6 shadow-lg text-center"
          >
            <feature.icon className="h-12 w-12 mx-auto text-primary" />
            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const features = [
  {
    title: "Advanced Analytics",
    description:
      "Track clicks, locations, and devices in real-time with detailed insights.",
    icon: ChartBar,
  },
  {
    title: "Custom Links",
    description: "Create branded short links that reflect your identity.",
    icon: Link2,
  },
  {
    title: "Secure & Reliable",
    description:
      "Enterprise-grade infrastructure ensures your links are always accessible.",
    icon: Settings,
  },
];
