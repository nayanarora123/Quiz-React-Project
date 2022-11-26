import React from "react";
import { useNavigate } from 'react-router-dom';

function Result(){
    let nav = useNavigate();
    let userData = JSON.parse(localStorage.getItem('userAns'));

    if (userData === null) { userData = [] };

    let rightAns = userData.filter( val => {
            return val.value === val.rightAns;
    } );

    let wrongAns = userData.filter( val => {
            return val.value !== val.rightAns;
    })

    const playAgain = () => {
        localStorage.removeItem('userAns');
        nav('/');
    };

    return (
        <div className="main result">
            <div className="box">
            <h2>RESULT</h2>

            <h5 className="head">✅ What you know</h5>
            {   rightAns.map( (val, ind) => {
                    return <div className="item green" key={ind}>
                        <p className="result-ques">Ques: {val.question.slice(3)}</p>
                        <p className="result-ans">Ans: {val.rightAns}</p>
                        </div>
                })
            }

            <h5 className="head">❌ What you should review </h5>
            {   wrongAns.map( (val, ind) => {
                    return <div className="item red" key={ind}>
                        <p className="result-ques">Ques: {val.question.slice(3)}</p>
                        <p className="result-ans">Ans: {val.rightAns}</p>
                        </div>
                })
            }
            </div>
            <button className="btn" onClick={playAgain}>PLAY AGAIN</button>
        </div>
    );
};

export default Result;