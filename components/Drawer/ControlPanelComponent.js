import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from './ControlPanelComponent.style';

const ControlPanel = props => {
  let { closeDrawer } = props
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.controlText}>Control Panel</Text>
      <TouchableOpacity style={styles.button} onPress={closeDrawer}>
        <Text>Close Drawer</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ControlPanel;
