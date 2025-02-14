import {StrictMode} from "react";
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import store from "./store/index";
import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";
import AppRoutes from "../src/routes/AppRoutes";

/* <Provider store={store}>: Provides the Redux store to all components
   <StrictMode>: Enables additional checks and warnings for the app
   <BrowserRouter>: Sets up routing for the application
   <Header /> and <Footer />: Renders the header and footer components
   <AppRoutes />: Contains the main routing logic for the app */

const App = () => (
    <Provider store={store}>
        <StrictMode>
            <BrowserRouter>
                <Header/>
                <AppRoutes/>
                <Footer/>
            </BrowserRouter>
        </StrictMode>
    </Provider>
);

export default App;
