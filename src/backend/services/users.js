const models = require('../models')

exports.createUser = async (user) => {

    let userRecord;
    try {
        userRecord = await models.users.create(user);
        
        return {
            'user': {
                id: userRecord.dataValues.id,
                role: userRecord.dataValues.role,
                email: userRecord.dataValues.email,
                status: userRecord.dataValues.status,
            }
        };
    } catch (error) {
        throw error;
    }
}

exports.findByEmail = async (email) => {
    const userRecord = await models.users.find({
        attributes: ['email'],
        where: {
            email: email
        }
    });

    return userRecord;
}

exports.getAll = async () => {
    try {
        const userRecords = await models.users.findAll({
            attributes: ['id', 'email', 'role', 'status', 'mobile_no'],
            raw: true
        });
    
        return userRecords.map(userRecord => {
            return {
                id: userRecord.id,
                role: userRecord.role,
                email: userRecord.email,
                status: userRecord.status,
                mobile_no: userRecord.mobile_no
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.deleteUser = async (id) => {
    try {
        const userRecord = await models.users.destroy({
            where: {
                id: id
            }
        });

        return userRecord
    } catch (error) {
        throw error;
    }
}

exports.updateUser = async (userId, userData) => {
    try {
        const updatedRecord = await models.users.update(
            userData,
            {
                where: {
                    id: userId
                }
            }
        );

        return updatedRecord;
    } catch (error) {
        throw error
    }
}