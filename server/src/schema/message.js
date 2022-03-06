import { gql } from "apollo-server-express";

const messageSchema = gql`
    type Message {
        id: ID!,
        text: String!,
        user: User!,
    }

    extend type Query {
        messages(cusor: ID): [Message!]!
        message(id: ID): Message!
    }

    extend type Mutation {
        createMessage(text: String!, userId: ID!): Message!
        updateMessage(id: ID!, text: String!, userId: ID!): Message!
        deleteMessage(id: ID!, userId: ID!): ID!
    }
`

export default messageSchema;
