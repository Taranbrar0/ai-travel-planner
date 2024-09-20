export const SelectBudgetOptions =[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscius of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸'
    }

];

export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'🛫',
        people:'1 person',
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 person',
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏠',
        people:'4 person',
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'⛵',
        people:'5-6 people',
    }
]

const SAMPLE_OUTPUT=`{
: 
hotelOptions
: 
Array(3)
0
: 
{hotelAddress: '113 Jane St, New York, NY 10014', geoCoordinates: '40.7357° N, 74.0084° W', price: '$150 - $250 per night', hotelName: 'The Jane Hotel', description: 'A charming and historic hotel in the West Village,…ng affordable accommodations in a unique setting.', …}
1
: 
{price: '$200 - $350 per night', description: 'A stylish and trendy hotel in the Lower East Side, known for its chic design and vibrant atmosphere.', hotelName: 'The Bowery Hotel', rating: '4.5 stars', geoCoordinates: '40.7201° N, 73.9933° W', …}
2
: 
{hotelImageURL: 'https://www.peninsula.com/en/new-york/hotel/images…/the-peninsula-new-york-hotel-exterior-view-2.jpg', rating: '5 stars', geoCoordinates: '40.7607° N, 73.9788° W', hotelAddress: '700 Fifth Ave, New York, NY 10019', description: 'A luxurious and iconic hotel located in Midtown Ma…g elegant accommodations and exceptional service.', …}
length
: 
3
[[Prototype]]
: 
Array(0)
itinerary
: 
Array(3)
0
: 
{plan: Array(2), bestTime: 'Morning', day: 'Day 1'}
1
: 
{day: 'Day 2', bestTime: 'Afternoon', plan: Array(2)}
2
: 
{day: 'Day 3', bestTime: 'Evening', plan: Array(2)}
length
: 
3
[[Prototype]]
: 
Array(0)
[[Prototype]]
: 
Object
userEmail
: 
"taranbrar9117@gmail.com"
userSelection
: 
budget
: 
"Moderate"
location
: 
label
: 
"New York, NY, USA"
value
: 
{reference: 'ChIJOwg_06VPwokRYv534QaPC8g', description: 'New York, NY, USA', terms: Array(3), matched_substrings: Array(1), types: Array(3), …}
[[Prototype]]
: 
Object
noOfDays
: 
"3"
people
: 
"1 person"`;

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totaldays} Days for {people} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, PlaceDetails, Place Image Url, Geo Coordinates, ticket Pricing, timeTravel each of location for {totaldays} days with each day plan best time to visit in JSON format and itinenary should be a array, days are also array including details. and the output should be like '+SAMPLE_OUTPUT;