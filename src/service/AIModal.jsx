import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMNI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, PlaceDetails, Place Image Url, Geo Coordinates, ticket Pricing, rating,Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50 - $100 per night\",\n      \"hotelImageURL\": \"https://www.theD.com/media/images/the-d-hotel-las-vegas.jpg\",\n      \"geoCoordinates\": \"36.1699° N, 115.1424° W\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A budget-friendly hotel located in downtown Las Vegas, known for its lively atmosphere and proximity to Fremont Street Experience.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40 - $80 per night\",\n      \"hotelImageURL\": \"https://www.circuscircus.com/content/dam/caesars/circus-circus/hero/cc-hotel-hero-mobile.jpg\",\n      \"geoCoordinates\": \"36.1217° N, 115.1689° W\",\n      \"rating\": \"3 stars\",\n      \"description\": \"A classic Las Vegas hotel with a circus theme, offering affordable accommodations and family-friendly entertainment.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$60 - $120 per night\",\n      \"hotelImageURL\": \"https://www.goldennugget.com/content/dam/gnl/images/hero-images/GN-Hero-Pool-Desktop.jpg\",\n      \"geoCoordinates\": \"36.1691° N, 115.1417° W\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A historic hotel known for its elegant accommodations, award-winning restaurants, and impressive shark tank.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"bestTime\": \"Morning\",\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian-friendly street with a canopy of LED lights, live entertainment, and street performers.\",\n          \"placeImageURL\": \"https://www.vegasexperience.com/wp-content/uploads/2016/05/fremont-street-experience-canopy.jpg\",\n          \"geoCoordinates\": \"36.1699° N, 115.1424° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"2-3 hours\"\n        },\n        {\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"A museum showcasing vintage Las Vegas neon signs, offering guided tours and exhibits.\",\n          \"placeImageURL\": \"https://www.neonmuseum.org/wp-content/uploads/2019/08/Neon-Museum-Photo-by-Gary-Henson.jpg\",\n          \"geoCoordinates\": \"36.1713° N, 115.1366° W\",\n          \"ticketPricing\": \"$20 - $30 per person\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"1-2 hours\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"bestTime\": \"Afternoon\",\n      \"plan\": [\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A massive concrete arch-gravity dam on the Colorado River, offering guided tours and scenic views.\",\n          \"placeImageURL\": \"https://www.nps.gov/hoba/planyourvisit/images/hoover-dam-close-up.jpg\",\n          \"geoCoordinates\": \"36.0215° N, 114.9625° W\",\n          \"ticketPricing\": \"$30 - $40 per person\",\n          \"rating\": \"5 stars\",\n          \"time\": \"4-5 hours\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"bestTime\": \"Evening\",\n      \"plan\": [\n        {\n          \"placeName\": \"Bellagio Fountains\",\n          \"placeDetails\": \"A spectacular water and light show choreographed to music, held every 15 minutes in the evening.\",\n          \"placeImageURL\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/en/images/bellagio-fountains-show.jpg\",\n          \"geoCoordinates\": \"36.1185° N, 115.1725° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"5 stars\",\n          \"time\": \"1-2 hours\"\n        },\n        {\n          \"placeName\": \"The Strip\",\n          \"placeDetails\": \"A bustling boulevard lined with casinos, resorts, and entertainment venues.\",\n          \"placeImageURL\": \"https://www.vegas.com/media/images/strip-las-vegas-skyline-night-travel-usa.jpg\",\n          \"geoCoordinates\": \"36.1144° N, 115.1728° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4 stars\",\n          \"time\": \"2-3 hours\"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Explanation:**\n\nThis JSON object provides a travel plan for a couple visiting Las Vegas on a cheap budget for 3 days.\n\n**hotelOptions** array contains information about three budget-friendly hotels with their names, addresses, prices, image URLs, geo-coordinates, ratings, and descriptions.\n\n**itinerary** object contains the planned activities for each day:\n\n* **day1**:\n    * **bestTime**: Morning\n    * **plan**:\n        * Visit Fremont Street Experience (free entry)\n        * Visit Neon Museum ($20 - $30 per person)\n* **day2**:\n    * **bestTime**: Afternoon\n    * **plan**:\n        * Visit Hoover Dam ($30 - $40 per person)\n* **day3**:\n    * **bestTime**: Evening\n    * **plan**:\n        * Watch the Bellagio Fountains Show (free)\n        * Explore The Strip (free)\n\nEach place in the plan includes details such as its name, description, image URL, geo-coordinates, ticket pricing, rating, and recommended time spent at each location.\n\nThis travel plan offers a mix of free and paid activities, ensuring a budget-friendly trip while still experiencing some of Las Vegas' iconic attractions. You can customize this itinerary based on your interests and adjust the duration of each activity to suit your preference."},
        ],
      },
    ],
  });
