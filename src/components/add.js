import React, { useState } from "react";

function Add(){

    let quizItem = [];
    if (localStorage.getItem('quizData')){
        quizItem = JSON.parse(localStorage.getItem('quizData'));
    }
    
    const [isError, setIsError] = useState('');

    const [isId, setIsId] = useState(quizItem.length);

    const [isDetails, setIsDetails] = useState({
        question: '',
        opt1: '',
        opt2: '',
        opt3: '',
        opt4: '',
        rightAns: '',
        isActive: false
    });

    const handleBoolean = (e) => {
        e.preventDefault();
        if (e.target.value === 'true') {
            setIsDetails({...isDetails, isActive: true});
        } else {
            setIsDetails({...isDetails, isActive: false});
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIsDetails({ ...isDetails, [name]: value });
    };

    const addItem = (e) => {
        e.preventDefault();
        let newItem = {
            id: isId + 1,
            question: `Q: ${isDetails.question}`,
            ans1: isDetails.opt1,
            ans2: isDetails.opt2,
            ans3: isDetails.opt3,
            ans4: isDetails.opt4,
            rightAns: isDetails.rightAns,
            isActive: isDetails.isActive
        };

        const quizQna = [...quizItem, newItem];
        if ( isDetails.question !== '' &&
            isDetails.opt1 !== '' &&
            isDetails.opt2 !== '' &&
            isDetails.opt3 !== '' &&
            isDetails.opt4 !== '' &&
            isDetails.rightAns !== ''  
        ) {
            setIsId(isId + 1);
            localStorage.setItem('quizData', JSON.stringify(quizQna));
            setIsError('Added!')
        } else {
            setIsError('Please Enter All Input Fields.');
        }

        setIsDetails( {
            ...isDetails,
            question: '',
            opt1: '',
            opt2: '',
            opt3: '',
            opt4: '',
            rightAns: '',
            isActive: false
        } );
    }

    return (
        <div className="main">
            <h1 className="title">ADD NEW QUESTIONS</h1>
            <form onSubmit={(e) => addItem(e)} className="form-control add-form">
                    <p>{isError}</p>

                    <div className="item">
                        <label className="add">Question:</label>
                        <input type="text" name="question" placeholder="Question" autoFocus
                        onChange={(e) => handleChange(e)} value={isDetails.question}
                        ></input>
                    </div>
                    <div className="item">
                        <label className="add">Option 1:</label>
                        <input type="text" name="opt1" placeholder="Option 1"
                        onChange={(e) => handleChange(e)} value={isDetails.opt1}
                        ></input>
                    </div>
                    <div className="item">
                        <label className="add">Option 2:</label>
                        <input type="text" name="opt2" placeholder="Option 2"
                        onChange={(e) => handleChange(e)} value={isDetails.opt2}
                        ></input>
                    </div>
                    <div className="item">
                        <label className="add">Option 3:</label>
                        <input type="text" name="opt3" placeholder="Option 3"
                        onChange={(e) => handleChange(e)} value={isDetails.opt3}
                        ></input>
                    </div>
                    <div className="item">
                        <label className="add">Option 4:</label>
                        <input type="text" name="opt4" placeholder="Option 4"
                        onChange={(e) => handleChange(e)} value={isDetails.opt4}
                        ></input>
                    </div>
                    <div className="item">
                        <label className="add">Right Option:</label>
                        <input type="text" name="rightAns" placeholder="Right Answer"
                        onChange={(e) => handleChange(e)} value={isDetails.rightAns}
                        ></input>
                    </div>
                    <div className="item">
                        <label className="add">Active Status:</label>
                            <select name="isActive" id="isActive" placeholder="Active Status"
                             onChange={(e) => handleBoolean(e)} value={isDetails.isActive} >
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                    </div>

                    <button type="submit">ADD</button>
            </form>
        </div>
    );
};

export default Add;

