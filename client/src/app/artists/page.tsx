import { getArtistData } from "@/apiCalls/api";
import CardComponent from "./CardComponent";
import { Suspense } from "react";

export default async function Page() {
  const response = await getArtistData();
  const artists = response.data;
  return (
    <Suspense>
      <CardComponent artist={artists}></CardComponent>;
    </Suspense>
  );
}
