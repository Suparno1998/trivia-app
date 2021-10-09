export default function Question(props : {question : string, category : string}) : JSX.Element{
    return  (<div><p className="small">Category : {props.category}</p><h2>{props.question}</h2></div>);
}