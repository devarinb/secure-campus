import Exception from './Exception'

export default class NotFoundException extends Exception {
	constructor(message: string, status: number = 404) {
		super(message, status)
	}
}
