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

const UNVOTE_MUTATION = gql`
  mutation UnVoteMutation($linkId: ID!) {
    unVote(linkId: $linkId) {
      id
      voteBy {
        id
        user_name
      }
    }
  }
`;

function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split(".")[0]));
  token.payload = JSON.parse(window.atob(t.split(".")[1]));
  return token;
}
class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    let userID = null;
    if (authToken) {
      userID = jwtDecode(authToken).payload.id;
    }

    const liked = this.props.link.voteBy.find(user => {
      return (user.id = userID);
    });
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken &&
            (!liked ? (
              <Mutation
                mutation={VOTE_MUTATION}
                variables={{ linkId: this.props.link.id }}
              >
                {voteMutation => (
                  <button className="ml1 blue f11" onClick={voteMutation}>
                    Like
                  </button>
                )}
              </Mutation>
            ) : (
              <Mutation
                mutation={UNVOTE_MUTATION}
                variables={{ linkId: this.props.link.id }}
              >
                {voteMutation => (
                  <button className="ml1 blue f11" onClick={voteMutation}>
                    Dislike
                  </button>
                )}
              </Mutation>
            ))}
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
