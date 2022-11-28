import React, { useState} from "react";
import { Link, useParams } from 'react-router-dom';

function Bank(){

    let param  = useParams();
    let id = param.id;
    if(!id){
        id = 1;
    };

    let quizQna = JSON.parse(localStorage.getItem('quizData'));

    if (quizQna === null ) { quizQna = [] };

    //filter on display depend on params
    let displayQues = quizQna.filter( val => {
        if (id > Math.ceil(quizQna.length / 5)) {
            id = 1;
        }
            let moreThan = id - 1;
            return val.id <= id * 5 && val.id > moreThan * 5;
    });
    
    const [ quizData, setQuizData ] = useState(displayQues);

    const active = (checkedId) => {

        let result = quizData.find( val => {
            if (checkedId === val.id) {
                return val;
            } else { 
                return null;
            }
        } );
        
        let isTrue = result.isActive;

        //for state
        setQuizData( prevState => {
            return prevState.map( val => {
                if (val.id === checkedId && val.isActive === isTrue) {
                    return { ...val,  isActive: !isTrue };
                } else {
                    return val;
                }
            });
        });

        //for storage
        let updatedQuiz = quizQna.map( val => {
            if (val.id === checkedId && val.isActive === isTrue) {
                return { ...val,  isActive: !isTrue };
            } else {
                return val;
            }
        });

        localStorage.setItem('quizData', JSON.stringify(updatedQuiz));
    };

    //pagination
    let buttons = [];

    let quizLength = Math.ceil(quizQna.length / 5);
    for (let i = 1; i < quizLength + 1; i++) {
        buttons.push(i);
    };

    const nextPage = (lessThan) => {
        let moreThan = lessThan - 1;
        let validPage = quizQna.filter( val => {
            if ( val.id <= lessThan * 5 && val.id > moreThan * 5 ) {
                return val;
            } else {
                return null;
            }
        });
        setQuizData(validPage);
    };

    return (
        <div className="bank">
            <h1>Question Bank</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Question</th>
                        <th>Option 1</th>
                        <th>Option 2</th>
                        <th>Option 3</th>
                        <th>Option 4</th>
                        <th>Right Answer</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { quizData.map( (val, ind) => {
                        return <tr key={ind} >
                            <td>{val.id}</td>
                            <td>{val.question}</td>
                            <td>{val.ans1}</td>
                            <td>{val.ans2}</td>
                            <td>{val.ans3}</td>
                            <td>{val.ans4}</td>
                            <td>{val.rightAns}</td>
                            <td>{val.isActive === true ? 'True' : 'False'}</td>
                            <td>
                                <button onClick={() => active(val.id)}>Toggler</button>
                            </td>
                        </tr>
                    }) }
                </tbody>
            </table>

            <div className="pagination">
                { buttons.map((val, ind) => {
                    return <Link key={ind} to={`/bank/${ind + 1}`}>
                        <button onClick={() => nextPage(val)} >{val}</button>
                        </Link>
                }) }
            </div>
        </div>
    );
};

export default Bank;


