import { connect } from 'mongoose';

export async function startConnection() {
    await connect('mongodb://localhost/api-typescript-img', {

    })
    console.log("-----> Database is connected");
}