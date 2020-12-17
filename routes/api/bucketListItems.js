 const {Router} = require('express');
 const BucketListItem = require('../../models/BucketListItem');
 const router = Router();
 
 router.get('/',async(req,res)=>{
   try{
    const bucketListItems = await BucketListItem.find();
    if(!bucketListItems){
        throw new Error('no bucketListItems');
    }
    const sorted = bucketListItems.sort((a,b)=>{
        return new Date(a.Date).getTime() - new Date(b.Date).getTime()
    })
    res.status(200).json(sorted);
   }
   catch(err){
      res.status(500).json({message:err.message});
   }
 }) 

 router.post('/',async (req,res)=>{
     try{
        const newBucketListItem = new BucketListItem(req.body);
        const bucketListItem = await newBucketListItem.save();
        if(!bucketListItem) throw new Error('Something went wrong saving the bucketListItem')
        res.status(200).json(bucketListItem);
     }
     catch(err){
       res.status(500).json({message:err.message})
     }
 })

 router.put('/:id', async (req,res)=>{
     try{ 
          const {id} = req.params;
          const response = await BucketListItem.findByIdAndUpdate(id,req.body);
          if(!response) throw Error('Something went wrong in updating item');
          const updated = {...response._doc, ...req.body}
          res.status(200).json(updated);
     }
     catch(err){
        res.status(500).json({message:err.message})
     }
 })

 router.delete('/:id' , async (req , res)=>{
     try{
        const {id} = req.params;
        const removed = await BucketListItem.findByIdAndDelete(id);
        if(!removed) throw Error('Something went wrong in deleting item');
        res.status(200).json(removed);
     }
     catch(err){
         res.status(500).json({message:err.message});
     }
 })

 module.exports = router;