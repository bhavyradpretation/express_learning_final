import { hash } from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    displayName:{
        type: String,
        required: true,
        trim: true,
        mixlength: 3,
        maxlength: 30
    },
    password:{
        type: String,
        required: true,
        select: false
    }
},{
    timestamps: true
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return; 
    this.password = await hash(this.password, 10);
})

const User = model("User", userSchema);

export {
    User
}
