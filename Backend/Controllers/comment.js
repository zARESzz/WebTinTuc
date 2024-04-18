const asyncErrorWrapper = require("express-async-handler")
const Story = require("../Models/story");
const Comment = require("../Models/comment");
const axios = require('axios');


const addNewCommentToStory  =asyncErrorWrapper(async(req,res,next)=> {

    const {slug} = req.params 

    const {star , content } =req.body 

    const story = await Story.findOne({slug :slug })

    const comment = await Comment.create({

        story :story._id ,
        content :content ,
        author : req.user.id ,
        star:star 
    })

    story.comments.push(comment._id)

    story.commentCount = story.comments.length

    await story.save();

    return res.status(200).json({
        success :true  , 
        data : comment 
    })

})

const getAICommentSuggestion = asyncErrorWrapper(async(req, res, next) => {
    const { slug } = req.params;
    const story = await Story.findOne({slug: slug});
    if (!story) {
        return res.status(404).json({ success: false, message: "Story not found" });
    }

    // Gọi API AI để nhận gợi ý bình luận
    const aiResponse = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', {
        prompt: "Write a thoughtful comment based on the following story: " + story.content,
        max_tokens: 50
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    });

    const commentSuggestion = aiResponse.data.choices[0].text.trim();

    return res.status(200).json({
        success: true,
        suggestion: commentSuggestion
    });
});
const fetchAICommentSuggestion = async () => {
    try {
        const aiResponse = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', {
            prompt: "Write a thoughtful comment based on the following story: " + story.content,
            max_tokens: 50
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
    
        const commentSuggestion = aiResponse.data.choices[0].text.trim();
    
        return res.status(200).json({
            success: true,
            suggestion: commentSuggestion
        });
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return res.status(500).json({ success: false, message: 'Error fetching AI suggestion' });
    }
    
};



const getAllCommentByStory = asyncErrorWrapper(async(req, res, next) => {

    const { slug } = req.params

    const story = await Story.findOne({slug:slug})

    const commmentList =await Comment.find({
        story : story._id 
    }).populate({
        path :"author",
        select:"username photo"
    }).sort("-createdAt")

    return res.status(200)
        .json({
            success: true,
            count: story.commentCount,
            data: commmentList
        })

})

const commentLike = asyncErrorWrapper(async(req, res, next) => {

    const { activeUser} =  req.body 
    const { comment_id} =  req.params 


    const comment = await Comment.findById(comment_id)

    if (!comment.likes.includes(activeUser._id)) {

        comment.likes.push(activeUser._id)
        comment.likeCount = comment.likes.length ;

        await comment.save()  ;

    }
    else {

        const index = comment.likes.indexOf(activeUser._id)
        comment.likes.splice(index, 1)
        comment.likeCount = comment.likes.length
        await comment.save()  ;
    }

    const likeStatus = comment.likes.includes(activeUser._id)
    
    return res.status(200)
        .json({
            success: true,
            data : comment,
            likeStatus:likeStatus
        })

})

const getCommentLikeStatus = asyncErrorWrapper(async(req, res, next) => {

    const { activeUser} =  req.body 
    const { comment_id} =  req.params 

    const comment = await Comment.findById(comment_id)
    const likeStatus = comment.likes.includes(activeUser._id)

    return res.status(200)
    .json({
        success: true,
        likeStatus:likeStatus
    })

})

module.exports ={
    addNewCommentToStory,
    getAllCommentByStory,
    commentLike,
    getCommentLikeStatus,
    getAICommentSuggestion,
    fetchAICommentSuggestion
}