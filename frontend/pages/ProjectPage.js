import React, { useState, useEffect } from 'react';
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
  Pressable,
} from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from 'react-native-progress/Bar';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from 'react-native-vector-icons';

const { height, width } = Dimensions.get('window');

const dummyData = [
  {
    id: 1,
    type: 'campaign',
    mediaType: 'image',
    mediaUrl: 'https://www.karmamedical.com/wp-content/uploads/2021/05/JCFF0110-1024x683-1.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Unicorn Charity',
    ngoName: 'Unicorn Charity India',
    title: 'Ramp Access for Wheelchairs',
    description: 'Help us install ramps for wheelchair users in public spaces in India.',
    location: 'Delhi',
    currentAmount: 500,
    goalAmount: 1500,
    likes: 120,
    comments: [{ name: 'John Doe', text: 'This is much needed!' }],
    shares: 15,
    isLiked: false,
    isPlaying: true,
    link: 'https://www.example.com/campaign/ramp-access',
    isNGO: true,
     
  },
  {
    id: 2,
    type: 'campaign',
    mediaType: 'image',
    mediaUrl: 'https://example.com/image.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Green Earth Initiative',
    ngoName: 'Green Earth NGO',
    title: 'Accessible Sidewalks',
    description: 'Support our initiative to build accessible sidewalks for the disabled.',
    location: 'Mumbai',
    currentAmount: 800,
    goalAmount: 2000,
    likes: 90,
    comments: [{ name: 'Jane Doe', text: 'This is an important cause!' }],
    shares: 20,
    isLiked: false,
    isPlaying: false,
    link: 'https://www.example.com/campaign/accessible-sidewalks',
    isNGO: true,
     
  },
  {
    id: 3,
    type: 'campaign',
    mediaType: 'image',
    mediaUrl: 'https://example.com/image.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Abilities Foundation',
    ngoName: 'Abilities Foundation India',
    title: 'Accessible Public Toilets',
    description: 'Our mission is to build accessible public toilets across the country.',
    location: 'Bangalore',
    currentAmount: 600,
    goalAmount: 2500,
    likes: 150,
    comments: [{ name: 'Samuel', text: 'Let’s make India accessible for all!' }],
    shares: 18,
    isLiked: false,
    isPlaying: false,
    link: 'https://www.example.com/campaign/accessible-toilets',
    isNGO: true,
     
  },
  {
    id: 4,
    type: 'campaign',
    mediaType: 'image',
    mediaUrl: 'https://example.com/image.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Equal Access India',
    ngoName: 'Equal Access India NGO',
    title: 'Elevators for All Buildings',
    description: 'We aim to install elevators in buildings that currently have no access for disabled individuals.',
    location: 'Kolkata',
    currentAmount: 1000,
    goalAmount: 3000,
    likes: 200,
    comments: [{ name: 'Amit', text: 'Great work, keep it up!' }],
    shares: 25,
    isLiked: false,
    isPlaying: false,
    link: 'https://www.example.com/campaign/elevators-for-all',
    isNGO: true,
     
  },
  {
    id: 5,
    type: 'campaign',
    mediaType: 'video',
    mediaUrl: 'https://www.karmamedical.com/wp-content/uploads/2021/05/JCFF0110-1024x683-1.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'Saksham Foundation',
    ngoName: 'Saksham Foundation India',
    title: 'Disabled Parking Spots',
    description: 'Support our initiative to create more accessible parking spaces for disabled individuals.',
    location: 'Chennai',
    currentAmount: 300,
    goalAmount: 1500,
    likes: 50,
    comments: [{ name: 'Ravi', text: 'Accessible parking is a must!' }],
    shares: 10,
    isLiked: false,
    isPlaying: true,
    link: 'https://www.example.com/campaign/disabled-parking',
    isNGO: true,
     
  },
  {
    id: 6,
    type: 'campaign',
    mediaType: 'image',
    mediaUrl: 'https://example.com/image.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'Hope for All',
    ngoName: 'Hope for All India',
    title: 'Accessible Public Transport',
    description: 'Help us create accessible public transport options for individuals with disabilities.',
    location: 'Hyderabad',
    currentAmount: 400,
    goalAmount: 1800,
    likes: 75,
    comments: [{ name: 'Anjali', text: 'Public transport needs to be more inclusive.' }],
    shares: 12,
    isLiked: false,
    isPlaying: false,
    link: 'https://www.example.com/campaign/accessible-transport',
    isNGO: true,
     
  },
  {
    id: 7,
    type: 'campaign',
    mediaType: 'video',
    mediaUrl: 'https://www.karmamedical.com/wp-content/uploads/2021/05/JCFF0110-1024x683-1.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Equal Opportunities',
    ngoName: 'Equal Opportunities India',
    title: 'Accessible Education Facilities',
    description: 'Help us provide accessible education facilities for children with disabilities.',
    location: 'Pune',
    currentAmount: 550,
    goalAmount: 2000,
    likes: 140,
    comments: [{ name: 'Priya', text: 'Inclusive education is key to equality.' }],
    shares: 30,
    isLiked: false,
    isPlaying: true,
    link: 'https://www.example.com/campaign/accessible-education',
    isNGO: true,
   
  },
  {
    id: 8,
    type: 'campaign',
    mediaType: 'image',
    mediaUrl: 'https://example.com/image.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
    name: 'Access4All',
    ngoName: 'Access4All India',
    title: 'Accessible Playgrounds',
    description: 'Support our mission to build accessible playgrounds for children with disabilities.',
    location: 'Jaipur',
    currentAmount: 200,
    goalAmount: 1000,
    likes: 60,
    comments: [{ name: 'Neha', text: 'Every child deserves an accessible playground!' }],
    shares: 8,
    isLiked: false,
    isPlaying: false,
    link: 'https://www.example.com/campaign/accessible-playgrounds',
    isNGO: true,
    
  },
  {
    id: 9,
    type: 'campaign',
    mediaType: 'image',
    mediaUrl: 'https://example.com/image.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Disability Rights India',
    ngoName: 'Disability Rights India',
    title: 'Accessible Healthcare Facilities',
    description: 'Join us in making healthcare facilities more accessible for people with disabilities.',
    location: 'Lucknow',
    currentAmount: 900,
    goalAmount: 4000,
    likes: 180,
    comments: [{ name: 'Shivani', text: 'Healthcare should be accessible for all!' }],
    shares: 20,
    isLiked: false,
    isPlaying: false,
    link: 'https://www.example.com/campaign/accessible-healthcare',
    isNGO: true,
     
  },
  {
    id: 10,
    type: 'campaign',
    mediaType: 'image',
    mediaUrl: 'https://www.karmamedical.com/wp-content/uploads/2021/05/JCFF0110-1024x683-1.jpg',
    profilePicture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Disability Inclusion India',
    ngoName: 'Disability Inclusion India',
    title: 'Accessible Voting Booths',
    description: 'Help us create accessible voting booths for people with disabilities during elections.',
    location: 'Ahmedabad',
    currentAmount: 750,
    goalAmount: 3500,
    likes: 130,
    comments: [{ name: 'Sunil', text: 'Everyone should have equal access to vote.' }],
    shares: 18,
    isLiked: false,
    isPlaying: true,
    link: 'https://www.example.com/campaign/accessible-voting-booths',
    isNGO: true,
    
  },
];


