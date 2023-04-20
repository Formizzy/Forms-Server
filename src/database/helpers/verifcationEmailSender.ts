import { currentUrl, orgEmailId, authEmail, authPassword, encryptionKeyForUserVerification, initializationVectorForUserVerification } from "../../config";
import User from "../model/User";
import nodemailer from 'nodemailer';
import crypto from 'crypto'

export const sendVerificationEmail = async function ( user: User ) : Promise<any>
{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: authEmail,
            pass: authPassword,
        }
    });

    transporter.verify()
        .then((success) => {
            console.log("Transporter setted successfully");
        })
        .catch((error) => {
            console.log("Transported did not get setted up");
        })
    

    const currentWorkingUrl = currentUrl;

    //here encryption of user data remains
    const userData = {
        userId: user._id.toString(),
        expiresAt: Date.now() + 21600000,
    };

    const userDataString = JSON.stringify(userData);

    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKeyForUserVerification, initializationVectorForUserVerification);

    let encryptedUserData = cipher.update(userDataString, 'utf-8', 'hex');

    encryptedUserData += cipher.final('hex');

    const authenticatonTag = cipher.getAuthTag();

    const mailOptions = {
        from: orgEmailId,
        to: user.email,
        subject: "Verify Your Email",
        html: `<p>Verify Your Email Address To Complete SignUp process.</p><p>This Link Expires in 6 hours</p>
                <p>Click <a href=${currentWorkingUrl + "user/verify/" + encryptedUserData + "-" + authenticatonTag.toString('hex')}>here</a> to Veify</p>`
    }

    transporter.sendMail(mailOptions)
    .then(() => {
        console.log("verification email is sent successfully");
    })
    .catch((error) => {
        console.log("Error: ", error);
    })
}