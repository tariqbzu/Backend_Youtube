import { 
    registerUser,
    loginUser,
    logoutUser,
    refereshAccessToken
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

router.route("/refresh-token").post(refereshAccessToken)

export default router;