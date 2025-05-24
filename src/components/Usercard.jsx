
const Usercard = (props) => {

    const details = props.details;
    const {firstName, lastName, emailId } = details;

    console.log(details)
    return (
        <div className="carousel-item flex flex-col gap-2">
            <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" className="rounded-box" />
            <h2 className="ml-2">{firstName} {lastName}</h2>
            <p className="ml-2">{emailId}</p>
        </div>
    );
}

export default Usercard