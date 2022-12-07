const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true ,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  const price = () => Math.floor((Math.random() * 20) + 10)
  for (let i = 0; i < 50; i++ ){
    const random1000 = Math.floor((Math.random() * 1000));
    const camp = new Campground({
      author: '638e14381887bfb07e157320',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In blanditiis autem ducimus voluptatibus adipisci vero necessitatibus! Reiciendis cupiditate sequi cumque a? Eos ut iure error, laudantium aliquam perferendis unde aliquid!',
      price: price(),
      images: [
      {
        url: 'https://res.cloudinary.com/dotqe9fdf/image/upload/v1670453746/YelpCamp/orthdqatxzl5ldmo9jl4.jpg',
        filename: 'YelpCamp/orthdqatxzl5ldmo9jl4'
      },
      {
        url: 'https://res.cloudinary.com/dotqe9fdf/image/upload/v1670453747/YelpCamp/texmetaorp93yy61npip.jpg',
        filename: 'YelpCamp/texmetaorp93yy61npip'
      } 
    ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close()
});