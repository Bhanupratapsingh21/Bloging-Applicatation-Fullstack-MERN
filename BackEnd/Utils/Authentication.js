import jwt from 'jsonwebtoken'

async function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWTSECRET)
    return token
}

function validateToken(token) {
    const payload = jwt.verify(token, process.env.JWTSECRET);
    return payload;
}

export {
    createTokenForUser,
    validateToken
}