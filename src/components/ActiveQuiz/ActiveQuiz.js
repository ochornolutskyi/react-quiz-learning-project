import React from "react";
import classes from "./ActiveQuiz.css";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong> {props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
            <small>
                {props.answerNumber} of {props.quizLength}
            </small>
        </p>

        <AnswersList
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        ></AnswersList>
    </div>
);

export default ActiveQuiz;
