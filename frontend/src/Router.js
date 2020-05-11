import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';
import Orders from './pages/Orders';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Products/>
                </Route>
                <Route path="/produto/:id?" exact>
                    <Product/>
                </Route>
                <Route path="/pedidos" exact>
                    <Orders/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}