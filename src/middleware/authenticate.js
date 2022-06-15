

const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (token) => {
	
		return jwt.verify(token, "masaischool") 
	
};

const authenticate = async (req, res, next) => {
	if (!req.headers.authorization) {
		console.log("hioooooo")
        return res
			.status(401)
			.send({ message: "Authorisation Token not found or incorrect !!" });
	}
	if (!req.headers.authorization.startsWith("Bearer")) {
        console.log("mttttt")
        return res
			.status(401)
			.send({ message: "Authorisation Token not found or incorrect !!" });
	}

	const receivedToken = req.headers.authorization.trim().split(" ")[1];

	let decoded;
	try {
		decoded = await verifyToken(receivedToken);
		
		if(decoded){
			// console.log(decoded)
			req.user = decoded.user;
			return	next();
		}
		else{
			return res.send({message: "incorrect token"})
		}
		
	} catch (err) {
		return res
			.status(500)
			.send({meessage: "hello"});
	}
    //here do console.log(decoded) => You will get Object with two key value pair. Now I am taking only => decode.user from it
    // and attaching it to whole body i.e. req.user

};

module.exports = authenticate;