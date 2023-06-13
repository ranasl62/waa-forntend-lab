import Label from "./Label";

const Button = (
    { label,
        oncClick = () => { },
        customButtonClass = "default-button",
        customLabelClass = "default-label",
        customButtonWrapperClass = "default-button-wrapper" }) => {
    return (
        <div className={customButtonWrapperClass}>
            <button className={customButtonClass} onClick={oncClick}>
                <Label text={label} customClass={customLabelClass} />
            </button>
        </div>
    )
};

export default Button
