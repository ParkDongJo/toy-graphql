import { gql } from "apollo-server-express";
import messageSchema from "./message";
import userSchema from "./user";

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutaion {
        _: Boolean
    }
`
export default [linkSchema, messageSchema, userSchema];
