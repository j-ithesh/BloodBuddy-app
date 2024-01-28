const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel")

const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email });
        if (!user) {
          throw new Error("User Not Found");
        }
       // if(inventoryType === "in" && user.role !== 'donar'){
            //throw new Error('Not a donar account')
        //}
        //if(inventoryType === "out" && user.role !== 'hospital'){
            //throw new Error('Not a hospital')
       //}

       if(req.body.inventoryType == 'out'){
        const requestedBloodGroup = req.body.bloodGroup
        const requestedQuantityOfBlood = req.body.quantity 
        const organisation = new mongoose.Types.ObjectId(req.body.userId)

        const totalInOfRequestedBlood = await inventoryModel.aggregate([
          {$match:{
            organisation,
            inventoryType:'in',
            bloodGroup:requestedBloodGroup
          }},{
            $group:{
              _id:'$bloodGroup',
              total:{$sum : '$quantity'}
            }
          }
        ])
        //console.log('Total In', totalInOfRequestedBlood);
        const totalIn = totalInOfRequestedBlood[0]?.total || 0

        const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
          {$match:{
            organisation,
            inventoryType:'out',
            bloodGroup:requestedBloodGroup
          }},
          {
            $group:{
              _id:'$bloodGroup',
              total: {$sum : '$quantity'}
            }
          }
        ])
        const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

        const availableQuantityOfBloodGroup = totalIn - totalOut;

        if(availableQuantityOfBloodGroup < requestedQuantityOfBlood){
          return res.status(500).send({
            success:false,
            message:`Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
          });
        }
        req.body.hospital = user?._id;
      }else{
        req.body.donar = user?._id;
      }


       const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
          success: true,
          message: "New Blood Reocrd Added",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Errro In Create Inventory API",
          error,
        });
      }
    };

    const getInventoryController = async (req,res)=>{
        try{
           const inventory = await inventoryModel.find({
            organisation:req.body.userId,
        }).populate('donar').populate('hospital').sort({creayedAt: -1})
           return res.status(200).send({
            success:true,
            message:"get all records successfully",
            inventory,
           });

        }catch (error) {
            console.log(error)
            return res.status(500).send({
                success:false,
                message:'Error in get all inventory',
                error
            })
        }
    };

    const getInventoryHospitalController = async (req,res)=>{
      try{
         const inventory = await inventoryModel.find(req.body.filters)
         .populate('donar').populate('hospital').populate('organisation').sort({creayedAt: -1})
         return res.status(200).send({
          success:true,
          message:"get hospital consumer records successfully",
          inventory,
         });

      }catch (error) {
          console.log(error)
          return res.status(500).send({
              success:false,
              message:'Error in get consumer inventory',
              error
          });
      };
  };
    
    const getRecentInventoryController = async (req,res) => {
      try{
        const inventory = await inventoryModel.find({
          organisation:req.body.userId
        }).limit(3).sort({createAt:-1})
        return res.status(200).send({
          success:true,
          message:'Recent Inventory Data',
          inventory,

        })
      }catch(error){
        console.log(error)
        return res.status(500).send({
          success:false,
          message:'Error In Recent Inventory API',
          error
        })
      }
    }


    const getDonarsController = async (req,res) =>{
      try{
         const organisation = req.body.userId;

         const donarId = await inventoryModel.distinct("donar", {
          organisation,
         });
        // console.log(donarId);
        const donars = await userModel.find({_id: {$in: donarId}})

        return res.status(200).send({
          success:true,
          message:'Donar Record Fetched Successfully',
          donars,
        })
      } catch (error) {
        console.log(error)
        return res.status(500).send({
          success:false,
          message:'Error In Donar Records',
          error,
        })
        
      }
    };

    const getHospitalController =async (req,res) => {
      try{
        const organisation = req.body.userId

        const hospitalId = await inventoryModel.distinct('hospital', {organisation});

        const hospitals = await userModel.find({
          _id: {$in: hospitalId}
        });
        return res.status(200).send({
          success: true,
          message: "Hospitals Data Fetched Successfully",
          hospitals,

        })
      } catch(error) {
        console.log(error)
        return res.status(500).send({
          success:false,
          message:'Error In Get Hospital API',
          error
        })

      }
    };

    const getOrganisationController = async (req,res) => {
      try{
         const donar = req.body.userId
         const orgId = await inventoryModel.distinct('organisation',{donar})

         const organisations = await userModel.find({
          _id: {$in:orgId}
         })
         return res.status(200).send({
          success:true,
          message:'Org data Fetched Successfully',
          organisations
         })
      }catch(error) {
        console.log(error)
        return res.status(500).send({
          success:false,
          message:'Error in ORG API',
          error
        })
       
     }
    };
     
     const getOrganisationForHospitalController = async (req,res) => {
      try{
         const hospital = req.body.userId
         const orgId = await inventoryModel.distinct('organisation',{hospital})

         const organisations = await userModel.find({
          _id: {$in:orgId}
         })
         return res.status(200).send({
          success:true,
          message:'Hospital Org data Fetched Successfully',
          organisations
         })
      }catch(error) {
        console.log(error)
        return res.status(500).send({
          success:false,
          message:'Error in Hospital ORG API',
          error
        })
       
     }
    };
    
    
    
module.exports = {createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController }