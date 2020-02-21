import React, { Component } from 'react';

import {  
  Platform,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text, 
  View,
  Button,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  Alert,
} from 'react-native';

import api from '../services/api';

//Função para Login de Usuários
export default class LoginScreen extends Component{

  //Ignora o header
  static navigationOptions = {
    headerShown: false,
  };

  //Inicia os estados como null e vazio
    state = {
    loggedInUser: null,
    errorMessage: null,
    email: '',
    password: '',
  };

  //Sobrescreve oque está sendo digitado na Input box
  onChangeTextEmail = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };

  onChangeTextPassword = (event) => {
    event.persist();
    this.setState({ password:event.nativeEvent.text });
  };

   //Função de Login com os parametros necessários
  signIn = async (email, password) => {
    try {
      //Consome a api
      const response = await api.post('/auth/authenticate', {
        email,
        password,
      });

      const { user, token } = response.data;

      //Utiliza o AsyncStorage para guardar o token e o user 
      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:users', JSON.stringify(user)],
      ]);

      //seta os estado do usuário para logado
      this.setState({ loggedInUser: user });

      Keyboard.dismiss();

      Alert.alert( '' ,'Login efetuado com sucesso!', [{
        text: 'Ok',
        //Mudança de página ao apertar o Alert
        onPress: () => this.props.navigation.navigate('ForgotPassword'),
      }]);

    } catch (response) {
        this.setState({ errorMessage: response.data.error });
    }
  };

  //Estilização da página
  render() {
    return (
    <View style={styles.container}>
      <Image
        style = {styles.logo}
        source = {require('../icons/logo3.png')}
      />

      {!!this.state.errorMessage && <Text style = {styles.textError}>{ this.state.errorMessage }</Text>}

      <View style={styles.containerTextInput}>
        <TextInput
          style = {styles.input}
          placeholder = "E-mail"
          placeholderTextColor = "#36057D"
          onChange = {this.onChangeTextEmail}
        />

        <TextInput
          style = {styles.input}
          placeholder = "Senha"
          placeholderTextColor = "#36057D"
          secureTextEntry = {true}
          onChange = {this.onChangeTextPassword}
        />

      </View>

      <TouchableOpacity 
        onPress = { () => this.signIn(this.state.email.trim().toLowerCase(), this.state.password) }
        style = { styles.loginButton }
      >

        <Text style = {styles.textLoginButton}>
          ENTRAR
        </Text>

      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.forgotPasswordButton}
        onPress={() => this.props.navigation.navigate('ForgotPassword')}  
      >
        <Text style={styles.textForgotPassword}>
          ESQUECI MINHA SENHA
        </Text>

      </TouchableOpacity>

      <Text style = {styles.newUser}>
        NÃO POSSUI CONTA?
      </Text>

      <TouchableOpacity 
        style={styles.newUserButton}
        onPress={() => this.props.navigation.navigate('NewAccount')}
      >

        <Text style={styles.textNewUser}>
          CRIAR NOVA CONTA
        </Text>

      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },

  logo: {
    width: 500,
    height: 180,
  },

  textError: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#CC0000',
  }, 

  input: {
    borderColor: '#E3E3E3',
    borderBottomWidth: 1.5,
    width: 320,
    marginTop: 20,
    padding: 8,
    fontSize: 14,
  },

  loginButton: {
    width: 320,
    height: 40,
    backgroundColor: '#36057D',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLoginButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },

  textForgotPassword: {
    marginTop: 5,
    marginBottom: 55,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#979696',
  },

  newUser:{
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    paddingTop: 35,
  },

  newUserButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 40,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#36057D',
    backgroundColor: '#FFF',
  },

  
  textNewUser: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4B0082',
  },

});
