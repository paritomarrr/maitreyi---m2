import React, {useState} from 'react'
import axios from 'axios'

function Predictor() {
    const [formData, setFormData] = useState({
        cycle_length: '',
        period_length: '',
        period_last_date: ''
    });
    const [prediction, setPrediction] = useState(null)

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios
        .post('/predict', formData)
        .then((response) => {
            setPrediction(response.data.prediction)
        })
        .catch((error) => {
            console.log(error)
        })
    }
  return (
    <div>
        <h1>Menstruation Prediction</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Cycle Length:</label>
                <input type="number" name="cycle_length" value={formData.cycle_length} onChange={handleChange} required />
            </div>
            <div>
                <label>Period Length:</label>
                <input type="number" name="period_length" value={formData.period_length} onChange={handleChange} required />
            </div>
            <div>
             <label>Period Last Date:</label>
             <input type="date" name="period_last_date" value={formData.period_last_date} onChange={handleChange} required />
           </div>
           <div>
             <button type="submit">Predict</button>
           </div>
        </form>
        {prediction && (
            <div>
                <h2>Prediction:</h2>
                <p>The next period is predicted to start on {prediction}.</p>
            </div>
        )}
    </div>
  )
}

export default Predictor