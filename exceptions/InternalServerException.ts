import Exception from './Exception'

export default class InternalServerException extends Exception {
	constructor(message: string, status: number = 500) {
		super(message, status)
	}
}
