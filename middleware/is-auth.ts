import { RequestHandler } from "express";
import jwt from "jsonwebtoken";



const isAuth: RequestHandler = (req: any, res, next) => {
	const token = req.get('Authorization')?.split(' ')[1]!;
	let decodedToken: any;
	try {
		decodedToken = jwt.verify(token, 'secret');
	} catch (error: any) {
		error.statusCode = 500;
		throw error;
	}
	
	if(!decodedToken) {
		const error: any = new Error('Not authenticated.');
		error.statusCode = 401;
		throw error;
	}

	req.userId = decodedToken.userId;
	next()
};

export default isAuth;
