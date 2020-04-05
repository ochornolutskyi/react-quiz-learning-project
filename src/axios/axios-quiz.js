import axios from "axios";

export default axios.create({
    baseURL: "https://react-quiz-learning-project.firebaseio.com/"
});
