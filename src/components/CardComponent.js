import React from "react";

const CardComponent = (props) => {
  const { tag, tours, title } = props;
  return (
    <div className="card">
      <header>
        <h3>{title}</h3>
        {tag === "Listings" && (
          <a href="/#">
            <small>see all</small>
          </a>
        )}
      </header>
      <ul>
        {tours &&
          tours.map((a) => {
            return (
              <li key={a.id}>
                <a href="/#">{title}</a> <br />
                <small>{title}</small>
                {a.newarticle && <span>new</span>}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CardComponent;
