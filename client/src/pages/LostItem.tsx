import { FormEvent, useState } from 'react'
import './LostItem.css'
import { toast } from 'react-toastify'

const LostItem = () => {
	const [itemName, setItemName] = useState('')
	const [itemDescription, setItemDescription] = useState('')
	const [itemPictureUrl, setItemPictureUrl] = useState('')

	const reportLostItemHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const res = await fetch('/api/lost-item/report', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				itemName,
				itemDescription,
				itemPictureUrl
			})
		})

		if (res.ok && res.status === 201) {
			toast.success('Lost item reported successfully.')

			setItemName('')
			setItemDescription('')
			setItemPictureUrl('')
		} else {
			toast.error('Failed to report lost item. Check your inputs & try again.')
		}
	}

	return (
		<section className='container'>
			<header>Lost Item Report</header>
			<form onSubmit={reportLostItemHandler} className='form'>
				<div className='input-box'>
					<label>Type of item</label>
					<input
						type='text'
						placeholder='Enter the name of item'
						required
						value={itemName}
						onChange={e => setItemName(e.target.value)}
					/>
				</div>
				<div className='input-box'>
					<label>Item Description</label>
					<input
						type='text'
						placeholder='Enter Description of the item'
						required
						value={itemDescription}
						onChange={e => setItemDescription(e.target.value)}
					/>
				</div>
				<div className='input-box'>
					<label>Picture of the Item if available</label>
					<input
						type='text'
						placeholder='Provide G-drive link of the item'
						value={itemPictureUrl}
						onChange={e => setItemPictureUrl(e.target.value)}
					/>
				</div>

				<button>Submit</button>
			</form>
		</section>
	)
}
export default LostItem
