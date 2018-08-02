/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
} from 'react-native-web';

import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen.js';
import AddChildren from './screens/AddChildren.js';
import HomeScreen from './screens/HomeScreen.js';
import OTA from './screens/OTA.js';
import CheckOut from './screens/CheckOut.js';
import PaymentSuccessful from './screens/PaymentSuccessful.js';
import PayTM from './screens/PayTM.js';
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


const NavigationWebApplication = StackNavigator({
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


export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      }
    }

    componentDidMount()
    {
        /*try {
            const value = AsyncStorage.getItem('myKey');
            if (value._v !== null) {
                // We have data!!
                console.log("value in cache data:",value._v);
                this.state={cacheData:value._v}
                this.checkChildInfo();
            }
            else {
                console.log("Enter the login Details:")
            }
        } catch (error) {
            // Error retrieving data
        }*/
    }

    /*checkChildInfo() {
        /!*fetch("http://qa.parentlane.com:8080/api/users/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: qs.stringify({
                firstName: 'npm', // remove npm and override it with this.state.fName after the name needed.
                mobile: this.state.cacheData,
                user_type: -1,
                vc: 29
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                /!*const { navigate } = this.props.navigation;
                if(this.state.data.user.children.length === 0) {
                    navigate('AddChildren',{data: this.state.userData});
                }
                else {
                    navigate('HomeScreen',{data: this.state.userData});
                }*!/
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });*!/
        fetch("http://qa.parentlane.com:8080/api/users/verify", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: qs.stringify({
                type: 0,
                mobile: this.state.cacheData,
                code: 12345, // if OTP is different what to do ?
                user_type: 0,
                vc: 29
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.checkCache();
                this.setState({
                    userData: responseJson,
                });
                console.log("userData:", this.state.userData)
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }*/

    /*checkCache() {
        console.log("The value of user is:", this.state.userData.content.user.no_of_children)
        if(this.state.userData.content.user.no_of_children) {
            return ( StackNavigator({
                Login: { screen: LoginScreen,
                    navigationOptions: {
                        header: false,
                    } },
                AddChildren: { screen: AddChildren },
                HomeScreen: {screen: HomeScreen},
            }, {
                headerMode: 'screen',
            }) ) ;
        }
        else {
            return (StackNavigator({
                /!*Login: { screen: LoginScreen,
                    navigationOptions: {
                        header: false,
                    } },*!/
                AddChildren: { screen: AddChildren,
                    navigationOptions: {
                        header: false,
                    }},
                HomeScreen: {screen: HomeScreen},
            }, {
                headerMode: 'screen',
            }) );
        }
}
*/
    render() {
    return(
        // this.checkChildInfo()
        <NavigationWebApplication/>
    );
  }
}

AppRegistry.registerComponent('NativePlusWebApp', () => NativePlusWebApp);

