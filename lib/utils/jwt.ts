import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'

const PRIVATE_KEY = atob(config.get('jwt.privateKey'))
const PUBLIC_KEY = atob(config.get('jwt.publicKey'))

export const signJwt = (payload: any) => {
	try {
		const accessToken = jwt.sign(payload, PRIVATE_KEY, {
			algorithm: 'RS256',
			expiresIn: '7d'
		})

		return accessToken
	} catch (error) {
		throw new Error('unable to sign JWT')
	}
}

export const verifyJwt = (token: string) => {
	try {
		const payload = jwt.verify(token, PUBLIC_KEY, {
			algorithms: ['RS256']
		})

		return payload as JwtPayload
	} catch (error) {
		throw new Error('JWT verification failed')
	}
}
