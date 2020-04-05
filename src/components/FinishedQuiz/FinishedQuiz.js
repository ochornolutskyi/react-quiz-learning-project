import React from "react";
import classes from "./FinishedQuiz.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((sum, key) => {
        if (props.results[key] === "success") {
            sum++;
        }
        return sum;
    }, 0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map(quizItem => {
                    const cls = [
                        "fa",
                        props.results[quizItem.id] === "error"
                            ? "fa-times"
                            : "fa-check",
                        classes[props.results[quizItem.id]]
                    ];
                    return (
                        <li key={quizItem.id}>
                            <strong>{quizItem.id}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(" ")}></i>
                        </li>
                    );
                })}
            </ul>
            <p>
                {successCount} right answers of {props.quiz.length}
            </p>
            <div>
                <Button onClick={props.onRetry} type="primary">
                    Retry
                </Button>
                <Link to="/">
                    <Button type="success">
                        Go to the test list
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default FinishedQuiz;
