import Link from "next/link";
import style from "./page.module.scss";
import Image from "next/image";
import { getCategoryData } from "@/apiCalls/api";
import CategoryModel from "@/models/category-model";

export default async function Home() {
  const response = await getCategoryData();
  const cardData: CategoryModel[] = response.data;
  return (
    <main className={style["home-page-main-section-wrapper"]}>
      <section className={style["video-section-area"]}>
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          id="backgroundVideo"
          style={{ width: "100%", objectFit: "cover", height: "99.3vh" }}
        >
          <source
            src="/videos/live101-homepage-banner-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className={style["video-content"]}>
          <h2>Book Your Live Artist</h2>
          <h3>Anywhere. Anytime. Any Budget.</h3>
        </div>
      </section>

      <section className={style["artist-categories-wrapper"]}>
        <h2>Artist Categories</h2>
        <p>
          Bring your events to the next level with the best artists—book top
          musicians, live singers, DJs, stand up comedians, motivational
          speakers, emcees and more. Seamless booking for an unforgettable event
          with Artistly.
        </p>
        <hr />
        <div className={style["artists-category-card-wrapper"]}>
          {cardData.map((card: CategoryModel, index) => (
            <article key={index} className={style["artists-category-card"]}>
              <figure>
                <Image
                  alt="instant-quotation-card-how-it-works-page-image"
                  src={card.image}
                  width={564}
                  height={100}
                />
              </figure>

              <section className={style["artist-card-text-content-container"]}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <ul>
                  <li>
                    <Image
                      alt="tick-icon"
                      src="/images/tick-circle.svg"
                      width={24}
                      height={24}
                    />
                    <span>{card.bullets[0]}</span>
                  </li>
                  <li>
                    <Image
                      alt="tick-icon"
                      src="/images/tick-circle.svg"
                      width={24}
                      height={24}
                    />
                    <span>{card.bullets[1]}</span>
                  </li>
                  <li>
                    <Image
                      alt="tick-icon"
                      src="/images/tick-circle.svg"
                      width={24}
                      height={24}
                    />
                    <span>{card.bullets[2]}</span>
                  </li>
                  <Link href={card.ctaLink}>
                    <span>{card.ctaText}</span>
                    <Image
                      src="/images/right-arrow-icon.svg"
                      alt="right-arrow-icon"
                      width={24}
                      height={24}
                    />
                  </Link>
                </ul>
              </section>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
