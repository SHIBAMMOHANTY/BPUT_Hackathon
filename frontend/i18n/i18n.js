import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const LanguageSupport = () => {
  const { t, i18n } = useTranslation();

  // Function to change language
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{t('languageSupport')}</Text>
        <Text style={styles.subtitle}>{t('selectLanguage')}</Text>

        <View style={styles.languageButtonsContainer}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage('en')}
          >
            <Ionicons name="language" size={24} color="#fff" />
            <Text style={styles.languageButtonText}>{t('english')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage('es')}
          >
            <Ionicons name="language" size={24} color="#fff" />
            <Text style={styles.languageButtonText}>{t('spanish')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage('fr')}
          >
            <Ionicons name="language" size={24} color="#fff" />
            <Text style={styles.languageButtonText}>{t('french')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage('de')}
          >
            <Ionicons name="language" size={24} color="#fff" />
            <Text style={styles.languageButtonText}>{t('german')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage('hi')}
          >
            <Ionicons name="language" size={24} color="#fff" />
            <Text style={styles.languageButtonText}>{t('hindi')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  languageButtonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  languageButton: {
    backgroundColor: '#4e73df',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default LanguageSupport;
