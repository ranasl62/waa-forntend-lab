const ProductDetails = () => {

    fetch("google.com").then(function (e) {
        console.log(e);
    }).catch(function (e) {
        console.log(e);
    });

    return (<h1>Joy Bangla</h1>);
}

export default ProductDetails;