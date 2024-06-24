import Exception from './Exception'

export default class BadRequestException extends Exception {
	constructor(message: string, status: number = 400) {
		super(message, status)
	}
}
