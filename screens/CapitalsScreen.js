import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';

export default function CapitalsScreen() {
  const [query, setQuery] = useState('');
  const [countryData, setCountryData] = useState([]);

  const fetchCountryData = async (query) => {
    try {
      if (!query) {
        setCountryData([]);
        return;
      }

      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();

      const filteredData = data.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase()) ||
        (country.capital && country.capital[0].toLowerCase().includes(query.toLowerCase()))
      );

      setCountryData(filteredData);
    } catch (error) {
      console.error('Error fetching country data:', error);
      setCountryData([]);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    fetchCountryData(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search for country or capital"
      />

      {countryData.length > 0 ? (
        <ScrollView style={styles.results}>
          {countryData.map((country, index) => (
            <View key={index} style={styles.countryCard}>
              <Text style={styles.text}>Country: {country.name.common}</Text>
              <Text style={styles.text}>Capital: {country.capital ? country.capital[0] : 'N/A'}</Text>

              {/*SHOW FLAG*/}
              {country.flags && country.flags.png && (
                <Image source={{ uri: country.flags.png }} style={styles.flag} />
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.text}>No results </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  input: {
    width: '100%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
  },
  results: {
    width: '100%',
    marginTop: 20,
  },
  countryCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  flag: {
    width: 100,
    height: 60,
    marginTop: 10,
  },
});