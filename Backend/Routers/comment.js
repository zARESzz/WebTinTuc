const express = require("express")

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const { addNewCommentToStory ,getAllCommentByStory,commentLike ,getCommentLikeStatus,getAICommentSuggestion,fetchAICommentSuggestion} = require("../Controllers/comment")

const { checkStoryExist } = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router() ;


router.post("/:slug/addComment",[getAccessToRoute,checkStoryExist] ,addNewCommentToStory)

router.get("/:slug/getAllComment",getAllCommentByStory)

router.post("/:comment_id/like",commentLike)

router.post("/:comment_id/getCommentLikeStatus",getCommentLikeStatus)

router.get("/:slug/aiSuggestion", [getAccessToRoute, checkStoryExist], getAICommentSuggestion);
router.get("/:slug/fetchAICommentSuggestion", [getAccessToRoute, checkStoryExist], fetchAICommentSuggestion);


module.exports = router