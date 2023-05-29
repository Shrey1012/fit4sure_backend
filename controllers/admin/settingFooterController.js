const Setting_Footer = require("../../models/Setting_Footer");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const moment = require("moment");

class SettingFooterController {
    static list = async (req, res) => {
        try {
        const settingFooter = await Setting_Footer.findOne();
        const admin = await Adminauth.find({});
        return res.render("admin/settingFooter", {
            admin,
            title: settingFooter ? settingFooter.title : "",
            logo: settingFooter ? settingFooter.logo : "",
            playstore_link: settingFooter ? settingFooter.playstore_link : "",
            appstore_link: settingFooter ? settingFooter.appstore_link : "",
            youtube_link: settingFooter ? settingFooter.youtube_link : "",
            instagram_link: settingFooter ? settingFooter.instagram_link : "",
            twitter_link: settingFooter ? settingFooter.twitter_link : "",
            facebook_link: settingFooter ? settingFooter.facebook_link : "",
            description: settingFooter ? settingFooter.description : "",
            
        });
        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    };
    
  
    static add = async (req, res) => {
        try {

            const settingFooter = await Setting_Footer.findOne();

            if(settingFooter){
                upload(req, res, async function (err) {

                await Setting_Footer.findOneAndUpdate({},
                    { $set: {
                        title: req.body.title,
                        logo: req.file.filename,
                        playstore_link: req.body.playstore_link,
                        appstore_link: req.body.appstore_link,
                        youtube_link: req.body.youtube_link,
                        instagram_link: req.body.instagram_link,
                        twitter_link: req.body.twitter_link,
                        facebook_link: req.body.facebook_link,
                        description: req.body.description,
                        updated_at: Date.now(),
                    }});
                    return res.send({
                        message: "Footer Updated Successfully",
                    }); 
                });
            }
            else{
                upload(req, res, async function (err) {
                   
                const settingFooter = new Setting_Footer({
                    title: req.body.title,
                    logo: req.file.filename,
                    playstore_link: req.body.playstore_link,
                    appstore_link: req.body.appstore_link,
                    youtube_link: req.body.youtube_link,
                    instagram_link: req.body.instagram_link,
                    twitter_link: req.body.twitter_link,
                    facebook_link: req.body.facebook_link,
                    description: req.body.description,
                    created_at: Date.now(),
                });
                await settingFooter.save();
                return res.send({
                    message: "Footer Added Successfully",
                });
                });
            }

        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    };
    static delete = async (req, res) => {
        try {
            console.log("hello")
            const setting_footer = await Setting_Footer.findOne({
                    _id: req.body.id,
                  });
                  fs.unlinkSync(root + "/public/uploads/footer/" + setting_footer.logo);
                  await Setting_Footer.deleteOne({
                    _id: setting_footer.id,
                  });    
        return res.send({
            message: "Footer Deleted Successfully",
        });
        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    }
}
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/uploads/footer"),
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5000000
    // },
    fileFilter: imageFilter,
  }).single("logo");

module.exports = SettingFooterController;
    
            