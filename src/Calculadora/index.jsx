import React from 'react';
import './style.scss';
import Button from '../Components/Button';
import Display from '../Components/Display'
import { useState } from 'react';

export default (props) =>{

    const initialState = {
        value: "0",
        clear: false,
        operation: null,
        values: [0,0],
        current: 0      
    }

    const [display , setDisplay] = useState(initialState);

    function clearMemory(){
        setDisplay(initialState);
    }

    function setOperation(operation){

        // se o current for 0, eu preciso ir pro segundo valor do array
        if(display.current === 0){
            setDisplay(display => ({...display, current:1, operation: operation, clear: true}))
        }
        else{
        // criar uma variavel equals se o valor retornado da setOperation for um igual
        const equals = operation === '=';
        // pega o valor da operação atual
        const currentOperation = display.operation;
        // clonar novamente o values pela questão da imutabilidade
        const values = [...display.values]
        switch(currentOperation){
            case "/":
                values[0] = values[0] / values[1];
                console.log('divisao' + values[0]);
                break;
            case "*":
                values[0] = values[0] * values[1];
                console.log('multi' + values[0]);
                break;
            case "+":
                values[0] = values[0] + values[1];
                console.log('somar' + values[0]);
                break;
            case "-":
                values[0] = values[0] - values[1];
                console.log('sub' + values[0]);
                break;
            default: 
                console.log('erro')
        }
        values[1] = 0;
        setDisplay(display => (
            {...display, value: values[0], operation: equals ? null : operation,  current: equals ? 0 : 1, clear: !equals, values}
        ))

        console.log(display)


        }

    }

    function addDigit(n){
        if(n === '.' && display.value.includes('.')){
            return
        }
        const clearDisplay = display.value === '0' || display.clear;
        const currentValue = clearDisplay ? '' : display.value;
        const displayValue = currentValue + n;
        setDisplay(display =>({...display, value: displayValue, clear: false }))
        if(n !== '.'){
            // Pegar o indice do array baseando no current
            const position = display.current;
            // Pegar o valor digitado e que também está na tela do usuário
            const valorAtual = parseFloat(displayValue);
            console.log(valorAtual)
            // clonar o elemento array que vamos manipular a partir de um spread
            const valores = [...display.values];
            valores[position] = valorAtual;
            setDisplay(display => ({...display, values: valores}))
        }

    }

    return(
        <div className="content-calculator">
        <h1>Calculadora React</h1>
        <div className="calculator">
            <Display value={display.value}></Display>
            <Button label="AC" click={clearMemory} triple></Button>
            <Button label="/"  click={setOperation} operation></Button>
            <Button label="7"  click={addDigit}></Button>
            <Button label="8"  click={addDigit}></Button>
            <Button label="9"  click={addDigit}></Button>
            <Button label="*"  click={setOperation} operation></Button>
            <Button label="4"  click={addDigit}></Button>
            <Button label="5"  click={addDigit}></Button>
            <Button label="6"  click={addDigit}></Button>
            <Button label="-"  click={setOperation} operation></Button>
            <Button label="1"  click={addDigit}></Button>
            <Button label="2"  click={addDigit}></Button>
            <Button label="3"  click={addDigit}></Button>
            <Button label="+"  click={setOperation} operation></Button>
            <Button label="0"  click={addDigit} double></Button>
            <Button label="."  click={addDigit}></Button>
            <Button label="="  click={setOperation} operation></Button>
        </div>
    </div>
    )
}
