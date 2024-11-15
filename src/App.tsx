import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface FormProps {
  shouldDisplayBack: boolean;
  handleBack: (() => void) | null;
  title: string;
  buttonText: string;
  inputValue: string;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
}

function Form(formInput: FormProps) {
  return (
    <div>
      {formInput.shouldDisplayBack && (
        <button onClick={formInput.handleBack!}>Back</button>
      )}
      <p>{formInput.title}</p>
      <input
        value={formInput.inputValue}
        onChange={formInput.inputHandler}
      ></input>
      <button onClick={formInput.handleNextStep}>{formInput.buttonText}</button>
    </div>
  );
}

enum FormState {
  NAME = 'Name',
  EMAIL = 'Email',
  DOB = 'Date of Birth',
  PASSWORDS = 'Passwords',
}

interface handleSubmitProps {
  name: string;
  email: string;
  dob: string;
  passwords: string;
}

function App() {
  const [currentFormState, setCurrentFormState] = useState<FormState>(
    FormState.NAME
  );
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [passwords, setPaswords] = useState<string>('');

  const handleSubmit = (handleSubmitInput: handleSubmitProps) => {
    console.log(`Invoking handleSubmitInput with input: ${handleSubmitInput}`);
    setCurrentFormState(FormState.NAME);
    setName('');
    setEmail('');
    setDob('');
    setPaswords('');
  };

  const renderForm = () => {
    switch (currentFormState) {
      case FormState.NAME:
        return (
          <Form
            title={FormState.NAME.toString()}
            buttonText="Next"
            shouldDisplayBack={false}
            handleBack={null}
            inputValue={name}
            inputHandler={(e) => {
              setName(e.target.value);
            }}
            handleNextStep={() => {
              setCurrentFormState(FormState.EMAIL);
            }}
          ></Form>
        );
      case FormState.EMAIL:
        return (
          <Form
            title={FormState.EMAIL.toString()}
            buttonText="Next"
            shouldDisplayBack={true}
            handleBack={() => {
              setCurrentFormState(FormState.NAME);
            }}
            inputValue={email}
            inputHandler={(e) => {
              setEmail(e.target.value);
            }}
            handleNextStep={() => {
              setCurrentFormState(FormState.DOB);
            }}
          ></Form>
        );
      case FormState.DOB:
        return (
          <Form
            title={FormState.DOB.toString()}
            buttonText="Next"
            shouldDisplayBack={true}
            handleBack={() => {
              setCurrentFormState(FormState.EMAIL);
            }}
            inputValue={dob}
            inputHandler={(e) => {
              setDob(e.target.value);
            }}
            handleNextStep={() => {
              setCurrentFormState(FormState.PASSWORDS);
            }}
          ></Form>
        );
      case FormState.PASSWORDS:
        return (
          <Form
            title={FormState.PASSWORDS.toString()}
            buttonText="Next"
            shouldDisplayBack={true}
            handleBack={() => {
              setCurrentFormState(FormState.DOB);
            }}
            inputValue={passwords}
            inputHandler={(e) => {
              setPaswords(e.target.value);
            }}
            handleNextStep={() => {
              handleSubmit({
                name,
                email,
                dob,
                passwords,
              });
            }}
          ></Form>
        );

      default:
        return <div>Yo</div>;
    }
  };
  return (
    <div className="App">
      <header className="App-header">{renderForm()}</header>
    </div>
  );
}

export default App;
