import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Sign from './pages/sign-page/sign-page.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from "react-redux";
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

class App extends React.Component {

  /*constructor(){
    super();

    this.state = {
      currentUser: null
    };
  }*/

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {

          /*this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });*/

          setCurrentUser({
            id: snapshot.id,
              ...snapshot.data()
          });

        });
      } else {
        //this.setState({ currentUser: userAuth });
        setCurrentUser(userAuth);
      }
      
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* <Header currentUser = { this.state.currentUser } /> */}
        <Header />
        <Switch>
          <Route exact path = '/' component = { HomePage } />
          <Route path = '/shop' component = { ShopPage } />
          <Route exact path = '/checkout' component = { CheckoutPage } />
          <Route exact path = '/sign' /*component = { Sign }*/ render = { () => this.props.currentUser ? (<Redirect to = '/' />) : (<Sign />) } />
        </Switch>      
      </div>
    );
  }  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
