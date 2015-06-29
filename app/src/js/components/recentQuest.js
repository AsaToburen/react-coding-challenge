var React = require('react');




var RecentQuest = React.createClass({


  render: function(){
    var that = this;
    return (
      <div>
        <h2>Recent questions</h2>
        <ul className="RecentQuest-list"> 
               <li>
                <div className="textbox"></div>
                <a href="#">Me too!</a>
              </li>
        </ul>
      </div>
    )
  }
})

React.render(<RecentQuest/>, document.getElementById('RecentQuest'));