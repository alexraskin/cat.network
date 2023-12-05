import { Hono, Context } from 'hono'
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { R2Object } from "@cloudflare/workers-types";

import { Bindings, PhotoResponseData } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", prettyJSON());
app.use("*", logger());

app.get("/", async (c: Context) => {
  return c.json({ message: "Welcome to the cat.network API" }, 200);
});

app.get("/cosmo", async (c: Context) => {

  const prefix = "cosmo/";

  const response = await c.env.CAT_BUCKET.list();

  const keys = response.objects.map((obj: { key: R2Object }) => obj.key);

  const keysWithPrefix = keys.filter((key: string)  => key.startsWith(prefix));

  const randomKey = keysWithPrefix[Math.floor(Math.random() * keysWithPrefix.length)];

  const photo_data: PhotoResponseData = {
    photoUrl: `https://cdn.cat.network/${randomKey}`,
    statusCode: 200,
  };

  return c.json(photo_data, 200);
});

app.get("/bczs", async (c: Context) => {
  
    const prefix = "bczs/";
  
    const response = await c.env.CAT_BUCKET.list();
  
    const keys = response.objects.map((obj: { key: R2Object }) => obj.key);
  
    const keysWithPrefix = keys.filter((key: string)  => key.startsWith(prefix));
  
    const randomKey = keysWithPrefix[Math.floor(Math.random() * keysWithPrefix.length)];
  
    const photo_data: PhotoResponseData = {
      photoUrl: `https://cdn.cat.network/${randomKey}`,
      statusCode: 200,
    };
  
    return c.json(photo_data, 200);
});

export default app;
