const multer= require('multer')

// need to define storage
const storage = multer.diskStorage({
// it has 2 keys- first one is destination and filename
destination:(req, file, callback)=> {
    // this will give the path where we want to store our image
    callback(null,'./uploads')
},
filename:(req,file,callback) =>{
    //this will generate unique name for each uploaded file
    const filename = `image-${Date.now()}-${file.originalname}`;
    callback(null,filename)
    // console.log("File received",file);
    
   
}

})

// file filter is uesed to  check whether the uploading file
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/jpg') {
    callback(null,true)
}
else{
    callback(null, false);
    return callback(new Error('only png, jpg, jpeg files are allowed'))
}
}
// create multer config
const  multerConfig = multer ({
    storage,
    fileFilter
});
module.exports = multerConfig;