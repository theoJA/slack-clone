export default {
    Query: {
        getUser: (parent, {id}, {models}) => models.User.findOne({where: { id }}),
        allUsers: (parent, args, {models}) => models.User.findAll(),
    },
    //args refer to the passed in params username, email, password
    Mutation: {
        createUser: (parent, args, {models}) => models.User.create(args),
    },

};