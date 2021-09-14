import React from "react";

const RepoItem = ({ repo }) => {
  return (
    <div className="card mx-auto text-center" style={{width: "100%"}}>
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
    </div>
  );
};

export default RepoItem;
