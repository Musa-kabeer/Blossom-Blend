const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const slug = require('slug');

const cartSchema = new mongoose.Schema({
     id: {
          type: String,
     },

     quantity: { type: Number },
});

const userSchema = new mongoose.Schema(
     {
          name: {
               type: String,
               trim: true,
               unique: true,
               required: [true, 'A user must have name'],
          },

          slug: String,

          email: {
               type: String,
               unique: true,
               trim: true,
               required: [true, 'Please provide your email'],
               validate: {
                    validator: (val) => {
                         return isEmail(val);
                    },

                    message: 'Provide valid email address!',
               },
          },

          emailValid: {
               type: Boolean,
               default: false,
               select: false,
          },

          emailValidation: String,

          address: String,

          phoneNumber: Number,

          photo: String,

          wishlists: [String],

          carts: [cartSchema],

          writeReview: [String],

          passwordResetToken: String,

          password: {
               type: String,
               minlength: [
                    8,
                    'Password length must be greater than or equal 8',
               ],
               required: [true, 'A user must have a password'],
               select: false,
          },

          passwordConfirm: {
               type: String,
               minlength: [
                    8,
                    'PasswordConfirm length must be greater than or equal 8',
               ],

               validate: {
                    validator: function (val) {
                         return this.password === val;
                    },
                    message: 'password & passwordConfirm must be the same',
               },
          },
     },
     { timestamps: true }
);

// CREATE SLUG ON PRE SAVE
userSchema.pre('save', function (next) {
     this.slug = slug(this.name, { lower: true });

     next();
});

userSchema.pre('save', async function (next) {
     if (!this.isModified('password')) return next();

     this.password = await bcrypt.hash(this.password, +process.env.HASH_ROUNDS);

     this.passwordConfirm = undefined;

     next();
});

userSchema.methods.createEmailToken = async function () {
     const emailToken = crypto.randomBytes(32).toString('hex');

     const hash = crypto.createHash('sha256').update(emailToken).digest('hex');

     this.emailValidation = await bcrypt.hash(hash, +process.env.HASH_ROUNDS);

     return hash;
};

userSchema.methods.compareToken = async (plainToken, hashToken) => {
     return await bcrypt.compare(plainToken, hashToken);
};

userSchema.methods.correctPassword = async (plainPassword, hashedPassword) => {
     return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.methods.passwordResetVariable = async function () {
     const resetToken = crypto.randomBytes(32).toString('hex');

     const digestedToken = crypto
          .createHash('sha256')
          .update(resetToken)
          .digest('hex');

     this.passwordResetToken = await bcrypt.hash(
          digestedToken,
          +process.env.HASH_ROUNDS
     );

     return digestedToken;
};

userSchema.methods.checkPasswordResetToken = async function (
     plainToken,
     hashedToken
) {
     return await bcrypt.compare(plainToken, hashedToken);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
