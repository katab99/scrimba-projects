export default function LanguageChip(props) {
    const styles = {
        backgroundColor: props.backgroundColor,
        color: props.color}


    return (
        <span
            className={props.className}
            style={styles}
            key={props.id}>
            {props.name}
        </span>
    )
}