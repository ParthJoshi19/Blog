use("mydatabase")
db.users.dropIndex("username_1");
db.users.createIndex({ email: 1 }, { unique: true });