const ProjectPage = () => {
  const [data, setData] = useState(dummyData);
  const [commentText, setCommentText] = useState('');
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const navigate = useNavigation();

  // Calculate time to reach the goal (in seconds)
  const calculateTimeToGoal = (currentAmount, goalAmount) => {
    const donationRatePerSecond = 50; // Example: 50 Rupees donated per second
    const remainingAmount = goalAmount - currentAmount;
    if (remainingAmount <= 0) return 0;
    const timeInSeconds = remainingAmount / donationRatePerSecond;
    return timeInSeconds;
  };

  const renderCampaign = (item) => {
    // Calculate donation progress and time to goal
    const progress = item.currentAmount / item.goalAmount;
    const timeToGoal = calculateTimeToGoal(item.currentAmount, item.goalAmount);

    return (
      <View style={styles.campaignItem}>
        {/* Profile and Details */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: item.profilePicture }} style={styles.profileImage} />
          <View>
            <Text style={styles.profileName}>{item.name}</Text>
            {item.isNGO && <Text style={styles.ngoName}>{item.ngoName}</Text>}
            <Text style={styles.profileTitle}>{item.title}</Text>
          </View>
          {item.isNGO && <AntDesign name="checkcircle" size={14} color="#007bff" style={styles.blueTick} />}
        </View>

        {item.isNGO && <View style={styles.badge}><Text style={styles.badgeText}>NGO</Text></View>}
        {item.isAccessibilityIssue && <View style={styles.accessibilityBadge}><Text style={styles.accessibilityBadgeText}>Accessibility Issue</Text></View>}

        {/* Media */}
        <View style={styles.mediaContainer}>
          {item.mediaType === 'video' ? (
            <Video
              source={{ uri: item.mediaUrl }}
              style={styles.media}
              resizeMode="cover"
              shouldPlay={item.isPlaying}
              isLooping
            />
          ) : (
            <Image source={{ uri: item.mediaUrl }} style={styles.media} />
          )}
        </View>

        {/* Description */}
        <Text style={styles.descriptionText}>
          {expandedDescription ? item.description : item.description.substring(0, 100)}
          <TouchableOpacity onPress={() => setExpandedDescription(!expandedDescription)}>
            <Text style={styles.readMore}>{expandedDescription ? 'Show less' : 'Read more'}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.locationText}>Location: {item.location}</Text>

        {/* Donation Progress Bar */}
        <ProgressBar progress={progress} width={null} height={8} borderRadius={5} color="#007bff" style={styles.progressBar} />
        <Text style={styles.progressText}>₹{item.currentAmount} / ₹{item.goalAmount} Donated</Text>

        {/* Estimated Time to Goal */}
        <Text style={styles.timeText}>
          {timeToGoal > 0
            ? `Estimated time to reach goal: ${Math.round(timeToGoal / 60)} minutes`
            : 'Goal reached!'}
        </Text>

        {/* Like, Comment, Share */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setData((prevData) =>
                prevData.map((campaign) =>
                  campaign.id === item.id
                    ? { ...campaign, isLiked: !campaign.isLiked, likes: campaign.isLiked ? campaign.likes - 1 : campaign.likes + 1 }
                    : campaign
                )
              );
            }}
          >
            <Icon name="heart" size={30} color={item.isLiked ? 'red' : 'white'} />
          </TouchableOpacity>
          <Text style={styles.countText}>{item.likes} Likes</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setSelectedItem(item);
              setCommentModalVisible(true);
            }}
          >
            <Icon name="comment" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.donateButton}
            onPress={() => navigate.navigate('Donate')}
          >
            <Text style={styles.donateButtonText}>Donate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => renderCampaign(item);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Comment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentModalVisible}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Add a comment"
              value={commentText}
              onChangeText={setCommentText}
              style={styles.commentInput}
            />
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                const updatedData = data.map((item) =>
                  item.id === selectedItem.id
                    ? { ...item, comments: [...item.comments, { name: 'You', text: commentText }] }
                    : item
                );
                setData(updatedData);
                setCommentText('');
                setCommentModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </Pressable>
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
    padding: 10,
  },
  campaignItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    position: 'relative', // Allow absolute positioning of badge
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  ngoName: {
    fontSize: 14,
    color: '#007bff',
  },
  profileTitle: {
    fontSize: 14,
    color: '#ccc',
  },
  blueTick: {
    marginLeft: 5,
  },
  badge: {
    backgroundColor: '#007bff',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
    position: 'absolute', // Position the badge absolutely
    top: 10, // Place it 10 units from the top
    right: 10, // Place it 10 units from the right
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  accessibilityBadge: {
    backgroundColor: '#ff5722',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  accessibilityBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mediaContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: 350,
    borderRadius: 1,
  },
  descriptionText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  readMore: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  locationText: {
    fontSize: 14,
    color: '#ccc',
  },
  progressBar: {
    marginVertical: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
  },
  timeText: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    padding: 10,
  },
  countText: {
    fontSize: 14,
    color: '#fff',
  },
  donateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    width: width - 40,
  },
  commentInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectPage;
