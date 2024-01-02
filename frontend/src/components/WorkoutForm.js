import { useState } from "react"

const WorkoutForm = () => {
    // we want to create a state for each of the properties of the new workout
        // creating a state for a property is essentially like creating a variable for it
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        // the default action of "submit" is refreshing the page. We don't want the page to refresh,
        // so we prevent that default action using the event.preventDefault() function.
        e.preventDefault()
        // lowkey keeping this would be better since the new workout doesn't show up unless we refresh the page...

        const workout = {title, load, reps}

        // TODO: study this fetch request below!!! There's lots going on here...
        const response = await fetch('/api/workouts', {
            method: "POST",
            // the line below turns 'workout' into a JSON string
            body: JSON.stringify(workout),
            // TODO: study the "headers" property below.
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // will either be the new workout or an error message
        // we NEED to add the "await" here, since the json() method is asynchronous (it takes a long time).
        const json = await response.json()

        // response.ok tells us whether there was an error in the fetch request or not.
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            console.log('New workout successfully added.', json)
            setTitle('')
            setLoad('')
            setReps('')
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit} >
            <h3>Add a New Workout</h3>

            <label>Exercise Title: </label>
            <input
            type="text" 
            onChange={(e) => {setTitle(e.target.value)}}
            value={title} />
            {/* value={title} ensures two-way data binding. If we change the title externally, the input matches that change */}
            
            <label>Load (kg): </label>
            <input
            type="number" 
            onChange={(e) => {setLoad(e.target.value)}}
            value={load} />
            
            <label>Repetitions: </label>
            <input
            type="number" 
            onChange={(e) => {setReps(e.target.value)}}
            value={reps} />

            {/* question: does pressing the button automatically fire the "onSubmit" function? 
            What if there are multiple buttons for different purposes? */}
            <button>Add Workout</button>

            {/* the && ensures that the error div only shows up when error is non-null */}
            {/* notice how we can wrap a JSX component with JavaScript logic? */}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm