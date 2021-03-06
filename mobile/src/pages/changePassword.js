import React, {Component} from 'react';

import { 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text, 
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
  ScrollView,

} from 'react-native';

import api from '../services/api';

//Realiza a troca da senha
export default class ChangePassword extends Component {
  //Ignora o header
  static navigationOptions = {
    headerShown: false,
  };

  //Inicia os estados como null e vazio
  state = {
    loggedInUser: null,
    errorMessage: null,
    email: '',
    token: '',
    password: '',
  };

  //Salva o email preenchido no campo da página anterior 
  componentWillMount() {

    this.setState ({
        email: this.props.navigation.getParam('email')
    });
  }

  //obrescreve no input box texto digitado
  onChangeTextEmail = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };

  onChangeTextToken = (event) => {
    event.persist();
    this.setState({ token:event.nativeEvent.text });
  };

  onChangeTextPassword = (event) => {
    event.persist();
    this.setState({ password:event.nativeEvent.text });
  };

  //Função para mudança de senha com o email fornecido, o token recebido e a nova senha
  Change = async (email, token, password) => {
    try {
        //Consome a api
        const response = await api.post('/auth/reset_password', {
        email,
        token,
        password,
      }); 

      Alert.alert( '' ,'Senha foi redefinida com sucesso!', [{
        text: 'Ok',
        //Mudança de página ao apertar o Alert
        onPress: () => this.props.navigation.navigate('LoginScreen'),
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
              placeholder = 'Digite o código recebido'
              placeholderTextColor = '#736a86'
              style = {styles.placeholder}
              onChange = {this.onChangeTextToken}
            > 

            </TextInput>

            <TextInput
              placeholder = 'Digite sua nova senha'
              secureTextEntry = {true}
              placeholderTextColor = '#736a86'
              style = {styles.placeholder}
              onChange = {this.onChangeTextPassword}
            > 

            </TextInput>

          </View>

          {!!this.state.errorMessage && <Text style = {styles.errorText}>{this.state.errorMessage}</Text>}

          <View style={styles.containerButton}>

            <TouchableOpacity
              style = {styles.button}
              onPress={() => this.Change(this.state.email, this.state.token, this.state.password)}
            >

              <Text style = {styles.buttonText} >REDEFINIR SENHA</Text>

            </TouchableOpacity>

          </View>

          <View style = {styles.newUserDisplay}>

            <Text style = {styles.newUser}>
              NÃO POSSUI CONTA?
            </Text>

            <TouchableOpacity
              style = {styles.newUserButton}
              onPress = { () => this.props.navigation.navigate('NewAccount') }
            >

              <Text style = {styles.newUserButtonText}>
                CRIAR CONTA
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

  logo: {
    marginTop:180,
    width: 500,
    height: 150,
  },

  backArrow: {
    marginTop:10,
    width: 40,
    height: 40,
  },

  containerLogo: {
    marginHorizontal:-50,
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
    marginTop:15,
    paddingTop:11,
    paddingLeft:95,
    backgroundColor: '#36057D',
    borderRadius: 8,
    marginLeft:29,
    height:50,
    width:330,
  },

  buttonText: {
    color:'#FFF',
    fontSize:16,
    fontWeight: 'bold',
  },

  errorText:{
    color: '#c4342d',
    fontSize: 16,
    paddingLeft:140,
    fontWeight: 'bold',
  },

  placeholder:{
    borderColor: '#E3E3E3',
    borderBottomWidth: 1.5,
    width: 340,
    marginTop: 10,
    marginLeft:25,
    paddingTop: 10,
    padding: 10,
    fontSize: 14,
    marginBottom:10,
  },

  newUserButton:{
    borderColor: '#36057D',
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: 25,
    width: 150,
    height: 30,
    marginBottom: 5
  },

  newUserDisplay:{
    flexDirection: 'row',
    paddingTop:100,
    marginLeft:38,
  },

  newUser:{
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#44059E',
    paddingTop:4,
  },

  newUserButtonText:{
    paddingTop:2,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#36057D',
  },

});