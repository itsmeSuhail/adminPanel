export const resHandler=(res,status=200,data)=>{
res.status(200).json({
    status,
    res:data
})
}
