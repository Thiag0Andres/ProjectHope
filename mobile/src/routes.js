import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './pages/loginScreen';
import ForgotPassword from './pages/forgotPassword';
import NewAccount from './pages/newAccount';
import ChangePassword from './pages/changePassword';

const Routes = createAppContainer(
    createStackNavigator({
        LoginScreen: {
            screen: LoginScreen,
        },
        ForgotPassword: {
            screen: ForgotPassword
        },
        NewAccount: {
            screen: NewAccount
        },
        ChangePassword: {
            screen: ChangePassword
        }
        }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#4B0082"
            },
            headerTintColor: "#FFFFFF"
        }, 
    }, {
        initialRouteName: 'LoginScreen',
    })
);

export default Routes;