export default function Question(props) {
    return (
        <div>
            <p className="small">Category : {props.category}</p>
            <h2>{props.question}</h2>
        </div>);
}