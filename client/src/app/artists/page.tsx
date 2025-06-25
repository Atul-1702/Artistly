export const dynamic = "force-dynamic";

import { getArtistData } from "@/apiCalls/api";
import CardComponent from "./CardComponent";

export default async function Page() {
  const response = await getArtistData();
  const artists = response.data;
  return <CardComponent artist={artists}></CardComponent>;
}
