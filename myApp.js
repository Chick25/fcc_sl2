require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true, useUnifiedTopology: true
});

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: 'Chicky Huynh',
    age: 20,
    favoriteFoods: ['Bun bo', 'Mi goi']
  });
  newPerson.save((err, data)=>{
    if(err) return done(err);
    return done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people)=>{
    if(err) return done(err);
    return done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data)=>{
    if(err) return done(err);
    return done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data)=>{
    if(err) return done(err);
    return done(null, data);
  });

};

const findPersonById = (personId, done) => {
  Person.findPersonById(personId, (err, data)=>{
    if(err) return done(err);
    return done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findPersonById(personId, (err, data)=>{
    if(err) return done(err);
    if(!data) return done(new Error('Person not found!'));

    data.favoriteFoods.push(foodToAdd);
    data.save((err, newdata)=>{
      if(err) return done(err);
      return done(null, newdata);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    (err, data)=>{
      if(err) return done(err);
      if(!data) return done(new Error('Name not found!'));
      return done(null, data);
    }
  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data)=>{
    if(err) return done(err);
    if(!data) return done(new Error('Person not found'));
    return done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data)=>{
    if(err) return done(err);
    return done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age:0})
  .exec()
  .then(data=>done(null, data))
  .catch(err=>done(err, data))
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
