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

const Events = () => {
  const [projects, setProjects] = useState([
    {
      title: 'Solar Energy Initiative',
      description: 'A project to bring affordable solar energy to rural areas.',
      fundingGoal: 100000,
      location: 'California, USA',
      category: 'Renewable Energy',
      team: 'Team Solar',
      contact: 'solarproject@example.com',
      timeline: '12 months',
      currentFunding: 45000,
    },
    {
      title: 'Water Purification System',
      description: 'Developing an efficient water purification system.',
      fundingGoal: 50000,
      location: 'Delhi, India',
      category: 'Health & Environment',
      team: 'Clean Water',
      contact: 'cleanwater@example.com',
      timeline: '8 months',
      currentFunding: 20000,
    },
  ]);

  const [investmentModalVisible, setInvestmentModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');

  const openInvestmentModal = (project) => {
    setSelectedProject(project);
    setInvestmentModalVisible(true);
  };

  const handleInvestment = () => {
    if (!selectedProject || !investmentAmount) return;

    const updatedProjects = projects.map((project) => {
      if (project.title === selectedProject.title) {
        return {
          ...project,
          currentFunding: project.currentFunding + parseInt(investmentAmount),
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setInvestmentModalVisible(false);
    setInvestmentAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Investment Opportunities</Text>

      {/* Project List */}
      <FlatList
        data={projects}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.projectCard}>
            <Text style={styles.projectTitle}>{item.title}</Text>
            <Text style={styles.projectDetail}>Location: {item.location}</Text>
            <Text style={styles.projectDetail}>
              Funding Goal: ${item.fundingGoal.toLocaleString()}
            </Text>
            <Text style={styles.projectDetail}>
              Current Funding: ${item.currentFunding.toLocaleString()}
            </Text>
            <Text style={styles.projectDetail}>Category: {item.category}</Text>
            <Text style={styles.projectDescription}>{item.description}</Text>
            <Text style={styles.projectDetail}>Team: {item.team}</Text>
            <Text style={styles.projectDetail}>Contact: {item.contact}</Text>
            <Text style={styles.projectDetail}>Timeline: {item.timeline}</Text>

            <TouchableOpacity
              style={styles.investButton}
              onPress={() => openInvestmentModal(item)}
            >
              <Text style={styles.buttonText}>Invest</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Investment Modal */}
      <Modal
        visible={investmentModalVisible}
        animationType="slide"
        onRequestClose={() => setInvestmentModalVisible(false)}
      >
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalHeader}>Invest in Project</Text>
          {selectedProject && (
            <>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>Project: </Text>
                {selectedProject.title}
              </Text>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>Funding Goal: </Text>${selectedProject.fundingGoal.toLocaleString()}
              </Text>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>Current Funding: </Text>${selectedProject.currentFunding.toLocaleString()}
              </Text>
            </>
          )}

          {/* Investment Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter investment amount"
            value={investmentAmount}
            onChangeText={(text) => setInvestmentAmount(text)}
            keyboardType="numeric"
          />

          {/* Modal Actions */}
          <View style={styles.modalActions}>
            <Button title="Confirm Investment" onPress={handleInvestment} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setInvestmentModalVisible(false)}
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
    marginBottom: 5,
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
  investButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
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
  modalDetail: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Events;
