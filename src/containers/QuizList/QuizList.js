import React, { Component } from "react";
import classes from "./QuizList.css";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {
    renderQuizes() {
        return this.props.quizes.map((quiz, index) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>Test #{index+1}</NavLink>
                </li>
            );
        });
    }

    componentDidMount() {
        this.props.fetchQuizes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Test list</h1>
                    {this.props.loading && this.props.quizes.length !== 0 ? (
                        <Loader></Loader>
                    ) : (
                        <ul>{this.renderQuizes()}</ul>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
