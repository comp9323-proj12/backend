
const Video = require('../models/Video');

module.exports = {
	/**
	 * @swagger
	 * /videos:
	 *  post:
	 *    tags:
	 *      - "Video"
	 *    summary: Create a new video
	 *    description: Use to create a new video
	 *    consumes:
	 *      - application/json
	 *    parameters:
	 *      - in: body
	 *        name: assignment
	 *        description: The article to create
	 *    responses:
	 *      '200':
	 *        description: OK
	 */

	create: async (ctx) => {
		console.log("ctx.request.body", ctx.request.body);
		await Video.create({
			...ctx.request.body
		});
		ctx.response.status = 200;
	},

	edit: async (ctx) => {
		let { _id } = ctx.request.params;
		console.log("_i_id_id_id_id_id_id_id_idd", _id);
		let video = await Video.findOne({ _id });
		if (!video) {
			ctx.response.status = 404;
		} else {
			const newBody = ctx.request.body;
			await Video.findOneAndUpdate({ _id }, newBody, {
				new: true,
				runValidators: true,
			})
		}
		ctx.response.status = 200;
	},

	/**
	 * @swagger
	 * /videos/user/${userId}:
	 *  get:
	 *    tags:
	 *      - "Video"
	 *    summary: Return a list of videos by user id
	 *    description: Use to request videos by user Id
	 *    produces:
	 *      - application/json
	 *    responses:
	 *      '200':
	 *        description: OK
	 */
	getVideosByUser: async (ctx) => {
		const author = ctx.request.params.id;
		console.log("authorvideo", author);
		const data = await Video.find({ author }).sort('-createTime');
		ctx.response.status = 200;
		ctx.body = data
	},

	delete: async (ctx) => {
		const { id } = ctx.request.params
		console.log('Id => ', id)
		const videoFindResp = await Video.findOne({ _id: id })
		console.log("videoFindRespvideoFindResp", videoFindResp)
		if (videoFindResp === null) {
			ctx.response.body = { 'msg': 'video not found' }
			ctx.response.status = 404
			return
		}
		const { question } = videoFindResp
		console.log('等待更新/删除question => ', question)

		//question直接删除，不会和tag一样内容重复
		if (question.length > 0) {
			for (i = 0; i < question.length; i++) {
				let questionDeleteRes = await Question.deleteOne({ _id: question[i] })
				console.log('question删除 => ', questionDeleteRes)
			}
		}
		const videoDeleteRes = await Video.deleteOne({ _id: id })
		console.log('article删除 => ', videoDeleteRes)

		ctx.response.status = 200
	}
}