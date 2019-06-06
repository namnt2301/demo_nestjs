import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      voteBy {
        id
        user_name
      }
    }
  }
`;
class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
            >
              {voteMutation => (
                <div className="ml1 gray f11" onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.voteBy.length} votes | by{" "}
            {this.props.link.postBy ? this.props.link.postBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(this.props.link.createAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
