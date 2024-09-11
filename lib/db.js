import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://amarbanerjee:bRMR3l2ECcYGmJF1@cluster0.rx9fb.mongodb.net/newsletter?retryWrites=true&w=majority&appName=Cluster0'
  );

  return client;
}
