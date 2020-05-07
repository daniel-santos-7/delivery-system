import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Products/>
                </Route>
                <Route path="/produto" exact>
                    <Product/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}