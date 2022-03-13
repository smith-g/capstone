import { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import { addToken, deleteUser } from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar from "../Home/Navbar";
import BreweriesComponent from "../BreweriesComponent";
import Brewery from "../Brewery";
import Beer from "../Beer";
import BreweryPage from "../add/update/BreweryPage";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  },
  deleteUser: () => {
    dispatch(deleteUser());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  render() {
    return (
      <div>
        {this.props.token.token !== undefined ? (
          <div>
            <Link to="/breweries">Breweries | </Link>
            <Link to="/home">Home | </Link>
            {/* <Link to="/BreweryPage">Add Brewery |</Link> */}
            <Link to="/login" onClick={this.handleLogout}>
              Logout
            </Link>
            <Redirect to="/breweries" />
          </div>
        ) : (
          <>
            <Link to="/login"> Login |</Link>
            <Link to="/register"> Register</Link>
            {/* <Link to="/BreweryPage">Add Brewery |</Link> */}
            <Redirect to="/login" />
          </>
        )}

        <Switch>
          <Route exact path="/breweries/:id" component={Brewery} />
          <Route exact path="/beer/:id" component={Beer} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/register" component={() => <Register />} />
          <Route path="/breweries" component={() => <BreweriesComponent BreweriesComponent user={this.props.user} />} />
          {/* <Route path="/BreweryPage" component={() => <BreweryPage />} /> */}
          <Route path="/home" component={this.props.token.token !== undefined ? () => <Home /> : null} />
          <Redirect to="/breweries" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
