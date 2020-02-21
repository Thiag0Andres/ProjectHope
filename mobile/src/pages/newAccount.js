import React, {Component} from 'react';

import { 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView, 
  Text, 
  View,
  Button,
  ScrollView,
  Alert,

} from 'react-native';

import api from '../services/api';

//Criação de uma nova conta
export default class NewAccount extends Component {
    //ignora o header
    static navigationOptions = {
        headerShown: false,
    };

    //Define os estados como null e vazio
    state = {
        loggedInUser: null,
        errorMessage: null,
        name: '',
        email: '',
        password: '',
    };

    //Sobrescreve no input box texto digitado
    onChangeTextName = (event) => {
        event.persist();
        this.setState({ name:event.nativeEvent.text });
    };

    onChangeTextEmail = (event) => {
        event.persist();
        this.setState({ email:event.nativeEvent.text });
    };

    onChangeTextPassword = (event) => {
        event.persist();
        this.setState({ password:event.nativeEvent.text });
    };

    //Função de registro através dos parâmetros
    Register = async (name, email, password) => {

        //Preenche os models do usuário
        try {
        //Consome a api
        const response = await api.post('/auth/register', {
            name,
            email,
            password,
        }); 

        Alert.alert( '' ,'Conta realizada com sucesso!', [{
            text: 'Ok',
            //Mudança de página ao apertar o Alert
            onPress: () => this.props.navigation.navigate('LoginScreen')
        }]);

        }catch (response) {
        console.log(response);
        this.setState({ errorMessage: response.data.error});
        }
    };

    //Estilização da página 
    render(){
        return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={"padding"} // you can change that by using Platform
        >
            <ScrollView>
            <View style = {styles.test}>
                <Image
                style = {styles.logo}
                source = {require('../icons/logo3.png')}
                />

            </View>

            <View >

                <TextInput
                placeholder = 'Nome'
                placeholderTextColor = '#736a86'
                style = {styles.placeholder}
                onChange = {this.onChangeTextName}
                > 

                </TextInput>

                <TextInput
                placeholder = 'E-mail'
                placeholderTextColor = '#736a86'
                style = {styles.placeholder}
                onChange = {this.onChangeTextEmail}
                > 

                </TextInput>

                <TextInput
                placeholder = 'Senha'
                placeholderTextColor = '#736a86'
                secureTextEntry = {true}
                style = {styles.placeholder}
                onChange = {this.onChangeTextPassword}
                >

                </TextInput>

            </View>

            {!!this.state.errorMessage && <Text style = {styles.errorText}>{this.state.errorMessage}</Text>}
            <View style={styles.containerButton}>

                <TouchableOpacity
                style = {styles.button}
                onPress = { () => this.Register(this.state.name ,this.state.email.trim(), this.state.password)}
                >

                <Text style = {styles.buttonText} >CADASTRAR</Text>

                </TouchableOpacity>

            </View>

            <View style = {styles.newUserDisplay}>

                <Text style = {styles.newUser}>
                POSSUI CADASTRADO?
                </Text>

                <TouchableOpacity
                style = {styles.newUserButton}
                onPress = { () => this.props.navigation.navigate('LoginScreen') }
                >

                <Text style = {styles.newUserButtonText}>
                    FAZER LOGIN
                </Text>

                </TouchableOpacity>

            </View>

            </ScrollView>

        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  test:{
    marginHorizontal:-70,
  },

  logo: {
    alignContent:'center',
    marginTop:100,
    width: 500,
    height: 150,
  },

  button: {
    marginTop:15,
    paddingTop:11,
    paddingLeft:120,
    marginLeft:29,
    backgroundColor: '#36057D',
    borderRadius: 8,
    height:50,
    width:300,
  },

  buttonText: {
    color:'#FFF',
    fontSize:16,
    fontWeight: 'bold',
    marginHorizontal:-20,
    paddingLeft:8,
  },

  errorText:{
    color: '#c4342d',
    fontSize: 16,
    fontWeight: 'bold',
  },

  placeholder:{
    borderColor: '#E3E3E3',
    borderBottomWidth: 1.5,
    width: 300,
    marginLeft:30,
    marginTop: 8,
    paddingTop: 8,
    padding: 8,
    fontSize: 14,
    marginBottom:10,
  },

  passwordText: {
    paddingTop: 50,
    color:'#999999',
    fontWeight:'bold',
  },

  newUserButton:{
    borderColor: '#36057D',
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: 25,
    width: 130,
    height: 30,
    marginBottom: 5
  },

  newUserDisplay:{
    flexDirection: 'row',
    paddingTop:90,
    marginLeft:38,
  },

  newUser:{
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#44059E',
    marginHorizontal:-9,
    paddingTop:4,
  },

  newUserButtonText:{
    paddingTop:2,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#44059E',
  }
});