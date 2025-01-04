import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const EventPlatform = () => {
    const [openModal, setOpenModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [image, setImage] = useState(null);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [registeredEvents, setRegisteredEvents] = useState([]);

    const createEvent = () => {
        const newEvent = {
            id: Date.now(),
            title,
            description,
            dateTime,
            isActive: dateTime >= new Date(),
            image,
        };
        setEvents([newEvent, ...events]);
        setOpenModal(false);
        setTitle('');
        setDescription('');
        setDateTime(new Date());
        setImage(null);
    };

    const registerForEvent = (id) => {
        setShowRegisterModal(true);
        setRegisteredEvents([...registeredEvents, id]);
    };

    const onDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDateTime(selectedDate);
            setShowTimePicker(true);
        }
    };

    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setDateTime(selectedTime);
        }
    };

    const pickImage = async () => {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
          alert('Permission to access gallery is required!');
          return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
      });
  
      if (!result.canceled) {
          setImage(result.assets[0].uri); // Fixed the path to access the image URI
      }
  };
  

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Events"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <View style={styles.addButtonWrapper}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setOpenModal(true)}
                >
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={openModal} animationType="slide">
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Create Event</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
                        <Text style={styles.dateText}>Select Date</Text>
                    </TouchableOpacity>

                    <Text style={styles.dateDisplay}>{dateTime.toLocaleDateString()}</Text>

                    {showTimePicker && (
                        <DateTimePicker value={dateTime} mode="time" onChange={onTimeChange} />
                    )}

                    {showPicker && (
                        <DateTimePicker value={dateTime} mode="date" onChange={onDateChange} />
                    )}

                    <TouchableOpacity style={styles.dateButton} onPress={pickImage}>
                        <Text style={styles.dateText}>Pick Event Image</Text>
                    </TouchableOpacity>

                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

                    <TouchableOpacity style={styles.createButton} onPress={createEvent}>
                        <Text style={styles.createButtonText}>Create Event</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setOpenModal(false)}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventCard}>
                        {registeredEvents.includes(item.id) && (
                            <Text style={styles.registeredText}>Registered</Text>
                        )}
                        {item.image && <Image source={{ uri: item.image }} style={styles.imagePreview} />}
                        <Text style={styles.eventTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{new Date(item.dateTime).toLocaleString()}</Text>

                        {!registeredEvents.includes(item.id) && (
                            <TouchableOpacity
                                style={styles.registerButton}
                                onPress={() => registerForEvent(item.id)}
                            >
                                <Text style={styles.registerButtonText}>Register</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />

            {/* Registration Confirmation Modal */}
            <Modal visible={showRegisterModal} transparent={true} animationType="fade">
    <View style={styles.overlay}>
        <View style={styles.popupContainer}>
            <Text style={styles.title}>Registration Successful!</Text>
            <Text style={styles.message}>You have successfully registered for the event.</Text>
            <TouchableOpacity onPress={() => setShowRegisterModal(false)} style={styles.okButton}>
                <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f9',
        width: '100%',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    addButtonWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 10,
    },
    addButton: {
        backgroundColor: '#640708',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        color: '#fff',
        fontSize: 30,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    createButton: {
        backgroundColor: '#640708',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        textAlign: 'center',
        marginTop: 10,
        color: '#640708',
    },
    dateButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
    },
    dateDisplay: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    eventCard: {
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: '#640708',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
    },
    registeredText: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginTop: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  },
  
  popupContainer: {
      backgroundColor: '#fff',
      padding: 30,
      borderRadius: 15,
      width: '80%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 10,
  },
  
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2d2d2d',
      marginBottom: 10,
  },
  
  message: {
      fontSize: 16,
      color: '#5e5e5e',
      marginBottom: 20,
      textAlign: 'center',
  },
  
  okButton: {
      backgroundColor: '#640708', // Button background
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      width: '100%',
      alignItems: 'center',
  },
  
  okButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
  }
  
});

export default EventPlatform;
