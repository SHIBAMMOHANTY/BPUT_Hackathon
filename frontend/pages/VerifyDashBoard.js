import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ProposalCard from '../component/Entryinfo/ProposalCard';

const dummyProposals = [
  {
    id: 1,
    name: 'AI for Accessibility',
    aiScore: 85,
    status: 'Pending Evaluation',
  },
  {
    id: 2,
    name: 'Smart City Solutions',
    aiScore: 90,
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Accessibility for All',
    aiScore: 78,
    status: 'Denied',
  },
];

const DashboardScreen = ({ navigation }) => {
  const [proposals, setProposals] = useState(dummyProposals);
  const [socialMetrics, setSocialMetrics] = useState({ rampsBuilt: 0, disabledHired: 0 });
  const [financialMetrics, setFinancialMetrics] = useState({ revenue: 0, roi: 0 });

  useEffect(() => {
    // Simulate fetching total financial and social metrics for the investor
    setProposals(dummyProposals); // Replace with real API call if needed
    setSocialMetrics({ rampsBuilt: 15, disabledHired: 30 }); // Dummy data
    setFinancialMetrics({ revenue: 50000, roi: 15 }); // Dummy data
  }, []);

  const handleApprove = (id) => {
    console.log('Approved Proposal ID:', id);
    // Logic to approve the proposal
  };

  const handleDeny = (id) => {
    console.log('Denied Proposal ID:', id);
    // Logic to deny the proposal
  };

  const handleProposalClick = (proposalId) => {
    navigation.navigate('ProposalScreen', { proposalId }); // Navigate to ProposalScreen with proposalId
  };

  const generateImpactReport = () => {
    console.log('Generating Impact Report...');
    // Logic to generate and download impact report
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Proposal Dashboard</Text>

      {/* Display Proposals */}
      {proposals.length > 0 ? (
        proposals.map((proposal) => (
          <TouchableOpacity key={proposal.id} onPress={() => handleProposalClick(proposal.id)}>
            <ProposalCard
              proposal={proposal}
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          </TouchableOpacity>
        ))
      ) : (
        <Text>No proposals available</Text>
      )}

      {/* Social Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Returns</Text>
        <Text>Ramps Built: {socialMetrics.rampsBuilt}</Text>
        <Text>Disabled Individuals Hired: {socialMetrics.disabledHired}</Text>
      </View>

      {/* Financial Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Returns</Text>
        <Text>Revenue: ${financialMetrics.revenue}</Text>
        <Text>ROI: {financialMetrics.roi}%</Text>

        {/* Financial Data Visualization */}
        <LineChart
          data={{
            labels: ['Month 1', 'Month 2', 'Month 3'],
            datasets: [
              {
                data: [5000, 15000, 25000],
              },
            ],
          }}
          width={400}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#e26a00',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      </View>

      {/* Impact Reports */}
      <View style={styles.section}>
        <Button title="Download Impact Report" onPress={generateImpactReport} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DashboardScreen;
