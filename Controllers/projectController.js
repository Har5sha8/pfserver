const projects = require('../Models/projectSchema')
exports.addProject = async (req, res) => {
    console.log("inside add project controll");
    console.log("getting user id controller");
    const userId = req.payload;
    console.log(userId);


    // to get file name
    const projectImage = req.file.filename;
    console.log(projectImage);
    const { title, language, github, website, overview } = req.body
    try {
        // we can use github link to check weather this is already upload  or not 
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            res.status(406).json("This Project Already Exists")
        }
        else {
            const newProject = new projects({
                title: title,
                language: language,
                website: website,
                overview: overview,
                userId: userId,
                projectImage: projectImage,
                github: github
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json(" Error in adding the Project " + err)
    }
}