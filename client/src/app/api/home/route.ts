import CategoryModel from "../../../models/category-model";
export async function GET() {
  const cardData: CategoryModel[] = [
    {
      title: "Book Talented Singers Instantly",
      description:
        "Hire professional singers for your events effortlessly. From romantic solos to powerful performances, find the perfect voice for any occasion.",
      bullets: [
        "Browse verified artist profiles.",
        "Listen to sample recordings.",
        "Instantly check availability and pricing.",
      ],
      ctaText: "See All Singers",
      ctaLink: "/artists?category=Singer",
      image: "/images/singers.jpg",
    },
    {
      title: "Energetic Dancers, Anytime",
      description:
        "Add energy and flair to your event with top-rated dancers. From classical to hip-hop, our platform makes booking effortless.",
      bullets: [
        "Explore styles like Bollywood, Hip-hop, and Contemporary.",
        "Watch performance reels.",
        "Book instantly based on your event type.",
      ],
      ctaText: "See All Dancers",
      ctaLink: "/artists?category=Dancer",
      image: "/images/dancers.jpg",
    },
    {
      title: "Top DJs for Any Vibe",
      description:
        "Whether it’s a wedding, club night, or corporate event, our DJs bring the beats and energy your event deserves.",
      bullets: [
        "Discover DJs by genre and style.",
        "Preview their playlists.",
        "Secure bookings with one click.",
      ],
      ctaText: "See All DJs",
      ctaLink: "/artists?category=DJ",
      image: "/images/DJS.jpg",
    },
    {
      title: "Comedians That Light Up the Stage",
      description:
        "Add laughter to your event with professional stand-up comedians from our platform. Suitable for all audiences.",
      bullets: [
        "Browse comedians by genre and tone.",
        "Watch demo performances.",
        "Book based on your event size and budget.",
      ],
      ctaText: "See All Comedians",
      ctaLink: "/artists?category=Comedian",
      image: "/images/comedians.jpg",
    },
    {
      title: "Magicians Who Amaze & Entertain",
      description:
        "From close-up magic to grand illusions, find magicians that will captivate your guests and make your event unforgettable.",
      bullets: [
        "Choose based on performance type (stage, close-up, kids).",
        "Preview magic demos.",
        "Book with clear pricing and time slots.",
      ],
      ctaText: "See All Magicians",
      ctaLink: "/artists?category=Magician",
      image: "/images/magicians.jpg",
    },
  ];

  return new Response(
    JSON.stringify({
      success: true,
      message: "Data Fetched Successfully",
      data: cardData,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
