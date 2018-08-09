/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    Platform,
    AppRegistry
} from 'react-native';

import { BrowserRouter as Router, Route, Switch, Link, HashRouter } from "react-router-dom";

import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen.js';
import AddChildren from './screens/AddChildren.js';
import HomeScreen from './screens/HomeScreen.js';
import OTA from './screens/OTA.js';
import CheckOut from './screens/CheckOut.js';
import PaymentSuccessful from './screens/PaymentSuccessful.js';
import PayTM from './screens/PayTM.js';
import Successful from './screens/Successful.js';
import failure from './screens/failure.js';
import OTAQuestions from './screens/OTAQuestions.js';
import InitialQuestionOTA from './screens/InitialQuestionOTA.js';
import EnterDetailsOTA from './screens/EnterDetailsOTA.js';
import ProfileViewer from './screens/ProfileViewer.js';
import QuestionsDisplay from './screens/QuestionsDisplay.js';
import OTATest from './screens/OTATest.js';
import ResponseScreen from './screens/ResponseScreeen.js';
import ReviewResponse from './screens/ReviewResponse.js';
import NextCategory from './screens/NextCategory.js';
import ViewReport from './screens/ViewReport.js';


const NavigationNativeApplication = StackNavigator({
    Login: { screen: LoginScreen,
        navigationOptions: {
            header: false,
        } },
    AddChildren: { screen: AddChildren },
    HomeScreen: {screen: HomeScreen,
        navigationOptions: {
            header: false,
        }},
    OTA: {screen: OTA},
    CheckOut: {screen: CheckOut},
    Payment: {screen: PaymentSuccessful},
    PayTM: {screen: PayTM},
    Successful: {screen: Successful},
    failure: {screen: failure},
    OTAQuestions: {screen: OTAQuestions},
    Questions: {screen: InitialQuestionOTA},
    Details: {screen: EnterDetailsOTA},
    Profile: {screen: ProfileViewer},
    QuestionsDisplay: {screen: QuestionsDisplay},
    OTATest: {screen: OTATest},
    Response: {screen: ResponseScreen},
    Review: {screen: ReviewResponse},
    NextCategory: {screen: NextCategory},
    Report: {screen: ViewReport},
},
    /*{
    headerMode: 'screen',
}*/
);


const NavigationWebApplication = () => (
    <Switch>
        <div>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/add/children" component={AddChildren} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/growth_check/plan_info" component={OTA} />
            <Route path="/growth_check/payment" component={CheckOut} />
            <Route path="/payment_options" component={PaymentSuccessful} />
            <Route path="/PayTM" component={PayTM} />
            <Route path="/ota/successful" component={Successful} />
            <Route path="/ota/failure" component={failure} />
            <Route path="/growth_check/ota/welcome" component={OTAQuestions} />
            <Route path="/growth_check/ota/child/info" component={InitialQuestionOTA} />
            <Route path="/growth_check/ota/child/biometric/details" component={EnterDetailsOTA} />
            <Route path="/growth_check/ota/start" component={ProfileViewer} />
            <Route path="/growth_check/ota/category/info" component={QuestionsDisplay} />
            <Route path="/growth_check/ota/category/questions" component={OTATest} />
            <Route path="/growth_check/ota/category/completed" component={ResponseScreen} />
            <Route path="/growth_check/ota/child/review_responses" component={ReviewResponse} />
            <Route path="/growth_check/ota/next_category/questions" component={NextCategory} />
            <Route path="/growth_check/ota/child/report" component={ViewReport} />
        </div>
    </Switch>
);

/* /growth_check/ota/questions */

export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      }
    }

    render() {
    return(
        // this.checkChildInfo()
        Platform.OS === "web" ?
            <HashRouter>
                <NavigationWebApplication/>
            </HashRouter>
            :
            <NavigationNativeApplication/>
    );
  }
}

AppRegistry.registerComponent('NativePlusWebApp', () => NativePlusWebApp);

