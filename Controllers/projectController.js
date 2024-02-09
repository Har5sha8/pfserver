const projects = require('../Models/projectSchema');

exports.addProject = async (req, res) => {
    console.log("inside add project controller");
    console.log("getting user id controller");
    const userId = req.payload;
    console.log(userId);

    // Check if file was uploaded
    if (!req.file) 
    {
        return res.status(401).json("No file uploaded");
    }

    // Get file name
    const projectImage = req.file.filename;
    console.log(projectImage);

    const { title, language, github, website, overview } = req.body;

    try {
        // Check if project with the same github link already exists
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            return res.status(406).json("This Project Already Exists");
        } else {
            const newProject = new projects({
                title: title,
                language: language,
                website: website,
                overview: overview,
                userId: userId,
                projectImage: projectImage,
                github: github
            });
            await newProject.save();
            return res.status(200).json(newProject);
        }
    } catch (err) {
        return res.status(500).json("Error in adding the Project: " + err);
    }
};



exports.getHomeprojects = async(req,res)=>{
    try{
        const homeProject = await find().limit(3)
        res.status(200).json(homeProject)

    }
    catch(err){
        res.status(401).json("request failed due to error:",err)
    }
}

exports.getAllProject = async(req,res)=>{
    try{
        const allProject = await projects.find()
        res.status(200).json(allProject)
    }
    catch(err){
        res.status(401).json("request failed due to error:",err)
    }
}

exports.getUserProject = async(req,res)=>{
    const userId = req.payload
    try{
       const allUserProject = await projects.find({userId:userId});
       res.status(200).json(allUserProject)
    }
    catch(err){
        res.status(401).json("request failed due to error:",err)
    }
}