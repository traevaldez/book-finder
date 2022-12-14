const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: String
        savedBooks: [Book]
    }

    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookToSave: bookInput): User
        removeBook(bookId: String!): User
    }

    input bookInput {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }


`;

// export the typeDefs
module.exports = typeDefs