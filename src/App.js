import React from 'react';
import logo from './Assets/sacred-geometry.png'
import { Button, InputText } from './Components'
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      resultText: '',
      hasResult: false,
      actionBlur: true,
      firstInput: '',
      secondInput: '',
      singleResult: false,
      currentMethod: '',
    }
    this.textInput = React.createRef();
    this.focus = this.focus.bind(this);
  }

  componentDidMount = () => {
    this.focus()  
  }

  focus() {
    this.textInput.current.focus();
  }

  enableResultAnimation = () => {
    this.setState({ actionBlur: true})
  }

  handleInput = (type, e) => {
    const inputValue = parseInt(e)
    this.setState({ [type]: inputValue })
  }

  handleClearResult = () => {
    this.setState({
      actionBlur: true,
      resultText: '',
      currentMethod: '',
    }, () => {
      this.focus()
    })
  }

  handleActionClick = (type) => {
    const { 
      firstInput,
      secondInput,
    } = this.state

    let result = ''
    let currentMethod = ''
    let singleResult = false
    switch (type){
      case 'add':
        singleResult = true
        currentMethod = `+`
        result = this.additionMethod(firstInput, secondInput)
        break;
      case 'multiply':
        singleResult = true
        currentMethod = `x`
        result = this.multiplyMethod(firstInput, secondInput)
        break;
      case 'prime':
        currentMethod = `'`
        result = this.primeMethod(firstInput)
        break;
      default:
        currentMethod = `@`
        result = this.fibonacciMethod(firstInput)
        break;
    }
    this.setState({ 
      resultText: result,
      actionBlur: false,
      singleResult,
      currentMethod,
    })
  }

  additionMethod = (a, b) => {
    return (parseInt(a) + parseInt(b))
  }

  multiplyMethod = (a, b) => {
    return (parseInt(a) * parseInt(b))
  }

  primeMethod = (firstInput) => {
    let primeText = '2'
    const length = parseInt(firstInput)
    for ( let i = 3; i < length; i+=2 ) {
      if ( isPrime(i) ) {
        primeText += `, ${i}`
      }
    }
    return primeText
  }

  fibonacciMethod = (firstInput) => {
    let fibonacciText = '0'
    const length = parseInt(firstInput)
    let fibonacci = generateFibonacci(length)
    for (const [i, fib] of fibonacci.entries()) {
      if ( fib !== 0 && i < length ){
        fibonacciText += `, ${fib}`
      }
    }
    return fibonacciText
  }

  renderHeader = () => {
    const { 
      resultText,
      actionBlur,
      singleResult,
    } = this.state
    return (
      <header className="App-header">
        <div className={`logoContainer ${actionBlur ? 'inputFocus' : '' } ${singleResult ? 'singleResult' : '' }`}>
          <img src={logo} className="App-logo" alt="logo" />
          { resultText }
        </div>
        <button onClick={this.handleClearResult}>clear</button>
      </header>
    )
  }

  renderInput = () => {
    const { 
      firstInput,
      secondInput,
      currentMethod,
    } = this.state
    return (
      <div className={`gridContainer`}>
        <div className={`gridItem`}>
          <InputText
            inputRef={this.textInput}  
            type={`number`}
            value={firstInput} 
            onChange={(e) => this.handleInput('firstInput', e)}
          />
        </div>
        <div className={`gridItem operatorItem`}>
          { currentMethod }
        </div>
        <div className={`gridItem`}>
          <InputText 
            type={`number`}
            value={secondInput} 
            onChange={(e) => this.handleInput('secondInput', e)}
          />
        </div>
      </div>
    )
  }

  renderButton = () => {
    return (
      <div className={`gridContainer`}>
        <div className={`gridItem`}>
          <Button 
            className={`actionButton`}
            text={`+`}
            onClick={() => this.handleActionClick('add')}
            onBlur={this.enableResultAnimation}
          />
        </div>
        <div className={`gridItem`}>
          <Button 
            className={`actionButton`}
            text={`x`}
            onClick={() => this.handleActionClick('multiply')}
            onBlur={this.enableResultAnimation}
          />
        </div>
        <div className={`gridItem`}>
          <Button 
            className={`actionButton`}
            text={`'`}
            onClick={() => this.handleActionClick('prime')}
            onBlur={this.enableResultAnimation}
          />
        </div>
        <div className={`gridItem`}>
          <Button 
            className={`actionButton`}
            text={`@`}
            onClick={() => this.handleActionClick('fibonacci')}
            onBlur={this.enableResultAnimation}
          />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="App">
        {this.renderHeader()}
        <main>
          {this.renderInput()}
          {this.renderButton()}
        </main>
      </div>
    )
  }
}

const isPrime = num => {
  for(let i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}

const generateFibonacci = num => {
  let arr = [0, 1];
  for (let i = 2; i < num + 1; i++){
    arr.push(arr[i - 2] + arr[i -1])
  }
  return arr
}

export default App;
