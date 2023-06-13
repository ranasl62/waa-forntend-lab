
const Label = ({ text, customClass = "text-normal" }) => {
    return (
        <div className={customClass + " label-component"}>
            {text}
        </div>
    )
};
// Label.defaultValues = {customClass : "text-normal"  };
export default Label
