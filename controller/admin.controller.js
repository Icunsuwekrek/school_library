const { request, response } = require("express")

/**load model for `members` table */
const adminModel = require(`../models/index`).admin
/**load operation from sequelize */
const Op = require(`sequelize`).Op

const md5 = require(`md5`)

exports.getAllAdmin = async (request, response) => {
    /**call findall()to get all data */
    let admin = await adminModel.findAll()
    return response.json({
        success: true,
        data: admin,
        message: `All Admin have been loaded`
    })
}
/**create function for filter */
exports.findAdmin = async (request, response) => {
    /**define keyword to find data */
    let keyword = request.body.keyword

    /**call findAll() within where clause and operation
     * to find data based on keyword
     */

    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { username: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: admins,
        message: `All Admin have been loaded`
    })
}
/**create function for add new member*/
exports.addAdmin = (request, response) => {
    /**prepare data from request */
    let newAdmin = {
        name: request.body.name,
        address: request.body.address,
        username: request.body.username,
        password: md5(request.body.password),
        contact: request.body.contact
    }

    /**execute inserting data to member's table */
    adminModel.create(newAdmin)
        .then(result => {
            /**if insert process success */
            return response.json({
                success: true,
                data: result,
                message: `New Admin has been inserted`
            })
        })
        .catch(error => {
            /**if insert process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}
/**create function for update member */
exports.updateAdmin = (request, response) => {
    /**prepare data that has been changed */
    let dataAdmin = {
        nama: request.body.nama,
        address: request.body.address,
        username:request.body.username,
        password: md5(request.body.password),
        contact: request.body.contact
    }
    /**define id member that will be update */
    let idAdmin = request.params.id

    /**execute update data based on defined id member */
    adminModel.update(dataAdmin, { where: { id: idAdmin } })
        .then(result => {
            /**if updates's process success */
            return response.json({
                success: true,
                message: `Data Admin has been updated`
            })
        })
        .catch(error => {
            /**if updates process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })

}
/** create function for delete data */
exports.deleteAdmin = (request, response) => {
    /** define id member that will be update */
    let idAdmin = request.params.id
    /** execute delete data based on defined id member */
    adminModel.destroy({ where: { id: idAdmin } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data Admin has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}
