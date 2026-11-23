const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: insert a user with an embedded address object.
  // The address must have at least a city and a country field.
    await users.insertOne({
    name: "Alice",
    email: "alice@example.com",
    address: { city: "Paris", country: "France" },
  });

  // TODO 2: insert a user with a skills array containing at least 3 items.
    await users.insertOne({
    name: "Bob",
    email: "bob@example.com",
    skills: ["JavaScript", "MongoDB", "Node.js"],
  });

  // TODO 3: use insertMany to insert at least 5 users in a single call.
  // Requirements:
  //   - At least 2 users must have address.country set to "France"
  //   - At least 2 users must have a skills array with at least 1 item
    await users.insertMany([
    { name: "Chloé", email: "chloe@example.com", address: { city: "Lyon", country: "France" }, skills: ["Python"] },
    { name: "Hugo", email: "hugo@example.com", address: { city: "Marseille", country: "France" } },
    { name: "Priya", email: "priya@example.com", address: { city: "Mumbai", country: "India" }, skills: ["Java", "SQL"] },
    { name: "Tom", email: "tom@example.com", skills: ["Docker"] },
    { name: "Sara", email: "sara@example.com", address: { city: "Nice", country: "France" } },
  ]);

  // TODO 4: retrieve all documents and log each user's name.
    const allUsers = await users.find().toArray();
  console.log("TODO 4: all users:");
  for (const u of allUsers) console.log(" -", u.name);

  // TODO 5: use dot notation to find the user whose address.city is "Paris" and log the result.
    const parisUser = await users.findOne({ "address.city": "Paris" });
  console.log("\nTODO 5: user in Paris:", parisUser);

  // TODO 6: find all users whose address.country is "France" and log their names.
    const french = await users.find({ "address.country": "France" }).toArray();
  console.log("\nTODO 6: users in France:");
  for (const u of french) console.log(" -", u.name);

  // TODO 7: find all users who have a skills field and log their names.
    const skilled = await users.find({ skills: { $exists: true } }).toArray();
  console.log("\nTODO 7: users with skills:");
  for (const u of skilled) console.log(" -", u.name);
  
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
