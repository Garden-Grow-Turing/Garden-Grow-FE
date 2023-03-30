import './Form.css'
import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { LOAD_PLANTS } from '../../Graphql/Queries'


const Form = ({ setPlants }) => {
// let [error, showError] = useState(false)
let [zipcode, setZipcode] = useState('')
// zipcode = 81456
// error = "Sorry we seem to be having difficulties"

// const submitZip = event => {
//   event.preventDefault()
//   if(zipcode) {
//     showError(true)
//   } else {
//     showError(false)
//     clearInputs()
//   }
// }
const[loadPlants, { loading, error, data }] = useLazyQuery(LOAD_PLANTS )

const submitZip = event => {
  event.preventDefault()
  loadPlants({
    variables:{
      zipcode
    }
  })
  setPlants([...data.vegetablesByZipcode.vegetables])
}

const clearInputs = () => {
  setZipcode('')
}

  return(
    <form className='form-container'>
      <div className='input-and-button'>
        <input
        className='input'
        type='number'
        min='10000'
        max='99999'
        placeholder='zip code'
        name='zipCode'
        value={zipcode}
        onChange={event => setZipcode(event.target.value)}
        />
        <button className='form-button' onClick={event => submitZip}>GO</button>
      </div>
      <div className='error-container'>
      {error && (
        <div className='error-message'>
          please enter a valid zipcode
        </div>
      )}
      </div>
    </form>  
    )
}

export default Form