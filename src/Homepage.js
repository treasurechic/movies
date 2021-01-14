import React, {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import {fetchMovie} from './redux/actions/movie';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import video from './assets/img/videobg.mp4';
import bg from './assets/img/bg.PNG';
import NominatedList from './Nominated';

const Homepage = ({fetchMovie, movies, Loading}) => {
  const [SearchVal, setSearchVal] = useState('');
  const [Val, setVal] = useState('');
  const newNominated = '';
  const [oldNominated, setoldNominated] = useState(
    JSON.parse(localStorage.getItem('nominatedMovies'))
  );
  console.log(oldNominated);
  const SearchedMovies = [];
  const changeVal = (e) => {
    setSearchVal(e.target.value);
  };
  const searchMovie = () => {
    if (SearchVal !== '') {
      setVal(SearchVal);
      console.log(SearchVal);
      async function awaitData() {
        let data = await fetchMovie(SearchVal);
        //   console.log(data);
        SearchedMovies.push(data);
        console.log(SearchedMovies);
      }
      awaitData();
    }
  };

  const nominate = (val) => {
    console.log(val);
    const tempNominated = JSON.parse(localStorage.getItem('nominatedMovies'));
    const finalNominated = [...tempNominated, val];
    if (finalNominated.length <= 5) {
      setoldNominated(finalNominated);
      console.log('object');
      localStorage.setItem('nominatedMovies', JSON.stringify(finalNominated));
      console.log([...finalNominated]);

      if (finalNominated.length === 5) {
        toast.dark('You have filled up your nomination list!');
      }
    } else {
      toast.error('Sorry, you have exceeded the nomination list');
    }
  };

  const removeNominated = (val) => {
    console.log(val);
    const RemainingMovies = oldNominated.filter((e) => e !== val);
    console.log(RemainingMovies);
    setoldNominated(RemainingMovies);
    console.log(oldNominated);
    localStorage.setItem('nominatedMovies', JSON.stringify(RemainingMovies));
  };
  console.log(Loading);

  return (
    <div className="home-wrapper">
      <ToastContainer />
      <video id="videoBg" poster={bg} autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className="container">
        <h2 className="title">The Shoppies</h2>
        <div className="card-shadow">
          <h5>Movie Title</h5>
          <div className="search-container">
            <span className="input-icon">
              <span
                className="iconify"
                data-icon="bx:bx-search"
                data-inline="false"
              ></span>
            </span>
            <input
              type="text"
              placeholder="Enter name of movie"
              onChange={(e) => {
                changeVal(e);
              }}
            />
            <button className="btn btn-search" onClick={searchMovie}>
              Search
            </button>
          </div>
        </div>
        <div className="row">
          {Loading && Val !== '' && (
            <div className="col-lg-6 col-md-6 col-sm-12 my-4">
              <div className="card-shadow">
                <h5 className="result-title">Result for "{SearchVal}"</h5>
                <ul>
                  <li>
                    <Skeleton />
                  </li>
                  <li>
                    <Skeleton />
                  </li>
                  <li>
                    <Skeleton />
                  </li>
                </ul>
              </div>
            </div>
          )}
          {movies && !Loading && (
            <div className="col-lg-6 col-md-6 col-sm-12 my-4">
              <div className="card-shadow">
                <h5 className="result-title">Result for "{Val}"</h5>
                <ul>
                  {movies.map((each) => (
                    <li key={each.imdbID}>
                      {each.Title} ({each.Year})
                      <button
                        className="ml-3 btn btn-nominate"
                        onClick={(e) => {
                          nominate(`${each.Title} (${each.Year})`);
                        }}
                      >
                        Nominate
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {movies && (
            <div className="col-lg-6 col-md-6 col-sm-12 my-4">
              <NominatedList
                items={oldNominated}
                removeNominated={removeNominated}
              ></NominatedList>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
Homepage.propTypes = {
  fetchMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movie.movies,
  Loading: state.movie.loading,
});
export default connect(mapStateToProps, {fetchMovie})(Homepage);
