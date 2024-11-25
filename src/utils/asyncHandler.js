const asyncHandler = (requestHandler) =>{
    return (req, res, next) =>{
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}






// const asyncHandler = (func) => async(error,req,res, next) =>{
//     try {
//         await func(error,req,res,next)
//     } catch (error) {
//         res.status(error.code || 500 ).json({
//             success : false,
//             message: error.message
//         })
//     }
// }

export { asyncHandler }