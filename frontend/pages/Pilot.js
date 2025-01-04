import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Arrow icon for expand/collapse

const channels = [
  { id: '1', name: 'General Chat', messages: ['Hello, how is everyone?', 'What’s up?'] },
  { id: '2', name: 'Tech Talk', messages: ['Who likes React?', 'Anyone into AI?'] },
  { id: '3', name: 'Random', messages: ['Random thoughts here!', 'What are you watching?'] },
];

const PilotProgramTracker = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [message, setMessage] = useState('');
  const [showChannels, setShowChannels] = useState(false);
  const [joinedChannel, setJoinedChannel] = useState(false); // Controls whether the user has joined the channel

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
    setJoinedChannel(false); // Reset the joined state when a new channel is selected
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChannel) {
      selectedChannel.messages.push(message);
      setMessage('');
    }
  };

  const handleJoinChannel = () => {
    setJoinedChannel(true); // User joined the channel
  };

  return (
    <View style={styles.container}>
      {/* Sidebar with Dynamic Width and Padding */}
      <View
        style={[
          styles.sidebar,
          showChannels ? styles.sidebarExpanded : styles.sidebarCollapsed,
        ]}
      >
        {/* Toggle Button for Sidebar */}
        <TouchableOpacity onPress={() => setShowChannels(!showChannels)} style={styles.arrowButton}>
          <AntDesign name={showChannels ? 'left' : 'right'} size={24} color="white" />
        </TouchableOpacity>

        {/* Channels List - Visible Only When Sidebar Expanded */}
        {showChannels && (
          <FlatList
            data={channels}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.sidebarItem}
                onPress={() => 
                {
                  handleSelectChannel(item)
                  setShowChannels(false)
                }
                }
              >
                <Text style={styles.sidebarItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Main Chat Area */}
      <View style={styles.chatArea}>
        {selectedChannel ? (
          <>
            <Text style={styles.channelTitle}>{selectedChannel.name}</Text>
            <ScrollView style={styles.chatMessages}>
              {selectedChannel.messages.map((msg, index) => (
                <Text key={index} style={styles.message}>
                  {msg}
                </Text>
              ))}
            </ScrollView>

            {/* Join Channel Button (Removed After Joining) */}
            {!joinedChannel && (
              <TouchableOpacity style={styles.joinButton} onPress={handleJoinChannel}>
                <Text style={styles.joinButtonText}>Join Channel</Text>
              </TouchableOpacity>
            )}

            {/* Message Input (Only Active After Joining) */}
            {joinedChannel && (
              <View style={styles.messageInputArea}>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type a message"
                  placeholderTextColor="#bbb"
                  value={message}
                  onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <Text style={styles.selectChannelMessage}>Select a channel to start chatting</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#2F3136',
  },

  /** Sidebar Styles */
  sidebar: {
    backgroundColor: '#1F2328',
    height: '100%',
    borderRightWidth: 1,
    borderColor: '#444',
  },
  sidebarExpanded: {
    width: 250,
    padding: 20,
  },
  sidebarCollapsed: {
    width: 0,
    padding: 0,
  },
  arrowButton: {
    position: 'absolute',
    right: -20,
    top: 20,
    zIndex: 1,
  },
  sidebarItem: {
    paddingVertical: 10,
  },
  sidebarItemText: {
    color: '#ddd',
    fontSize: 18,
  },

  /** Chat Area Styles */
  chatArea: {
    flex: 1,
    padding: 20,
    backgroundColor: '#36393F',
  },
  channelTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  chatMessages: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    color: '#fff',
    paddingVertical: 5,
    fontSize: 16,
  },

  /** Message Input Section */
  messageInputArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 20,
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#7289DA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /** Join Channel Button */
  joinButton: {
    backgroundColor: '#7289DA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  /** Channel Selection Message */
  selectChannelMessage: {
    color: '#bbb',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PilotProgramTracker;
