import { 
    registerUser,
    loginUser,
    logoutUser,
    refereshAccessToken,
    currentChagnePassword,
    getCurrentUSer,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory    
} from '../controllers/user.controller.js';
import { Router } from "express";
import { upload } from '../middlewares/multer.midleware.js'; // Example middleware
import { verifyJWT } from "../middlewares/auth.midleware.js";

const router = Router();

// Adding middleware to the registerUser route
router.route("/register").post(
    upload.fields([
        { 
            name: "avatar",
             maxCount: 1
        },
        { 
            name: "coverImage",
            maxCount: 1 
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
// Refresh Token
router.route("/refresh-token").post(refereshAccessToken)

// Changed Password
router.route("/change-password").post(verifyJWT, currentChagnePassword)

// Current User
router.route("/current-user").get(verifyJWT, getCurrentUSer)

// Update Account
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// Update User Avatar
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

// Update CoverImage
router.route("/update-coverimage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

// User profile
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

//  Watch History
router.route("/history").get(verifyJWT, getWatchHistory)







export default router;