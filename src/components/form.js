import React, { useReducer } from "react";
import { useNavigate } from 'react-router-dom';

function Form(){
    let nav = useNavigate();

    let quizQna = JSON.parse(localStorage.getItem('quizData'));

    if (quizQna === null ) { quizQna = [] };

    //array set-up for looping only active questions
    let activeQuiz = quizQna.filter( val => {
        return val.isActive === true;
    });

    //initial state
    let initialState = 
    {
        quizQna: activeQuiz,
        userValue: '',
        error: '',
        id: 0
    };

    //user data
    let userAns = [];
    if (localStorage.getItem('userAns')) {
        userAns = JSON.parse(localStorage.getItem('userAns'));
    }
    

    const reducer = (state, action) => {
        
        if (action.event === 'initial') {
            let value = action.value;
            return {...state, userValue: value};
        }

        if (action.event === 'submit') {
            let value = action.value;

            //validate
            if (value === '') { 
                return {...state, error: 'Please Choose one Item'};
            } else {
                let userId = action.id++;
                return { ...state, id: userId, error: '', userValue: '' };
            }
        }

        return state;
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        return dispatch({event: 'initial', value: e.target.value});    
    };


    const submitAns = (e, checkedItem) => {
        e.preventDefault();

        //setting up storage
        let newItem = {
            question: checkedItem.question, 
            value: state.userValue,
            rightAns: checkedItem.rightAns 
        };
        const userData = [ ...userAns, newItem];

        //validate
        if (state.userValue !== '') {
            localStorage.setItem('userAns', JSON.stringify(userData));
        }

        //only navigate if
        if ( state.id === state.quizQna.length - 1 &&
             state.userValue !== '' ) {
                nav('/result');
            };
            
        return dispatch({event: 'submit', value: state.userValue, id: state.id});
    }

    return (
        <div className="main">
            <h1 className="title">QUIZ GAME</h1>

            { state.quizQna.map((val, ind) => {
                if (ind === state.id){

            return <form key={ind} className="form-control" onSubmit={(e) => submitAns(e, val)}>
                <h2 className="question">{val.question}</h2><hr></hr>

                <div className="items">
                    <div className="item">
                        <input type="radio" name="answers" id="opt1"
                        value={val.ans1} onChange={(e) => handleChange(e)} />
                        <label>{val.ans1}</label>
                    </div>
                    <div className="item">
                        <input type="radio" name="answers" id="opt2"
                        value={val.ans2} onChange={(e) => handleChange(e)} />
                        <label>{val.ans2}</label>
                    </div>
                    <div className="item">
                        <input type="radio" name="answers" id="opt3"
                        value={val.ans3} onChange={(e) => handleChange(e)}/>
                        <label>{val.ans3}</label>
                    </div>
                    <div className="item">
                        <input type="radio" name="answers" id="opt4"
                        value={val.ans4} onChange={(e) => handleChange(e)}/>
                        <label>{val.ans4}</label>
                    </div>

                    <p className="error">{state.error}</p>

                    <button type="submit">Sumbit</button>
                </div>
            </form>
            }  
            }) }

        </div>
    );
};

export default Form;

// let array = [{name: 'nayan'}, {name: 'mehak'}, {name:'aditi'}]

// // let x = array.filter( (value, index) => {
// //     return array[0];
// // } )

// // console.log(x);

// let a = [array[0]]
// console.log(a);

