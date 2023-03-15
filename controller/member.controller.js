const { request, response } = require("express")

/**load model for `members` table */
const memberModel = require(`../models/index`).member
/**load operation from sequelize */
const Op = require(`sequelize`).Op
const path = require(`path`)
const memberValidation = require(`../middlewares/member-validation`)
const upload = require(`./upload-profile`).single(`profile`)

/**create function for read all data */
exports.getAllMember = async (request, response) => {
    /**call findall()to get all data */
    let members = await memberModel.findAll()
    return response .json({
        success: true,
        data: members,
        message: `All Members have been loaded`
    })
}
/**create function for filter */
exports.findMember = async (request, response) => {
    /**define keyword to find data */
    let keyword = request.body.keyword

    /**call findAll() within where clause and operation
     * to find data based on keyword
     */

    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: members,
        message: `All Members have been loaded`
    })
}
/**create function for add new member*/
exports.addMember = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({ message: `Nothing to upload` })
        }
        /**proses validasi */
        let resultValidation = memberValidation (request)

        //jika status bernilai salah
        if(!resultValidation.status) {
            return response.json({
                status:false,
                message:resultValidation.message
            })
        }
        //preparation
        let newMember = {
            name: request.body.name,
            address: request.body.address,
            gender: request.body.gender,
            contact: request.body.contact,
            profile: request.file.filename
        }
        memberModel.create(newMember)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: 'New member has been inserted'
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

/**create function for update member */
exports.updateMember = (request, response) => {
     /** run upload function */
     upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** store selected book ID that will update */
        let id = request.params.id
    /**prepare data that has been changed */
    let dataMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }
    if (request.file) {
        /** get selected book's data */
        const selectedMember = await memberModel.findOne({
            where: { id: id }
        })
        /** get old filename of cover file */
        const oldProfileMember = selectedMember.profile
        /** prepare path of old cover to delete file */
        const pathProfile = path.join(__dirname, `../profile`,
            oldProfileMember)
        /** check file existence */
        if (fs.existsSync(pathProfile)) {
            /** delete old cover file */
            fs.unlink(pathProfile, error =>
                console.log(error))
        }
        /** add new cover filename to book object */
        dataMember.profile = request.file.filename
    }
    /**execute update data based on defined id member */
    let idMember = request.params.id
    memberModel.update(dataMember, { where: { id: idMember } })
        .then(result => {
            /**if updates's process success */
            return response.json({
                success: true,
                message: `Data Member has been updated`
            })
        })
        .catch(error => {
            /**if updates process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
    })

}
/** create function for delete data */
exports.deleteMember = async (request, response) => {
    /** define id member that will be update */
    let idMember = request.params.id
    /** Delete profile file */
    const member = await memberModel.findOne({where: {id: idMember}})
    const oldProfileMember = member.profile
    /** execute delete data based on defined id member */
    memberModel.destroy({ where: { id: idMember } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data member has been updated`
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
