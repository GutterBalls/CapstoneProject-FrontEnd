
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Accessories, Bags, Balls, Shoes, Single, Header ,Homepage, Profile, Cart, Confirm, Sidebar, Footer, Login, Logout, Register } from "./components/index";
import { useState, useEffect } from "react";
const DATABASE_URL = 'http://localhost:1337/api';


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);
    const [productData, setProductData] = useState([]);
    
    async function getProductData() {
        try {
            const response = await fetch(`${DATABASE_URL}/products`)
            const translatedData = await response.json();
            console.log(translatedData);
            setProductData(translatedData);
            console.log("Product data", productData)
            return translatedData
        } catch (error) {
            console.log(error)
        };
    };

    async function getUserData() {
        
        try {
            const response = await fetch(`${DATABASE_URL}/users/me`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const translatedData = await response.json();
            console.log("Translated Data", translatedData);
            setUserData(translatedData);

            } catch (error) {
                console.error("Error with getUserData function", error);
            };
        };
    

        useEffect(()=>{
            getProductData();
            if (localStorage.getItem("token")){
            getUserData();
            };
    }, [isLoggedIn])


    return (
        <BrowserRouter>
            <div className="br">
                <section className="br-showcase">
			        <header className="br-header"><Header 
                        productData={productData} 
                        setProductData={setProductData} 
                        getProductData={getProductData}
                        isLoggedIn={isLoggedIn} 
                    /></header>
			        {/* <aside className="br-sidebar"><Sidebar
                        productData={productData}
                        setProductData={setProductData}
                        getProductData={getProductData}
                    /></aside> */}
			        <div className="br-main">
                        <Routes>
                            <Route path="/" element={<Homepage 
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn}
                            />}/>
                            <Route path="/balls" element={<Balls 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/bags" element={<Bags 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/shoes" element={<Shoes 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/accessories" element={<Accessories   
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/single/:id" element={<Single 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData}
                                setProductData={setProductData}
                                getProductData={getProductData}
                            />}/>
                            <Route path="/profile" element={<Profile 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                getUserData={getUserData}
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                                
                            />}/>
                            <Route path="/cart" element={<Cart 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                getUserData={getUserData}
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                            />}/>
                            <Route path="/confirm" element={<Confirm 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData} 
                                setUserData={setUserData}
                                productData={productData} 
                                setProductData={setProductData} 
                                getProductData={getProductData}
                            />}/>
                            <Route path="/register" element={<Register />}/>
                            <Route path="/login" element={<Login />}/>
                            <Route path="/logout" element={<Logout
                                setIsLoggedIn={setIsLoggedIn}
                            />}/>
                        </Routes>
                    </div>
			        <footer className="br-footer"><Footer /></footer>
		        </section>

                
            </div>
        </BrowserRouter>
)};



const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<App/>);