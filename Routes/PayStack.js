import React from 'react';
import { WebView } from 'react-native-webview';
import {PAYSTACK_PUBLIC_KEY} from "@env"
import { useState } from 'react';


export const PayStack =({navigation, route})=> {
    const {url} = route.params;

  return (
    <WebView 
      source={{ uri: url }}
      style={{ marginTop: 40 }}
    />
  );
}
