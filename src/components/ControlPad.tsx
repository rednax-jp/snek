import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

interface ControlPadProps {
  onDirectionChange: (direction: Direction) => void;
}

const ControlPad: React.FC<ControlPadProps> = ({ onDirectionChange }) => {
  return (
    <View style={styles.controlPad}>
      <View style={styles.row}>
        <View style={styles.placeholder} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onDirectionChange('UP')}
        >
          <Ionicons name="chevron-up" size={32} color="#333" />
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onDirectionChange('LEFT')}
        >
          <Ionicons name="chevron-back" size={32} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.centerPlaceholder} />
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => onDirectionChange('RIGHT')}
        >
          <Ionicons name="chevron-forward" size={32} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.row}>
        <View style={styles.placeholder} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onDirectionChange('DOWN')}
        >
          <Ionicons name="chevron-down" size={32} color="#333" />
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controlPad: {
    marginTop: 30,
    width: 180,
    height: 180,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  placeholder: {
    width: 60,
    height: 60,
  },
  centerPlaceholder: {
    width: 60,
    height: 60,
  },
});

export default ControlPad; 