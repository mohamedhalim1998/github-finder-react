import React from "react";
import RepoItem from "./RepoItem";
import PropTypes from 'prop-types';
export const Repos = ({repos}) => {
 return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
//  return <div></div>
};

Repos.propTypes = {
   repos: PropTypes.array.isRequired
 };
 