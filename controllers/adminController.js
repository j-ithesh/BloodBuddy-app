const userModel = require("../models/userModel");

const getDonarsListController = async (req,res) => {
    try{
       const donarData = await userModel.find({role:'donar'}).sort({createdAt:-1});
       return res.status(200).send({
        success:true,
        Totalcount:donarData.length,
        message:'Donar List Successfully',
        donarData,
       })
    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error In DonarList API',
            error
        })
    }
};

const getHospitalListController = async (req,res) => {
    try{
       const hospitalData = await userModel.find({role:'hospital'}).sort({createdAt:-1});
       return res.status(200).send({
        success:true,
        Totalcount:hospitalData.length,
        message:'Hospital List Successfully',
        hospitalData,
       })
    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error In HospitalList API',
            error
        })
    }
};

const getOrgListController = async (req,res) => {
    try{
       const orgData = await userModel.find({role:'organisation'}).sort({createdAt:-1});
       return res.status(200).send({
        success:true,
        Totalcount:orgData.length,
        message:'Organisation List Successfully',
        orgData,
       })
    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error In OrgList API',
            error
        })
    }
};

const deleteDonarController = async (req,res) => {
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:' Record Deleted Successfully'
        })
        
    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error while Deleting ',
            error
        })
    }
};




module.exports = {getDonarsListController, getHospitalListController, getOrgListController, deleteDonarController};