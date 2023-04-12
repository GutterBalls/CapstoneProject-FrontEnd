import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const DATABASE_URL = 'http://localhost:1337/api';

const Single = (props) => {
    const [singleProduct, setSingleProduct] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [productRating, setProductRating] = useState(0);
    const [productReview, setProductReview] = useState("");
    const [refresh, setRefresh] = useState(0);
    const { id } = useParams();
    const nav = useNavigate();
    
    useEffect(() => {
        getProductById();
        getReviews();
    }, [useParams(), refresh]);
    
    async function getProductById () {
        try {
            const response = await fetch(`${DATABASE_URL}/products/${id}`)
            const translatedData = await response.json();
            setSingleProduct(translatedData)
            return singleProduct
        } catch (error) {
            throw error;
        };
    };

    async function addItemToCart (event) {
        // console.log("SingleItem LINE 27 orderID", props.orderData[0].id);
        // console.log("SingleItem LINE 28 evt", event.target.value[0])
        props.setCounter(props.counter + 1)
        try {
            const specificItem = props.productData.filter((item) => item.id === parseInt(event.target.value));
            const falseOrder = props.orderData.filter((order) => order.order_status === false);
            const response = await fetch(`${DATABASE_URL}/cartItems`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    user_id: props.userData.id,
                    order_id: falseOrder[0].id, 
                    product_id: parseInt(event.target.value),
                    qty: 1,
                    price: specificItem[0].price
                })
            })
            const translatedData = await response.json()


        } catch (error) {
            alert("Duplicate Product: Visit cart to update quantity.")
        };
    };

    async function getReviews () {

        try {
            const response = await fetch(`${DATABASE_URL}/reviews`)
            
            const translatedData = await response.json();
            if (translatedData) {
                setAllReviews(translatedData);
            } else {
                console.log("No reviews yet.")
            }

            

        } catch (error) {
            throw error;
        };
    };

    async function postReview (event) {
        
        event.preventDefault();
        try {
            const response = await fetch(`${DATABASE_URL}/reviews`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    username: props.userData.username,
                    product_id: id,
                    product_brand: singleProduct.brand,
                    product_name: singleProduct.name,
                    rating: productRating,
                    review: productReview
                })
            });

            const translatedData = await response.json()
            setProductRating("")
            setProductReview("")
            

            setRefresh(refresh + 1);

        } catch (error) {
            throw error;
        }
    }


    return (
        <div>
            {
                singleProduct  ?
                <div id="singlePageFlex">
                    <img src={singleProduct.image} id="singlePageImage"/>
                    <h2> {singleProduct.brand} </h2>
                    <h4> {singleProduct.name} </h4>
                    <h5> ${singleProduct.price}</h5>
                    <h5> {singleProduct.description}</h5>
                    { props.isLoggedIn ? <button className='atc-btn' value={singleProduct.id} onClick={addItemToCart}> Add to Cart </button> 
                    : <button className='atc-btn'><Link to="/login">Login to purchase</Link></button>
                    }
                    <br />
                    <button onClick={()=> nav(-1)} className='atc-btn'>Go Back</button>
                    <br />
                <div className="reviews-container">
                    {
                        allReviews.length > 0 ?  allReviews.filter((single) => {
                             return single.product_id === singleProduct.id
                             }).map((singleReview) => {
                            return(
                                <span key={singleReview.id} className='reviews'>
                                    <h3> Review by: {singleReview.username} </h3>
                                    <h4> Rating: {singleReview.rating}</h4>
                                    <h4> Review: {singleReview.review}</h4>
                                </span> 
                     )}) : ''
                    }
                </div>
                    {
                props.isLoggedIn ?
                <div className="review-sub">
                    <form onSubmit={postReview}>Your Rating.
                        <br />
                        <select 
                        value={productRating}
                        onChange={(event) => setProductRating(event.target.value)}>
                            <option value="10">10</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="0">0</option>
                        </select>
                        <hr /> Your review of this product
                        <br />
                        <textarea
                        type="text"
                        placeholder="Product Review"
                        rows="3"
                        cols="30"
                        value={productReview}
                        onChange={(event) => setProductReview(event.target.value)}
                        style={{width: '400px' }} />
                        <hr />
                        <button type="submit" className="atc-btn"> Submit Review </button>
                    </form>
                </div> : <Link to="/login"><h3>Login to make a review.</h3></Link>
            }

                </div> : <p> ...We're bowling. BRB! </p>   
            }
        </div>
    )
}

export default Single;