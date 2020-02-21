import React, {Component} from 'react';

import { 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Scrollview, 
  Text, 
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  } from 'react-native';

import api from '../services/api';

//Função de envio de token para troca de senha
export default class ForgotPassword extends Component {
  //Ignora o header
  static navigationOptions = {
    headerShown: false,
  };

  //Inicia os estados como null e vazio
  state = {
    loggedInUser: null,
    errorMessage: null,
    email: '',
  };

  //Sobrescreve no input box texto digitado
  onChangeTextEmail = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };

  //Função de envio de token para o Email
  Forgot = async (email) => {

    try {
      //Consome a api
      const response = await api.post('/auth/forgot_password', {
        email,
      }); 

      //Utiliza o AsyncStorage para guardar o email 
      const test = await AsyncStorage.setItem('@CodeApi:email', email);

      Alert.alert( '' ,'Código enviado com sucesso!', [{
        text: 'Ok',
        //mudança de página e envio do email digitado
        onPress: () => this.props.navigation.navigate('ChangePassword', {
            email: email,
        }),
      }]);

    }catch (response) {
      this.setState({ errorMessage: response.data.error});
    }
  };

  //Estilização da página
  render(){
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"padding"} 
      >

        <ScrollView>

          <TouchableOpacity
              style = {styles.buttonArrow}
              onPress = { () => this.props.navigation.navigate('LoginScreen')}
          >

              <Image
                  style = {styles.backArrow}
                  source = {require('../icons/arrow.png')}
              />

          </TouchableOpacity>

          <View style = {styles.containerLogo}>

            <Image
                style = {styles.logo}
                source = {require('../icons/logo3.png')}
            />

          </View>

          <View>

            <TextInput
              placeholder = 'Digite seu email para envio do código'
              placeholderTextColor = '#736a86'
              style = {styles.placeholder}
              onChange = {this.onChangeTextEmail}
            > 

            </TextInput>

          </View>

          {!!this.state.errorMessage && <Text style = {styles.errorText}>{this.state.errorMessage}</Text>}

          <View style={styles.containerButton}>

            <TouchableOpacity
              style = {styles.button}
              onPress = { () => this.Forgot(this.state.email.trim())}
            >

              <Text style = {styles.buttonText} >ENVIAR CÓDIGO</Text>

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

  logo: {
    marginTop:80,
    width: 500,
    height: 150,
  },

  containerLogo:{
    marginHorizontal:-70,
  },

  backArrow: {
    marginTop:10,
    marginHorizontal: -15,
    width: 40,
    height: 40,
  },

  buttonArrow:{
    backgroundColor: '#FFF',
    borderRadius:8,
    paddingTop:25,
    width: 40,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },

  button: {
    marginTop:10,
    paddingTop:11,
    paddingLeft:92,
    backgroundColor: '#36057D',
    borderRadius: 8,
    marginLeft:29,
    height:50,
    width:300,

  },

  buttonText: {
    color:'#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  errorText:{
    color: '#c4342d',
    paddingLeft:115,
    fontSize: 16,
    fontWeight: 'bold',
  },

  placeholder:{
    borderColor: '#E3E3E3',
    borderBottomWidth: 1.5,
    width: 300,
    marginTop: 10,
    marginLeft:25,
    paddingTop: 25,
    padding: 10,
    fontSize: 14,
    marginBottom:10,
  },

});