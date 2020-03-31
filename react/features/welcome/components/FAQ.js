import React, { Component } from 'react';
import { Collapse } from 'react-collapse';


const FAQQuestions = [
    {
        expanded: false,
        q: 'What is The Digital Diner?',
        a: 'The Digital Diner is a way to connect with someone special, friends, or family across the web. Schedule a date and time for your reservation that works for the people in your party and we’ll send out an invitation via email with a video conferencing link.'
    }, {
        expanded: false,
        q: 'How does The Digital Diner work?',
        a: `On our site, you will find a place to create a reservation. You will select a date and time that works for you and your guest(s).
    You’ll enter in your name and email along with the information for up to 5 more guests.
    We will send an invitation via email to everyone on the reservation. The invitation has a video conferencing link that everyone will join at the specified date and time.`
    }, {
        expanded: false,
        q: 'How many people can be added to a reservation at The Digital Diner?',
        a: 'You can have up to six people total at The Digital Diner (including yourself).'
    }, {
        expanded: false,
        q: 'What hardware do I need to join The Digital Diner?',
        a: 'You need a computer or laptop with Google Chrome installed to join.'
    }
];

export default class FAQ extends Component {

  static propTypes = {

  };
  constructor(props) {
      super(props);
      this.state = {
          questions: FAQQuestions
      };
  }

  expand(i) {
      const { questions } = this.state;
      const newQuestions = questions.slice();
      newQuestions[i].expanded = !newQuestions[i].expanded;
      this.setState({
          questions: newQuestions
      });
  }

  render() {
      return (
          <div className = 'FAQ-wrap'>
              <div className = 'FAQ-title'>Frequently Asked Questions</div>

              {this.state.questions.map((obj, i) => (
                  <div
                      className = 'FAQ-section'
                      key = { obj.q }>
                      <div
                          className = 'FAQ-question'
                          onClick = { () => this.expand(i) }>{obj.q}</div>
                      <Collapse isOpened = { obj.expanded }>
                          <div className = 'FAQ-answer'>
                              {obj.a}
                          </div>
                      </Collapse>
                  </div>
              ))}

          </div>
      );
  }

}
