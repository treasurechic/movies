import React from 'react';
import FlipMove from 'react-flip-move';

const NominatedList = (props) => {
  const items = props.items;

  return (
    <div>
      <div className="card-shadow">
        <h5 className="result-title">Nominations</h5>
        <ul>
          <FlipMove duration={300} easing="ease-in-out">
            {items.map((each) => (
              <li key={each}>
                {each}
                <button
                  className="ml-3 btn btn-red"
                  onClick={() => {
                    props.removeNominated(each);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </FlipMove>
        </ul>
      </div>
    </div>
  );
};

export default NominatedList;
