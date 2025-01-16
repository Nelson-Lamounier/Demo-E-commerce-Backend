import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../../model/user"
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `http://localhost:3000/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try{
                // Fins or create user
                let user = await  User.findOne ({ googleId: profile.id});
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails?.[0]?.value,
                        receiveEmails: false,
                    });
                }
                return done(null, user);
            }catch (error) {
                return done(error)
            }
        }
    )
);

// Serialise and deserialize user (if using sessions)
passport.serializeUser((user: any, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    }  catch (error) {
        done(error, null);
    }
})