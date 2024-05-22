import jwt from 'jsonwebtoken'

const secret = "13wdmanwandn2n31n4i12i5n1j23n421n4n5wdnanc3"

async function createTokenForUser (user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL : user.profileImageURL,
        role: user.role,
    };
    const token = jwt.sign(payload, secret)
    return token
}

function validateToken (token) {
    const payload = jwt.verify(token,secret);
    return payload;
}

export {
    createTokenForUser,
    validateToken
}