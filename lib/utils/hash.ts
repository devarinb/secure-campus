import argon from 'argon2'

export const hash = async (sub: string) => {
	return argon.hash(sub)
}

export const verify = async (provided: string, hash: string) => {
	return argon.verify(hash, provided)
}
