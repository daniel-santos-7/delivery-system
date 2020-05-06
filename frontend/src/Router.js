import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Products from './pages/Products';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Products/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}