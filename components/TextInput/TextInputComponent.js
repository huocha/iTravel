import React, { Component } from 'react';

const TextInputComponent = ({value, onChangeText, name, ...props}) => (
    <TextInput
        value={value}
        onChangeText={(value) => onChangeText(name, value)} //... Bind the name here
        {...props}
    />
)

export {
  TextInputComponent,
}
