import React from "react";
import "./App.css";
import { Router, Route, Link } from "router/Router";
import { routes } from "routes";
import { NotFound } from "component/NotFound";

export interface IRoutesProps {
    id: string;
    path: string;
    to: string;
    params?: Record<string, string>;
}

const Home = () => <div className="page">Home Page</div>;
const About = () => <div className="page">About Page</div>;
const Section = () => <div className="page">Section Page</div>;
const Test = ({ id }: { id: string }) => {
    return (
        <div className="page">
            <h1>Test Page</h1>
            <p>ID: {id ? id : "No ID Provided"}</p>
        </div>
    );
};

function App() {
    return (
        <Router routes={routes}>
            <div className="menu">
                <Link to={routes.home.to}>Home</Link>
                <Link to={routes.about.to}>About</Link>
                <Link to={routes.section.to}>Section</Link>
                <Link to={routes.test.to}>Test</Link>
            </div>
            <Route path={routes.home.path}>
                <Home />
            </Route>
            <Route path={routes.about.path}>
                <About />
            </Route>
            <Route path={routes.section.path}>
                <Section />
            </Route>
            <Route path={routes.test.path}>
                <Section />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Router>
    );
}

export default App;
