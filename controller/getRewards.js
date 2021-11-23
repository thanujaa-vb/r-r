const rewardsModal = require("../modal/rewardsmodal");

const getRewards = async (req, res) => {
  const pageSize=10;
  let pageNo=1;
  pageNo = parseInt(req.query.pageNo);
  // pageSize = parseInt(req.query.pageSize); 
  const skip = pageSize * (pageNo-1);
  let rewards
  
  try {
  if(req.query){
    if(!req.query.sort){
      rewards = await rewardsModal.find({}).skip(skip).limit(pageSize);
    }
    if(req.query.sort==="name"){
      rewards = await rewardsModal.find({}).skip(skip).limit(pageSize).sort({"reward_name":1});
    }
    else if(req.query.sort==="id"){
      rewards = await rewardsModal.find({}).skip(skip).limit(pageSize).sort({"_id":1});
    }
    else if(req.query.sort==="date"){
      rewards = await rewardsModal.find({}).skip(skip).limit(pageSize).sort({"createdAt":1});
    }
  }
  else{
    rewards=await rewardsModal.find({}).skip(skip).limit(pageSize);
  }
    res.status(200).send(rewards);
    } catch (error) {
      res.status(401).send(error);
    }
};

module.exports=getRewards;