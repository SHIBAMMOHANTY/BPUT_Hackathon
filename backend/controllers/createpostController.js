const createpostmodal=require('../models/createpostModal');

exports.createpost=async(req,res)=>{
    try{
        const {title,description,media,mediaType,requiredAmount,company,location,salary}=req.body;
        const newPost=new createpostmodal({title,description,media,mediaType,requiredAmount,company,location,salary});
        await newPost.save();
        res.status(201).json({message:'Post created successfully',post:newPost});
    }catch(err){
        res.status(500).json({message:'Failed to create post',error:err.message});
    }
};
exports.getPosts=async(req,res)=>{
    try{
        const posts=await createpostmodal.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message:'Failed to fetch posts',error:err.message});
    }
}
exports.getPostById=async(req,res)=>{
    const {id}=req.params;
    try{
        const post=await createpostmodal.findById(id);
        if(!post){
            return res.status(404).json({message:'Post not found'});
        }
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({message:'Failed to fetch post',error:err.message});
    }
}
exports.updatePost=async(req,res)=>{
    const {id}=req.params;
    const {title,description,media,mediaType,requiredAmount,company,location,salary}=req.body;
    try{
        const updatedPost=await createpostmodal.findByIdAndUpdate(id,{title,description,media,mediaType,requiredAmount,company,location,salary},{new:true});
        if(!updatedPost){
            return res.status(404).json({message:'Post not found'});
        }
        res.status(200).json({message:'Post updated successfully',post:updatedPost});
    }catch(err){
        res.status(500).json({message:'Failed to update post',error:err.message});
    }
}

exports.deletePost=async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedPost=await createpostmodal.findByIdAndDelete(id);
        if(!deletedPost){
            return res.status(404).json({message:'Post not found'});
        }
        res.status(200).json({message:'Post deleted successfully',post:deletedPost});
    }catch(err){
        res.status(500).json({message:'Failed to delete post',error:err.message});
    }
}