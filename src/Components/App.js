import React, { Component } from 'react';
import Conteiner from './Conteiner/Conteiner';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onHandleClick = key => {
    this.setState(prev => ({
      [key]: prev[key] + 1,
    }));
  };

  countTotalFeedback = ({ good, neutral, bad }) => good + neutral + bad;

  countPositiveFeedbackPercentage = ({ good, neutral, bad }) =>
    Math.floor((good * 100) / (good + neutral + bad));

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <>
        <Conteiner>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={this.state}
              onLeaveFeedback={this.onHandleClick}
            />
          </Section>

          <Section title="Statistics">
            {good || neutral || bad > 0 ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={this.countTotalFeedback(this.state)}
                positivePercentage={this.countPositiveFeedbackPercentage(
                  this.state,
                )}
              />
            ) : (
              <Notification message="No feedback given" />
            )}
          </Section>
        </Conteiner>
      </>
    );
  }
}

export default App;
