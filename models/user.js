let mongoose = require('mongoose');
let crypto = require('crypto'); // 비밀번호용?
let Schema = mongoose.Schema;

let UserSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        username: {
            type: String,
            unique: true, // sholud not be duplicated
            required: 'Username is required',
            trim: true
        },
        password: {
            type: String,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'Password should be longer']
        },
        salt: { // for password encrypt
            type: String
        },
        provider: {
            type: String,
            required: 'Provider is required'
        },
        providerId: String,
        providerData: {},
        created: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "user"
    }
);


//Defining Getter and Setter. Dot(.) operator? using anonymous funciton to dfine them
UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {    let splitName = fullName.split(' ');    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64'); // Buffer is from Node.js  (음??) //비번 비교시 (optional?)필요?
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');// sha512는 일종의 비번 만드는 알고리즘?!
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix,
    callback) {
    var possibleUsername = username + (suffix || '');
    this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(username, (suffix || 0) +
                    1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('User', UserSchema);