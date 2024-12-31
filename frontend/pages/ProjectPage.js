import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import Donate from './Donate';
import { useNavigation } from '@react-navigation/native';


const { height, width } = Dimensions.get('window');

const dummyCampaigns = [
  {
    id: 1,
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    title: 'Save the Ocean',
    likes: 120,
    comments: ['Amazing!', 'Great initiative!'],
    shares: 15,
    isLiked: false,
    isPlaying: true, // Added flag for play state
  },
  {
    id: 2,
    mediaType: 'image',
    mediaUrl: 'https://via.placeholder.com/600x400',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Jane Smith',
    title: 'Support Education',
    likes: 300,
    comments: ['Very inspiring!'],
    shares: 50,
    isLiked: false,
    isPlaying: false,
  },
];

const ProjectPage = ({ navigation }) => {
  const [campaigns, setCampaigns] = useState(dummyCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentModalVisible, setCommentModalVisible] = useState(false);
   const navigate =useNavigation()

  // Function to handle like status and toggle play/pause
  const handleLikeAndTogglePlay = (id, eventType) => {
    setCampaigns((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: eventType === 'double' ? !item.isLiked : item.isLiked, // Toggle like on double click
              isPlaying: eventType === 'single' ? !item.isPlaying : item.isPlaying, // Toggle play/pause on single click
              likes: eventType === 'double' && !item.isLiked ? item.likes + 1 : item.isLiked && eventType === 'double' ? item.likes - 1 : item.likes,
            }
          : item
      )
    );
  };

  const handleComment = () => {
    setCampaigns((prev) =>
      prev.map((item) =>
        item.id === selectedCampaign
          ? { ...item, comments: [...item.comments, commentText] }
          : item
      )
    );
    setCommentText('');
    setCommentModalVisible(false);
  };

  const renderCampaign = ({ item }) => (
    <View style={styles.campaignItem}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: item.profilePicture }} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>{item.name}</Text>
          <Text style={styles.profileTitle}>{item.title}</Text>
        </View>
      </View>

      <View style={styles.mediaContainer}>
        {item.mediaType === 'video' ? (
          <TouchableOpacity
            onPress={() => handleLikeAndTogglePlay(item.id, 'single')}
            onDoublePress={() => handleLikeAndTogglePlay(item.id, 'double')}
            style={{ position: 'relative' }}
          >
            <Video
              source={{ uri: item.mediaUrl }}
              style={styles.media}
              resizeMode="cover"
              isLooping
              shouldPlay={item.isPlaying}
              isMuted={false}
            />
            {!item.isPlaying && (
              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={() => handleLikeAndTogglePlay(item.id, 'single')}
              >
                <Icon name="play" size={50} color="white" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ) : (
          <Image source={{ uri: item.mediaUrl }} style={styles.media} />
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleLikeAndTogglePlay(item.id, 'double')} style={styles.actionButton}>
          <Icon name="heart" size={36} color={item.isLiked ? 'red' : 'white'} />
          <Text style={styles.actionCount}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedCampaign(item.id);
            setCommentModalVisible(true);
          }}
          style={styles.actionButton}
        >
          <Icon name="comment" size={36} color="white" />
          <Text style={styles.actionCount}>{item.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={36} color="white" />
          <Text style={styles.actionCount}>{item.shares}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}  onPress={()=>navigate.navigate('Donate')}>
          <Icon name="money" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCampaign}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
 <Modal visible={commentModalVisible} animationType="slide" transparent>
  <View style={styles.modalContainer}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => setCommentModalVisible(false)} // Close the modal when clicked
    >
      <Icon name="arrow-left" size={30} color="white" />
    </TouchableOpacity>
    
    {/* Comment Input and Post Button */}
    <View style={styles.commentInputContainer}>
      <TextInput
        style={styles.commentInput}
        placeholder="Write a comment..."
        placeholderTextColor="#ccc"
        value={commentText}
        onChangeText={setCommentText}
      />
      <TouchableOpacity onPress={handleComment} style={styles.commentButton}>
        <Text style={styles.commentButtonText}>Post</Text>
      </TouchableOpacity>
    </View>

    {/* Comments Section */}
    <View style={styles.commentSection}>
      <FlatList
        data={campaigns.find(item => item.id === selectedCampaign)?.comments || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Image
              source={{ uri: campaigns.find(campaign => campaign.id === selectedCampaign)?.profilePicture }}
              style={styles.commentProfileImage}
            />
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentUsername}>
                {campaigns.find(campaign => campaign.id === selectedCampaign)?.name}
              </Text>
              <Text style={styles.commentText}>{item}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </View>
</Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  list: {
    flex: 1,
  },
  campaignItem: {
    display: 'relative',
  },
  profileContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 10,
    left: 10,
    zIndex: 10,
    padding: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  profileTitle: {
    fontSize: 14,
    color: '#fff',
  },
  mediaContainer: {
    width: '100%',
    height: height * 0.86,
    backgroundColor: '#000',
    position: 'relative',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  actionsContainer: {
    flexDirection: 'column',
    position: 'absolute',
    right: 15,
    bottom: height * 0.1,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: 5,
  },
  actionCount: {
    color: '#fff',
    fontSize: 14,
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start', // This ensures the modal opens from the top
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darkened background to focus on modal
    paddingTop: 50, // Add some padding to the top for the input and button
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
  },
  commentInputContainer: {
    width: '90%',
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#222',
    borderRadius: 5,
    overflow: 'hidden',
  },
  commentInput: {
    width: '100%',
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  commentSection: {
    width: '95%',
    maxHeight: height * 0.5, // Modal takes up 50% of the screen height
    marginBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#222',
    borderRadius: 5,
    overflow: 'hidden',
  },
  commentItem: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  commentProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentUsername: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProjectPage;
