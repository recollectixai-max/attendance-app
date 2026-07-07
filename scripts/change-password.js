const { cert, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
require("dotenv").config();

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

initializeApp({
    credential: cert(serviceAccount),
});

const auth = getAuth();

async function changePassword() {
    try {
        const email = "faheem@recollectix.com";
        const newPassword = "recollectix@786";

        // First get the user by email
        const user = await auth.getUserByEmail(email);
        
        // Update the password
        await auth.updateUser(user.uid, {
            password: newPassword,
        });

        console.log(`✅ Password changed successfully for ${email}`);
        console.log(`New password: ${newPassword}`);
    } catch (error) {
        console.error("❌ Error changing password:", error.message);
        process.exit(1);
    }
}

changePassword();
