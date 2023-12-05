import { R2Bucket } from "@cloudflare/workers-types";

export type Bindings = {
  CAT_BUCKET: R2Bucket;
};

export interface PhotoResponseData {
  statusCode: number;
  photoUrl: string;
}
