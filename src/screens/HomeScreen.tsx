import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useAppContext } from '../context/AppContext';
import { getProfessionals } from '../services/api';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const { professionals, setProfessionals } = useAppContext();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfessionals();
        setProfessionals(data);
      } catch (error) {
        console.error('Failed to fetch professionals:', error);
      }
    };

    fetchData();
  }, [setProfessionals]);

  return (
    <View style={styles.container}>
      <FlatList
        data={professionals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.profession}>{item.profession}</Text>
            <Button
              title="View Profile"
              onPress={() => navigation.navigate('Profile', { professional: item })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profession: {
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;