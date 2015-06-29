var React = require("react");

var questions = [{
    "email": "dave@example.com",
    "question": "I can't push to github."
}, {
    "email": "chris@example.com",
    "question": "I tried to create a branch and got an error message."
}, {
    "email": "chris@example.com",
    "question": "I tried to create a branch and got an error message."
}];


var RecentQuest = React.createClass({

render: function(){
console.log(this.props.questions);
    var that = this;
    return (
        <aside>
            <h2>Recent questions</h2>
            <ul className="RecentQuest-list">
                {questions.map(function (question, i) { 
                    return (
                        <li key={i}>
                            <div className="textbox">
                                {question.question}
                            </div>
                            <a href="#">Me too!</a>
                        </li>
                ) })}
            </ul>
        </aside>
    )
  }
})



var QuestForm = React.createClass({

            getQuestion: function(e) {
                e.preventDefault();
                var newQuest = this.refs.newQuest.getDOMNode().value;
            
                if (isNaN(newQuest)) {
                    this.refs.QuestForm.getDOMNode().reset();

                    questions.push({
                        "question": newQuest
                    });

                    this.setState({
                        questions: questions
                    })
                }
            },
  
render: function() {
    return (
        <div>
            <RecentQuest questions={questions}></RecentQuest>
            <div className="content-wrapper">
                <div className="main-heading">
                    <h1>Need help with git?</h1>
                    <h3>Thinkful teaches practical skills with one-on-one help, so you never get stuck again.</h3>
                </div>
                <form ref="QuestForm" onSubmit={this.getQuestion}>
                    <textarea ref="newQuest" className="QuestForm-textarea" type="text" placeholder="How can I help?" />
                    <input className="QuestForm-email" type="email" placeholder="Enter your email" />
                    <div className="QuestForm-status">
                        <i><img src="./dist/images/green-icon.png"/></i>
                        <p>Darrell is in and answering questions now!</p>
                    </div>
                    <button className="QuestForm-button" type="submit">Ask</button>
                </form>
            </div>
        </div>
    )
  }
})


React.render(<QuestForm questions={questions}></QuestForm>, document.getElementById('main-content'));















