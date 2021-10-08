export default function Answer(props) {
    function handleChange(event){
        let val = event.target.value
        props.answer(val);
    }
    return (
            <input type="text" className="form-control" placeholder="Your Answer.... " required onChange={handleChange} value={props.val}></input>
        );
}