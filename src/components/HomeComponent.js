import React, { Fragment, useContext } from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { AuthContext } from '../App';

export default function HomeComponent() {
    const {state, dispatch} = useContext(AuthContext)
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Hello ini Home</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>

            </Jumbotron>
        </div>
    )
}
