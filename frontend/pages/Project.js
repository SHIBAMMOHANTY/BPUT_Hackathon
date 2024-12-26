import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fundingGoal: '',
    location: '',
    category: '',
    team: '',
    contact: '',
    timeline: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState(null); // State to track expanded project

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      fundingGoal: '',
      location: '',
      category: '',
      team: '',
      contact: '',
      timeline: '',
    });
    setEditIndex(null);
  };

  const handleAddProject = () => {
    if (editIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = formData;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, formData]);
    }
    resetForm();
    setModalVisible(false);
  };

  const handleEditProject = (index) => {
    setEditIndex(index);
    setFormData(projects[index]);
    setModalVisible(true);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleProjectDetails = (index) => {
    setExpandedProjectIndex(expandedProjectIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crowdfunding Projects</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by project title or location"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Add Project Button */}
      <Button title="Add Project" onPress={() => setModalVisible(true)} />

      {/* Project List */}
      <FlatList
        data={filteredProjects}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.projectCard}
            onPress={() => toggleProjectDetails(index)}
          >
            <Text style={styles.projectTitle}>{item.title}</Text>
            {expandedProjectIndex === index && (
              <>
                <Text style={styles.projectDetail}>
                  Location: {item.location}
                </Text>
                <Text style={styles.projectDetail}>
                  Funding Goal: ${item.fundingGoal}
                </Text>
                <Text style={styles.projectDetail}>
                  Category: {item.category}
                </Text>
                <Text style={styles.projectDescription}>{item.description}</Text>
                <Text style={styles.projectDetail}>Team: {item.team}</Text>
                <Text style={styles.projectDetail}>Contact: {item.contact}</Text>
                <Text style={styles.projectDetail}>Timeline: {item.timeline}</Text>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditProject(index)}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteProject(index)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Add/Edit Project Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalHeader}>Add/Edit Project</Text>

          {[
            { key: 'title', placeholder: 'Project Title' },
            { key: 'description', placeholder: 'Project Description', multiline: true },
            { key: 'fundingGoal', placeholder: 'Funding Goal', keyboardType: 'numeric' },
            { key: 'location', placeholder: 'Project Location' },
            { key: 'category', placeholder: 'Project Category' },
            { key: 'team', placeholder: 'Team Members' },
            { key: 'contact', placeholder: 'Contact Information' },
            { key: 'timeline', placeholder: 'Timeline' },
          ].map(({ key, placeholder, ...rest }) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={placeholder}
              value={formData[key]}
              onChangeText={(text) => handleInputChange(key, text)}
              {...rest}
            />
          ))}

          <View style={styles.modalActions}>
            <Button title="Save" onPress={handleAddProject} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => {
                resetForm();
                setModalVisible(false);
              }}
            />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  projectDetail: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  projectDescription: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ProjectPage;
